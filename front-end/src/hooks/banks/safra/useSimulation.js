import { useState } from 'react';

import { validateCpf, validateCurrency } from '../../../helpers/validate';
import { getSimulationApi } from '../../../services/banks/safra/safraAPI';

export const useSimulation = () => {
  const [loading, setLoading] = useState(false);

  const getSimulation = async (payload) => {
    const validatedCpf = validateCpf(payload.cpf);
    if (validatedCpf.errorMessage) {
      return { errorMessage: validatedCpf.errorMessage };
    }

    if (!payload.idConvenio) {
      return { errorMessage: 'Convênio inválido' }
    }

    const newPayload = {
      ...payload,
      idConvenio: parseInt(payload.idConvenio),
      cpf: validatedCpf,
      prazo: (payload.prazo === '') ? 0 : parseInt(payload.prazo),
      valorPrincipal: validateCurrency(payload.valorPrincipal),
      valorParcela: validateCurrency(payload.valorParcela),
      valorRenda: validateCurrency(payload.valorRenda),
      valorDescontos: validateCurrency(payload.valorDescontos),
     }
    
    setLoading(true);
    const result = await getSimulationApi(newPayload);
    setLoading(false);  

    if (result.errorMessage) {
      return { errorMessage: result.errorMessage };
    }

    if (result.criticas) {
      if (result.criticas.length > 0) {
        return { errorMessage: result.criticas[0] };
      }
    }
    
    if (result.simulacoes) {
      if (result.simulacoes.length > 0) {
        const simulations = result.simulacoes.filter((simulation) => simulation.taxaJuros > 2.0);
        return simulations;
      }
    }
  };
  
  return {
    loading,
    getSimulation,
  };
};
