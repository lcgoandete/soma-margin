require('dotenv').config();
const axios = require('axios');
const moment = require('moment');

const { SAFRA_API_URL, SAFRA_API_USERNAME, SAFRA_API_PASSWORD } = process.env;

const authentication = {
  accessToken: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQVBJQ0I0MzAzMTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDb3JyZXNwb25kZW50ZUFwaSIsIklkVXN1YXJpbyI6IjQzMDMxNCIsIklkQ29yYmFuIjoiMjU2MDEiLCJleHAiOjE2NjkxNDQzMDQsImlzcyI6InNhZnJhLmNvbS5iciIsImF1ZCI6InNhZnJhLmNvbS5iciJ9.a51lTG-pVoUUJBVnLybptbbRd9j34Bog5YvLU4oLzcOS16sND0Jya1H31Yx8GbP6LP0om3EvMxpwsefsJEe7kg",
  tokenLifeMinute: moment("210000", "HHmmss"),
};

const checkToken = async () => {
  const currentTime = moment();
  const duration = moment.duration(currentTime.diff(authentication.tokenLifeMinute));
  const durationInMinutes = parseInt((duration.hours() * 60) + duration.minutes());

  if (durationInMinutes > 28 || durationInMinutes < 0) {
    await getAccessToken();
  }  
}

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

const getFormalization = async (idProposta) => {
  const { data } = await axios({
    method: 'GET',
    url: `${SAFRA_API_URL}/AcompanhamentoFormalizacao?idProposta=${idProposta}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authentication.accessToken}`,
    },
  });
  return data;
}

module.exports = {
  getAgreements,
  getFormalization,
}
