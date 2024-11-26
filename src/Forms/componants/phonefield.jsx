import React, { useState, useEffect } from "react";
import { Input, Menu, MenuHandler, MenuList, MenuItem, Button,errorMessage } from "@material-tailwind/react";

const COUNTRIES = [
  "Palestine (+970)",
  "France (+33)",
  "Germany (+49)",
  "Spain (+34)",
  "USA (+1)",
  "no code"
  
];
const CODES = ["+970", "+33", "+49", "+34", "+1","+"];

export const InputPhoneCountryCode = ({ name, value, onChange,placeholder }) => {
  const [country, setCountry] = useState(null);  // Initially no country selected
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");  // For error messages
  const [isValid, setIsValid] = useState(false); // To track validation state

  // Effect to handle initial value
  useEffect(() => {
    if (value && CODES.includes(value.split(" ")[0])) {
      const countryCode = value.split(" ")[0];
      setCountry(CODES.indexOf(countryCode)); // Find country by code
      setPhoneNumber(value.replace(countryCode, "").trim()); // Remove code from initial value
    }
  }, [value]);

  // Validate the phone number based on the selected country

  const validatePhoneNumber = (phone) => {
    let isValid = false;
  
    // If the phone number is cleared (empty), show an error based on country
    // if (phone === "") {
    //   if (country !== null) {
    //     setError("رقم الجوال يجب أن يتكون من " + (CODES[country] === "+970" ? "  9 خانات بدون صفر المقدمة" : "  10 خانات") );
    //   }
    //   return isValid;
    // }
  
    if (phone === "") {
      if (name === "phoneNumber") {  // Check if it's the main phone number field
        console.log("Error: Phone number is required.");
        setError(errorMessage);  // Display error for phone number
      } else if (name === "emergencyContactPhone") {  // Check if it's the emergency contact phone field
        setError(errorMessage);  // Display error for emergency contact
      }
      return isValid;
    }
    // If a country is selected, validate based on country code      // No country selected, validate for 10 digits
      if (phone.length === 10) {
        isValid = true;
        setError("");
      } else {
        setError("رقم الجوال يجب أن يتكون من 10 خانات");
      }
    
  
    // Validation rules based on selected country code
    if (CODES[country] === "+970") {
      if (phone.length === 9) {
        isValid = true;
        setError("");
      } else {
        setError("رقم الجوال يجب أن يتكون من 9 خانات بدون صفرالمقدمة");
      }
    } else if (CODES[country] === "+33") {
      if (phone.length === 9) {
        isValid = true;
        setError("");
      } else {
        setError("French numbers must be 9 digits.");
      }
    } else if (CODES[country] === "+49") {
      if (phone.length === 10) {
        isValid = true;
        setError("");
      } else {
        setError("German numbers must be 10 digits.");
      }
    } else if (CODES[country] === "+34") {
      if (phone.length === 9) {
        isValid = true;
        setError("");
      } else {
        setError("Spanish numbers must be 9 digits.");
      }
    } 
    else if (CODES[country] === "+1") {
      if (phone.length === 10) {
        isValid = true;
        setError("");
      } else {
        setError("US numbers must be 10 digits.");
      }

    }

    

    else {
      // Fallback for unrecognized or missing country code (i.e., "+")
      if (phone.length === 10) {
        isValid = true;
        setError("");
      } else {
        setError("رقم الجوال يجب أن يتكون من 10 خانات");
      }
    
    }

    
  
    setIsValid(isValid);  // Update the validation state
    return isValid;
  };
  
  const handleInputChange = (e) => {
    let phoneNumber = e.target.value;
    phoneNumber = phoneNumber.replace(/[^\d]/g, "");  // Regex to remove non-numeric characters

    // If Palestine (+970) is selected, remove leading zero
    if (country !== null && CODES[country] === "+970" && phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.slice(1); // Remove the leading zero for Palestine
    }
  
    // Limit phone number length (for Palestine, it's 9 digits)
    if (country !== null && CODES[country] === "+970") {
      phoneNumber = phoneNumber.slice(0, 9); // Limit to 9 digits for Palestine
    }
  
    // If no country is selected, limit the phone number to 10 digits
    if (country === null) {
      phoneNumber = phoneNumber.slice(0, 10); // Limit to 10 digits
    }
    if (country !== null && CODES[country] === "+" && phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.slice(0,10); // Remove the leading zero for Palestine
    }
    // Set phone number state
   
    setPhoneNumber(phoneNumber);
  
    // Validate phone number
    const isValid = validatePhoneNumber(phoneNumber);
  
    // Pass back to the parent component with the selected country code
    const formattedNumber = country !== null
      ? `${CODES[country]} ${phoneNumber.trim()}`
      : phoneNumber.trim();
  
    onChange({
      target: {
        name,
        value: formattedNumber,
      },
    });
  };
  

  // Format the phone number display value
  const displayValue = phoneNumber.trim();

  // Handle selecting a country code from the menu
  const handleMenuItemClick = (index) => {
    setCountry(index); // Set the country index
    setPhoneNumber(""); // Reset phone number when changing country
  };

  return (
  <>
    <div className="relative flex w-full">
      <Menu>
        <MenuHandler>
          <Button
            ripple={true}
            variant="text"
            color="blue-gray"
            className="w-14 shrink-0 border border-blue-gray-200 bg-transparent px-3"
          >
            {country !== null ? CODES[country] : "+"} {/* Display the selected country code */}
          </Button>
        </MenuHandler>
        <MenuList >
          {COUNTRIES.map((countryName, index) => (
            <MenuItem key={countryName} onClick={() => handleMenuItemClick(index)}>
              {countryName}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input
        size="lg"
        type="tel"
        pattern="[0-9]*"
        inputMode="numeric"

        maxLength={12} // Max length: country code + 9 digits
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        labelProps={{
          className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
        }}
        onChange={handleInputChange} // Handle input change
        value={displayValue} // Show the phone number without country code
      />

    </div>
     <div >
     {/* Error message under the input */}
     {(!errorMessage && error && (
          <div className="error-text" style={{ color: 'red', fontSize: '16px' }}>
            {error}
          </div>
        ))}
 </div>
  </>
  );
};

export default InputPhoneCountryCode;
