import uploadService from '../services/uploadService';

function PhotosUploader({ inputFields, setInputFields, handleFormChange }) {
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
    </div>
  );
}

export default PhotosUploader;
