const users = require("../models/user");
const { NotFound } = require("../../helpers/httpStatus");

const findUserById = async (req, res, next) => {
  let id = null;
  if (req.body.id) {
    id = req.body.id;
  } else if (req.params.id) {
    id = req.params.id;
  }

  const editUser = await users.findUserById(parseInt(id));

  if (!editUser) {
    return res.status(NotFound).json({ message: 'User does not exist.' });
  }
  next();
}

module.exports = {
  findUserById,
};
