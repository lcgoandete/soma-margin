const withdrawalLimit = require('../services/withdrawal-limit');
const { Ok } = require('../../../helpers/httpStatus');

const getWithdrawalLimit = async (req, res) => {
  const payload = req.body;
  const result = await withdrawalLimit.getWithdrawalLimit(payload);
  return res.status(Ok).json(result);
};

module.exports = {
  getWithdrawalLimit,
};
