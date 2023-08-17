const rescue = require('express-rescue');
const complementaryWithdrawalRoutes = require('express').Router();

const { validateToken } = require('../../middlewares/token');
const { validateCpf } = require('../../middlewares/validate-cpf');
const withdrawalLimit = require('./controllers/withdrawal-limit');
const complementaryWithdrawal = require('./controllers/complementaryWithdrawal');
const registerProposal = require('./controllers/register-proposal-card');
const proposalStatus = require('./controllers/proposal-status');

complementaryWithdrawalRoutes.post(
  '/banks/bmg/complementary-withdrawal/card-limit',
  validateCpf,
  validateToken,
  rescue(complementaryWithdrawal.getCardLimit),
);

complementaryWithdrawalRoutes.post(
  '/banks/bmg/withdrawal-limit',
  validateToken,
  rescue(withdrawalLimit.getWithdrawalLimit),
);

complementaryWithdrawalRoutes.post(
  '/banks/bmg/register-proposal-card',
  // validateToken,
  registerProposal.registerProposalCard,
);

complementaryWithdrawalRoutes.get(
  '/banks/bmg/proposal-status',
  validateToken,
  rescue(proposalStatus.getProposalStatus),
);

module.exports = complementaryWithdrawalRoutes;
