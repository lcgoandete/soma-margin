import axios from 'axios';

const url = process.env.REACT_APP_SPRING_URL;
const TIMEOUT = 20000;

export const getChatAPI = async (payload) => {
  try {
    const { data } = await axios({
      method: 'POST',
        url: `${url}/chat`,
        timeout: TIMEOUT,
        data: payload,
      });
    return data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { errorMessage: 'Não foi possível acessar o servidor' };
    }

    if (error.code === 'ECONNABORTED') {
      return { errorMessage: `O tempo limite de espera de ${TIMEOUT / 1000} segundos foi excedido.` };
    } else if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}
