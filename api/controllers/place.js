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

const getPlaces = async (req, res) => {
  const { access_token } = req.cookies;

  jwt.verify(access_token, config.SECRET, {}, async (err, user) => {
    if (err) throw err;
    const { id } = user;
    const userPlaces = await Place.find({ owner: id });
    res.json(userPlaces);
  });
};

const getPlaceById = async (req, res) => {
  const requestedPlace = await Place.findById(req.params.id);
  res.json(requestedPlace);
};

const updatePlace = async (req, res) => {
  const { access_token } = req.cookies;
  const { id } = req.params;

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

    const selectedPlace = await Place.findById(id);

    if (user.id === selectedPlace.owner.toString()) {
      await Place.findByIdAndUpdate(id, {
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
      res.json('ok');
    }
  });
};

module.exports = { addPlace, getPlaces, getPlaceById, updatePlace };
