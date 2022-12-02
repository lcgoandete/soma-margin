const login = require('../services/login');
const { Ok } = require('../../helpers/httpStatus');

const getLogin =  async (req, res) => {
  const { id, name, email, password } = req.body;
  const token = await login.getLogin({ name, email, password });
  const result = { id, name, token };
  return res.status(Ok).json(result);
}

const isValidToken =  async (_req, res) => {
  return res.status(Ok).json({ validatedToken: true });
}

module.exports = {
  getLogin,
  isValidToken,
}
