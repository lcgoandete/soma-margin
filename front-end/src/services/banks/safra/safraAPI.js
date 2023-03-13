import axios from 'axios';

const url = process.env.REACT_APP_URL;
const TIMEOUT = 15000;

export const getAgremmentsApi = async (cpf) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/agreement/`,
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

export const getFormalizationApi = async (cpf) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/formalization/`,
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

export const getFgtsBalanceApi = async (cpf) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/fgtsBalance`,
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

export const getSimulationApi = async (payload) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/simulation`,
      headers: { Authorization: token },
      data: { payload },
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

export const setSimulationSettingsApi = async (payload) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/safra/simulationSettings`,
      headers: { Authorization: token },
      data: payload,
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

export const getSimulationSettingsApi = async () => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${url}/banks/safra/simulationSettings`,
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
