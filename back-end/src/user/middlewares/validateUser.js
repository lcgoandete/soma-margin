const yup = require('yup');

const users = require('../models/user');
const { Conflict, BadRequest} = require('../../helpers/httpStatus');

const validateUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const schema = yup.object().shape({
    name: yup.string().required().min(4),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    role: yup.string().required().min(4),
  });

  try {
    await schema.validate({ name, email, password, role });
    await emailExist(email);
    await nameExist(name);
    next();
  } catch (error) {
    if (!error.status) {
      return res.status(BadRequest).json({ message: error.message });
    } else {
      return res.status(error.status).json({ message: error.message });
    }
  }
}

const emailExist = async (email) => {
  const result = await users.getUserByEmail(email);
  if (result) {
    throw { status: Conflict, message: 'this email is already registered' };
  }
}

const nameExist = async (name) => {
  const result = await users.getUserByName(name);
  if (result) {
    throw { status: Conflict, message: 'this name is already registered' };
  }
}

module.exports = {
  validateUser,
}
