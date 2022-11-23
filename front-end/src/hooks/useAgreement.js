import axios from 'axios';

const url = process.env.REACT_APP_URL;

const useAgreement = () => {
  const getAgremments = async (cpf) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${url}/banks/safra/agreement/${cpf}`,
      });
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  };
  return { getAgremments };
};

export default useAgreement;
