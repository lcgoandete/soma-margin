import axios from 'axios';

const url = process.env.REACT_APP_URL;
const TIMEOUT = 15000;

export const getUsersApi = async (take, skip) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
        url: `${url}/users?take=${take}&skip=${skip}`,
        headers: { Authorization: token },
        timeout: TIMEOUT,
      });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getUsersByNameApi = async (name, take, skip) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
        url: `${url}/users/name?name=${name}&take=${take}&skip=${skip}`,
        headers: { Authorization: token },
        timeout: TIMEOUT,
      });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const deleteUsersApi = async (id) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'DELETE',
        url: `${url}/users/${id}`,
        headers: { Authorization: token },
        timeout: TIMEOUT,
      });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const editUsersApi = async (user) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'PUT',
        url: `${url}/users/`,
        headers: { Authorization: token },
        data: user,
        timeout: TIMEOUT,
      });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const registerUsersApi = async (user) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
        url: `${url}/users/`,
        headers: { Authorization: token },
        data: user,
        timeout: TIMEOUT,
      });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        return { errorMessage: error.response.data.message };
      }
    } else {
      return { errorMessage: error.message };
    }
  }
}
