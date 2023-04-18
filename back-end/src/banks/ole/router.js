const rescue = require('express-rescue');
const oleRoutes = require('express').Router();

const ole = require('./controllers/complementaryWithdrawal');
const { validateToken } = require('../../middlewares/token');
const { validateCpf } = require('../../middlewares/validate-cpf');

oleRoutes.post('/banks/ole/complementary-withdrawal', rescue(
  validateCpf,
  validateToken,
  ole.getComplementaryWithdrawal,
));

module.exports = oleRoutes;
