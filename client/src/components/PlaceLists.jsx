import { useEffect, useState } from 'react';
import placeService from '../services/placeService';

function PlaceLists() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    placeService.getPlaces().then((data) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="mt-8 max-w-4xl mx-auto text-left">
      {places.length > 0 &&
        places.map((place) => (
          <div
            key={place.id}
            className="flex gap-4 bg-gray-100 p-4 rounded-2xl"
          >
            <div className="w-32 h-32 bg-gray-300 rounded-xl shrink-0">
              {place.photos.length > 0 && (
                <img
                  src={'/api/uploads/' + place.photos[0]}
                  className="w-32 h-32 object-cover rounded-xl"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl hover:underline cursor-pointer text-left">
                {place.title}
              </h2>
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
          </div>
        ))}
    </div>
  );
}

export default PlaceLists;
