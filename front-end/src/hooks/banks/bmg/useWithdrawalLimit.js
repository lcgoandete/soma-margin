import { useState } from 'react';

import { getWithdrawalLimitApi } from '../../../services/banks/bmg/bmgAPI';
import { validateWithdrawalPayload } from '../../../helpers/validate';

export const useWithdrawalLimit = () => {
  const [loading, setLoading] = useState(false);

  const getWithdrawalLimit = async (payload) => {
    const newPayload = validateWithdrawalPayload(payload);

    setLoading(true);
    const result = await getWithdrawalLimitApi(newPayload);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getWithdrawalLimit,
  };
};
