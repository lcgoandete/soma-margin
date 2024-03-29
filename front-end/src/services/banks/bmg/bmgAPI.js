import axios from 'axios';

const url = process.env.REACT_APP_URL;
const urlV2 = process.env.REACT_APP_SPRING_URL;
const TIMEOUT = 60000;

export const getProposalStatusApi = async (date) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${url}/banks/bmg/proposal-status?date=${date}`,
      headers: { Authorization: token },
      timeout: TIMEOUT,
    });
    return data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { errorMessage: `O tempo limite de espera ${TIMEOUT / 1000} segundos foi excedido.` };
    } else if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}

export const getWithdrawalLimitApi = async (payload) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/bmg/withdrawal-limit/`,
      headers: { Authorization: token },
      data: payload,
      timeout: TIMEOUT,
    });
    return data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { errorMessage: `O tempo limite de espera ${TIMEOUT / 1000} segundos foi excedido.` };
    } else if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}

export const getLoanLimitSimulationApi = async (payload) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${urlV2}/bank/bmg/LoanLimitSimulation`,
      data: payload,
      timeout: TIMEOUT,
    });
    return data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { errorMessage: 'Problemas ao tentar acessar o servidor' };
    }
    
    else if (error.code === 'ECONNABORTED') {
      return { errorMessage: `O tempo limite de espera ${TIMEOUT / 1000} segundos foi excedido.` };
    }
    
    else if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}

export const getWithdrawalLimitBenefitCardApi = async (payload) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${url}/banks/bmg/benefit-card-withdrawal-limit?dataNascimento=${payload.dataNascimento}&valorMargem=${payload.valorMargem}&codigoEntidade=${payload.codigoEntidade}&sequencialOrgao=${payload.sequencialOrgao}`,
      headers: { Authorization: token },
      timeout: TIMEOUT,
    });
    return data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { errorMessage: `O tempo limite de espera ${TIMEOUT / 1000} segundos foi excedido.` };
    } else if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}

export const registerProposalCardApi = async (payload) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/bmg/register-proposal-card/`,
      headers: { Authorization: token },
      data: payload,
      timeout: TIMEOUT,
    });
    return data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { errorMessage: `O tempo limite de espera ${TIMEOUT / 1000} segundos foi excedido.` };
    } else if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}
