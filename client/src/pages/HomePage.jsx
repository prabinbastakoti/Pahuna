import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/spinner/Spinner';

const HomePage = () => {
  const { ready } = useContext(AuthContext);

  if (!ready) {
    return <Spinner />;
  }

  return <div></div>;
};

export default HomePage;
