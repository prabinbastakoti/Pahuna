const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Place = require('../models/place');

const addPlace = async (req, res) => {
  const { access_token } = req.cookies;

  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
  } = req.body;

  jwt.verify(access_token, config.SECRET, {}, async (err, user) => {
    if (err) throw err;
    const newPlace = new Place({
      owner: user.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests: maxGuest,
    });

    await newPlace.save();
    res.status(201).json('New place created');
  });
};

module.exports = { addPlace };
