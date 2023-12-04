import { useState } from 'react';

import { getChatAPI } from '../services/chatgptAPI';
import { object, string } from 'yup';

export const useChatgpt = () => {
  const [loading, setLoading] = useState(false);

  const checkPayload = async (payload) => {
    const schema = object().shape({
      margin: string().required().min(5),
      age: string().required().min(2),
      name: string().required().min(3),
      question: string().required().min(3),
    });
  
    try {
      return await schema.validate(payload);
    } catch (error) {
      return { errorMessage: `'${error.path}' ${error.message}` };
    }
  }

  const getChat = async (payload) => {
    setLoading(true);

    const isValidated = await checkPayload(payload);
    if (isValidated.errorMessage) {
      setLoading(false);
      return isValidated;
    }

    const newPayload = {
      ...payload,
      margin: parseFloat(payload.margin),
      age: parseInt(payload.age ,10)
    }

    const result = await getChatAPI(newPayload);
    setLoading(false);
    return result;
  };

  return {
    loading,
    getChat
  };
};
