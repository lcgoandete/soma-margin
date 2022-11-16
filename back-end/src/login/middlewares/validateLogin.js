// const md5 = require('md5');
// const isValidEmail = require('./emailValidate');
// const { User } = require('../../../database/models');
// const isValidPassword = require('./passwordValidate');
// const { NotFound } = require('../../utils/httpStatus');

const validateLogin = (req, res, next) => {
  console.log('1validateloagin');
  
  if (!req.body) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }
  console.log('2validateloagin');
  next();
}

// const isValidUser = async (email, passwd) => {
//   const emailExists = await User.findOne({ where: { email } });
//   const password = md5(passwd);

//   if (!emailExists || password !== emailExists.dataValues.password) {
//     const error = { type: NotFound, message: 'invalid username or password' };
//     throw error;
//   } 
//   return emailExists;
// };

// const isValidLogin = async (user) => {
//   const { email, password } = user;
//   isValidEmail(email);
//   isValidPassword(password);
//   const userData = await isValidUser(email, password);
  
//   return userData;
// };

module.exports = {
  // isValidLogin,
  validateLogin,
};
