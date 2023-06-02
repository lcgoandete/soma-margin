import axios from 'axios';

const url = process.env.REACT_APP_URL;
const TIMEOUT = 20000;

export const getWithdralwalLimitApi = async (payload) => {
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
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    }
    return { errorMessage: error.message };
  }
}
