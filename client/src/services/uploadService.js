import axios from 'axios';

const uploadByLink = async (link) => {
  const response = await axios.post('/api/upload/upload-by-link', { link });
  return response.data;
};

export default { uploadByLink };
