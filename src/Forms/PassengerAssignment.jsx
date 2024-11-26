import React, { useState } from 'react';

function PassengerAssignment({ packageIndex, travelers, assignedManagers, onManagerSelection }) {
  const [selectedPassengers, setSelectedPassengers] = useState(assignedManagers || []);

  const handleSelectPassenger = (passenger) => {
    if (selectedPassengers.includes(passenger)) {
      setSelectedPassengers((prev) => prev.filter((p) => p !== passenger));
    } else {
      setSelectedPassengers((prev) => [...prev, passenger]);
    }
  };

  const handleConfirmSelection = () => {
    onManagerSelection(selectedPassengers);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">حزمة {packageIndex + 1}</h3>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: travelers }, (_, index) => (
          <button
            key={index}
            onClick={() => handleSelectPassenger(`مسافر ${index + 1}`)}
            className={`px-4 py-2 rounded ${
              selectedPassengers.includes(`مسافر ${index + 1}`)
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            مسافر {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={handleConfirmSelection}
        className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
      >
        تأكيد الاختيار
      </button>
    </div>
  );
}

export default PassengerAssignment;
