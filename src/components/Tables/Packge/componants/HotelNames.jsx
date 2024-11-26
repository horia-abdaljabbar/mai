// HotelNamesMenu.jsx
import React, { useState } from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

const HotelNamesMenu = () => {
  const [selectedHotel, setSelectedHotel] = useState("اختيار اسم الفندق");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customHotel, setCustomHotel] = useState("");
  const [hotelNames, setHotelNames] = useState([
    "فندق الريتز",
    "فندق برج العرب",
    "فندق موفنبيك",
    "فندق كمبنسكي",
    "فندق الشيراتون",
    "فندق فيرمونت",
    "فندق هيلتون",
    "فندق ماريوت",
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (item) => {
    if (item === "فندق آخر") {
      setIsCustomInput(true);
      setSelectedHotel("");
    } else {
      setSelectedHotel(item);
      setIsCustomInput(false);
    }
    setIsMenuOpen(false); // Close the menu after selection
  };

  const handleAddHotel = () => {
    if (customHotel.trim() !== "") {
      setHotelNames((prev) => [...prev, customHotel]); // Add the new hotel to the menu list
      setSelectedHotel(customHotel); // Set the button text to the new hotel name
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
            <span>{selectedHotel || "اختيار اسم الفندق"}</span>
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-2 h-2" // Ensure the width and height are set
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
          {hotelNames.map((hotel, index) => (
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
        <div className="mt-2">
          <input
            type="text"
            value={customHotel}
            onChange={(e) => setCustomHotel(e.target.value)}
            placeholder="أدخل اسم الفندق الجديد"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <Button
            onClick={handleAddHotel}
            className="mt-2 bg-blue-500 text-white rounded-lg p-2 w-full transition duration-300 hover:bg-blue-600"
          >
            إضافة فندق جديد
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelNamesMenu;
