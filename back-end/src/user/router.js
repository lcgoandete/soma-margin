const rescue = require('express-rescue');
const userRoutes = require('express').Router();

const users = require('./controllers/user');
const { private } = require('../middlewares/private');
const { validateToken } = require('../middlewares/token');
const { findUserById } = require('./middlewares/checkUser');
const { validateUserFields } = require('./middlewares/validateUser');

userRoutes.post('/users/',
  validateToken,
  private,
  validateUserFields,
  rescue(users.createUser)
);
userRoutes.get('/users/',
  validateToken,
  private,
  rescue(users.findAllUsers)
);
userRoutes.get('/users/name',
  validateToken,
  private,
  rescue(users.findUsersByName)
);
userRoutes.put('/users/',
  validateToken,
  private,
  validateUserFields,
  findUserById,
  rescue(users.updateUser)
);
userRoutes.delete('/users/:id',
  validateToken,
  private,
  findUserById,
  rescue(users.deleteUser)
);

module.exports = userRoutes;