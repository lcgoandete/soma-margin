const { Ok } = require('../../../helpers/httpStatus');
const ole = require('../services/complementaryWithdrawal');

const getComplementaryWithdrawal = async (req, res) => {
  const { cpf } = req.body;
  const result = await ole.getComplementaryWithdrawal(cpf);
  return res.status(Ok).json(result);
};

module.exports = {
  getComplementaryWithdrawal,
};
