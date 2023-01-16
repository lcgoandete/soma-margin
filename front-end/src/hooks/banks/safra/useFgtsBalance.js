import { useState } from 'react';

import { getFgtsBalanceApi } from '../../../services/banks/safra/safraAPI';

export const useFgtsBalance = () => {
  const [loading, setLoading] = useState(false);
  
  const getFgtsBalance = async (cpf) => {
    setLoading(true);
    const result = await getFgtsBalanceApi(cpf);
    setLoading(false);
    return result;
  };
  
  return {
    loading,
    getFgtsBalance
  };
};
