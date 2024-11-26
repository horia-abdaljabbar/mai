import {
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import SpecificDatePicker from "@/Forms/componants/package/componant/selectdate";

export function SelectDateForm() {
  const [currentDate, setCurrentDate] = useState('');
  const [rooms, setRooms] = useState('');
  const [travelers, setTravelers] = useState('');
  const [packages, setPackages] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setCurrentDate(formattedDate);
  }, []);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rooms && travelers && packages) {
      onSubmit(rooms, travelers, packages);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto gap-8 p-6 bg-white rounded-lg shadow-lg">
     <Typography 
  variant="h3" 
  className="text-center text-3xl mb-1.5 font-bold  bg-gradient-to-r from-black to-teal-500 text-transparent bg-clip-text"
>
  اضافة تواريخ البكج
</Typography>


      <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
        {/* Centered Date Picker */}
        <div className="flex justify-center mb-4 w-full">
          <SpecificDatePicker onDateChange={handleDateChange} />
        </div>

       
      </form>

      {/* Selected Dates Display */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {selectedDates.map((date, index) => (
          <span
            key={index}
            className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-lg shadow"
          >
            {date}
          </span>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-8 py-3 bg-black text-white font-semibold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleSubmit}
        >
          اضافة
        </button>
      </div>
    </div>
  );
}
