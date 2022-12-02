import { useState } from 'react';

import { getAgremmentsApi } from '../services/somaAPI';

export const useAgreement = () => {
  const [loading, setLoading] = useState(false);
  
  const getAgremments = async (cpf) => {
    setLoading(true);
    const result = await getAgremmentsApi(cpf);
    setLoading(false);
    return result;
  };
  
  return {
    loading,
    getAgremments
  };
};
