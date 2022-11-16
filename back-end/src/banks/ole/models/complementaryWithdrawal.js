require('dotenv').config();
const axios = require('axios');

const url = process.env.OLE_URL;

const getAccessToken = async () => {
  const response = await axios({
    method: 'POST',
    url: `${url}/opensegurancaapi/v1/auth`,
    headers: {
      'Content-Type': 'application/json',
      'x-ole-auth-key': process.env.OLE_AUTH_KEY,
      'x-developer-application-key': process.env.OLE_DEVELOPER_APPLICATION_KEY,
    },
  });
  return response.headers['access-token'];
}

const getComplementaryWithdrawal = async (cpf) => {
  const result = await `result - ${cpf}`;
  return result;
}

module.exports = {
  getAccessToken,
  getComplementaryWithdrawal,
};