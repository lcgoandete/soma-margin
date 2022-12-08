import axios from 'axios';

const url = process.env.REACT_APP_URL;

export const setAuthentication = async (credendials) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/login/`,
      data: credendials,
    });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getAgremmentsApi = async (cpf) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/agreement/`,
      headers: { Authorization: token },
      data: { cpf }
    });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getFormalizationApi = async (cpf) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/formalization/`,
      headers: { Authorization: token },
      data: { cpf }
    });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getCardLimitApi = async (cpf) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/bmg/complementary-withdrawal/card-limit/`,
      headers: { Authorization: token },
      data: { cpf },
    });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getConsignedPortalMarginApi = async (queryType, cpf) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
        url: `${url}/${queryType}`,
        headers: { Authorization: token },
        data: { cpf },
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const isValidTokenApi = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
        url: `${url}/token/`,
        headers: { Authorization: token },
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}