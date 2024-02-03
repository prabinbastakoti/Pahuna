import axios from 'axios';

const addReview = async (details) => {
  const response = await axios.post('/api/review', details);
  return response.data;
};

const getReview = async () => {
  const response = await axios.get('/api/review');
  return response.data;
};

export default { addReview, getReview };
