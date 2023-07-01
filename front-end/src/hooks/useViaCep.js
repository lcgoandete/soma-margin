import { useState } from 'react';

import { getStreetAPI } from '../services/viaCepAPI';

export const useViaCep = () => {
  const [loading, setLoading] = useState(false);

  const getStreet = async (cep) => {
    setLoading(true);
    const result = await getStreetAPI(cep);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getStreet
  };
};
