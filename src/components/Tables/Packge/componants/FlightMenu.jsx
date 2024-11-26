import React from "react";
import { Button } from "@material-tailwind/react";

const flights = ["طيران الإمارات", "الخطوط السعودية", "الخطوط القطرية", "الطيران العماني"];

export default function FlightMenu({ closeMenu, onSelectOption, selectedOption }) {
  const handleSelect = (flight) => {
    onSelectOption(flight); // Set the selected flight
    alert(`تم اختيار ${flight}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-center font-medium text-gray-700">اختر رحلة الطيران</h3>
      <div className="space-y-2">
        {flights.map((flight, index) => (
          <Button
            key={index}
            color={selectedOption === flight ? "green" : "black"}
            onClick={() => handleSelect(flight)}
            size="sm"
            className="w-full"
          >
            {flight}
          </Button>
        ))}
      </div>
    </div>
  );
}
