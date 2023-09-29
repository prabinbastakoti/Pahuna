import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeService from '../services/placeService';
import Spinner from '../components/spinner/Spinner';

function SinglePage() {
  const [place, setPlace] = useState(null);
  const [loading, setLodaing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLodaing(true);
    placeService.getPlaceById(id).then((data) => {
      setPlace(data);
      setLodaing(false);
    });
  }, []);

  if (loading || !place) {
    return <Spinner />;
  }

  return (
    <div className="mt-4 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
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

        <a
          className="my-2 block font-semibold underline"
          target="_blank"
          rel="noreferrer"
          href={'https://maps.google.com/?q=' + place.address}
        >
          {place.address}
        </a>
      </div>
      <div className="mt-4 grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        {place.photos?.[0] && (
          <img
            className="aspect-square object-cover"
            src={'/api/uploads/' + place.photos[0]}
          />
        )}
        <div className="grid overflow-hidden">
          {place.photos?.[1] && (
            <img
              className="aspect-square object-cover"
              src={'/api/uploads/' + place.photos[1]}
            />
          )}
          {place.photos?.[2] && (
            <img
              className="aspect-square object-cover relative top-2"
              src={'/api/uploads/' + place.photos[2]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
