import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from './Perks';
import uploadService from '../services/uploadService';

function Places() {
  const { action } = useParams();

  const [inputFields, setInputFields] = useState({
    title: '',
    address: '',
    photoLink: '',
    addedPhotos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuest: 1,
  });

  function placeHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function placeSubHeader(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function heading(header, subHeader) {
    return (
      <>
        {placeHeader(header)}
        {placeSubHeader(subHeader)}
      </>
    );
  }

  function handleFormChange(event, key) {
    if (key === 'maxGuest' && event.target.value < 1) return;
    setInputFields((prev) => ({ ...prev, [key]: event.target.value }));
  }

  function handlePerksChange(checked, id) {
    if (checked) {
      setInputFields((prev) => ({ ...prev, perks: [...prev.perks, id] }));
    } else {
      setInputFields((prev) => ({
        ...prev,
        perks: [
          ...prev.perks.filter((selected) => {
            return selected !== id;
          }),
        ],
      }));
    }
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const filename = await uploadService.uploadByLink(inputFields.photoLink);

    setInputFields((prev) => {
      return { ...prev, addedPhotos: [...prev.addedPhotos, filename] };
    });
    setInputFields((prev) => ({ ...prev, photoLink: '' }));
  }

  async function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    const filenames = await uploadService.upload(data);
    setInputFields((prev) => {
      return { ...prev, addedPhotos: [...prev.addedPhotos, ...filenames] };
    });
  }

  return (
    <div>
      {action !== 'new' && (
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
        </div>
      )}

      {action === 'new' && (
        <div>
          <form className="max-w-4xl mx-auto">
            {heading(
              'Title',
              'title for your place, should be short and catchy'
            )}
            <input
              type="text"
              placeholder="for example: My lovely Apt"
              id="title"
              value={inputFields.title}
              onChange={(ev) => handleFormChange(ev, ev.target.id)}
            />

            {heading('Address', 'address to your place')}
            <input
              type="text"
              placeholder="Address"
              id="address"
              value={inputFields.address}
              onChange={(ev) => handleFormChange(ev, ev.target.id)}
            />

            {heading('Photos', 'upload your place photos')}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using a link ....jpg"
                id="photoLink"
                value={inputFields.photoLink}
                onChange={(ev) => handleFormChange(ev, ev.target.id)}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {inputFields.addedPhotos.length > 0 &&
                inputFields.addedPhotos.map((item) => {
                  return (
                    <div key={item} className="h-32 flex">
                      <img
                        className="rounded-2xl w-full object-cover "
                        src={'/api/uploads/' + item}
                      />
                    </div>
                  );
                })}
              <label className="flex h-32 w-auto items-center justify-center gap-1 border  bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>

            {heading('Description', 'description of your place')}
            <textarea
              value={inputFields.description}
              id="description"
              onChange={(ev) => handleFormChange(ev, ev.target.id)}
            />

            {heading('Perks', 'select all the perks of your place')}
            <Perks handlePerksChange={handlePerksChange} />

            {heading('Extra Information', 'house rules, etc')}
            <textarea
              value={inputFields.extraInfo}
              id="extraInfo"
              onChange={(ev) => handleFormChange(ev, ev.target.id)}
            />

            {heading(
              'CheckIn & CheckOut',
              'add checkIn & checkOut time, remember to have some time window for cleaning the room between guests'
            )}

            <div className="flex gap-2 mt-2 justify-between">
              <div>
                <h3>CheckIn time</h3>
                <input
                  type="text"
                  placeholder="eg. 14:00"
                  id="checkIn"
                  value={inputFields.checkIn}
                  onChange={(ev) => handleFormChange(ev, ev.target.id)}
                />
              </div>
              <div>
                <h3>CheckOut time</h3>
                <input
                  type="text"
                  id="checkOut"
                  placeholder="eg. 12:00"
                  value={inputFields.checkOut}
                  onChange={(ev) => handleFormChange(ev, ev.target.id)}
                />
              </div>
              <div>
                <h3>Max Guest</h3>
                <input
                  type="number"
                  id="maxGuest"
                  placeholder="eg. 4"
                  value={inputFields.maxGuest}
                  onChange={(ev) => handleFormChange(ev, ev.target.id)}
                />
              </div>
            </div>
            <div className="flex justify-center mt-7 mb-6">
              <button className="w-1/2 bg-primary text-white p-2 rounded-full">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Places;
