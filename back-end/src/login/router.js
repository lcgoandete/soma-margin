const rescue = require('express-rescue');
const loginRoutes = require('express').Router();

const login = require('./controllers/login')
const { validateLogin } = require('./middlewares/validateLogin');
const { validateToken, generateToken } = require('../middlewares/token');

loginRoutes.post('/login', validateLogin, generateToken, rescue(login.getLogin));
loginRoutes.get('/token', validateToken, rescue(login.isValidToken));

module.exports = loginRoutes;