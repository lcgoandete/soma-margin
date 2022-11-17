require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Unauthorized } = require('../helpers/httpStatus');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretword';

const generateToken = (userData) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const { email, name } = userData;
  const payload = { email, name };
  const token = jwt.sign(payload, TOKEN_SECRET, jwtConfig);
  return token;
};

const isValidToken = (authorization) => {
  if (!authorization) {
    throw { status: Unauthorized, message: 'Token not found' };
  }

  try {
    const { id: userId } = jwt.verify(authorization, TOKEN_SECRET);
    return userId;
  } catch (error) {
    throw { status: Unauthorized, message: 'Expired or invalid token' };
  }
};

module.exports = {
  generateToken,
  isValidToken,
};
