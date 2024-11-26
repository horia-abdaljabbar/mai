import React, { useState } from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Button, Input } from "@material-tailwind/react";

export default function CountryMenu({ onCountryChange }) {
  const [selectedItem, setSelectedItem] = useState("اختيار الوجهة المرادة");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customCountry, setCustomCountry] = useState("");
  const [menuItems, setMenuItems] = useState(["السعودية", "تركيا", "مصر"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (item) => {
    if (item === "دوله اخرى") {
      setIsCustomInput(true);
      setSelectedItem("");
    } else {
      setSelectedItem(item);
      setIsCustomInput(false);
      onCountryChange(item); // Pass selected country to parent

    }
    setIsMenuOpen(false); // Close the menu after selection
  };

  const handleAddCountry = () => {
    if (customCountry.trim() !== "") {
      setMenuItems((prev) => [...prev, customCountry]); // Add the new country to the menu list
      setSelectedItem(customCountry); // Set the button text to the new country
      onCountryChange(customCountry); // Pass the new custom country to the parent
      setCustomCountry(""); // Clear the input field
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
            <span>{selectedItem || "اختيار الوجهة المرادة"}</span>
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
          {menuItems.map((country, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(country)}>
              {country}
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleMenuItemClick("دوله اخرى")}>
            دوله اخرى
          </MenuItem>
        </MenuList>
      </Menu>

      {isCustomInput && (
        <div className="mt-2">
        <Input
            size="lg"
           
        
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
        
            value={customCountry}
            onChange={(e) => setCustomCountry(e.target.value)}
          />
          <Button
            onClick={handleAddCountry}
            className="mt-2 bg-blue-500 text-white rounded-lg p-2 w-full transition duration-300 hover:bg-blue-600"
          >
            إضافة دولة جديدة
          </Button>
        </div>
      )}
    </div>
  );
}
