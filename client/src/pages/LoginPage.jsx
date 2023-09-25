import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });
    const credentials = { email, password };

    try {
      const res = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
      console.log(err.response.data);
    }
  }

  return (
    <div className="mt-4 grow flex items-center m-auto">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?{' '}
            <Link className="underline text-black" to={'/signup'}>
              Register now
            </Link>
          </div>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
