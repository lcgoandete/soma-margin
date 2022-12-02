import { useState } from 'react';

import { getConsignedPortalMarginApi } from '../services/somaAPI';

export const useConsignedPortal = () => {
  const [loading, setLoading] = useState(false);

  const getMargin = async (queryType, cpf) => {
    setLoading(true);
    const result = await getConsignedPortalMarginApi(queryType, cpf);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getMargin
  };
};
