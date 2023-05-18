const { NotFound } = require('../../../helpers/httpStatus');
const safra = require('../models/safra');

const getAgreements = async (cpf) => {
  const agreements = await safra.getAgreements(cpf);

  if (!agreements || agreements.length === 0) {
    const newError = {
      status: NotFound,
      message: 'Contrato não encontrado.',
    };
    throw newError;
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
};

const phaseDescription = (formalizations) => {
  let phaseDescriptions = {};

  phaseDescriptions = formalizations.find((formalization) => formalization.descricaoFase.slice(0, 2) === '70');
  if (phaseDescriptions) {
    return {
      agreement: phaseDescriptions.idProposta,
      phaseDescriptions: 'Formalização concluída com sucesso',
    };
  }

  phaseDescriptions = formalizations.find((formalization) => formalization.descricaoFase.slice(0, 2) === '10');
  if (phaseDescriptions) {
    return {
      agreement: phaseDescriptions.idProposta,
      phaseDescriptions: 'Formalização iniciada e não concluída',
    };
  }

  phaseDescriptions = formalizations.find((formalization) => formalization.descricaoFase.slice(0, 2) === '00');
  if (phaseDescriptions) {
    return {
      agreement: phaseDescriptions.idProposta,
      phaseDescriptions: 'Formalização não iniciada',
      link: phaseDescriptions.descricaoFase.split('. ')[1],
    };
  }

  return {
    phaseDescriptions: 'Aguardando geração do link',
  };
};

const getFormalization = async (cpf) => {
  const agreements = await safra.getAgreements(cpf);
  const agreement = agreements.find((element) => (
    element.dsSituacaoContrato === 'ATIVO' && element.dsStatusContrato === 'Em Análise'));

  if (!agreement) {
    const newError = {
      status: NotFound,
      message: 'Contrato não encontrado.',
    };
    throw newError;
  }

  const idAgreement = parseInt(agreement.nrContrato, 10);
  const formalizations = await safra.getFormalization(idAgreement);

  const cpfCustomer = agreement.nrCpfCliente;
  const nameCustomer = agreement.nmCliente;
  const formalization = phaseDescription(formalizations);

  const result = { cpfCustomer, nameCustomer, ...formalization };
  return result;
};

const getFgtsBalance = async (cpf) => {
  const result = await safra.getFgtsBalance(cpf);
  return result;
};

const getSimulation = async (payload) => {
  const result = await safra.getSimulation(payload);
  return result;
};

const setSimulationSettings = async (taxaJuros) => {
  const result = await safra.setSimulationSettings(taxaJuros);
  return result;
};

const getSimulationSettings = async () => {
  const result = await safra.getSimulationSettings();
  return result;
};

const getMargin = async (payload) => {
  const result = await safra.getMargin(payload);
  return result;
};

module.exports = {
  getMargin,
  getSimulation,
  getAgreements,
  getFgtsBalance,
  getFormalization,
  setSimulationSettings,
  getSimulationSettings,
};
