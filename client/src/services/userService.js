import axios from 'axios';

const getUser = async () => {
  const response = await axios.get('/api/user/getuser');
  return response.data;
};

export default { getUser };
