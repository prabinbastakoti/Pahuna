import axios from 'axios';

const upload = async (data) => {
  const response = await axios.post('/api/upload', data, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
  return response.data;
};

const uploadByLink = async (link) => {
  const response = await axios.post('/api/upload/upload-by-link', { link });
  return response.data;
};

export default { upload, uploadByLink };
