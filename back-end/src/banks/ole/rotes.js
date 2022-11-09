const rescue = require('express-rescue');
const oleRoutes = require('express').Router();

const ole = require('./controller/complementaryWithdrawal')

oleRoutes.post('/ole/complementary-withdrawal', rescue(ole.getComplementaryWithdrawal));

module.exports = oleRoutes;