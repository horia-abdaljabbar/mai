// HotelMealMenu.jsx
import React, { useState } from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

const HotelMealMenu = () => {
  const [selectedItem, setSelectedItem] = useState("اختيار نوع الوجبة");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customMeal, setCustomMeal] = useState("");
  const [mealOptions, setMealOptions] = useState([
    "إفطار",
    "غداء",
    "عشاء",
    "وجبات خفيفة",
    "مأكولات بحرية",
    "نباتي",
    "أطباق عربية",
    "أطباق إيطالية",
    "أطباق هندية",
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (item) => {
    if (item === "وجبة أخرى") {
      setIsCustomInput(true);
      setSelectedItem("");
    } else {
      setSelectedItem(item);
      setIsCustomInput(false);
    }
    setIsMenuOpen(false); // Close the menu after selection
  };

  const handleAddMeal = () => {
    if (customMeal.trim() !== "") {
      setMealOptions((prev) => [...prev, customMeal]); // Add the new meal type to the menu list
      setSelectedItem(customMeal); // Set the button text to the new meal type
      setCustomMeal(""); // Clear the input field
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
            <span>{selectedItem || "اختيار نوع الوجبة"}</span>
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
          {mealOptions.map((meal, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(meal)}>
              {meal}
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleMenuItemClick("وجبة أخرى")}>
            وجبة أخرى
          </MenuItem>
        </MenuList>
      </Menu>

      {isCustomInput && (
        <div className="mt-2">
          <input
            type="text"
            value={customMeal}
            onChange={(e) => setCustomMeal(e.target.value)}
            placeholder="أدخل نوع الوجبة الجديدة"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <Button
            onClick={handleAddMeal}
            className="mt-2 bg-blue-500 text-white rounded-lg p-2 w-full transition duration-300 hover:bg-blue-600"
          >
            إضافة وجبة جديدة
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelMealMenu;
