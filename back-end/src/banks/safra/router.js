const rescue = require('express-rescue');
const safraRoutes = require('express').Router();

const safra = require('./controllers/safra');
const { validateCpf } = require('./middlewares/validate');

safraRoutes.get('/banks/safra/agreement/:cpf', validateCpf, rescue(safra.getAgreements));
safraRoutes.get('/banks/safra/formalization/:cpf', validateCpf, rescue(safra.getFormalization));

module.exports = safraRoutes;