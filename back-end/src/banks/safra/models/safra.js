require('dotenv').config();
const axios = require('axios');
const moment = require('moment');

const { SAFRA_API_URL, SAFRA_API_USERNAME, SAFRA_API_PASSWORD } = process.env;

const authentication = {
  accessToken: "",
  tokenLifeMinute: moment("210000", "HHmmss"),
};

const getAccessToken = async () => {
  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/Token`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: `${SAFRA_API_USERNAME}`,
      password: `${SAFRA_API_PASSWORD}`,
    }
  });
  authentication.accessToken = data.token;
  authentication.tokenLifeMinute = moment();
}

const checkToken = async () => {
  const currentTime = moment();
  const duration = moment.duration(currentTime.diff(authentication.tokenLifeMinute));
  const durationInMinutes = parseInt((duration.hours() * 60) + duration.minutes());

  if (durationInMinutes > 28 || durationInMinutes < 0) {
    await getAccessToken();
  }  
}

const getAgreements = async (cpf) => {
  await checkToken();
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/ContratosDadosCadastrais/cpf/${cpf}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
}

const getFormalization = async (idAgreement) => {
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/AcompanhamentoFormalizacao?idProposta=${idAgreement}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
}

const getFgtsBalance = async (cpf) => {
  await checkToken();
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/Fgts?idCliente=${cpf}&tpProduto=2`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
}

const getSimulation = async (payload) => {
  await checkToken();
  const { data } = await axios({
    method: 'POST',
    url: `${SAFRA_API_URL}/Calculo/Novo`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authentication.accessToken}`,
    },
    data: payload,
  });
  return data;
}

module.exports = {
  getAgreements,
  getFormalization,
  getFgtsBalance,
  getSimulation,
}
