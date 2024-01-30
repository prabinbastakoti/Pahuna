import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const { user, loading, dispatch, ready } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const myParams = query.get('success');

    if (myParams === 'true') {
      setLoginSuccess(true);
    }

    if (loginSuccess) {
      toast.success('Successfully created account. Please Login to Continue', {
        position: 'top-center',
        toastId: 'success1',
      });
    }
  }, [loginSuccess]);

  async function loginUser(e) {
    e.preventDefault();
    toast.dismiss();

    dispatch({ type: 'LOGIN_START' });
    const credentials = { email, password };

    try {
      const res = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res });
      navigate('/?success=true');
    } catch (err) {
      toast.error('You have entered an invalid username or password', {
        position: 'top-center',
      });
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  }

  if (!ready) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (ready && user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-16 grow flex items-center m-auto">
      <ToastContainer />
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto w-[400px]" onSubmit={loginUser}>
          <div className="relative mb-4 mt-6">
            <input
              type="email"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
          </div>
          <div className="flex justify-center">
            <button disabled={loading} className="primary w-1/2">
              Login
            </button>
          </div>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?{' '}
            <Link className="underline text-black" to={'/signup'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
