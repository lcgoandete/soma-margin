import axios from 'axios';

const url = process.env.REACT_APP_URL;

const useCardLimit = () => {
  const cardLimitApi = async (cpf) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${url}/bmg/complementary-withdrawal/card-limit`,
        data: { cpf },
      });
      return response.data;
    } catch (error) {
      if(error.response.data.message) {
        return { message: error.response.data.message };
      } else {
        return { message: `Houve um erro inesperado "${error.response.statusText}"` };
      }
    }
  };
  return { cardLimitApi };
};

export default useCardLimit;
