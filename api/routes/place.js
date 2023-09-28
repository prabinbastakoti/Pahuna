const {
  addPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
} = require('../controllers/place');

const router = require('express').Router();

router.post('/', addPlace);
router.put('/:id', updatePlace);
router.get('/', getPlaces);
router.get('/:id', getPlaceById);

module.exports = router;
