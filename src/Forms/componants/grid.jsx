import React from "react";
import { SelectDateForm } from "@/components/Tables/Packge/addpackage/SelectDateForm";
import { Button } from "@material-tailwind/react";

export default function AppGrid() {
  const data = [
    { imgelink: "اضافة تاريخ", index: "1" },
    { imgelink: "حجز طيران", index: "2" },
    { imgelink: "حجز باص", index: "3" },
    { imgelink: "حجز قطار", index: "4" },
    { imgelink: "حجز باص", index: "5" },
  ];

  const [activein, setActivein] = React.useState("1");

  return (
    <div className="grid gap-6 p-4">
      {/* Grid for buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map(({ imgelink, index }) => (
          <div key={index} className="flex justify-center">
            <Button
              size="lg"
              onClick={() => setActivein(index)}
              className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[110px] md:w-[110px] bg-black text-white border border-transparent hover:bg-transparent hover:text-black hover:border-black transition duration-200"
            >
              {imgelink}
            </Button>
          </div>
        ))}
      </div>

      {/* Conditionally render the forms */}
      <div className="mt-8 flex justify-center items-center w-full max-w-screen-lg mx-auto">
        {activein === "1" && <SelectDateForm />}
        {activein === "2" && <div>حجز طيران</div>}
        {activein === "3" && <div>حجز باص</div>}
        {activein === "4" && <div>حجز قطار</div>}
        {activein === "5" && <div>حجز باص</div>}
      </div>
    </div>
  );
}
