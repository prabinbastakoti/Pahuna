import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/spinner/Spinner';
import { Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import Places from '../components/Places';
import Bookings from '../components/Bookings';
import ProfilePageComponent from '../components/ProfilePage';

const ProfilePage = () => {
  const { user, ready } = useContext(AuthContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return <Spinner />;
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  function linkClasses(type) {
    let classes =
      'flex gap-1 py-2 px-3 sm:px-4 md:px-6 rounded-full items-center';

    if (type === subpage) {
      classes += ' bg-primary text-white';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mb-8 gap-2 mt-24">
        <Link className={linkClasses('profile')} to={'/profile'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span className="text-sm sm:text-base">Profile</span>
        </Link>
        <Link className={linkClasses('bookings')} to={'/profile/bookings'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="text-sm sm:text-base">Bookings</span>
        </Link>
        <Link
          className={linkClasses('accomodations')}
          to={'/profile/accomodations'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          <span className="text-sm sm:text-base">Accomodations</span>
        </Link>
      </nav>
      {subpage === 'profile' && <ProfilePageComponent />}
      {subpage === 'bookings' && <Bookings />}
      {subpage === 'accomodations' && <Places />}
    </div>
  );
};

export default ProfilePage;
