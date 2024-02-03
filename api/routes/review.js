const { postReview, getReviews } = require('../controllers/review');

const router = require('express').Router();

router.post('/', postReview);
router.get('/', getReviews);

module.exports = router;
