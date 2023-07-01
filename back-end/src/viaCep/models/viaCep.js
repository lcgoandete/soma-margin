const axios = require('axios');

const getStreet = async (cep) => {
  const { data } = await axios({
    method: 'GET',
    url: `https://viacep.com.br/ws/${cep}/json/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

module.exports = {
  getStreet,
};
