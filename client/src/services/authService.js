import axios from 'axios';

const register = async (newUser) => {
  const response = await axios.post('/api/auth/register', newUser);
  return response.data;
};

export default { register };
