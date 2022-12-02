import { useState } from 'react';

import { getCardLimitApi } from '../services/somaAPI';

export const useCardLimit = () => {
  const [loading, setLoading] = useState(false);

  const getCardLimit = async (cpf) => {
    setLoading(true);
    const result = await getCardLimitApi(cpf);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getCardLimit
  };
};
