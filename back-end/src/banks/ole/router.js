const rescue = require('express-rescue');
const oleRoutes = require('express').Router();

const ole = require('./controllers/complementaryWithdrawal')

oleRoutes.post('/banks/ole/complementary-withdrawal', rescue(ole.getComplementaryWithdrawal));

module.exports = oleRoutes;