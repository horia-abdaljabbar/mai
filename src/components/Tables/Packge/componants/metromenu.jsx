import React from "react";
import { Button } from "@material-tailwind/react";

// Define a list of train names
const trains = ["قطار الحرمين", "قطار الشرقية", "قطار الجنوب", "قطار الرياض"];

export default function TrainMenu({ closeMenu, onSelectOption, selectedOption }) {
  const handleSelect = (train) => {
    onSelectOption(train); // Set the selected train
    alert(`تم اختيار ${train}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-center font-medium text-gray-700">اختر القطار</h3>
      <div className="space-y-2">
        {trains.map((train, index) => (
          <Button
            key={index}
            color={selectedOption === train ? "green" : "black"}
            onClick={() => handleSelect(train)}
            size="sm"
            className="w-full"
          >
            {train}
          </Button>
        ))}
      </div>
    </div>
  );
}
