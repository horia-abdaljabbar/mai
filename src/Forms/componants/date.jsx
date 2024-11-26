import React, { useState, useEffect, useRef } from 'react';

const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const DatePicker = ({ name, value, onChange, placeholder, readOnly }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const dateRef = useRef(null);

  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        setDatepickerValue(formatDate(parsedDate)); // Format to yyyy-mm-dd
      } else {
        setDatepickerValue(''); // Fallback if the value is invalid
      }
    }
  }, [value]);

  useEffect(() => {
    if (!value && !placeholder) {
      initDate(); // Initialize with today's date if no value or placeholder
    }
    getNoOfDays(); // Recalculate the number of days in the month
  }, []);

  const initDate = () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setDatepickerValue(formattedDate);
    dateRef.current.value = formatDateISO(today); // Set hidden input value in yyyy-mm-dd
  };

  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // Adjust to local time
    return localDate.toISOString().split('T')[0]; // Return in yyyy-mm-dd format
  };

  const formatDateISO = (date) => {
    return date.toISOString().split('T')[0]; // yyyy-mm-dd for hidden input value
  };

  const getDateValue = (date) => {
    const selectedDate = new Date(Date.UTC(year, month, date));
    const formattedDate = formatDate(selectedDate);

    setDatepickerValue(formattedDate);
    dateRef.current.value = formatDateISO(selectedDate);
    setShowDatepicker(false);

    if (onChange) {
      onChange({ target: { name, value: formatDateISO(selectedDate) } });
    }
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();

    const blankDaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowDatepicker(false);
    }
  };

  return (
    <div className="relative">
      <input type="hidden" name={name} ref={dateRef} />
      <div className="justify-between">
        <input
          type="text"
          readOnly
          value={datepickerValue}
          onClick={() => !readOnly && setShowDatepicker(true)} // Only open if not readOnly
          className={`shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5 text-left ${
            readOnly ? 'bg-gray-200 cursor-not-allowed' : ''
          }`}
          placeholder={placeholder || 'Select date'}
        />
        <div className="absolute top-0 px-3 py-2">
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {showDatepicker && !readOnly && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div className="bg-white mt-12 rounded-lg shadow p-4" style={{ width: '17rem' }}>
          <div className="relative">
      <input type="hidden" name="date" ref={dateRef} />
      <div className='justify-between'>
        <input
          type="text"
          readOnly={readOnly} // Disable input if readOnly is true
          value={datepickerValue} // Show placeholder if no date selected
          onClick={() => setShowDatepicker(true)} // Open dialog on click
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
                  onClick={() => { setMonth(month - 1); getNoOfDays(); }}
                >
                  <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${month === 11 ? 'cursor-not-allowed opacity-25' : ''}`}
                  disabled={month === 11}
                  onClick={() => { setMonth(month + 1); getNoOfDays(); }}
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
                  <div style={{ fontSize: '0.63rem', lineHeight: '1rem' }}>{day}</div>
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
                    className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 `}
                  >
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
