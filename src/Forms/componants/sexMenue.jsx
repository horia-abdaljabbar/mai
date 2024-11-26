import React, { useState, useEffect } from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

export const MenuBiologicalsex = ({ name, value, onChange, origin }) => {
  // Initialize selectedItem based on origin and value only on the first render
  const [selectedItem, setSelectedItem] = useState("اختيار الجنس البيولوجي"); // Default value
console.log(origin);
  useEffect(() => {
    // Set the selectedItem based on the origin and value when the component mounts or origin changes
    if (origin === "EditCustomerInfoModal" || origin === "StepperWithContent"|| origin==="selectedManagerForm") {
      // Set based on the value prop passed down (1 = "ذكر", 0 = "أنثى")
      setSelectedItem(value === 1 ? "ذكر" : value === 0 ? "أنثى" : "اختيار الجنس البيولوجي");
    } else {
      // Default case
      setSelectedItem("اختيار الجنس البيولوجي");
    }
  }, [origin, value]); // Re-run the effect when origin or value changes

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    onChange(item === "ذكر" ? 1 : 0);
  };

  return (
    <Menu>
      <MenuHandler>
        <Button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-800 focus:border-black-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-800 dark:focus:border-black-800 text-color-gray-900 text-[18px]">
          {selectedItem}
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={() => handleMenuItemClick("ذكر")}>ذكر</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("أنثى")}>أنثى</MenuItem>
      </MenuList>
    </Menu>
    
  );
  
};

export default MenuBiologicalsex;
