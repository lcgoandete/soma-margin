import { useState } from 'react';

import { deleteUsersApi, editUsersApi, getUsersApi } from '../services/somaAPI';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  
  const getUsers = async (take, skip) => {
    setLoading(true);
    const result = await getUsersApi(take, skip);
    setLoading(false);
    return result;
  };

  const deleteUsers = async (userId) => {
    setLoading(true);
    const result = await deleteUsersApi(userId);
    setLoading(false);
    return result;
  };

  const editUsers = async (user) => {
    setLoading(true);
    const result = await editUsersApi(user);
    setLoading(false);
    return result;
  };
  
  return {
    loading,
    getUsers,
    deleteUsers,
    editUsers,
  };
};
