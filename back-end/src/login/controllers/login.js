const login = require('../services/login');

const getLogin =  async (req, res) => {
  const { email, password } = req.body;
  const result = await login.getLogin({ email, password });
  return res.status(200).json(result);
}

module.exports = {
  getLogin,
}
