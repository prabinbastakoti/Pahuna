import axios from 'axios';

const addPlace = async (details) => {
  const response = await axios.post('/api/place', details);
  return response.data;
};

const updatePlace = async (id, newPlace) => {
  const response = await axios.put('/api/place/' + id, newPlace);
  return response.data;
};

const getPlaces = async () => {
  const response = await axios.get('/api/place/user-places');
  return response.data;
};

const getPlaceById = async (id) => {
  const response = await axios.get('/api/place/' + id);
  return response.data;
};

const getAllPlace = async () => {
  const response = await axios.get('/api/place');
  return response.data;
};

export default { addPlace, getPlaces, getPlaceById, updatePlace, getAllPlace };
