const margin = require('../model/margin');
const { setMarginManager } = require('../../helpers/margin-db');

let isFree = true;

const delay = (seconds) => {
  return new Promise(function(resolve){
      setTimeout(resolve, seconds * 1000);
  });
}

const getMargins = async (cpf) => {
  while (!isFree) { await delay(3); }
  
  if (isFree) { isFree = false; }
  
  await setMarginManager('state');

  try {
    // await delay(3);
    return margin.getMargins(cpf);
  } finally {
    isFree = true;
  }
};

module.exports = {
  getMargins,
};
