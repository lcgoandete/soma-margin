const rescue = require('express-rescue');
const portalConsignadoApiRoutes = require('express').Router();

const margin = require('./controllers/margin');
const { validateToken } = require('../middlewares/token');
const { validateCpf } = require('../middlewares/validate-cpf');

portalConsignadoApiRoutes.post(
  '/marginsApi/',
  validateCpf,
  validateToken,
  rescue(margin.getMargins),
);

module.exports = portalConsignadoApiRoutes;
