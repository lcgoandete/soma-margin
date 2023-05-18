import { useState } from 'react';

import { validateCpf } from '../../../helpers/validate';
import { getMarginsApi } from '../../../services/banks/safra/safraAPI';

export const useMargin = () => {
  const [loading, setLoading] = useState(false);

  const getMargin = async (payload) => {
    if (!payload.convenio) return { errorMessage: 'Convênio inválido' };

    if (!payload.idProduto) return { errorMessage: 'ID Produto inválido' };
    
    const validatedCpf = validateCpf(payload.cpf);
    if (validatedCpf.errorMessage) return { errorMessage: validatedCpf.errorMessage };
    
    if (!payload.matricula) return { errorMessage: 'Matrícula inválida' };
    
    setLoading(true);
    const result = await getMarginsApi(payload);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getMargin,
  };
};
