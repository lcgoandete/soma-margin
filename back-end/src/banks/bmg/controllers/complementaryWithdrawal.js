const complementaryWithdrawal = require('../services/complementaryWithdrawal');

const getCardLimit = async (req, res) => {
  const { cpf } = req.body;
  const result = await complementaryWithdrawal.getCardLimit(cpf);
  return res.status(200).json(result);
};

module.exports = {
  getCardLimit,
};