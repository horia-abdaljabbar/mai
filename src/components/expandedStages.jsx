import React, { useState, useEffect } from "react";
import { StepperWithContent } from "@/Forms/componants/steps";
import { FirstForm } from "@/Forms/firstForm";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { CardPackages } from "@/Forms/packageCard";
import { BookingManagerForm } from "@/Forms/bookingmanager";
import { SelectBookingManager } from "@/Forms/componants/selectbookingmanager";

function StageCard({ id, label, isActive, completed, onClick, children }) {
  return (
    <div className="w-full mb-4">
      <button
        className={`flex justify-between items-center ${
          isActive || completed ? "bg-black" : "bg-gray-400 cursor-not-allowed"
        } text-white py-3 px-6 w-full rounded-lg shadow-md`}
        onClick={onClick}
        disabled={!isActive && !completed}
      >
        <span className="text-lg font-semibold">{label}</span>
        {isActive ? (
          <ChevronUpIcon className="h-6 w-6" />
        ) : (
          <ChevronDownIcon className="h-6 w-6" />
        )}
      </button>
      {isActive && <div className="bg-white p-6 mt-4 rounded-lg shadow-lg">{children}</div>}
    </div>
  );
}

export function ExpandedStages() {
  const [activeStage, setActiveStage] = useState(1); // Start with Stage 1
  const [rooms, setRooms] = useState(0);
  const [travelers, setTravelers] = useState(0);
  const [packages, setPackages] = useState(0);
  const [formsCompletion, setFormsCompletion] = useState([]);
  const [packageManagers, setPackageManagers] = useState({});
  const [availablePeople, setAvailablePeople] = useState([]);
  const names = ["أحمد", "سارة", "محمد", "ليلى"];

  useEffect(() => {
    setFormsCompletion(Array(travelers).fill(false));
    setPackageManagers(Array.from({ length: packages }, () => []));
    setAvailablePeople(
      Array.from({ length: travelers }, (_, i) => names[i % names.length])
    );
  }, [travelers, packages]);

  const handleFormSubmit = (roomsCount, travelersCount, packagesCount) => {
    setRooms(roomsCount);
    setTravelers(travelersCount);
    setPackages(packagesCount);
    setActiveStage(2);
  };

  const handleFormComplete = (index) => {
    setFormsCompletion((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  
    // Allow moving to Stage 3 if at least one form is completed
    if (formsCompletion.some((completed) => completed)) {
      setActiveStage(3);
    }
  };
  

  const handlePackagesCompletion = () => {
    setActiveStage(4);
  };

  const handleManagerSelection = (packageIndex, selectedPerson) => {
    setPackageManagers((prev) => {
      const updated = { ...prev };
      updated[packageIndex] = selectedPerson;
      return updated;
    });
  };

  const renderTravelersForms = () =>
    Array.from({ length: travelers }, (_, index) => (
      <div key={index} className="p-4">
        <StepperWithContent />
      </div>
    ));

  const renderPackagesContent = () =>
    Array.from({ length: packages }, (_, index) => (
      <div key={index}>
        <SelectBookingManager
          packageIndex={index}
          availablePeople={availablePeople}
          selectedManager={packageManagers[index]}
          onManagerSelect={(person) => handleManagerSelection(index, person)}
        />
        <BookingManagerForm
          packageIndex={index}
          availablePeople={availablePeople}
          selectedManager={packageManagers[index]}
          onManagerSelect={(person) => handleManagerSelection(index, person)}
        />
      </div>
    ));

    const isStageCompleted = (stage) => {
      switch (stage) {
        case 1:
          return rooms > 0 && travelers > 0;
        case 2:
          return true; // Always allow Stage 2 to proceed
        case 3:
          return true; // Check all packages are handled
        case 4:
          return true;
        default:
          return false;
      }
    };
    

  const renderStageContent = (stage) => {
    switch (stage) {
      case 1:
        return <FirstForm onSubmit={handleFormSubmit} />;
        case 2:
          return (
            <>
              {renderTravelersForms()}
              <button
                onClick={() => setActiveStage(1)}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md mt-4"
              >
                العودة إلى المرحلة السابقة
              </button>
              <button
                onClick={() => setActiveStage(3)} // Directly move to Stage 3
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md mt-4 ml-4"
              >
                الانتقال إلى المرحلة التالية
              </button>
            </>
          );
        
      case 3:
        return (
          <>
            {renderPackagesContent()}
            <button
              onClick={() => setActiveStage(2)}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md mt-4"
            >
              العودة إلى المرحلة السابقة
            </button>
            <button
              onClick={handlePackagesCompletion}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md mt-4 ml-4"
            >
              الانتقال إلى المرحلة التالية
            </button>
          </>
        );
      case 4:
        return (
          <>
            {Array.from({ length: packages }, (_, index) => (
              <div key={index} className="p-4">
                <CardPackages />
                <p className="mt-2">
                  الأشخاص المسؤولون: {packageManagers[index] || "غير مُعين"}
                </p>
              </div>
            ))}
            <button
              onClick={() => setActiveStage(3)}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md mt-4"
            >
              العودة إلى المرحلة السابقة
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const stages = [
    { id: 1, label: "المرحلة 1" },
    { id: 2, label: "المرحلة 2" },
    { id: 3, label: "المرحلة 3" },
    { id: 4, label: "المرحلة 4" },
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">مراحل التسجيل</h1>
      {stages.map(({ id, label }) => (
        <StageCard
          key={id}
          id={id}
          label={label}
          isActive={activeStage === id}
          completed={isStageCompleted(id)}
          onClick={() => isStageCompleted(id) && setActiveStage(id)}
        >
          {renderStageContent(id)}
        </StageCard>
      ))}
    </div>
  );
}

export default ExpandedStages;