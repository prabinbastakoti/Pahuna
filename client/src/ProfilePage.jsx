import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import authService from './services/authService';
import { useNavigate } from 'react-router-dom';
import placeService from './services/placeService';
import Spinner from './spinner/Spinner';
import bookService from './services/bookService';
import profilePicture from './assets/pp.png';

const ProfilePageComponent = () => {
  const { user, ready, dispatch } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    placeService.getPlaces().then((data) => {
      setPlaces(data.reverse());
      setLoading(false);
    });
    bookService.getBookings().then((data) => {
      setBookings(data.reverse());
      setLoading(false);
    });
  }, []);

  async function logout() {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  }

  if (!ready) {
    return <Spinner />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-28 py-6 flex justify-center mt-16 overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-5 items-center mb-10">
          <div className="h-20 w-20 md:w-32 md:h-32 rounded-full ">
            <img src={profilePicture} className="object-cover" />
          </div>
          <div className="flex-1 text-xl md:text-2xl font-semibold">
            {user.name}
          </div>
        </div>

        <div className="text-base md:text-xl flex gap-8">
          <div className="flex flex-col gap-4">
            <div>Email Address</div>
            <div>Accomodations</div>
            <div>Bookings</div>
          </div>
          <div className="flex flex-col gap-4">
            <div>{user.email}</div>
            <div>{places.length}</div>
            <div>{bookings.length}</div>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <button
            className="bg-primary text-white px-6 py-2 rounded-full mt-4 text-sm sm:text-base"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
