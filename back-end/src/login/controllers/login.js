const { Ok } = require('../../helpers/httpStatus');

const getLogin =  async (req, res) => {
  const { id, name, role } = req.body;
  const { authorization } = req.header;
  const result = { id, name, role, token: authorization };
  return res.status(Ok).json(result);
}

const isValidToken =  async (_req, res) => {
  return res.status(Ok).json({ validatedToken: true });
}

module.exports = {
  getLogin,
  isValidToken,
}
