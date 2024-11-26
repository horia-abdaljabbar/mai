import { Input, Typography } from "@material-tailwind/react";
import InputPhoneCountryCode from "./componants/phonefield";
import React, { useState, useEffect } from "react";
import DatePicker from "./componants/date";
import CountryMenue from "@/Forms/componants/destination";

export function FirstForm({ onSubmit }) {
  const [currentDate, setCurrentDate] = useState("");
  const [rooms, setRooms] = useState("");
  const [travelers, setTravelers] = useState("");
  const [packages, setPackages] = useState("");
  const cacheName = "formCache"; // Cache name for the form data
  const [selectedCountry, setSelectedCountry] = useState("");
  const [errors, setErrors] = useState({});


  // Get today's date and format it as YYYY-MM-DD
  useEffect(() => {
    // const today = new Date();
    // const formattedDate = today.toISOString().slice(0, 10); // Extract the date part in YYYY-MM-DD format
    // setCurrentDate(formattedDate);

    // Attempt to load cached data on component mount
    loadFromCache();
  }, []);
  // Function to handle country selection
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    console.log("Selected Country: ", country); // Do whatever you need with the selected country
  };
  // Save form data to Cache API
  const saveToCache = async (data) => {
    const cache = await caches.open(cacheName);
    const response = new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
    await cache.put("/form-data", response);
    console.log("Data saved to cache:", data); // Log confirmation
  };

  // Retrieve form data from Cache API
  const loadFromCache = async () => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match("/form-data");
    if (cachedResponse) {
      const data = await cachedResponse.json();
      console.log("Loaded data from cache:", data);
      // setRooms(data.rooms || "");
      // setTravelers(data.travelers || "");
      // setPackages(data.packages || "");
    } else {
      console.log("No cached data found.");
    }
  };

  // Clear customer IDs cache when travelers count changes
  const handleTravelersChange = async (e) => {
    setTravelers(e.target.value);

    // Clear the customerIds cache when travelers count changes
    const idCache = await caches.open("customerCache"); // Replace with actual ID cache name
    await idCache.delete("/customerIds");
    console.log("Customer IDs cache cleared");

    const customerIds = []; // Assuming an empty array since no customers yet
    await idCache.put("/customerIds", new Response(JSON.stringify(customerIds), {
      headers: { "Content-Type": "application/json" },
    }));
    console.log("Customer IDs cache reset");
  };
 // Validation function
 const validateForm = () => {
  const errors = {};
  
  if (!rooms) {
    errors.rooms = "عدد الغرف مطلوب"; // Packages are required
  } else if (rooms <= 0) {
    errors.rooms = "عدد الغرف يجب أن يكون رقمًا أكبر من 0"; // Packages must be greater than 0
  }

  if (!travelers) {
    errors.travelers = "عدد المسافرين مطلوب"; // Packages are required
  } else if (travelers <= 0) {
    errors.travelers = "عدد المسافرين يجب أن يكون رقمًا أكبر من 0"; // Packages must be greater than 0
  }

  if (!packages) {
    errors.packages = "عدد البكجات مطلوب"; // Packages are required
  } else if (packages <= 0) {
    errors.packages = "عدد البكجات يجب أن يكون رقمًا أكبر من 0"; // Packages must be greater than 0
  }

  if (!currentDate) {
    errors.currentDate = "التاريخ المراد للرحلة مطلوب";
  } else {
    const selectedDate = new Date(currentDate);
    const today = new Date();
    if (selectedDate <= today) {
      errors.currentDate = "يجب تحديد تاريخ بعد التاريخ الحالي";
    }
  }

  if (!selectedCountry) {
    errors.selectedCountry = "اختيار الوجهة  مطلوب";
  }

  return errors;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateForm();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    // Prepare form data object
    const formData = {
      rooms,
      travelers,
      packages,
      date: currentDate,
      country: selectedCountry
    };

    // Save form data to Cache API
    await saveToCache(formData);

    // Pass data to the parent component
    onSubmit(rooms, travelers, packages, currentDate, selectedCountry);

    // Log cached data (optional)
    await loadFromCache();
  }
};
// Use effect to validate the form when fields change
useEffect(() => {
  const validationErrors = validateForm();
  setErrors(validationErrors);
}, [rooms, travelers, packages, currentDate, selectedCountry]); // This will re-run when any of these states change
  return (
    <div className="flex flex-col justify-center w-full gap-8 mb-6 p-4 bg-white rounded-lg shadow-lg">
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center text-2xl font-semibold"
      >
        تحديد تفاصيل العامة للرحلة
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            الوجهة المرادة
          </Typography>
          <CountryMenue onCountryChange={handleCountryChange}/>
          {errors.selectedCountry && (
            <Typography variant="body2" color="red"     className="mt-2 text-sm text-red-600 font-semibold"
>
              {errors.selectedCountry}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            عدد الغرف
          </Typography>
          <Input
            size="lg"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            placeholder="قم بادخال عدد الغرف"
            className=""
            labelProps={{
              className:
                "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
          />
          {errors.rooms && (
            <Typography variant="body2" color="red" className="mt-2 text-sm text-red-600 font-semibold">
              {errors.rooms}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            عدد المسافرين
          </Typography>
          <Input
            size="lg"
            value={travelers}
            onChange={handleTravelersChange}  // Use handleTravelersChange here
            // placeholder="قم بادخال عدد المسافرين"
            className=""
            labelProps={{
              className:
                "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
          />
           {errors.travelers && (
            <Typography variant="body2" color="red" className="mt-2 text-sm text-red-600 font-semibold">
              {errors.travelers}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            التاريخ المراد للرحلة
          </Typography>
          <DatePicker  size="lg"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            // placeholder="قم بادخال عدد المسافرين"
            className=""
            labelProps={{
              className:
                "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}/>
            {errors.currentDate && (
            <Typography variant="body2" color="red" className="mt-2 text-sm text-red-600 font-semibold">
              {errors.currentDate}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            عدد البكجات
          </Typography>
          <Input
            size="lg"
            value={packages}
            onChange={(e) => setPackages(e.target.value)}
            placeholder="قم بادخال عدد البكجات"
            className=""
            labelProps={{
              className:
                "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            
          />
           {errors.packages && (
            <Typography variant="body2" color="red" className="mt-2 text-sm text-red-600 font-semibold">
              {errors.packages}
            </Typography>
          )}
        </div>
      </form>

      {/* Centered button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 w-1/2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleSubmit}
        >
          بحث
        </button>
      </div>
    </div>
  );
}
