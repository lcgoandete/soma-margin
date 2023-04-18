const users = require('../models/user');
const { NotFound } = require('../../helpers/httpStatus');

// eslint-disable-next-line consistent-return
const findUserById = async (req, res, next) => {
  let id = null;
  if (req.body.id) {
    id = req.body.id;
  } else if (req.params.id) {
    id = req.params.id;
  }

  const editUser = await users.findUserById(parseInt(id, 10));

  if (!editUser) {
    return res.status(NotFound).json({ message: 'User does not exist.' });
  }
  next();
};

module.exports = {
  findUserById,
};
