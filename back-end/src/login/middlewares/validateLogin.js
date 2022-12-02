// const isValidEmail = require('./emailValidate');
// const { User } = require('../../../database/models');
// const isValidPassword = require('./passwordValidate');

const md5 = require('md5');
const yup = require('yup');
const { getUserByEmail } = require('../../user/models/user');
const { BadRequest, InternalServerError, Unauthorized } = require('../../helpers/httpStatus');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  });

  try {
    await schema.validate({ email, password });
    const user = await getUserByEmail(email);
    
    if (!user || !user.length) {
      return res.status(Unauthorized).json({
        message: 'invalid email or password',
      });
    }
    
    const hashPassword = md5(password);
    if (hashPassword !== user[0].password) {
      return res.status(Unauthorized).json({
        message: 'invalid email or password',
      });
    }
    req.body.id = user.id;
    req.body.name = user.name;
    next();
  } catch (error) {
    if (error.name){
      if (error.name === 'ValidationError') {
        return res.status(BadRequest).json({ message: error.message });
      }
    }
    return res.status(InternalServerError).json({ message: error.message });
  }
}

module.exports = {
  validateLogin,
};
