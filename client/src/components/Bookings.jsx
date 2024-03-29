import { useEffect, useState } from 'react';
import bookService from '../services/bookService';
import Spinner from './spinner/Spinner';
import { Link } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './Review';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('active');
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewBooking, setReviewBooking] = useState({});

  useEffect(() => {
    bookService.getBookings().then((data) => {
      setBookings(data.reverse());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (bookingStatus === 'cancelled') {
      setLoading(true);
      bookService.getBookings().then((data) => {
        setBookings(data.reverse());
        setLoading(false);
        setBookingStatus('active');
      });
    }
  }, [bookingStatus]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const myParams = query.get('booking');
    if (myParams === 'success') {
      toast.success(
        'You have successfully booked a place. Please check your email for verification.',
        {
          position: 'top-right',
          toastId: 'success1',
        }
      );
    }
  });

  const cancelReservation = async (bookingId) => {
    try {
      await bookService.updateBooking(bookingId);
      setBookingStatus('cancelled');
    } catch (err) {
      console.log(err);
    }
  };

  const reviewFunction = (place) => {
    setReviewModal(true);
    setReviewBooking(place);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!bookings.length) return '';

  return (
    <div className="mt-8 mb-6 flex flex-col items-center justify-center">
      <ToastContainer />
      {bookings.map((booking) => {
        return (
          <div
            key={booking.id}
            className="w-4/5 bg-gray-100 py-4 px-6 rounded-2xl mt-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-xl">
                {booking.place.photos?.[0] && (
                  <img
                    src={BASE_URL + '/api/uploads/' + booking.place.photos[0]}
                    className="w-full h-full object-cover rounded-xl transition duration-500 cursor-pointer"
                  />
                )}
              </div>
              <div>
                <Link to={'/place/' + booking.place.id}>
                  <h2 className="hover:underline cursor-pointer mb-1 sm:mb-2 text-lg font-bold">
                    {booking.place.title}
                  </h2>
                </Link>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    {booking.checkin}
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>

                    {booking.checkout}
                  </span>
                </div>
                <div>
                  <div className="flex gap-1 items-center mb-1 sm:mb-2">
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
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {differenceInCalendarDays(
                        new Date(booking.checkout),
                        new Date(booking.checkin)
                      )}{' '}
                      {differenceInCalendarDays(
                        new Date(booking.checkout),
                        new Date(booking.checkin)
                      ) <= 1 ? (
                        <span className="text-gray-600 text-xs sm:text-sm">
                          night
                        </span>
                      ) : (
                        <span className="text-gray-600 text-xs sm:text-sm">
                          nights
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                    <span className="font-bold text-sm">
                      Total price: रु {booking.price}
                    </span>
                  </div>
                </div>
              </div>
              {booking.status === 'active' &&
                differenceInCalendarDays(
                  new Date(booking.checkin),
                  new Date()
                ) >= 0 && (
                  <div className="flex-1 flex items-end justify-end">
                    <button
                      className="bg-red-500 text-white p-2 text-xs rounded-lg"
                      onClick={() => cancelReservation(booking.id)}
                    >
                      Cancel Reservation
                    </button>
                  </div>
                )}
              {booking.status === 'cancelled' && (
                <div className="flex-1 flex items-end justify-end">
                  <button className="bg-primary text-white p-2 text-xs rounded-lg">
                    Reservation Cancelled
                  </button>
                </div>
              )}
              {booking.status === 'active' &&
                differenceInCalendarDays(
                  new Date(booking.checkin),
                  new Date()
                ) < 0 && (
                  <div className="flex-1 flex items-end justify-end">
                    <button
                      className="bg-primary text-white p-2 text-xs rounded-lg"
                      onClick={() => reviewFunction(booking.place)}
                    >
                      Write a review
                    </button>
                  </div>
                )}
            </div>
          </div>
        );
      })}
      {reviewModal && (
        <Review place={reviewBooking} setModal={setReviewModal} />
      )}
    </div>
  );
}

export default Bookings;
