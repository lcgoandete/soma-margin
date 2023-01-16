import axios from 'axios';

const url = process.env.REACT_APP_URL;

export const setAuthenticationApi = async (credendials) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/login/`,
      data: credendials,
    });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getCardLimitApi = async (cpf) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${url}/banks/bmg/complementary-withdrawal/card-limit/`,
      headers: { Authorization: token },
      data: { cpf },
    });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getConsignedPortalMarginApi = async (queryType, cpf) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
        url: `${url}/${queryType}`,
        headers: { Authorization: token },
        data: { cpf },
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const isValidTokenApi = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
        url: `${url}/token/`,
        headers: { Authorization: token },
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const getUsersApi = async (take, skip) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'GET',
        url: `${url}/users?take=${take}&skip=${skip}`,
        headers: { Authorization: token },
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const deleteUsersApi = async (userId) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'DELETE',
        url: `${url}/users/${userId}`,
        headers: { Authorization: token },
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const editUsersApi = async (user) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'PUT',
        url: `${url}/users/${user.id}`,
        headers: { Authorization: token },
        data: user,
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}

export const registerUsersApi = async (user) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios({
      method: 'POST',
        url: `${url}/users/`,
        headers: { Authorization: token },
        data: user,
      });
    return data;
  } catch (error) {
    if (error.response.data.message) {
      return { errorMessage: error.response.data.message };
    } else {
      return { errorMessage: error.message };
    }
  }
}
