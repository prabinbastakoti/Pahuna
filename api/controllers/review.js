const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Review = require('../models/review');

const postReview = async (req, res) => {
  const { access_token } = req.cookies;

  const { place, rating, reviewText } = req.body;

  jwt.verify(access_token, config.SECRET, {}, async (err, user) => {
    if (err) throw err;
    const newReview = new Review({
      user: user.id,
      place: place.id,
      reviewText,
      rating,
    });

    await newReview.save();
    res.status(201).json('New Review created');
  });
};

const getReviews = async (req, res) => {
  const reviews = await Review.find({}).populate('user');
  res.json(reviews);
};

module.exports = {
  postReview,
  getReviews,
};
