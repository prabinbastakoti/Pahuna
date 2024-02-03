const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
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
    rating: Number,
    reviewText: String,
  },
  { timestamps: true }
);

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Review', reviewSchema);
