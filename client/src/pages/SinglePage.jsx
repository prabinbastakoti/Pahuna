import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import placeService from '../services/placeService';
import Spinner from '../spinner/Spinner';
import BookingWidget from '../BookingWidget';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reviewService from '../services/reviewService';
import Logo from '../assets/pp.png';
import { getMonth, getYear } from 'date-fns';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function SinglePage() {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const { id } = useParams();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    setLoading(true);
    placeService.getPlaceById(id).then((data) => {
      setPlace(data);
    });
    reviewService.getReview().then((data) => {
      const review = data.filter((item) => item.place === id);
      setReviews(review);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const myParam = query.get('addReview');
    if (myParam === 'success') {
      toast.success('Review Successfully Added', {
        position: 'top-right',
        toastId: 'success122',
      });
    }
  });

  if (loading || !place) {
    return <Spinner />;
  }

  return (
    <div className="py-8 mt-16">
      <ToastContainer />
      <h1 className="text-xl sm:text-2xl mb-1">{place.title}</h1>
      <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        <a
          className="my-2 block font-semibold underline text-sm sm:text-base"
          target="_blank"
          rel="noreferrer"
          href={'https://maps.google.com/?q=' + place.address}
        >
          {place.address}
        </a>
      </div>
      <div className="relative mt-4 grid gap-1 sm:grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr_1fr] rounded-2xl max-h-80 overflow-hidden">
        <div className="max-h-80">
          {place.photos?.[0] && (
            <img
              className="h-full w-full object-cover"
              src={BASE_URL + '/api/uploads/' + place.photos[0]}
            />
          )}
        </div>
        <div className="max-h-80 hidden sm:flex flex-col gap-1 overflow-hidden">
          {place.photos?.[1] && (
            <img
              className="object-cover h-1/2"
              src={BASE_URL + '/api/uploads/' + place.photos[1]}
            />
          )}
          {place.photos?.[2] && (
            <img
              className="object-cover h-1/2"
              src={BASE_URL + '/api/uploads/' + place.photos[2]}
            />
          )}
        </div>
        <div className="max-h-80 hidden md:flex flex-col gap-1 overflow-hidden">
          {place.photos?.[3] && (
            <img
              className="h-1/2 object-cover"
              src={BASE_URL + '/api/uploads/' + place.photos[3]}
            />
          )}
          {place.photos?.[4] && (
            <img
              className="h-1/2 object-cover"
              src={BASE_URL + '/api/uploads/' + place.photos[4]}
            />
          )}
        </div>

        <Link
          className="flex items-center gap-1 absolute bottom-2 right-2 py-2 px-3 rounded-2xl bg-white shadow-md shadow-gray-500 text-xs"
          to={`/place/${id}/allphotos`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-4 h-4 sm:w-4 sm:h-4"
          >
            <rect width="256" height="256" fill="none" />
            <circle cx="60" cy="60" r="16" />
            <circle cx="128" cy="60" r="16" />
            <circle cx="196" cy="60" r="16" />
            <circle cx="60" cy="128" r="16" />
            <circle cx="128" cy="128" r="16" />
            <circle cx="196" cy="128" r="16" />
            <circle cx="60" cy="196" r="16" />
            <circle cx="128" cy="196" r="16" />
            <circle cx="196" cy="196" r="16" />
          </svg>
          <span className="text-xs sm:text-sm">Show&nbsp;all&nbsp;photos</span>
        </Link>
      </div>
      <BookingWidget place={place} />
      {reviews && (
        <div>
          {reviews && reviews.length <= 0 && (
            <div className="mt-12 text-lg sm:text-xl font-semibold">
              No reviews yet
            </div>
          )}
          {reviews && reviews.length > 0 && (
            <div>
              <h2 className="mt-12 text-lg sm:text-xl font-semibold">
                {reviews.length} {reviews.length == 1 && <span>review</span>}
                {reviews.length > 1 && <span>reviews</span>}
              </h2>
              <div className="mt-8 grid grid-cols-2 grid-rows-3 gap-y-20 gap-x-32">
                {reviews.map((review, index) => {
                  if (index > 5) return;
                  return (
                    <div key={index}>
                      <div className="flex items-center gap-4">
                        <img src={Logo} className="w-14 h-14" />
                        <div>
                          <div className="text-sm md:text-base font-semibold">
                            {review.user.name}
                          </div>
                          <div className="text-xs md:text-sm">
                            {monthNames[getMonth(new Date(review.createdAt))]}{' '}
                            {getYear(new Date(review.createdAt))}
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((star, index) => {
                          const currentRating = index + 1;
                          return (
                            <div key={index}>
                              <span
                                style={{
                                  color:
                                    currentRating <= review.rating
                                      ? '#ffc107'
                                      : '#6a6767',
                                }}
                              >
                                &#9733;
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="line-clamp-3 text-sm md:text-base">
                        {review.reviewText}
                      </p>
                    </div>
                  );
                })}
              </div>
              {reviews.length > 6 && (
                <button className="mt-14 bg-primary px-4 py-2 text-white rounded-3xl">
                  View all {reviews.length} reviews
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SinglePage;
