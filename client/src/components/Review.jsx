import { useState } from 'react';
import Modal from './Modal';

const Review = ({ place, setModal }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState('');

  const postReview = () => {};

  const modalData = (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">{place.title}</div>
      <div>
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <label key={index} className="text-4xl">
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onChange={() => setRating(currentRating)}
                className="hidden"
              />
              <span
                className="cursor-pointer m-1"
                style={{
                  color:
                    currentRating <= (hover || rating) ? '#ffc107' : '#6a6767',
                }}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              >
                &#9733;
              </span>
            </label>
          );
        })}
      </div>
      <textarea
        type="text"
        value={review}
        className="review outline-gray-400"
        placeholder="write your review here"
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <button
        className="bg-primary px-4 py-2 rounded-2xl text-white w-1/3"
        onClick={postReview}
      >
        Post your review
      </button>
    </div>
  );

  return (
    <Modal
      modalTitle="Write a review"
      modalData={modalData}
      setModal={setModal}
    />
  );
};

export default Review;
