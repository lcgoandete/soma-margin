const rescue = require('express-rescue');
const portalConsignadoRoutes = require('express').Router();

const margin = require('./controllers/margin')

portalConsignadoRoutes.post('/margins/', rescue(margin.getMargins));

module.exports = portalConsignadoRoutes;