import axios from 'axios';

const bookPlace = async (info) => {
  const response = await axios.post('/api/bookplace', info);
  return response.data;
};

const getBookings = async () => {
  const response = await axios.get('/api/bookplace');
  return response.data;
};

export default { bookPlace, getBookings };
