import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import placeService from '../services/placeService';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    placeService.getAllPlace().then((data) => {
      setPlaces(data);
      setloading(false);
    });
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const myParam = query.get('success');
    if (myParam === 'true') {
      toast.success('Login Successfull', {
        position: 'top-right',
        toastId: 'success1',
      });
    }
  });

  if (loading || !places) {
    return <Spinner />;
  }

  return (
    <div className="px-5 py-5 max-w-7xl mx-auto mt-16">
      <ToastContainer />
      <Header type={'home'} />
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link key={place.id} to={'/place/' + place.id}>
                <div className="bg-gray-500 rounded-2xl mb-2 ">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl  aspect-square  w-full h-full object-cover"
                      src={BASE_URL + '/api/uploads/' + place.photos[0]}
                    />
                  )}
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                  <span className="font-bold">रु {place.price}</span> per night
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
