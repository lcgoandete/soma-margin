const rescue = require('express-rescue');
const safraRoutes = require('express').Router();

// const safra = require('./controllers/safra');

safraRoutes.post('/banks/safra/', rescue((req, res) => res.status(200).json({teste: 'teste'})));

module.exports = safraRoutes;