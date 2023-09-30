import { Link } from 'react-router-dom';

function BookingWidget({ place }) {
  return (
    <div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="mt-6 text-xl font-semibold">About This Place</h2>
          <p className="mt-1 line-clamp-4 text-gray-700">{place.description}</p>
          <Link className="mt-1 flex items-center">
            <span className=" font-medium underline">Show more </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>

          <h2 className="mt-8 text-xl font-semibold">Extra Info</h2>
          <p className="mt-1 line-clamp-2 text-gray-700">{place.extraInfo}</p>
          <Link className="mt-1 flex items-center">
            <span className=" font-medium underline">Show more </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
        <div className="mt-6 border px-2 py-4 rounded-2xl bg-gray-50 shadow-md">
          <h1 className="text-base py-1 pl-4">
            <span className="font-semibold text-3xl">${place.price} </span>{' '}
            night
          </h1>
          <div className="border mt-2 rounded-2xl ">
            <div className="grid grid-cols-2 p-1">
              <label className="flex flex-col px-4">
                Check-in:
                <input
                  type="date"
                  className="text-center p-2 rounded-2xl mt-1"
                />
              </label>
              <label className="border-l flex flex-col px-4">
                Checkout:
                <input
                  type="date"
                  className=" text-center p-2 rounded-2xl mt-1"
                />
              </label>
            </div>
            <div className="px-4 py-1 border-t">
              <label>
                Number of Guests:
                <input type="number" />
              </label>
            </div>
          </div>
          <button className="primary mt-2">Book This Place</button>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2">
        <div>
          <h2 className="mt-6 text-xl font-semibold">What this place offers</h2>
          <div className="mt-3 text-gray-700">
            {place.perks.length > 0 &&
              place.perks.map((perk) => {
                return (
                  <div key={place.id + perk} className="mt-2">
                    {perk === 'wifi' && (
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="bi bi-wifi w-6 h-6"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z" />{' '}
                          <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z" />{' '}
                        </svg>
                        <span>Wifi</span>
                      </div>
                    )}
                    {perk === 'parking' && (
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                        >
                          <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm4 2h3.5a3.5 3.5 0 0 1 0 7H11v3H9V7zm2 2v3h1.5a1.5 1.5 0 0 0 0-3H11z" />
                          </g>
                        </svg>
                        <span>Parking Space</span>
                      </div>
                    )}
                    {perk === 'tv' && (
                      <div className="flex gap-2 items-center">
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
                            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>

                        <span>Television</span>
                      </div>
                    )}
                    {perk === 'pets' && (
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          className="w-6 h-6"
                        >
                          <rect width="256" height="256" fill="none" />
                          <line
                            x1="128"
                            y1="192"
                            x2="128"
                            y2="224"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="8"
                          />
                          <circle cx="84" cy="140" r="8" />
                          <circle cx="172" cy="140" r="8" />
                          <line
                            x1="128"
                            y1="48"
                            x2="128"
                            y2="88"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="8"
                          />
                          <polyline
                            points="144 176 128 192 112 176"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="8"
                          />
                          <line
                            x1="96"
                            y1="53"
                            x2="96"
                            y2="88"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="8"
                          />
                          <line
                            x1="160"
                            y1="53"
                            x2="160"
                            y2="88"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="8"
                          />
                          <path
                            d="M32,136V51.3a8,8,0,0,1,13.7-5.6L67.6,67.6h0A100.8,100.8,0,0,1,128,48a100.8,100.8,0,0,1,60.4,19.6h0l21.9-21.9A8,8,0,0,1,224,51.3V136c0,48.6-43,88-96,88S32,184.6,32,136Z"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="8"
                          />
                        </svg>
                        <span>Pets Allowed</span>
                      </div>
                    )}
                    {perk === 'entrance' && (
                      <div className="flex gap-2 items-center">
                        <svg
                          id="entrance-alt1"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 15 15"
                        >
                          <path d="M6.554,9.639a.5.5,0,0,0,.707.707L9.928,7.669a.25.25,0,0,0,0-.354h0L7.261,4.639a.5.5,0,0,0-.707.707L8.2,7H1.5a.5.5,0,0,0,0,1H8.2ZM12,1H5.5a.5.5,0,0,0,0,1h6a.5.5,0,0,1,.5.5v10a.5.5,0,0,1-.5.5H5.25a.5.5,0,0,0,0,1H12a1,1,0,0,0,1-1V2A1,1,0,0,0,12,1Z" />{' '}
                        </svg>
                        <span>Private Entrance</span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <h2 className="mt-6 text-xl font-semibold">Things to know</h2>
          <ul className="mt-3 text-gray-700">
            <li className="mt-2">Check-in {place.checkIn}</li>
            <li className="mt-2">Checkout {place.checkOut}</li>
            <li className="mt-2">{place.maxGuests} guests maximum</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookingWidget;