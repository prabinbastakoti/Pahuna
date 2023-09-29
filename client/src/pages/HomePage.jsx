import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/spinner/Spinner';
import placeService from '../services/placeService';
import Header from '../components/Header';

const HomePage = () => {
  const { ready } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    placeService.getAllPlace().then((data) => setPlaces(data));
  }, []);

  if (!ready) {
    return <Spinner />;
  }

  return (
    <div className="px-12 py-5 max-w-8xl mx-auto">
      <Header type="home" />
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link key={place.id} to={'/place/' + place.id}>
                <div className="bg-gray-500 rounded-2xl mb-2">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl aspect-square object-cover"
                      src={'/api/uploads/' + place.photos[0]}
                    />
                  )}
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                  <span className="font-bold">${place.price}</span> per night
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
