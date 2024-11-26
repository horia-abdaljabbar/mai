import React, { useState, useEffect, useRef } from 'react';

const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const AvailableDatePicker = ({ availableDates = [] }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const dateRef = useRef(null);

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setDatepickerValue(formattedDate);
    dateRef.current.value = formatDateISO(today);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateISO = (date) => date.toISOString().split('T')[0];

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const isAvailable = (date) => {
    const dateString = formatDateISO(new Date(year, month, date));
    return availableDates.includes(dateString);
  };

  const getDateValue = (date) => {
    if (!isAvailable(date)) return;
    const selectedDate = new Date(year, month, date);
    const formattedDate = formatDate(selectedDate);
    setDatepickerValue(formattedDate);
    dateRef.current.value = formatDateISO(selectedDate);
    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();

    setBlankDays(Array.from({ length: dayOfWeek }, (_, i) => i + 1));
    setNoOfDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) setShowDatepicker(false);
  };

  return (
    <div className="relative">
      <input type="hidden" name="date" ref={dateRef} />
      <div className="justify-between">
        <input
          type="text"
          readOnly
          value={datepickerValue}
          onClick={() => setShowDatepicker(true)}
          onKeyDown={(e) => e.key === 'Escape' && setShowDatepicker(false)}
          className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5 text-left"
          placeholder="Select date"
        />
        <div className="absolute top-0 px-3 py-2">
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {showDatepicker && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div className="bg-white mt-12 rounded-lg shadow p-4" style={{ width: '17rem' }}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
                <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
              </div>
              <div>
                <button
                  type="button"
                  className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${month === 0 ? 'cursor-not-allowed opacity-25' : ''}`}
                  disabled={month === 0}
                  onClick={() => setMonth(month - 1)}
                >
                  <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${month === 11 ? 'cursor-not-allowed opacity-25' : ''}`}
                  disabled={month === 11}
                  onClick={() => setMonth(month + 1)}
                >
                  <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap mb-3 -mx-1">
              {DAYS.map((day, index) => (
                <div style={{ width: '14.28%' }} className="px-1" key={index}>
                  <div className="" style={{ fontSize: '0.63rem', lineHeight: '1rem' }}>{day}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap -mx-1">
              {blankDays.map((_, index) => (
                <div style={{ width: '14.28%' }} className="text-center border p-1 border-transparent text-sm" key={index}></div>
              ))}
              {noOfDays.map((date, dateIndex) => (
                <div style={{ width: '14.28%' }} className="px-1 mb-1" key={dateIndex}>
                  <div
                    onClick={() => getDateValue(date)}
                    className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                      isAvailable(date)
                        ? isToday(date) ? 'bg-black-500 text-white' : 'text-gray-700 hover:bg-black-200'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableDatePicker;
