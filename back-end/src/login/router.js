const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/token');
const loginRoutes = require('express').Router();

const login = require('./controllers/login')
const { validateLogin } = require('./middlewares/validateLogin');

loginRoutes.post('/login', validateLogin, rescue(login.getLogin));
loginRoutes.get('/token', validateToken, rescue(login.isValidToken));

module.exports = loginRoutes;