require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Unauthorized } = require('../helpers/httpStatus');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretword';

const generateToken = (userData) => {
  const jwtConfig = { expiresIn: '12h', algorithm: 'HS256' };

  const { name, email } = userData;
  const payload = { name, email };
  const token = jwt.sign(payload, TOKEN_SECRET, jwtConfig);
  return token;
};

const validateToken = (req, _res, next) => {
  const authorization = req.header('Authorization');
  
  if (!authorization) {
    throw { status: Unauthorized, message: 'Token not found' };
  }
  
  try {
    const decoded = jwt.verify(authorization, TOKEN_SECRET);
    next();
  } catch (error) {
    throw { status: Unauthorized, message: 'Expired or invalid token' };
  }
};

module.exports = {
  generateToken,
  validateToken,
};
