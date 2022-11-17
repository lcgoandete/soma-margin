const md5 = require('md5');

const users = require('../models/user');
const { generateToken } = require('../../middlewares/token');

const createUser = async (user) => {
  const hashPassword = md5(user.password);
  const newUser = { ...user, password: hashPassword };
  await users.createUser(newUser);
  const token = generateToken(user);
  const result = {
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  }
  return result;
}

module.exports = {
  createUser,
}
