import { useState } from 'react';

import { getLoanLimitSimulationApi } from '../../../services/banks/master/masterAPI';
import { validateCurrency } from '../../../helpers/validate';

export const useLoanLimitSimulation = () => {
  const [loading, setLoading] = useState(false);

  const validatePayload = (payload) => {
    if (!payload.agreementId) return { errorMessage: 'Convênio inválido' };
    if (!payload.marginAmount || payload.marginAmount < 50) return { errorMessage: 'Valor da margem inválido' };
  
    return {
      agreementId: payload.agreementId,
      marginAmount: validateCurrency(payload.marginAmount),
    }
  }

  const getLoanLimitSimulation = async (payload) => {
    const newPayload = validatePayload(payload);

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
