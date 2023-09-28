const { addPlace, getPlaces } = require('../controllers/place');

const router = require('express').Router();

router.post('/', addPlace);
router.get('/', getPlaces);

module.exports = router;
