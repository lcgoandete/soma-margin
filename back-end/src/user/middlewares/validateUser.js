const yup = require('yup');
const md5 = require('md5');

const users = require('../models/user');
const { Conflict, BadRequest} = require('../../helpers/httpStatus');

const validateUserFields = async (req, _res, next) => {
  const { name, email, password, role, active } = req.body;
  const user = { name, email, password, role, active };

  try {
    await validateFields(user);
    const formattedUser = formatData(user);
    validateRoles(formattedUser.role);
    validateActive(formattedUser.active);
    if (req.method !== 'PUT') await emailExist(formattedUser.email);
    if (req.method !== 'PUT') await nameExist(formattedUser.name);
    req.body = formattedUser;
    next();
  } catch (error) {
    next(error);
  }
}

const validateFields = async (user) => {
  const schema = yup.object().shape({
    name: yup.string().required().min(4),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    role: yup.string().required().min(4),
    active: yup.number().required(),
  });

  try {
    await schema.validate(user);
  } catch (error) {
    throw { status: BadRequest, message: error.message }
  }
}

const formatData = (user) => {
  const newUser = { ...user };
  newUser.name = user.name.toUpperCase();
  newUser.email = user.email.toLowerCase();
  newUser.password = md5(user.password);
  newUser.role = user.role.toUpperCase();
  newUser.active = user.active;
  return newUser;
}

const validateRoles = (role) => {
  const roleList = ['USER', 'ADMIN'];
  
  if (!roleList.includes(role)) {
    throw { status: BadRequest, message: 'Role does not exist' }
  }
}

const validateActive = (active) => {
  const activeList = [0, 1];
  
  if (!activeList.includes(active)) {
    throw { status: BadRequest, message: 'Active does not valid' }
  }
}

const emailExist = async (email) => {
  const result = await users.findUserByEmail(email);
  if (result) {
    throw { status: Conflict, message: 'This email is already registered' };
  }
}

const nameExist = async (name) => {
  const result = await users.findUserByName(name);
  if (result) {
    throw { status: Conflict, message: 'This name is already registered' };
  }
}

module.exports = {
  validateUserFields,
}
