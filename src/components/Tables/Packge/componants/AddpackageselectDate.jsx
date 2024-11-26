import React, { useState, useEffect, useRef } from 'react';
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea
} from "@material-tailwind/react";
const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const DatePickerAddPackage = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [availableDates, setAvailableDates] = useState([1, 2, 5, 7, 10, 12, 15]); // Example of available dates
  const [selectAllDates, setSelectAllDates] = useState(false);
  const dateRef = useRef(null);

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setDatepickerValue(formattedDate);
    dateRef.current.value = formatDateISO(today); // Set hidden input value in yyyy-mm-dd
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format: dd-mm-yyyy
  };

  const formatDateISO = (date) => {
    return date.toISOString().split('T')[0]; // yyyy-mm-dd for hidden input value
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const getDateValue = (date) => {
    const selectedDate = new Date(year, month, date);
    const formattedDate = formatDate(selectedDate);
    setDatepickerValue(formattedDate);
    dateRef.current.value = formatDateISO(selectedDate); // Set hidden input value
    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();

    const blankDaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };

  const isAvailable = (date) => {
    return selectAllDates || availableDates.includes(date);
  };

  const handleSelectAllDates = () => {
    setSelectAllDates(!selectAllDates);
  };

  const handleConfirmSelection = () => {
    if (selectAllDates) {
      setAvailableDates([...noOfDays]); // Make all days in the current month available
    }
    setSelectAllDates(false); // Exit "select all" mode
    setShowDatepicker(false); // Hide date picker on confirmation
  };

  return (
    <div className="relative">
      <input type="hidden" name="date" ref={dateRef} />
      <div className="justify-between">
        <input
          type="text"
          readOnly
          value={datepickerValue}
          onClick={() => setShowDatepicker(!showDatepicker)}
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
        <div className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0" style={{ width: '17rem' }}>
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
                  onClick={() => isAvailable(date) && getDateValue(date)}
                  className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${isToday(date) ? 'bg-black text-white' : (isAvailable(date) ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300')}`}
                >
                  {date}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <Button onClick={handleSelectAllDates} size="sm" className="px-2 py-1 border rounded text-sm">
              {selectAllDates ? '  عرض التواريخ المتاحة' : 'اضافه تاريخ اخر '}
            </Button>
            <Button size="sm" variant="outlined"onClick={handleConfirmSelection} >
              موافق
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerAddPackage;
