const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Place',
  },
  checkin: String,
  checkout: String,
  numberOfGuests: Number,
  name: String,
  number: Number,
  price: Number,
  status: String,
});

bookingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
