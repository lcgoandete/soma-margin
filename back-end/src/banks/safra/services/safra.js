const safra = require('../models/safra');

const getAgreements = async (cpf) => {
  const agreements = await safra.getAgreements(cpf);
  
  if (!agreements || agreements.length === 0) {
    throw {
      status: 404,
      message: 'Contrato não encontrado.'
    }
  }
  
  const result = agreements.map((agreement) => ({
      cpf: agreement.nrCpfCliente,
      agreement: agreement.nrContrato,
      name: agreement.nmCliente,
      dateTime: agreement.dtHoraInclusao,
      status: agreement.dsStatusContrato,
      situation: agreement.dsSituacaoContrato,
  }));
  return result;
}

const phaseDescription = (formalizations) => {
  let phaseDescription = {};

  phaseDescription = formalizations.find((formalization) => formalization.descricaoFase.slice(0, 2) === '70');
  if (phaseDescription) {
    return {
      agreement: phaseDescription.idProposta,
      phaseDescription: 'Formalização concluída com sucesso',
    }
  }

  phaseDescription = formalizations.find((formalization) => formalization.descricaoFase.slice(0, 2) === '10');
  if (phaseDescription) {
    return {
      agreement: phaseDescription.idProposta,
      phaseDescription: 'Formalização iniciada e não concluída',
    }
  }

  phaseDescription = formalizations.find((formalization) => formalization.descricaoFase.slice(0, 2) === '00');
  if (phaseDescription) {
    return {
      agreement: phaseDescription.idProposta,
      phaseDescription: 'Formalização não iniciada',
      link: phaseDescription.descricaoFase.split('. ')[1],
    }
  }

  return {
    phaseDescription: 'Aguardando geração do link',
  }
}

const getFormalization = async (cpf) => {
  const agreements = await safra.getAgreements(cpf);
  const agreement = agreements.find((agreement) => (
    agreement.dsSituacaoContrato === 'ATIVO' &&
    agreement.dsStatusContrato === 'Em Análise')
  );
  
  if (!agreement) {
    throw {
      status: 404,
      message: 'Contrato não encontrado.'
    }
  }

  const idAgreement = parseInt(agreement.nrContrato);
  const formalizations = await safra.getFormalization(idAgreement);
  const result = phaseDescription(formalizations);
  return result;
}

module.exports = {
  getAgreements,
  getFormalization,
}
