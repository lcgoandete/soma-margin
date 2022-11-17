const users = require('../services/user');
const { Ok, Created} =require('../../helpers/httpStatus');

const createUser = async (req, res) => {
  const user = req.body;
  const result = await users.createUser(user);
  res.status(Ok).json(result);
}

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await users.getUserByEmail(email);
  res.status(Created).json(result);
}

module.exports = {
  createUser,
  getUserByEmail,
}
