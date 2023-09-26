import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/spinner/Spinner';
import { Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const ProfilePage = () => {
  const { user, ready, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  function linkClasses(type) {
    let classes = 'py-2 px-6';

    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  }

  async function logout() {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  }

  return (
    <div>
      <nav className="w-full flex justify-center my-8 gap-2 ">
        <Link className={linkClasses('profile')} to={'/profile'}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/profile/bookings'}>
          My Bookings
        </Link>
        <Link
          className={linkClasses('accomodations')}
          to={'/profile/accomodations'}
        >
          My Accomodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center">
          Logged in as {user.name} ({user.email}) <br />
          <button
            className="bg-primary text-white px-6 py-2 rounded-full mt-4"
            onClick={logout}
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
