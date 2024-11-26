import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import DatePicker from "./componants/date";
import getCustomerProfileById from "@/controllers/CustomerProfileApis/getCustomerProfileById";
import BookingManager from "@/models/bookingManagerViewModel";
import AddBookingManager from "@/controllers/BookingManagerApis/addBookingManager";
import UpdateBookingManager from "@/controllers/BookingManagerApis/updateBookingManager";
import GetBookingManagerById from "@/controllers/BookingManagerApis/getBookingManagerById";
export function BookingManagerForm({ onSubmit ,packageIndex,bookingManagerId, formData, onBookingManagerUpdated}) {
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJhYmFmMmE4Yi02MGYwLTRjYzMtOGQzZS04MDM2ZTZhNzE5ZjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE3NDgwMjQsImV4cCI6MTczMjYxMjAyNCwiaWF0IjoxNzMxNzQ4MDI0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.78pGO0MadZydPSuCsq7M26e_GhBSNyCAf1D_c2VUte0';
  const [currentDate, setCurrentDate] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [bookingManager, setBookingManager] = useState(new BookingManager({}, customerId));
  const [bookingId,setBookingId]=useState(0);
  const [returnBooking,setReturnBooking]=useState({});
  const [numberOfSelections, setNumberOfSelections] = useState(0);
  const [rooms, setRooms] = useState("");
  const [travelers, setTravelers] = useState("");
  const [packages, setPackages] = useState("");
  const [selectedNames, setSelectedNames] = useState([]);
  const [ids, setIds] = useState([]); // State for IDs
  const [localFormData, setLocalFormData] = useState(formData);

  const names = ["أحمد", "سارة", "محمد", "ليلى"];
  const CACHE_NAME = "formCache";
  const ID_CACHE_NAME = "customerCache"; // Separate cache for IDs
  // Get today's date and format it as YYYY-MM-DD
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setCurrentDate(formattedDate);
  }, []);

  // Load data from caches and fetch customer data by IDs
  useEffect(() => {
    const loadCachesAndCustomerData = async () => {
      try {
        // Load form data cache
        const formCache = await caches.open(CACHE_NAME);
        const formResponse = await formCache.match("/form-data"); // Adjust request key as needed
        if (formResponse) {
          const formData = await formResponse.json();
          console.log("Form data loaded from cache:", formData);

          // Populate state from form data cache
          if (formData.rooms) setRooms(formData.rooms);
          if (formData.travelers) setTravelers(formData.travelers);
          if (formData.packages) setPackages(formData.packages);
          if (formData.date) setCurrentDate(formData.date);
        } else {
          console.log("No cached form data found.");
        }

        // Step 1: Load IDs from cache
        const idCache = await caches.open(ID_CACHE_NAME);
        const idResponse = await idCache.match("/customerIds");
        if (idResponse) {
          const idData = await idResponse.json();
          console.log("Loaded data from cache:", idData);
          if (Array.isArray(idData) && idData.length > 0) {
            console.log("IDs loaded from cache:", idData); // Check if IDs are loaded correctly
            setIds(idData);
            console.log("IDs to fetch:", idData); // Confirm the IDs to fetch
            // Ensure we're proceeding with the API call
            const customerRequests = idData.map(async (id) => {
              console.log(`Making API request for ID: ${id}`); // Ensure this logs
              return await getCustomerProfileById(id, apiKey, token);
            });

            // Step 4: Wait for all requests to resolve
            const customers = await Promise.all(customerRequests);
            console.log("Customer data loaded:", customers); // This will show the customer data once all API calls are resolved
            setCustomerData(customers);
          } else {
            console.log("No customer IDs found in cache or the format is incorrect");
          }
        } else {
          console.log("No cached IDs found.");
        }
      } catch (error) {
        console.error("Error loading caches or fetching customer data:", error);
      }
    };

    loadCachesAndCustomerData();
  }, []); // Runs once when the component mounts

  // Handle form submission
 
 // Function to handle checkbox changes
 const handleNameChange = (name) => {
  setSelectedNames((prevSelectedNames) => {
    const newSelectedNames = prevSelectedNames.includes(name)
      ? prevSelectedNames.filter((n) => n !== name)
      : [...prevSelectedNames, name];

    // Update the number of selections directly after changing selected names
    setNumberOfSelections(newSelectedNames.length);
    // console.log("numberOfSelections", numberOfSelections);

    return newSelectedNames;
  });
};

// useEffect to log the updated customerId
useEffect(() => {
  console.log("numberOfSelections use effect", numberOfSelections);
}, [numberOfSelections]);  // This will run every time customerId changes

console.log(currentDate,"date");
console.log(packages,"packages");
console.log(rooms,"rooms");

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(returnBooking,"return booking");

  const bookingManagerData = new BookingManager({
    bookingDate: currentDate,
    numberOfRooms: rooms,
    numberOfCustomers: travelers,
    numberOfPackages: packages,
    // Add other necessary data as required
  }, customerId);
  console.log("package index", packageIndex);

  try {
    // Check if the booking manager ID exists in the state
    if (returnBooking.data && returnBooking.data.bookingManagerId) {
      // Fetch existing booking manager by ID
      const existingBooking = await GetBookingManagerById(returnBooking.data.bookingManagerId, apiKey, token);
      console.log("existingBooking", existingBooking);
  
      if (existingBooking) {
        // Update the existing booking manager
        const updateData = {
          ...bookingManagerData,
          bookingManagerId: returnBooking.data.bookingManagerId, // Ensure the ID is passed for update
        };
        console.log("updateData", updateData);
  
        // Update the booking manager
        const updateResult = await UpdateBookingManager(updateData, apiKey, token, returnBooking.data.bookingManagerId);
  
        if (updateResult) {
          console.log("Booking Manager updated successfully!");
          // toast.success("تم تعديل بيانات الحجز بشكل صحيح");
          console.log(`Updated booking for package index: ${packageIndex}`);
        } else {
          console.error("Error updating Booking Manager!");
          // toast.error("هناك خطأ في تعديل بيانات الحجز!");
        }
      }
    } else {
      // If no ID exists, add a new booking manager
      const addResult = await AddBookingManager(bookingManagerData, apiKey, token);
  
      if (addResult) {
        console.log("Booking Manager added successfully!", addResult);
        // toast.success("تم إضافة بيانات الحجز بشكل صحيح");
  
        // Update the state with the new booking manager ID
        setReturnBooking(addResult);
  
        if (addResult.data && addResult.data.bookingManagerId) {
          setBookingId(addResult.data.bookingManagerId); // Set the ID globally
          console.log(`Added booking for package index: ${packageIndex}`);
        }
      } else {
        console.error("Error adding Booking Manager!");
        // toast.error("هناك خطأ في إضافة بيانات الحجز!");
      }
    }
  } catch (error) {
    console.error("Error managing Booking Manager:", error);
    // toast.error("حدث خطأ أثناء معالجة بيانات الحجز!");
  }
  
};
useEffect(() => {
  if (returnBooking?.data?.bookingManagerId) {
    console.log("Updated returnBooking:", returnBooking.data.bookingManagerId);
  }
}, [returnBooking]);


// to get customerId from bookingManagerIdCache
const syncCustomerIdFromCache = async () => {
  try {
    console.log("Syncing customerId from cache...");
    const cache = await caches.open("bookingManagerIdCache");
    const cachedResponse = await cache.match("/form-data");

    if (cachedResponse) {
      const cachedData = await cachedResponse.json();
      console.log("Cached Data during sync:", cachedData);

      if (cachedData?.customerId) {
        setCustomerId(cachedData.customerId); // Update state
        console.log("Updated customerId from cache:", cachedData.customerId);
      } else {
        console.log("No customerId found in the cached data.");
      }
    } else {
      console.log("No cache entry found for /form-data.");
    }
  } catch (error) {
    console.error("Error syncing customerId from cache:", error);
  }
};

useEffect(() => {
  syncCustomerIdFromCache(); // Fetch and sync customerId on component mount
}, [numberOfSelections ,handleSubmit]); // No dependencies needed, run only once





  return (
    <div className="flex flex-col items-center w-full md:w-2/3 mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
        إدارة الحجز
      </Typography>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8">
        {/* Form Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Number of Rooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عدد الغرف
            </label>
            <input
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              placeholder="ادخل عدد الغرف"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عدد المسافرين
            </label>
            <input
              type="number"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              placeholder="ادخل عدد المسافرين"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ الرحلة
            </label>
            <DatePicker date={currentDate} onChange={setCurrentDate} />
          </div>

          {/* Number of Packages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عدد الباقات
            </label>
            <input
              type="number"
              value={packages}
              onChange={(e) => setPackages(e.target.value)}
              placeholder="ادخل عدد الباقات"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Names Section */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            اختيار المسافرين
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {customerData.map((customer, index) => (
              <label
                key={index}
                className="flex items-center gap-2 p-2 border rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
              >
                <input
                  type="checkbox"
                  value={customer.fullName}
                  checked={selectedNames.includes(customer.fullName)}
                  onChange={() => handleNameChange(customer.fullName)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-black font-medium">{customer.firstName}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            إرسال
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingManagerForm;
