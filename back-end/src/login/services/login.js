const { generateToken } = require('../../middlewares/token');

const getLogin = async (credentials) => {
  const token = generateToken(credentials);
  return token;
};

module.exports = {
  getLogin,
};