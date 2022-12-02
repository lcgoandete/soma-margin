const rescue = require('express-rescue');
const portalConsignadoRoutes = require('express').Router();

const margin = require('./controllers/margin');
const { validateToken } = require('../middlewares/token');
const { validateCpf } = require('../middlewares/validate-cpf');

portalConsignadoRoutes.post('/margins/',
  validateCpf,
  validateToken,
  rescue(margin.getMargins)
);

module.exports = portalConsignadoRoutes;