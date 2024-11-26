import {
    Input,
    Typography,
  } from "@material-tailwind/react";

  import React, { useState, useEffect } from 'react';
  import DatePicker from "@/Forms/componants/date";
  import CountryMenue from '@/Forms/componants/destination';
  
  export function AddPackageForm({ onSubmit }) {
    const [currentDate, setCurrentDate] = useState('');
    const [rooms, setRooms] = useState('');
    const [travelers, setTravelers] = useState('');
    const [packages, setPackages] = useState('');
  
    // Get today's date and format it as YYYY-MM-DD
    useEffect(() => {
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10); // Extract the date part in YYYY-MM-DD format
      setCurrentDate(formattedDate);
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (rooms && travelers && packages) {
        // Pass the number of rooms and travelers to the parent component
        onSubmit(rooms, travelers, packages);
      }
    };
  
    return (
      <div className="flex flex-col w-full gap-8 mb-6 p-4 bg-white rounded-lg shadow-lg">
        <Typography variant="h3" color="blue-gray" className="text-center text-2xl font-semibold">
          تحديد تفاصيل العامة للرحلة
        </Typography>
  
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex flex-col md:w-1/4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              الوجهة المرادة
            </Typography>
            <CountryMenue />
          </div>
  
          <div className="flex flex-col md:w-1/4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              عدد الغرف
            </Typography>
            <Input
              size="lg"
             
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              labelProps={{
                className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
              }}
            />
          </div>
  
          <div className="flex flex-col md:w-1/4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              عدد المسافرين
            </Typography>
            <Input
              size="lg"
             
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              labelProps={{
                className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
              }}
            />
          </div>
  
          <div className="flex flex-col md:w-1/4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              التاريخ المراد للرحلة
            </Typography>
            <DatePicker />
          </div>
        </form>
  
        {/* <div className="flex flex-col justify-center mb-4">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            عدد البكجات
          </Typography>
          <Input
              size="lg"
             
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              labelProps={{
                className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
              }}
            />
        </div> */}
  
        {/* Centered button */}
        {/* <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 w-1/2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleSubmit}
          >
            بحث
          </button>
        </div> */}
      </div>
    );
  }
  