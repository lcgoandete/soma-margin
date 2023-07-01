const rescue = require('express-rescue');
const viaCepRoutes = require('express').Router();

const viaCep = require('./controllers/viaCep');
const { validateToken } = require('../middlewares/token');

viaCepRoutes.get(
  '/viacep/:cep',
  validateToken,
  rescue(viaCep.getStreet),
);

module.exports = viaCepRoutes;
