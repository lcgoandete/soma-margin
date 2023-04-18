import { useState } from 'react';

import { deleteUsersApi, editUsersApi, getUsersApi, getUsersByNameApi, registerUsersApi } from '../services/usersAPI';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  
  const getUsers = async (name, take, skip) => {
    setLoading(true);
    let result = [];

    if(name) {
      result = await getUsersByNameApi(name.trim(), take, skip);
    } else {
      result = await getUsersApi(take, skip);
    }

    setLoading(false);
    return result;
  };

  const deleteUsers = async (id) => {
    setLoading(true);
    const result = await deleteUsersApi(id);
    setLoading(false);
    return result;
  };

  const editUsers = async (user) => {
    if (typeof(user.active) === 'boolean') {
      if (user.active) {
        user.active = 1;
      } else {
        user.active = 0;
      }
    }
    setLoading(true);
    const result = await editUsersApi(user);
    setLoading(false);
    return result;
  };

  const registerUsers = async (user) => {
    setLoading(true);
    const result = await registerUsersApi(user);
    setLoading(false);
    return result;
  };
  
  return {
    loading,
    getUsers,
    deleteUsers,
    editUsers,
    registerUsers,
  };
};
