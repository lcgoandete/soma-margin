import axios from 'axios';

const url = process.env.REACT_APP_URL;

export const getAgremmentsApi = async (cpf) => {
  const token = sessionStorage.getItem('token');
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
  const token = sessionStorage.getItem('token');
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

export const getFgtsBalanceApi = async (cpf) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/fgtsBalance`,
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