const jwt = require('jsonwebtoken');
const Booking = require('../models/booking');
const config = require('../utils/config');

const bookPlace = async (req, res) => {
  const { access_token } = req.cookies;
  const { checkin, checkout, numberOfGuests, name, number, price, place } =
    req.body;
  if (!access_token) return res.status(401).json('You are not authenticated!');

  jwt.verify(access_token, config.SECRET, {}, async (err, user) => {
    if (err) return res.status(403).json('Token is not valid!');
    const newBooking = new Booking({
      user: user.id,
      place,
      checkin,
      checkout,
      numberOfGuests,
      number,
      name,
      price,
    });
    await newBooking.save();
    res.status(201).json({ success: 'Booked the place successfully!' });
  });
};

const getBookings = async (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) return res.status(401).json('You are not authenticated!');

  jwt.verify(access_token, config.SECRET, {}, async (err, user) => {
    if (err) return res.status(403).json('Token is not valid!');

    const requestedBookings = await Booking.find({ user: user.id }).populate(
      'place'
    );

    res.status(200).json(requestedBookings);
  });
};

module.exports = { bookPlace, getBookings };
