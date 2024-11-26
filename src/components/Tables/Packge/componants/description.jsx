import React from 'react';
import AvailableDatePicker from '@/Forms/componants/package/componant/ShowAvailabledate';
export default function Description({ openCenter, closeDrawerCenter ,text }) {
  return (
    <React.Fragment>
      {/* Only show the drawer when openCenter is true */}
      {openCenter && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="mb-6 flex items-center justify-between">
              <h5 className="text-xl font-bold text-blue-gray-700">الوصف</h5>
              <button onClick={closeDrawerCenter} className="px-4 py-2 bg-none text-gray rounded-lg hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-gray-600">
              <p>{text}</p>
              {/* Add any content or details here */}
            </div>
       
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
