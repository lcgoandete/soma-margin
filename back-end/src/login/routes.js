const rescue = require('express-rescue');
const loginRoutes = require('express').Router();

const login = require('./controllers/login')
const { validateLogin } = require('./middlewares/validateLogin');

loginRoutes.post('/login', validateLogin, rescue(login.getLogin));

module.exports = loginRoutes;