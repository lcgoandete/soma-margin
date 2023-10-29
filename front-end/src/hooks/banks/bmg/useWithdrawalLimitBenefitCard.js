import { useState } from 'react';

import { getWithdrawalLimitBenefitCardApi } from '../../../services/banks/bmg/bmgAPI';
import { validateWithdrawalPayload } from '../../../helpers/validate';

export const useWithdrawalLimitBenefitCard = () => {
  const [loading, setLoading] = useState(false);

  const getWithdrawalLimitBenefitCard = async (payload) => {
    const newPayload = validateWithdrawalPayload(payload);

    setLoading(true);
    const result = await getWithdrawalLimitBenefitCardApi(newPayload);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getWithdrawalLimitBenefitCard,
  };
};
