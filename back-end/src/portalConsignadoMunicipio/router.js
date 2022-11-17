const rescue = require('express-rescue');
const portalConsignadoMunicipioRoutes = require('express').Router();

const margin = require('./controllers/margin')

portalConsignadoMunicipioRoutes.post('/municipio-margins/', rescue(margin.getMargins));

module.exports = portalConsignadoMunicipioRoutes;