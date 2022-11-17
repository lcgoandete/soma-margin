const rescue = require('express-rescue');
const complementaryWithdrawalRoutes = require('express').Router();

const complementaryWithdrawal = require('./controllers/complementaryWithdrawal')

complementaryWithdrawalRoutes.post('/banks/bmg/complementary-withdrawal/card-limit', rescue(complementaryWithdrawal.getCardLimit));

module.exports = complementaryWithdrawalRoutes;