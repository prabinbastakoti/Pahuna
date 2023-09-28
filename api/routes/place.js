const { addPlace } = require('../controllers/place');

const router = require('express').Router();

router.post('/', addPlace);

module.exports = router;
