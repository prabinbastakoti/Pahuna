import axios from 'axios';

const register = async (newUser) => {
  const response = await axios.post('/api/auth/register', newUser);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);
  return response.data;
};

const logout = async () => {
  const response = await axios.post('/api/auth/logout');
  return response.data;
};

export default { register, login, logout };
