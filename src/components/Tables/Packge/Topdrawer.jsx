import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea
} from "@material-tailwind/react";
import DatePickerAddPackage from "./componants/AddpackageselectDate";
import HotelMenu from "./componants/HotelList";
import RoomTypeSelection from "./componants/RoomSelection";
import TransportationSelection from "./componants/TransportationSelection";
import InnerTransportationSelection from "./componants/innerTransportation";
import { Hidden } from "@mui/material";

export default function DrawerTopPlacement({ openDrawerTop, closeDrawerTop }) {
  const [customHotel, setCustomHotel] = useState('');
  const [hotelMenus, setHotelMenus] = useState([<HotelMenu key={0} />]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(true); // State for DatePicker visibility

  const handleAddHotelMenu = () => {
    setIsVisible((prev) => !prev); // Toggle the value of isVisible
  };

  const handleTextareaClick = () => {
    setDatePickerVisible(true); // Show the DatePicker when the Textarea is clicked
  };

  return (
    <React.Fragment>
      <Drawer
        placement="left"
        open={openDrawerTop}
        onClose={closeDrawerTop}
        className="p-4 z-50 fixed left-0 w-full max-h-screen overflow-y-auto" // Adjusted for scrollable height
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            اضافه بكج جديد
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawerTop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        
        {/* Package Name Input */}
        <label
          htmlFor="customHotel"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
        >
          اسم البكج
        </label>
        <Input
          type="text"
          id="customHotel"
          size="lg"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={customHotel}
          onChange={(e) => setCustomHotel(e.target.value)}
          labelProps={{
            className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
          }}
        />
        
        {/* Package Duration Input */}
        <label
          htmlFor="packageDuration"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
        >
          مدة البكج
        </label>
        <Input
          type="number"
          id="packageDuration"
          size="lg"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={customHotel}
          onChange={(e) => setCustomHotel(e.target.value)}
          labelProps={{
            className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
          }}
        />
        <label
          htmlFor="packageDuration"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
        >
          وصف البكج
        </label>
      
      
        {/* Textarea with DatePicker Trigger */}
        <div className="w-full">
          <Textarea
            label=""
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            onClick={handleTextareaClick} // Show DatePicker on click
          />
        </div>
        <label
          htmlFor="customHotel"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
        >
          تاريخ البكج
        </label>
        {/* Conditionally render DatePicker */}
        {isDatePickerVisible && <DatePickerAddPackage />}
        
        {/* Hotel List Menu */}
        <label
          htmlFor="hotelList"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
        >
          قائمة الفنادق
        </label>
        <div className="flex justify-center items-center mb-4 space-x-4">
          {/* Hotel Menu */}
          <HotelMenu />

          {/* Button with fixed icon */}
          <button
            className="flex items-center bg-none border-none p-0 cursor-pointer block "
            onClick={handleAddHotelMenu}
          >
            <svg
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        {/* The HotelMenu is conditionally shown */}
        <div className={isVisible ? "visible" : "hidden"}>
          <HotelMenu />
        </div>
        <RoomTypeSelection />
        
        <label
          htmlFor="hotelList"
          className=" mt-2 block text-sm font-medium text-gray-700 dark:text-white mb-2"
        >
          اختيار طريقة السفر
        </label>
        <TransportationSelection />

        <label
          htmlFor="hotelList"
          className="mt-2 block text-sm font-medium text-gray-700 dark:text-white mb-2"
        >
          اختيار طريقة السفر الداخلية
        </label>
        <InnerTransportationSelection />

        {/* Buttons */}
        <div className="flex gap-2 justify-center mt-6 mb-6">
        <Button
  size="md"
  className="bg-black text-white border border-transparent hover:bg-transparent hover:text-blue-500 hover:border-blue-500 transition duration-200"
>
  اضافة
</Button>
         
        </div>
      </Drawer>
    </React.Fragment>
  );
}
