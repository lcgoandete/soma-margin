const ole = require('../model/complementaryWithdrawal');

const getAccessToken = async () => {
  const accessToken = await ole.getAccessToken();
  return accessToken;
}

const getComplementaryWithdrawal = async (cpf) => {
  const accessToken = getAccessToken();
  const result = await ole.getComplementaryWithdrawal(accessToken, cpf);
  return result;
}

module.exports = {
  getComplementaryWithdrawal
};
