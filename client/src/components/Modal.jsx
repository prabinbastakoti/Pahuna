import { useState } from 'react';

const Modal = ({ modalTitle, modalData, setModal }) => {
  return (
    <div>
      <div className="fixed bottom-0 right-0 min-h-screen w-screen bg-black bg-opacity-50 overflow-y-auto">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-3xl max-h-full overflow-y-auto md:w-3/4 pt-8 px-8 pb-4 rounded-2xl">
          <div className="relative mb-4 border-b-2 border-gray-300 pb-4">
            <div className="w-full text-center text-xl font-bold">
              {modalTitle}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
              className="hover:cursor-pointer brightness-75 hover:brightness-100 w-7 h-7 absolute top-0 left-0"
              onClick={() => {
                setModal(false);
              }}
            >
              <path
                fill="#F44336"
                d="M21.5 4.5H26.501V43.5H21.5z"
                transform="rotate(45.001 24 24)"
              ></path>
              <path
                fill="#F44336"
                d="M21.5 4.5H26.5V43.501H21.5z"
                transform="rotate(135.008 24 24)"
              ></path>
            </svg>
          </div>
          <div className="text-base pb-4 mb-4 whitespace-pre-wrap">
            {modalData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
