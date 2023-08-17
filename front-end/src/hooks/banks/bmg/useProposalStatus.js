import { useState } from 'react';

import { getProposalStatusApi } from '../../../services/banks/bmg/bmgAPI';

export const useProposalStatus = () => {
  const [loading, setLoading] = useState(false);

  const getProposalStatusList = async (date) => {
    if (!date) return { errorMessage: 'Data inválida' };
    
    setLoading(true);
    const newDate = `${date}T00:00:00`;
    const result = await getProposalStatusApi(newDate);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getProposalStatusList,
  };
};
