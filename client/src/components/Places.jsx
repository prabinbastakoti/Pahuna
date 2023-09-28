import { Link, useParams } from 'react-router-dom';
import PlaceLists from './PlaceLists';
import PlaceForm from './PlaceForm';

function Places() {
  const { action } = useParams();

  return (
    <div>
      {action !== 'new' && action !== 'update' && (
        <div className="text-center">
          <Link
            className="inline-flex bg-primary text-white rounded-full py-2 px-6"
            to="/profile/accomodations/new"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
          <PlaceLists />
        </div>
      )}

      {action === 'new' && <PlaceForm />}
      {action === 'update' && <PlaceForm />}
    </div>
  );
}

export default Places;
