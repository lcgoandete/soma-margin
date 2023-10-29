/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */

const Proposal = require('./Proposal');
const safra = require('../../banks/safra/models/safra');

class ProposalSafra extends Proposal {
  #cardData = {};
  #proposal = {};

  constructor(cardData) {
    super();
    this.#cardData = cardData;
  }

  #getIdTabelaJuros() {
    for (const [key, value] of Object.entries(this.#cardData)) {
      if (key.includes('Tabelas')) {
        return parseInt(value.substring(0, 6), 10);
      }
    }
    return null;
  }

  #getIdEmpregador() {
    for (const [key, value] of Object.entries(this.#cardData)) {
      if (key.includes('EMPREGADOR')) {
        return parseInt(value.substring(0, 4), 10);
      }
    }
    return null;
  }

  #getIdProfissoes() {
    for (const [key, value] of Object.entries(this.#cardData)) {
      if (key.includes('PROFISSOES')) {
        return parseInt(value.substring(0, 6), 10);
      }
    }
    return null;
  }

  async #getRole() {
    const idProfissao = this.#getIdProfissoes();
    const role = await safra.getRole(idProfissao);
    return role[0].idCargo;
  }

  #getEmployeeSituation() {
    let situation = 1;

    for (const [key, value] of Object.entries(this.#cardData)) {
      if (key.includes('PROFISSOES')) {
        if (value.includes('APOSENTADO')) {
          situation = 2;
        } else if (value.includes('PENSIONISTA')) {
          situation = 3;
        }
      }
    }
    return situation;
  }

  #getEmploymentRelationship() {
    const employeeSituation = this.#getEmployeeSituation();
    switch (employeeSituation) {
      case 1:
        return 2;
      case 2:
        return 5;
      case 3:
        return 6;
      default:
        return 0;
    }
  }

  #dadosProposta() {
    return {
      aumentoMargem: false,
      idConvenio: parseInt(this.#cardData.Convenio.substring(2, 7), 10),
      idTabelaJuros: this.#getIdTabelaJuros(this.#cardData),
      valorParcela: super.convertStringToCurrency(this.#cardData.Valor_Parcela),
      prazo: parseInt(this.#cardData.Prazo, 10),
      valorPrincipal: super.convertStringToCurrency(this.#cardData.Valor_Principal),
      comSeguro: false,
      cpfAgenteCertificado: 9258565681,
      tipoFormalizacao: 6,
    };
  }

  async #dadosOcupacao() {
    return {
      idOrgaoEmpregador: this.#getIdEmpregador(), // TODO: mudar nome da funcao para ingles.
      idProfissao: this.#getIdProfissoes(),
      idCargo: await this.#getRole(),
      idRegimeJuridico: 2,
      idSituacaoEmpregado: this.#getEmployeeSituation(),
      idTipoVinculoEmpregaticio: this.#getEmploymentRelationship(),
      idTipoPagamentoBeneficio: 1,
      idUFBeneficio: 'SP',
      matricula: this.#cardData.Matricula,
      valorRenda: super.convertStringToCurrency(this.#cardData.Renda_Bruta),
      valorRendaLiquida: super.convertStringToCurrency(this.#cardData.Renda_Liquida),
      dataAdmissao: '2001-01-01',
    };
  }

  #dadosPessoais() {
    return {
      cpf: super.convertCpfToNumber(this.#cardData.CPF),
      nomeCompleto: this.#cardData.Nome_Completo,
      sexo: this.#cardData.Sexo.substring(0, 1),
      dataNascimento: super.convertDate(this.#cardData.Data_de_Nascimento),
      nomeMae: this.#cardData.Nome_da_Mae,
      email: this.#cardData.Email,
      alfabetizado: 'S',
    };
  }

  #contatos() {
    return [
      {
        ddd: parseInt(this.#cardData.Telefone.substring(4, 6), 10),
        telefone: this.#cardData.Telefone.substring(7, 17).replace('-', ''),
        email: this.#cardData.Email,
        whatsapp: true,
      },
    ];
  }

  #endereco() {
    return {
      cep: parseInt(this.#cardData.CEP, 10),
      logradouro: this.#cardData.Logradouro,
      numero: this.#cardData.Numero,
      complemento: this.#cardData.Complemento ? this.#cardData.Complemento : '',
      bairro: this.#cardData.Bairro,
      cidade: this.#cardData.Cidade,
      uf: this.#cardData.Uf,
    };
  }

  #dadosBancarios() {
    return {
      banco: parseInt(this.#cardData.Banco.match(/\d+/g)[0], 10),
      agencia: parseInt(this.#cardData.Agencia, 10),
      tipoConta: this.#cardData.Tipo_de_Conta.substring(0, 2),
      conta: this.#cardData.Numero_da_Conta,
    };
  }

  #dadosBancariosAverbacao() {
    return {
      bancoAverbacao: parseInt(this.#cardData.Banco.substring(2, 5), 10),
      agenciaAverbacao: parseInt(this.#cardData.Agencia, 10),
      contaAverbacao: this.#cardData.Numero_da_Conta,
    };
  }

  async createProposal() {
    this.#proposal.dadosProposta = this.#dadosProposta();
    this.#proposal.dadosOcupacao = await this.#dadosOcupacao();
    this.#proposal.dadosPessoais = this.#dadosPessoais();
    this.#proposal.contatos = this.#contatos();
    this.#proposal.endereco = this.#endereco();
    this.#proposal.dadosBancarios = this.#dadosBancarios();
    this.#proposal.dadosBancariosAverbacao = this.#dadosBancariosAverbacao();
    this.#proposal.submeter = true;
  }

  async sendProposal() {
    // eslint-disable-next-line no-return-await
    return await safra.sendProposal(this.#proposal);
  }

  async approveStop(proposalResponse) {
    const errorLittleStop = 'Houve um erro ao processar "Paradinha".';
    if (!proposalResponse.idProposta) {
      throw Error(`${errorLittleStop}`);
    }

    const response = await safra.sendApproveStop(proposalResponse.idProposta);
    if (response.dsRetorno !== 'OK') {
      throw Error(`${errorLittleStop} - ${response.dsRetorno}`);
    }
  }
}

module.exports = ProposalSafra;
