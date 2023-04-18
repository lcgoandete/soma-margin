const rescue = require('express-rescue');
const pipefyRouter = require('express').Router();

const pipefy = require('./controllers/controller');

pipefyRouter.post('/pipefy/cards/moved', rescue(pipefy.getCardMoved));

module.exports = pipefyRouter;
