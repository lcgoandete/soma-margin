import { useState } from 'react';

import { getWithdralwalLimitApi } from '../../../services/banks/bmg/bmgAPI';
import { validateCurrency } from '../../../helpers/validate';

export const useWithdralwalLimit = () => {
  const [loading, setLoading] = useState(false);

  const getWithdralwalLimit = async (payload) => {
    if (!payload.convenio) return { errorMessage: 'Convênio inválido' };
    if (!payload.dataNascimento) return { errorMessage: 'Data de nascimento inválida' };
    if (!payload.valorMargem) return { errorMessage: 'Valor da margem inválido' };
    
    const newPayload = {
      codigoEntidade: payload.convenio,
      sequencialOrgao: payload.convenio === '128' ? 13 : 1,
      valorMargem: validateCurrency(payload.valorMargem),
      dataNascimento: `${payload.dataNascimento}T00:00:00`,
    }
    
    setLoading(true);
    const result = await getWithdralwalLimitApi(newPayload);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getWithdralwalLimit,
  };
};
