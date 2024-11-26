import React, { useState, useEffect } from 'react';

const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const SpecificDatePicker = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
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
      if (prevDates.includes(selectedDate)) {
        return prevDates.filter(d => d !== selectedDate); // Remove if already selected
      } else {
        return [...prevDates, selectedDate]; // Add if not selected
      }
    });
  };

  const saveDates = () => {
    console.log("Saved Dates:", selectedDates); // Log saved dates
    setShowDatepicker(false); // Close the datepicker after saving
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    setBlankDays(Array.from({ length: dayOfWeek }, (_, i) => i + 1));
    setNoOfDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  const openDatepicker = (e) => {
    e.stopPropagation();  // Prevent click from closing the dialog
    setShowDatepicker(true);
  };

  return (
    <div className="relative">
      <button
        onClick={openDatepicker}
        className="shadow-lg border border-gray-400 text-gray-800 sm:text-sm rounded-md p-2 bg-gray-100 hover:bg-gray-200"
      >
        {selectedDates.length === 0 ? "Add Dates" : `Selected ${selectedDates.length} dates`}
      </button>

      {showDatepicker && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => e.stopPropagation()} // Prevent dialog close
        >
          <div
            className="bg-gray-900 mt-12 rounded-lg shadow p-4 text-white"
            style={{ width: '17rem' }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks within the date picker from propagating
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-lg font-bold">{MONTH_NAMES[month]}</span>
                <span className="ml-1 text-lg font-normal">{year}</span>
              </div>
              <div>
                <button
                  type="button"
                  className="transition ease-in-out duration-100 inline-flex cursor-pointer p-1 rounded-full hover:bg-gray-800"
                  onClick={() => {
                    setMonth(month === 0 ? 11 : month - 1);
                    setYear(month === 0 ? year - 1 : year);
                  }}
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="transition ease-in-out duration-100 inline-flex cursor-pointer p-1 rounded-full hover:bg-gray-800"
                  onClick={() => {
                    setMonth(month === 11 ? 0 : month + 1);
                    setYear(month === 11 ? year + 1 : year);
                  }}
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap mb-3 -mx-1">
              {DAYS.map((day, index) => (
                <div style={{ width: '14.28%' }} className="px-1" key={index}>
                  <div className="text-center text-xs font-medium text-gray-400">{day}</div>
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
                      className={`cursor-pointer text-center text-sm rounded-full p-1 ${
                        isSelected ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {date}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={saveDates}
              className="mt-3 w-full bg-gray-800 text-white py-1 rounded hover:bg-gray-700"
            >
              Save Dates
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificDatePicker;
