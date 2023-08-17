const proposal = require('../services/register-proposal-card');
const { Ok } = require('../../../helpers/httpStatus');

const registerProposalCard = (req, res) => {
  const cardMoved = req.body;
  proposal.registerProposalCard(cardMoved);
  return res.status(Ok).json({ message: 'OK' });
};

module.exports = {
  registerProposalCard,
};
