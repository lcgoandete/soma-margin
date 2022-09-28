const rescue = require('express-rescue');
const complementaryWithdrawalRoutes = require('express').Router();

const complementaryWithdrawal = require('./controller/complementaryWithdrawal')

complementaryWithdrawalRoutes.post('/bmg/complementary-withdrawal/card-limit', rescue(complementaryWithdrawal.getCardLimit));

module.exports = complementaryWithdrawalRoutes;