const users = require("../models/user");
const { NotFound } = require("../../helpers/httpStatus");

const findUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await users.findUserById(parseInt(id));

  if (!user) {
    return res.status(NotFound).json({ message: 'User does not exist.' });
  }
  next();
}

module.exports = {
  findUserById,
};
