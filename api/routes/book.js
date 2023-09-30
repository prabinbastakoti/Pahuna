const { bookPlace, getBookings } = require('../controllers/book');

const router = require('express').Router();

router.post('/', bookPlace);
router.get('/', getBookings);

module.exports = router;
