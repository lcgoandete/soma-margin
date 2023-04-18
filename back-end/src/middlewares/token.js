require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Unauthorized } = require('../helpers/httpStatus');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretword';

const generateToken = (req, _res, next) => {
  const { id, name, role } = req.body;
  const payload = { id, name, role };

  const jwtConfig = { expiresIn: '12h', algorithm: 'HS256' };
  const token = jwt.sign(payload, TOKEN_SECRET, jwtConfig);
  req.header.authorization = token;
  next();
};

const validateToken = (req, _res, next) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    const newError = { status: Unauthorized, message: 'Token not found' };
    throw newError;
  }

  try {
    const decoded = jwt.verify(authorization, TOKEN_SECRET);
    req.params.role = decoded.role;
    next();
  } catch (error) {
    const newError = { status: Unauthorized, message: 'Expired or invalid token' };
    throw newError;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
