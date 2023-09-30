import { useEffect, useState } from 'react';
import placeService from '../services/placeService';
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';

function PlaceLists() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    placeService.getPlaces().then((data) => {
      setPlaces(data.reverse());
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mt-8 mb-6">
      {places.length > 0 &&
        places.map((place) => (
          <div
            key={place.id}
            className="flex gap-4 bg-gray-100 p-4 rounded-2xl mt-6"
          >
            <div className="w-36 h-36 bg-gray-300 rounded-xl shrink-0 overflow-hidden">
              {place.photos.length > 0 && (
                <img
                  src={'/api/uploads/' + place.photos[0]}
                  className="w-full h-full object-cover rounded-xl hover:scale-125 transition duration-500 cursor-pointer"
                />
              )}
            </div>
            <div>
              <Link to={'/place/' + place.id}>
                <h2 className="text-xl hover:underline cursor-pointer text-left">
                  {place.title}
                </h2>
              </Link>
              <p className="flex gap-1 items-center text-sm mt-1 text-gray-600 md:mt-1.5">
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
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {place.address}
              </p>
              <div className="mt-4 hidden sm:flex sm:flex-wrap sm:gap-2 md:mt-6">
                {place.perks.length > 0 &&
                  place.perks.map((perk) => {
                    return (
                      <div
                        className="bg-primary text-white rounded-2xl p-1 px-4 sm:text-xs md:text-sm "
                        key={place.id + perk}
                      >
                        {perk === 'wifi' && 'Wifi'}
                        {perk === 'tv' && 'Television'}
                        {perk === 'entrance' && 'Private Entrance'}
                        {perk === 'pets' && 'Pets Allowed'}
                        {perk === 'parking' && 'Parking Space'}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="grow flex justify-end cursor-pointer pt-1">
              <Link to={'/profile/accomodations/update/' + place.id}>
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PlaceLists;
