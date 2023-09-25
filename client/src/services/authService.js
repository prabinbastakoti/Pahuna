import axios from 'axios';

const register = async (newUser) => {
  const response = await axios.post('/api/auth/register', newUser);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);
  return response.data;
};

const getUser = async () => {
  const response = await axios.get('/api/auth/user');
  return response.data;
};

export default { register, login, getUser };
