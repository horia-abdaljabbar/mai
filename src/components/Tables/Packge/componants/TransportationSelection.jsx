import React, { useState } from "react";
import FlightMenu from "./FlightMenu";
import BusMenu from "./BusMenu";
import { Button } from "@material-tailwind/react";

export default function TransportationSelection() {
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedOption, setSelectedOption] = useState(""); // Store selected option

  const closeMenu = () => {
    setSelectedTransport(null);
  };

  const handleSelectTransport = (transport) => {
    setSelectedTransport((prev) => (prev === transport ? null : transport));
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option); // Set selected option
    closeMenu(); // Close the menu after selection
  };

  return (
    <div className="space-y-6 mt-6">
      
      <div className="flex justify-center mb-4">
        <Button
          color="black"
          size="sm"
          onClick={() => handleSelectTransport("flight")}
          className="mx-2 w-1/3"
        >
          الطيران
        </Button>
        <Button
          color="black"
          size="sm"
          onClick={() => handleSelectTransport("bus")}
          className="mx-2 w-1/3"
        >
          الباص
        </Button>
      </div>

      {selectedTransport === "flight" && (
        <FlightMenu closeMenu={closeMenu} onSelectOption={handleSelectOption} selectedOption={selectedOption} />
      )}
      {selectedTransport === "bus" && (
        <BusMenu closeMenu={closeMenu} onSelectOption={handleSelectOption} selectedOption={selectedOption} />
      )}
    </div>
  );
}
