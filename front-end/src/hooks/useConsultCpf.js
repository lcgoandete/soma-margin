import axios from 'axios';

const url = process.env.REACT_APP_URL;

const useConsultCpf = () => {
  const consultCpfApi = async (queryType, cpf) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${url}/${queryType}`,
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
  return { consultCpfApi };
};

export default useConsultCpf;
