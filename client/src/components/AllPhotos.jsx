import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeService from '../services/placeService';
import Spinner from '../components/spinner/Spinner';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AllPhotos() {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    placeService.getPlaceById(id).then((data) => {
      setPlace(data);
      setLoading(false);
    });
  }, []);

  if (loading || !place) {
    return <Spinner />;
  }

  return (
    <div className="mt-12 flex flex-col gap-y-4 justify-center items-center">
      {place.photos.length > 0 &&
        place.photos.map((photo) => {
          return (
            <div key={photo}>
              <img
                src={BASE_URL + '/api/uploads/' + photo}
                className="max-w-xl w-full rounded-lg"
              />
            </div>
          );
        })}
    </div>
  );
}

export default AllPhotos;
