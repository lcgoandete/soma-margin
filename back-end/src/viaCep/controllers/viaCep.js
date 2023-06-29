const viaCep = require('../models/viaCep');
const { Ok } = require('../../helpers/httpStatus');

const getStreet = async (req, res) => {
  const { cep } = req.params;
  const result = await viaCep.getStreet(cep);
  res.status(Ok).json(result);
};

module.exports = {
  getStreet,
};
