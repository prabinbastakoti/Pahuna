import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/spinner/Spinner';
import placeService from '../services/placeService';

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
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 max-w-5xl sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mx-auto ">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link key={place.id} to={'/place/' + place.id}>
              <div className="bg-gray-500 rounded-2xl mb-2 overflow-hidden">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square object-cover md:hover:scale-125 transition duration-500 cursor-pointer"
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
  );
};

export default HomePage;
