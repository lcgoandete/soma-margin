const { Ok } = require('../../helpers/httpStatus');
const pipefy = require('../services/service');

const getCardMoved = async (req, res) => {
  const { data } = req.body;
  pipefy.getCardMoved(data);
  return res.status(Ok).json({ message: 'OK' });
};

module.exports = {
  getCardMoved,
};
