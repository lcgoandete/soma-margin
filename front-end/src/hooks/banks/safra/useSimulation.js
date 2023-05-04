import { useState } from 'react';

import { validateCpf, validateCurrency } from '../../../helpers/validate';
import { getSimulationApi } from '../../../services/banks/safra/safraAPI';
import { useSimulationSettings } from './useSimulationSettings';

export const useSimulation = () => {
  const [loading, setLoading] = useState(false);
  const { getSimulationSettings } = useSimulationSettings();

  const _getTaxaJuros = async () => {
    return await getSimulationSettings();
  }

  const _taxaJurosFiltered = async (idConvenio, simulations) => {
    const taxaJuros = await _getTaxaJuros();
    const { taxaJurosSefaz, taxaJurosPM, taxaJurosSpprev, taxaJurosPrefSP } = taxaJuros;
    const convenio = { sefaz: 50008, policiaMilitar: 50009, spprev: 50010, prefSP: 10110 };

    switch (idConvenio) {
      case convenio.sefaz:
        return simulations.filter((simulation) => simulation.taxaJuros >= taxaJurosSefaz);
      case convenio.policiaMilitar:
        return simulations.filter((simulation) => simulation.taxaJuros >= taxaJurosPM);
      case convenio.spprev:
        return simulations.filter((simulation) => simulation.taxaJuros >= taxaJurosSpprev);
      case convenio.prefSP:
        return simulations.filter((simulation) => simulation.taxaJuros >= taxaJurosPrefSP);
      default:
        return [];
    }
  }

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

    const { errorMessage, criticas, simulacoes } = result;
    if (errorMessage) {
      return { errorMessage: errorMessage };
    }

    if (simulacoes) {
      if (simulacoes.length > 0) {
        return await _taxaJurosFiltered(newPayload.idConvenio, result.simulacoes);
      }
    }

    if (criticas) {
      if (criticas.length > 0) {
        return { errorMessage: criticas[0] };
      }
    }
  };
  
  return {
    loading,
    getSimulation,
  };
};
