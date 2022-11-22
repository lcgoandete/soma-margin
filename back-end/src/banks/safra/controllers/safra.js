const safra = require('../services/safra');
const { Ok } = require('../../../helpers/httpStatus');

const getAgreements = async (req, res) => {
  const cpf = req.params.cpf;
  const result = await safra.getAgreements(cpf);
  return res.status(Ok).json(result);
}

const getFormalization = async (req, res) => {
  const cpf = req.params.cpf;
  const result = await safra.getFormalization(cpf);
  return res.status(Ok).json(result);
}

module.exports = {
  getAgreements,
  getFormalization,
}
