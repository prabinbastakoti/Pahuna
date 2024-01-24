import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();
  const menu = useRef(null);
  const elRef = useRef(null);
  const [el, setEl] = useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setEl(elRef.current);
  }, []);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/', { replace: true });
    setOpenMenu(false);
  };

  const closeMenu = (e) => {
    if (menu.current && openMenu && !menu.current.contains(e.target)) {
      if (el.contains(e.target)) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    }
  };
  document.addEventListener('mousedown', closeMenu);

  let menuClassName =
    'hidden md:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-150';

  if (pathname !== '/') {
    menuClassName = 'hidden';
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <Link to={'/'} className="flex items-center gap-1">
          <img src={Logo} className="h-20" />
        </Link>
        <div className={menuClassName}>
          <div>Anywhere</div>
          <div className="border-l border-gray-300 "></div>
          <div>Any Week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add Guests</div>
          <button className="bg-primary text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-5">
          <div
            ref={elRef}
            onClick={() => setOpenMenu(!openMenu)}
            className="flex relative items-center gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer hover:shadow-md shadow-gray-150"
          >
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openMenu && (
              <div
                ref={menu}
                className="z-50 absolute top-9 w-52 border border-gray-300 mt-4 shadow-md shadow-gray-150  right-5 rounded-xl bg-white"
              >
                {user && (
                  <Link to={'/profile'}>
                    <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-normal text-sm">
                      Profile
                    </div>
                  </Link>
                )}
                {!user && (
                  <Link to={'/signup'}>
                    <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-medium text-sm">
                      Sign up
                    </div>
                  </Link>
                )}
                {!user && (
                  <Link to={'/login'}>
                    <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-normal text-sm">
                      Log in
                    </div>
                  </Link>
                )}
                {!user && <div className="border-b border-gray-300 my-3"></div>}
                <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
                  Airbnb your home
                </div>
                <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
                  Help center
                </div>
                {user && (
                  <div
                    className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 font-normal text-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
