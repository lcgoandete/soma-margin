const registerProposal = require('../services/register-proposal-card');
const { Ok } = require('../../../helpers/httpStatus');

const registerProposalCard = async (req, res) => {
  const payload = req.body;
  const result = await registerProposal.registerProposalCard(payload);
  return res.status(Ok).json(result);
};

module.exports = {
  registerProposalCard,
};
