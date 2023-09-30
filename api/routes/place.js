const {
  addPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  getAllPlaces,
} = require('../controllers/place');

const router = require('express').Router();

router.post('/', addPlace);
router.put('/:id', updatePlace);
router.get('/user-places', getPlaces);
router.get('/:id', getPlaceById);
router.get('/', getAllPlaces);

module.exports = router;
