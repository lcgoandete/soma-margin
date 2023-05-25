const margin = require('../models/margin');
const { delay } = require('../../helpers/helpers');
const { setMarginManager } = require('../../helpers/margin-db');

let isFree = true;

const getMargins = async (cpf) => {
  // eslint-disable-next-line no-await-in-loop
  while (!isFree) { await delay(3); }

  if (isFree) { isFree = false; }

  try {
    await setMarginManager('state');
    return await margin.getMargins(cpf);
  } finally {
    isFree = true;
  }
};

module.exports = {
  getMargins,
};
