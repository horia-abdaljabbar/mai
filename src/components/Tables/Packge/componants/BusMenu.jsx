import React from "react";
import { Button } from "@material-tailwind/react";

const buses = ["باص مكة", "باص الرياض", "باص الدمام", "باص المدينة"];

export default function BusMenu({ closeMenu, onSelectOption, selectedOption }) {
  const handleSelect = (bus) => {
    onSelectOption(bus); // Set the selected bus
    alert(`تم اختيار ${bus}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-center font-medium text-gray-700">اختر الباص</h3>
      <div className="space-y-2">
        {buses.map((bus, index) => (
          <Button
            key={index}
            color={selectedOption === bus ? "green" : "black"}
            onClick={() => handleSelect(bus)}
            size="sm"
            className="w-full"
          >
            {bus}
          </Button>
        ))}
      </div>
    </div>
  );
}
