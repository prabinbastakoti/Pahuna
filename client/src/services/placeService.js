import axios from 'axios';

const addPlace = async (details) => {
  const response = await axios.post('/api/place', details);
  return response.data;
};

const getPlaces = async () => {
  const response = await axios.get('/api/place');
  return response.data;
};

export default { addPlace, getPlaces };
