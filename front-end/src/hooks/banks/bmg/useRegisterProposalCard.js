import { useState } from 'react';
import { object, string, date, number } from 'yup';

import { registerProposalCardApi } from '../../../services/banks/bmg/bmgAPI';

export const useRegisterProposalCard = () => {
  const [loading, setLoading] = useState(false);

  const checkPayload = async (payload) => {
    const schema = object().shape({
      clienteCpf: string().required().min(14),
      email: string().required().email(),
      grauInstrucao: number().required(),
      nacionalidade: string().required().min(3),
      ufNascimento: string().required().min(2).max(2),
      cidadeNascimento: string().required().min(3),
      estadoCivil: string().required().min(1).max(1),
      dataNascimento: date().required(),
      nomePai: string().required().min(3),
      nomeMae: string().required().min(3),
      sexo: string().required().min(1).max(1),
      nome: string().required().min(3),
    });
  
    try {
      await schema.validate(payload);
    } catch (error) {
      return { errorMessage: `"${error.path}" ${error.message}` };
    }
  }

  const registerProposalCard = async (payload) => {
    setLoading(true);
    
    const isValidated = await checkPayload(payload);
    if (isValidated.errorMessage) {
      setLoading(false);
      return isValidated;
    }

    const result = await registerProposalCardApi(payload);
    setLoading(false);
    return result;
  };

  return {
    loading,
    registerProposalCard,
  };
};
