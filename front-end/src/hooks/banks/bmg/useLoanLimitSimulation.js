import { useState } from 'react';

import { getLoanLimitSimulationApi } from '../../../services/banks/bmg/bmgAPI';
import { validateLoanLimitSimulationPayload } from '../../../helpers/validate';

export const useLoanLimitSimulation = () => {
  const [loading, setLoading] = useState(false);

  const getLoanLimitSimulation = async (payload) => {
    const newPayload = validateLoanLimitSimulationPayload(payload);

    if (newPayload.errorMessage) {
       return newPayload;
    }
    
    setLoading(true);
    const result = await getLoanLimitSimulationApi(newPayload);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getLoanLimitSimulation,
  };
};
