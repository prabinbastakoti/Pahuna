const {
  bookPlace,
  getBookings,
  updateBooking,
} = require('../controllers/book');

const router = require('express').Router();

router.post('/', bookPlace);
router.get('/', getBookings);
router.put('/:id', updateBooking);

module.exports = router;
