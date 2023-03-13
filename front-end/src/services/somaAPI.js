import axios from 'axios';

const url = process.env.REACT_APP_URL;
const TIMEOUT = 15000;

export const setAuthenticationApi = async (credendials) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/login/`,
      data: credendials,
      timeout: TIMEOUT,
    });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}

export const getCardLimitApi = async (cpf) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/bmg/complementary-withdrawal/card-limit/`,
      headers: { Authorization: token },
      data: { cpf },
      timeout: TIMEOUT,
    });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}

export const getConsignedPortalMarginApi = async (queryType, cpf) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
        url: `${url}/${queryType}`,
        headers: { Authorization: token },
        data: { cpf },
        timeout: 40000,
      });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}

export const isValidTokenApi = async () => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
        url: `${url}/token/`,
        headers: { Authorization: token },
        timeout: TIMEOUT,
      });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}
