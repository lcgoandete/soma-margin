import { useState } from 'react';

import { validateTaxaJuros } from '../../../helpers/validate';
import { getSimulationSettingsApi, setSimulationSettingsApi } from '../../../services/banks/safra/safraAPI';

export const useSimulationSettings = () => {
  const [loading, setLoading] = useState(false);

  const setSimulationSettings = async (taxaJuros) => {
    try {
      const newTaxaJuros = validateTaxaJuros(taxaJuros);

      setLoading(true);
      const result = await setSimulationSettingsApi(newTaxaJuros);
      setLoading(false);

      if (result.errorMessage) {
        return { errorMessage: result.errorMessage };
      }
      return result;
    } catch (error) {
      return { errorMessage: error };
    }
  };

  const getSimulationSettings = async () => {
    const result = await getSimulationSettingsApi();
    return result;
  }

  return {
    loading,
    setSimulationSettings,
    getSimulationSettings,
  };
};
