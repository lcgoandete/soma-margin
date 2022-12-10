import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { isValidTokenApi, setAuthenticationApi } from "../services/somaAPI";

export const useAuthentication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = async (credentials) => {
    setLoading(true);
    setErrorMessage('');
    const result = await setAuthenticationApi(credentials);
    
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      localStorage.setItem('user', JSON.stringify({ id: result.id, name: result.name, role: result.role }));
      localStorage.setItem('token', result.token);
      setAuthenticated(true);
      navigate('/');
    }
    setLoading(false);
  }

  const isValidToken = async () => {
    const result = await isValidTokenApi();

    if (result.validatedToken) {
      setAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  return {
    loading,
    errorMessage,
    authenticated,
    isValidToken,
    authenticate,
  };
};
