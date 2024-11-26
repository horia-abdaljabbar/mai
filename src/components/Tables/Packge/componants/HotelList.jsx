import React, { useState } from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Button, Input } from "@material-tailwind/react";
import DatePicker from "@/Forms/componants/date";
import HotelMealMenu from "./HotelMeals";
import HotelViewMenu from "./hoteltypes";

import HotelNamesMenu from "./HotelNames";
export default function HotelMenu() {
  const [selectedItem, setSelectedItem] = useState("اختيار الفندق");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customHotel, setCustomHotel] = useState("");
  const [menuItems, setMenuItems] = useState(["فندق 1", "فندق 2", "فندق 3"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (item) => {
    if (item === "فندق آخر") {
      setIsCustomInput(true);
      setSelectedItem("");
    } else {
      setSelectedItem(item);
      setIsCustomInput(false);
    }
    setIsMenuOpen(false); // Close the menu after selection
  };

  const handleAddHotel = () => {
    if (customHotel.trim() !== "") {
      setMenuItems((prev) => [...prev, customHotel]); // Add the new hotel to the menu list
      setSelectedItem(customHotel); // Set the button text to the new hotel
      setCustomHotel(""); // Clear the input field
      setIsCustomInput(false); // Hide the input field and button
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  return (
    <div className="w-full">
      <Menu>
        <MenuHandler>
          <Button
            onClick={toggleMenu}
            className="flex justify-between items-center w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-800 focus:border-black-800 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition duration-300 hover:bg-gray-100"
          >
            <span>{selectedItem || "اختيار الفندق"}</span>
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-2 h-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </Button>
        
        </MenuHandler>
        <MenuList className="max-h-60 overflow-y-auto">
          {menuItems.map((hotel, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(hotel)}>
              {hotel}
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleMenuItemClick("فندق آخر")}>
            فندق آخر
          </MenuItem>
        </MenuList>
      </Menu>

      {isCustomInput && (
        <div className="mt-4">
          {/* Label above the input */}
          <label
            htmlFor="customHotel"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          >
            أدخل اسم الفندق الجديد
          </label>
        
        <HotelNamesMenu/>
           <label
            htmlFor="customHotel"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          >
            أدخل تاريخ الدخول الى الفندق 
          </label>
          <DatePicker/>

          <label
            htmlFor="customHotel"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          >
            أدخل  عدد الليالي في الفندق 
          </label>
          <Input
type="number"
            id=""
            size="lg"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={''}
            onChange={(e) => setCustomHotel(e.target.value)}
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
          />

<label
            htmlFor="customHotel"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          >
        انواع الوجبات المتاحة في الفندق
          </label>
        <HotelMealMenu/>

        
<label
            htmlFor="customHotel"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          >
        انواع الاطلالة المتاحة في الفندق
          </label>
        <HotelViewMenu/>

          <Button
            onClick={handleAddHotel}
            className="mt-4 bg-blue-500 text-white rounded-lg p-2 w-full transition duration-300 hover:bg-blue-600"
          >
            إضافة فندق جديد
          </Button>
        </div>
      )}
    </div>
  );
}
