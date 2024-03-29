import { useState } from 'react';

import { getFormalizationApi } from '../../../services/banks/safra/safraAPI';

export const useFormalization = () => {
  const [loading, setLoading] = useState(false);

  const getFormalization = async (cpf) => {
    setLoading(true);
    const result = await getFormalizationApi(cpf);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getFormalization
  };
};
