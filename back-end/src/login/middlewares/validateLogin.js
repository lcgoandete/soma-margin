const md5 = require('md5');
const yup = require('yup');

const { findUserByEmail } = require('../../user/models/user');
const { BadRequest, Unauthorized } = require('../../helpers/httpStatus');

const validateLogin = async (req, _res, next) => {
  const { email, password } = req.body;

  try {
    await validateFields(email, password);
    const user = await findUserByEmail(email);
    
    if (!user) {
      throw { status: Unauthorized, message: 'invalid email or password' };
    }

    if (md5(password) !== user.password) {
      throw { status: Unauthorized, message: 'invalid email or password' };
    }

    req.body.id = user.id;
    req.body.name = user.name;
    req.body.role = user.role;
    delete(req.body.password);
    next();
  } catch (error) {
    next(error);
  }
}

const validateFields = async (email, password) => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  });

  try {
    await schema.validate({ email, password });
  } catch (error) {
    throw { status: BadRequest, message: error.message };
  }
}

module.exports = {
  validateLogin,
};
