const margin = require('../services/margin');

const getMargins = async (req, res) => {
  const { cpf } = req.body;
  const result = await margin.getMargins(cpf);
  return res.status(200).json(result);
};

module.exports = {
  getMargins,
};
