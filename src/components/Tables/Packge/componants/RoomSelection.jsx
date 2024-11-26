import React, { useState } from "react";
import { Button, Input, Typography, Checkbox } from "@material-tailwind/react";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function RoomPriceInput() {
  const [roomTypes, setRoomTypes] = useState({
    single: false,
    double: false,
    suite: false,
    deluxe: false,
  });

  const [prices, setPrices] = useState({
    single: "",
    double: "",
    suite: "",
    deluxe: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (type, value) => {
    setPrices((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleCheckboxChange = (e, type) => {
    setRoomTypes((prev) => ({
      ...prev,
      [type]: e.target.checked,
    }));
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleIconClick = (type) => {
    alert(
      `سعر ${
        type === "single"
          ? "الغرفة المفردة"
          : type === "double"
          ? "الغرفة المزدوجة"
          : type === "suite"
          ? "الجناح"
          : "الغرفة الديلوكس"
      } هو ${prices[type]}`
    );
  };

  return (
    <div className="space-y-6  mt-6">
      {/* Add Room Types Heading */}
      <div className="flex justify-center mb-4">
        <Button
          onClick={toggleCollapse}
          color="black"
          size="sm"
          className="w-full"
        >
          {isOpen ? "إغلاق غرف" : "إضافة غرف"}
        </Button>
      </div>

      {/* Room Types (Collapsed by Default) */}
      {isOpen && (
        <div className="space-y-6">
          {Object.keys(roomTypes).map((type) => (
            <div key={type}>
              {/* Collapsible Header */}
              <div
                className="flex items-center justify-between cursor-pointer p-2 border-b"
              >
                <div className="flex items-center">
                  <Checkbox
                    id={type}
                    checked={roomTypes[type]}
                    onChange={(e) => handleCheckboxChange(e, type)}
                    color="black"
                    className="flex-shrink-0"
                  />
                  <label htmlFor={type} className="text-sm font-medium text-gray-700">
                    {type === "single"
                      ? "غرفة مفردة"
                      : type === "double"
                      ? "غرفة مزدوجة"
                      : type === "suite"
                      ? "جناح"
                      : "غرفة ديلوكس"}
                  </label>
                </div>
                <Button
                  size="sm"
                  className="bg-transparent hover:bg-transparent p-0 flex items-center justify-center"
                  color="black"
                >
                  {/* Chevron icon doesn't change places */}
                  {isOpen ? (
                    <FaChevronUp size={18} />
                  ) : (
                    <FaChevronDown size={18} />
                  )}
                </Button>
              </div>

              {/* Show Price Input Only If Checkbox Is Checked */}
              {roomTypes[type] && (
                <div className="mt-4 space-y-3 ">
                  <div className="flex items-center justify-between ">
                    {/* <Typography className="text-sm text-gray-600">
                      {type === "single"
                        ? "غرفة مفردة"
                        : type === "double"
                        ? "غرفة مزدوجة"
                        : type === "suite"
                        ? "جناح"
                        : "غرفة ديلوكس"}
                    </Typography> */}
                    <div className="   relative flex items-center">
                      <Input
                        type="number"
                        placeholder={`أدخل سعر ${
                          type === "single"
                            ? "الغرفة المفردة"
                            : type === "double"
                            ? "الغرفة المزدوجة"
                            : type === "suite"
                            ? "الجناح"
                            : "الغرفة الديلوكس"
                        }`}
                        value={prices[type]}
                        onChange={(e) => handlePriceChange(type, e.target.value)}
                        className="text-sm text-gray-900 border border-gray-300 rounded-lg p-2 w-1/3"
                        labelProps={{
                            className: "before:content-none after:content-none relative  h-11",
                          }}
                      />
                      <Button
                        onClick={() => handleIconClick(type)}
                     
                        size="sm"
                        className="bg-none"
                        
                      >

<span className="flex items-center  bg-none">
<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

            </span>
   

                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Clear All Button */}
    
    </div>
  );
}
