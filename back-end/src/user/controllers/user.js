const users = require('../models/user');
const { Ok, Created} =require('../../helpers/httpStatus');

const createUser = async (req, res) => {
  const user = req.body;
  await users.createUser(user);
  res.status(Created).json();
}

const findAllUsers = async (req, res) => {
  const { take, skip } = req.query;
  const result = await users.findAllUsers(parseInt(take), parseInt(skip));
  res.status(Ok).json(result);
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, active } = req.body;
  const userData = { id: parseInt(id), name, email, password, role, active };
  const result = await users.updateUser(userData);
  res.status(Ok).json(result);
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await users.deleteUser(parseInt(id));
  res.status(Ok).json(result);
}

module.exports = {
  createUser,
  findAllUsers,
  updateUser,
  deleteUser,
}
