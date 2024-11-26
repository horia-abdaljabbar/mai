import React, { useState, useEffect } from 'react';

const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const SpecificDatePicker = ({ onDateChange }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const toggleDate = (date) => {
    const selectedDate = new Date(year, month, date).toISOString().split('T')[0];
    setSelectedDates((prevDates) => {
      const newDates = prevDates.includes(selectedDate)
        ? prevDates.filter(d => d !== selectedDate)
        : [...prevDates, selectedDate];
      onDateChange(newDates); // Send updated dates to parent
      return newDates;
    });
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    setBlankDays(Array.from({ length: dayOfWeek }, (_, i) => i + 1));
    setNoOfDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-white" style={{ width: '30rem' }}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-lg font-bold text-amber-900">{MONTH_NAMES[month]}</span>
          <span className="ml-1 text-lg font-normal text-amber-900">{year}</span>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="bg-gray-200 transition ease-in-out duration-100 inline-flex cursor-pointer p-2 rounded-full hover:bg-gray-800 text-amber-900"
            onClick={() => {
              setMonth(month === 0 ? 11 : month - 1);
              setYear(month === 0 ? year - 1 : year);
            }}
          >
            {/* Left Arrow Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15 10a1 1 0 01-1 1H7.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L7.414 9H14a1 1 0 011 1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            className="bg-gray-200 transition ease-in-out duration-100 inline-flex cursor-pointer p-2 rounded-full hover:bg-gray-800 text-amber-900 ml-2"
            onClick={() => {
              setMonth(month === 11 ? 0 : month + 1);
              setYear(month === 11 ? year + 1 : year);
            }}
          >
            {/* Right Arrow Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h6.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L12.586 11H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mb-3 -mx-1">
        {DAYS.map((day, index) => (
          <div style={{ width: '14.28%' }} className="px-1" key={index}>
            <div className="text-center text-md font-medium text-gray-400">{day}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap -mx-1">
        {blankDays.map((_, index) => (
          <div style={{ width: '14.28%' }} className="text-center p-1" key={index}></div>
        ))}
        {noOfDays.map((date, index) => {
          const dateISO = new Date(year, month, date).toISOString().split('T')[0];
          const isSelected = selectedDates.includes(dateISO);

          return (
            <div style={{ width: '14.28%' }} className="px-1 mb-1" key={index}>
              <div
                onClick={() => toggleDate(date)}
                className={`cursor-pointer text-center text-lg rounded-full p-1 ${
                  isSelected ? 'bg-black text-white' : 'text-black hover:bg-gray-200'
                }`}
              >
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecificDatePicker;
