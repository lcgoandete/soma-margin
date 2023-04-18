const rescue = require('express-rescue');
const portalConsignadoMunicipioRoutes = require('express').Router();

const margin = require('./controllers/margin');
const { validateCpf } = require('../middlewares/validate-cpf');
const { validateToken } = require('../middlewares/token');

portalConsignadoMunicipioRoutes.post(
  '/municipio-margins/',
  validateCpf,
  validateToken,
  rescue(margin.getMargins),
);

module.exports = portalConsignadoMunicipioRoutes;
