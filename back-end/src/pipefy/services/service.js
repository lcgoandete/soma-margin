/* eslint-disable no-return-await */

const reader = require('xlsx');

const pipefy = require('../models/model');
const safra = require('../../banks/safra/models/safra');

const convertCardFieldsToProposalData = (cardFields) => {
  if (!cardFields) {
    throw Error('Error: Erro ao tentar ler os dados do cartão');
  }

  const proposalData = {};
  // eslint-disable-next-line no-return-assign
  cardFields.data.card.fields.forEach(({ name, value }) => proposalData[name] = value);
  return proposalData;
};

const convertStringToCurrency = (value) => {
  if (value) {
    const values = value.split(',');
    const newValue = values[0].replace('.', '');
    const decimal = values[1];
    return parseFloat(`${newValue}.${decimal}`);
  }
  return null;
};

const getIdTabelaJuros = (cardData) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(cardData)) {
    if (key.includes('Tabelas')) {
      return parseInt(value.substring(0, 6), 10);
    }
  }
  return null;
};

const getEmployeeSituation = (cardData) => {
  let situation = 1;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(cardData)) {
    if (key.includes('PROFISSOES')) {
      if (value.includes('APOSENTADO')) {
        situation = 2;
      } else if (value.includes('PENSIONISTA')) {
        situation = 3;
      }
    }
  }
  return situation;
};

const getEmploymentRelationship = (cardData) => {
  const employeeSituation = getEmployeeSituation(cardData);
  let employmentRelationship = 0;

  if (employeeSituation === 1) {
    employmentRelationship = 2;
  } else if (employeeSituation === 2) {
    employmentRelationship = 5;
  } else if (employeeSituation === 3) {
    employmentRelationship = 6;
  }
  return employmentRelationship;
};

const getIdEmpregador = (cardData) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(cardData)) {
    if (key.includes('EMPREGADOR')) {
      return parseInt(value.substring(0, 4), 10);
    }
  }
  return null;
};

const getIdProfissoes = (cardData) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(cardData)) {
    if (key.includes('PROFISSOES')) {
      return parseInt(value.substring(0, 6), 10);
    }
  }
  return null;
};

const getRole = async (cardData) => {
  const idProfissao = getIdProfissoes(cardData);
  const role = await safra.getRole(idProfissao);
  return role[0].idCargo;
};

const convertCpfToNumber = (cpf) => {
  let newCpf = cpf.replace('.', '');
  newCpf = newCpf.replace('.', '');
  newCpf = newCpf.replace('-', '');
  return parseInt(newCpf, 10);
};

const convertDate = (date) => {
  const day = date.substring(0, 2);
  const month = date.substring(3, 5);
  const year = date.substring(6, 10);
  return `${year}-${month}-${day}`;
};

const convertProposalDataToProposal = async (cardData) => {
  const proposal = {
    dadosProposta: {
      aumentoMargem: false,
      idConvenio: parseInt(cardData.Convenio.substring(2, 7), 10),
      idTabelaJuros: getIdTabelaJuros(cardData),
      valorParcela: convertStringToCurrency(cardData.Valor_Parcela),
      prazo: parseInt(cardData.Prazo, 10),
      valorPrincipal: convertStringToCurrency(cardData.Valor_Principal),
      comSeguro: false,
      cpfAgenteCertificado: 9258565681,
      tipoFormalizacao: 6,
    },
    dadosOcupacao: {
      idOrgaoEmpregador: getIdEmpregador(cardData), // TODO: mudar nome da funcao para ingles.
      idProfissao: getIdProfissoes(cardData),
      idCargo: await getRole(cardData),
      idRegimeJuridico: 2,
      idSituacaoEmpregado: getEmployeeSituation(cardData),
      idTipoVinculoEmpregaticio: getEmploymentRelationship(cardData),
      idTipoPagamentoBeneficio: 1,
      idUFBeneficio: 'SP',
      matricula: cardData.Matricula,
      valorRenda: convertStringToCurrency(cardData.Renda_Bruta),
      valorRendaLiquida: convertStringToCurrency(cardData.Renda_Liquida),
      dataAdmissao: '2001-01-01',
    },
    dadosPessoais: {
      cpf: convertCpfToNumber(cardData.CPF),
      nomeCompleto: cardData.Nome_Completo,
      sexo: cardData.Sexo.substring(0, 1),
      dataNascimento: convertDate(cardData.Data_de_Nascimento),
      nomeMae: cardData.Nome_da_Mae,
      email: cardData.Email,
      alfabetizado: 'S',
    },
    contatos: [
      {
        ddd: parseInt(cardData.Telefone.substring(4, 6), 10),
        telefone: cardData.Telefone.substring(7, 17).replace('-', ''),
        email: cardData.Email,
        whatsapp: true,
      },
    ],
    endereco: {
      cep: parseInt(cardData.CEP, 10),
      logradouro: cardData.Logradouro,
      numero: cardData.Numero,
      complemento: cardData.Complemento ? cardData.Complemento : '',
      bairro: cardData.Bairro,
      cidade: cardData.Cidade,
      uf: cardData.Uf,
    },
    dadosBancarios: {
      banco: parseInt(cardData.Banco.substring(2, 5), 10),
      agencia: parseInt(cardData.Agencia, 10),
      tipoConta: cardData.Tipo_de_Conta.substring(0, 2),
      conta: cardData.Numero_da_Conta,
    },
    dadosBancariosAverbacao: {
      bancoAverbacao: parseInt(cardData.Banco.substring(2, 5), 10),
      agenciaAverbacao: parseInt(cardData.Agencia, 10),
      contaAverbacao: cardData.Numero_da_Conta,
    },
    submeter: true,
  };
  return await proposal;
};

const moveFinishedCard = async (cardId, phase) => {
  await pipefy.moveCard(cardId, phase);
};

const approveStop = async (proposalResponse) => {
  const errorLittleStop = 'Houve um erro ao processar "Paradinha".';
  if (!proposalResponse.idProposta) {
    throw Error(`${errorLittleStop}`);
  }

  const response = await safra.sendApproveStop(proposalResponse.idProposta);
  if (response.dsRetorno !== 'OK') {
    throw Error(`${errorLittleStop} - ${response.dsRetorno}`);
  }
};

const registerProposalId = async (cardId, response) => {
  const fieldId = 'copy_of_idproposta';

  if (!response.idProposta) {
    throw Error('Número de proposta inexistente');
  }
  await pipefy.updateCardField(cardId, fieldId, `proposta numero: ${response.idProposta}`);
};

const getExportedPipeReport = async () => {
  const pipeId = 301602217;
  const pipeReportId = 300442811;
  const reportId = await pipefy.getReportId(pipeId, pipeReportId);

  if (reportId == null) {
    return null;
  }

  const reportUrl = await pipefy.getReportUrl(reportId);
  const report = await pipefy.downloadDocument(reportUrl);

  return report;
};

// recebe dos dados do cartao do pipefy,
// gera uma proposta,
// envia proposta para o banco safra,
// move o cartao para a coluna final
const getCardMoved = async (data) => {
  const {
    action, from, to, card,
  } = data;
  const phase = { pending: 310620145, success: 310620144 };

  try {
    if (action === 'card.move') {
      if (from.name === 'Inicio' && to.name === 'Caixa de entrada') {
        const cardFields = await pipefy.getCardData(card.id);
        const proposalData = convertCardFieldsToProposalData(cardFields);
        const proposal = await convertProposalDataToProposal(proposalData);
        const responseProposal = await safra.sendProposal(proposal);
        await registerProposalId(card.id, responseProposal);
        await approveStop(responseProposal);
        await moveFinishedCard(card.id, phase.success);
      }
    }
  } catch (error) {
    const fieldId = 'observacao';

    if (error.response) {
      await pipefy.updateCardField(card.id, fieldId, JSON.stringify(error.response.data.errors));
    } else {
      await pipefy.updateCardField(card.id, fieldId, error.message);
    }
    await moveFinishedCard(card.id, phase.pending);
  }
};

const fs = require('fs');

// verificar
// timer
// proposta
// deletar antigos
// envio do arquivo
const getDocLink = async () => {
  // const exportedPipeReport = await getExportedPipeReport();
  const exportedPipeReport = fs.readFileSync('/home/luis/projects/soma-margin/back-end/src/pipefy/services/report.xlsx');

  const reportXLS = reader.read(exportedPipeReport);

  const report = reader.utils.sheet_to_json(
    reportXLS.Sheets[reportXLS.SheetNames[0]],
  );
  console.log(report[0].Documento_de_Identificacao);

  const document = await pipefy.downloadDocument(report[0].Documento_de_Identificacao);
  console.log(document);

  const teste1 = document.toString();
  console.log(teste1);
};
getDocLink();

module.exports = {
  getCardMoved,
};
