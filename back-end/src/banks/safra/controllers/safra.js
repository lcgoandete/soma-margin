const safra = require('../services/safra');
const { Ok } = require('../../../helpers/httpStatus');

const getAgreements = async (req, res) => {
  const { cpf } = req.body;
  const result = await safra.getAgreements(cpf);
  return res.status(Ok).json(result);
};

const getFormalization = async (req, res) => {
  const { cpf } = req.body;
  const result = await safra.getFormalization(cpf);
  return res.status(Ok).json(result);
};

const getFgtsBalance = async (req, res) => {
  const { cpf } = req.body;
  const result = await safra.getFgtsBalance(cpf);
  return res.status(Ok).json(result);
};

const getSimulation = async (req, res) => {
  const { payload } = req.body;
  const result = await safra.getSimulation(payload);
  return res.status(Ok).json(result);
};

const setSimulationSettings = async (req, res) => {
  const taxaJuros = req.body;
  const result = await safra.setSimulationSettings(taxaJuros);
  return res.status(Ok).json(result);
};

const getSimulationSettings = async (req, res) => {
  const result = await safra.getSimulationSettings();
  return res.status(Ok).json(result);
};

const getMargin = async (req, res) => {
  const payload = req.body;
  const result = await safra.getMargin(payload);
  return res.status(Ok).json(result);
};

module.exports = {
  getMargin,
  getAgreements,
  getSimulation,
  getFgtsBalance,
  getFormalization,
  setSimulationSettings,
  getSimulationSettings,
};
