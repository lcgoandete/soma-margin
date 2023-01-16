const safra = require('../services/safra');
const { Ok } = require('../../../helpers/httpStatus');

const getAgreements = async (req, res) => {
  const { cpf } = req.body;
  const result = await safra.getAgreements(cpf);
  return res.status(Ok).json(result);
}

const getFormalization = async (req, res) => {
  const { cpf } = req.body;
  const result = await safra.getFormalization(cpf);
  return res.status(Ok).json(result);
}

const getFgtsBalance = async (req, res) => {
  const { cpf } = req.body;
  const result = await safra.getFgtsBalance(cpf);
  return res.status(Ok).json(result);
}

module.exports = {
  getAgreements,
  getFormalization,
  getFgtsBalance,
}
