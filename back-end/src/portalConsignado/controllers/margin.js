const margin = require('../services/margin');
const { Ok } = require('../../helpers/httpStatus');

const getMargins = async (req, res) => {
  const { cpf } = req.body;
  const result = await margin.getMargins(cpf);
  return res.status(Ok).json(result);
};

module.exports = {
  getMargins,
};
