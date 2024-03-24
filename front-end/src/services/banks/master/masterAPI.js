import axios from 'axios';

const url = process.env.REACT_APP_SPRING_URL;
const TIMEOUT = 60000;

export const getLoanLimitSimulationApi = async (payload) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${url}/bank/master/LoanLimitSimulation/${payload.agreementId}/${payload.marginAmount}`,
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