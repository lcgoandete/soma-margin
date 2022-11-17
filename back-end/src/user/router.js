const rescue = require('express-rescue');
const userRoutes = require('express').Router();

const users = require('./controllers/user');
const { validateUser } = require('./middlewares/validateUser');

userRoutes.post('/users/register', validateUser, rescue(users.createUser));

module.exports = userRoutes;