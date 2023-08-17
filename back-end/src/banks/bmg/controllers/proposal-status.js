const { Ok } = require('../../../helpers/httpStatus');
const proposalStatus = require('../services/proposal-status');

const getProposalStatus = async (_req, res) => {
  const result = await proposalStatus.getProposalStatus();
  return res.status(Ok).json(result);
};

module.exports = {
  getProposalStatus,
};
