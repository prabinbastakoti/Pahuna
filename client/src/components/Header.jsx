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
    'hidden md:flex flex-1 gap-3 rounded-full py-2 px-4 items-center justify-center relative';

  if (pathname !== '/') {
    menuClassName = 'hidden';
  }

  return (
    <div className="flex items-center justify-center">
      <header className="fixed top-0 w-full max-w-7xl bg-white py-2 z-10 px-4">
        <div className="flex items-center justify-between">
          <Link to={'/'} className="flex items-center gap-1">
            <img src={Logo} className="h-20" />
          </Link>
          <div className={menuClassName}>
            <div className="relative w-2/5">
              <input
                type="text"
                id="search"
                className="block px-2.5 py-28 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="search"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-4 peer-focus:px-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Search By Location
              </label>
              <button className="bg-primary text-white rounded-full p-1 absolute top-3 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
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
                  {!user && (
                    <div className="border-b border-gray-300 my-3"></div>
                  )}
                  <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
                    About Us
                  </div>
                  <div className="pl-6 pr-14 py-1.5 my-2.5 cursor-pointer hover:bg-gray-100 text-sm">
                    Contact Us
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
        </div>
      </header>
    </div>
  );
};

export default Header;
