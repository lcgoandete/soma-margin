const { Ok } = require('../../../helpers/httpStatus');
const withdrawalLimit = require('../services/withdrawal-limit');

const getWithdrawalLimit = async (req, res) => {
  const payload = req.body;
  const result = await withdrawalLimit.getWithdrawalLimit(payload);
  return res.status(Ok).json(result);
};

const getBenefitCardWithdrawalLimit = async (req, res) => {
  const payload = req.query;
  const result = await withdrawalLimit.getBenefitCardWithdrawalLimit(payload);
  return res.status(Ok).json(result);
};

module.exports = {
  getWithdrawalLimit,
  getBenefitCardWithdrawalLimit,
};
