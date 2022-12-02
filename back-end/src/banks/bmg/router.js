const rescue = require('express-rescue');
const complementaryWithdrawalRoutes = require('express').Router();

const { validateToken } = require('../../middlewares/token');
const { validateCpf } = require('../../middlewares/validate-cpf');
const complementaryWithdrawal = require('./controllers/complementaryWithdrawal')

complementaryWithdrawalRoutes.post('/banks/bmg/complementary-withdrawal/card-limit',
  validateCpf,
  validateToken,
  rescue(complementaryWithdrawal.getCardLimit)
);

module.exports = complementaryWithdrawalRoutes;