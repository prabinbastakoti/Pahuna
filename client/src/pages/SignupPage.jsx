import { useContext, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/spinner/Spinner';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { user, ready } = useContext(AuthContext);
  const navigate = useNavigate();

  async function RegisterUser(e) {
    e.preventDefault();
    try {
      await authService.register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response.data.error);
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
    <div className="mt-4 grow flex items-center m-auto">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Signup</h1>
        <form className="max-w-md mx-auto" onSubmit={RegisterUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary">Signup</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{' '}
            <Link className="underline text-black" to={'/login'}>
              Login
            </Link>
          </div>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
