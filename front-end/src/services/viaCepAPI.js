import axios from 'axios';

const url = process.env.REACT_APP_URL;
const TIMEOUT = 25000;

export const getStreetAPI = async (cep) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
        url: `${url}/viacep/${cep}`,
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
