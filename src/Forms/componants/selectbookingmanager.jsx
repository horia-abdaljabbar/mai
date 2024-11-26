import React, { useState,useEffect } from "react";
import  AddNewProfileForm  from "../AddNewProfileForm"
import getCustomerProfileById from "@/controllers/CustomerProfileApis/getCustomerProfileById";
import {updateCacheWithCustomerId} from '../../../src/utils/cacheUtils'
import addCustomerProfile from "@/controllers/CustomerProfileApis/addCustomerProfile";
import CustomerProfileViewModel from "@/models/CustomerProfileViewModel";
import AddBookingManager from "@/controllers/BookingManagerApis/addBookingManager";
import BookingManager from "@/models/bookingManagerViewModel";
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

// Dialog Component
function Dialog({ open, onClose, selectedPerson, isAddPersonForm, onSubmitPerson }) {
  if (!open) return null;
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJlNDNiODZhNC0yZDVlLTRkMGEtODA0Mi05MzhkZjhiNzM2MDciLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE5NDU1MTgsImV4cCI6MTczMjgwOTUxOCwiaWF0IjoxNzMxOTQ1NTE4LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.MZbGgh56ZBGeaiZvRsxCEgGJG49f_sjc4qovsBQQGsY';
  const [errorsCustomer, setErrorsCustomer] = useState([]);
  const [formData, setFormData] = useState(new CustomerProfileViewModel({}));
  const [gender, setGender] = useState("");
  const [customerId, setCustomerId] = useState(0);  // Initialize as 0
  const [rooms, setRooms] = useState("");
  const [travelers, setTravelers] = useState("");
  const [packages, setPackages] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');


   useEffect(() => {
    const loadCachesAndCustomerData = async () => {
      try {
        // Load form data cache
        const formCache = await caches.open("formCache");
        const formResponse = await formCache.match("/form-data"); // Adjust request key as needed
        if (formResponse) {
          const bookingManagerData = await formResponse.json();
          console.log("Form data loaded from cache:", bookingManagerData);

          // Populate state from form data cache
          if (bookingManagerData.rooms) setRooms(bookingManagerData.rooms);
          if (bookingManagerData.travelers) setTravelers(bookingManagerData.travelers);
          if (bookingManagerData.packages) setPackages(bookingManagerData.packages);
          if (bookingManagerData.date) setCurrentDate(bookingManagerData.date);


        } else {
          console.log("No cached form data found.");
        }

    
      } catch (error) {
        console.error("Error loading caches or fetching customer data:", error);
      }
    };

    loadCachesAndCustomerData();
  }, []); // Runs once when the component mounts

  const handleChange = (e, selectedSex) => {
    const { name, value } = e.target;
    // Create a new instance to maintain the class methods
    const updatedProfile = new CustomerProfileViewModel();
    // Merge old and new values, including gender explicitly
    Object.assign(updatedProfile, formData, {
      [name]: name === "gender" ? selectedSex : value, // Assign selectedSex only if name is "gender"
    });

    // Assign gender explicitly if gender is being updated
    if (name === "gender") {
      setGender(selectedSex); // Update the state with the selected biological sex
      updatedProfile.gender = selectedSex; // Also set it in updatedProfile
    }    // Compute fullName logic
    const { firstName, fatherName, grandFatherName, familyName } = updatedProfile;
    updatedProfile.fullName = `${firstName} ${fatherName} ${grandFatherName} ${familyName}`.trim();

    const { firstNameEnglish, fatherNameEnglish, grandFatherNameEnglish, familyNameEnglish } = updatedProfile;
    updatedProfile.fullNameEnglish = `${firstNameEnglish} ${fatherNameEnglish} ${grandFatherNameEnglish} ${familyNameEnglish}`.trim();

    setFormData(updatedProfile); // Update with the new instance
    // Validate the updated profile
    // Validate the updated profile and set errors
    const validationErrors = updatedProfile.validate();
    setErrorsCustomer(validationErrors); // Update errors in state
    if (name === "gender") {
      setGender(selectedSex); // Update the state with the selected biological sex
    }
  
    // Log the errors (optional, for debugging)
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
    }
  };

  // Handle form submission (Save changes)
  const handleSaveChanges = async () => {
    console.log(formData, "formData before adding");
    setLoading(true);
    setLoadingMessage("جاري إضافة معلومات العميل...");
    const customerProfileInstance = 
      formData instanceof CustomerProfileViewModel 
        ? formData 
        : new CustomerProfileViewModel(formData);
  
    const validationErrors = customerProfileInstance.validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsCustomer(validationErrors);
      console.log("Validation errors:", validationErrors);
      return;
    }
    
   
    try {
      // Step 1: Add customer profile
      const addResult = await addCustomerProfile(formData, apiKey, token);
      console.log("addResult:", addResult);
      console.log("rooms", rooms);
      console.log("travelers", travelers);
      console.log("packages", packages);
      console.log("date", currentDate);
  
      // Check if customer profile addition is successful
      if (addResult && addResult.success && addResult.data) {
        const newCustomerId = addResult.data.id;
        console.log('New customer ID from response:', newCustomerId);
  
        // Update customerId state if necessary
        if (newCustomerId !== customerId) {
          console.log('Updating customerId to:', newCustomerId);
          setCustomerId(newCustomerId); // Update customer ID state
        } else {
          console.log('customerId is the same, no update');
        }
  
        // Step 2: Call bookingManager API after customer is added
        setLoading(true);
    setLoadingMessage("جاري إضافة هذا العميل ك مسؤول عن الرحلة...");
        const bookingManagerData = new BookingManager({
          bookingDate: currentDate,
          numberOfRooms: rooms,
          numberOfCustomers: travelers,
          numberOfPackages: packages,
          // Add other necessary data as required
        }, newCustomerId);
  
        const bookingManagerResult = await AddBookingManager(bookingManagerData, apiKey, token);
        console.log("bookingManagerResult:", bookingManagerResult);
  
        // Check booking manager API result
        if (bookingManagerResult && bookingManagerResult.success) {
          console.log("Booking manager API call succeeded!");
          // Handle success logic, like showing success message, updating UI, etc.
        } else {
          console.error("Booking manager API call failed:", bookingManagerResult);
        }
      } else {
        console.error('Failed to add customer:', addResult);
      }
    } catch (error) {
      console.error("Error occurred during requests:", error);
    }
    finally{
      setLoading(false);
      setLoadingMessage(""); // Clear loading message after completion
    }
    onClose();
  };
  

  useEffect(() => {
    console.log('useEffect triggered - customerId:', customerId);
    // Here you can also perform any additional logic after customerId is updated
  }, [customerId]);
  
  
  
  


  return (
    <div>
      {/* Loader */}
      {loading && <Loader> <div className="loader-message">{loadingMessage}</div></Loader>}
   <div>
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {isAddPersonForm ? (
          // Form to Add New Person
          <form >
            {/* mb-2 */}
 <div className="flex flex-wrap items-stretch w-full h-full  relative pt-12 ">
              <div className="flex ">
   
                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-shrink flex-grow flex-auto border-b-2 leading-normal tracking-wide w-px flex-1 border border-t-0 border-l-0 rounded rounded px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                placeholder="بحث"
              />
            </div>
             <AddNewProfileForm
             formData={formData}
             handleChange={handleChange}
             errorsCustomer={errorsCustomer}
             origin={'selectedManagerForm'}
             />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={(e) => {
                  e.preventDefault(); // Prevent page reload
                  handleSaveChanges(); // Call your function
                }}
              >
                إضافة
              </button>
            </div>
          </form>
        ) : (
          // Default Dialog Content
          <>
<h3
  className="text-lg font-semibold text-gray-800 py-4 px-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md"
  style={{ textAlign: 'center', lineHeight: '1.8' }}
>
  تم اختيار
  <span
    style={{
      color: '#ffffff',
      fontWeight: '600',
      padding: '8px 15px',
      background: 'linear-gradient(to right, #1e3a8a, #3b82f6)',
      borderRadius: '12px',
      margin: '0 10px',
      display: 'inline-block',
      boxShadow: '0 3px 10px rgba(59, 130, 246, 0.4)',
      textTransform: 'capitalize',
    }}
  >
    {selectedPerson}
  </span>
  كمسؤول عن الرحلة
</h3>




            {/* <p>Do you want to proceed with this selection?</p> */}
            <button
  onClick={onClose}
  className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
>
  إغلاق
</button>


          </>
        )}
      </div>
    </div>
   </div>
   </div>
  );
}
// Styled Components for Loader
const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  display:flex;
  flex-direction:column;
  gap:5px;

  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

   .loader-message{
   font-size: 18px;
  font-weight: bold;
  color: #fff; /* White text color */
  text-align: center;
  padding: 10px;
  background-color: #3498db; /* Blue background color */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Optional: shadow around the message */
  animation: fadeIn 1s ease-in-out; /* Optional: fade-in animation */
  }
`;

// Main Component
export function SelectBookingManager({
  availablePeople,
  onManagerSelect,
  onManagerDeselect,
  selectedManager,
  packageIndex,
}) {
  const [dialogOpen, setDialogOpen] = useState(false); // Track dialog visibility
  const [isAddPersonForm, setIsAddPersonForm] = useState(false); // Track form mode
  const [currentSelection, setCurrentSelection] = useState(null); // Track selected person
  const [peopleList, setPeopleList] = useState(availablePeople); // Manage people list
  const [customerData, setCustomerData] = useState([]);
  const [customerId, setCustomerId] = useState(0);

  const [ids, setIds] = useState([]); // State for IDs
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJhYmFmMmE4Yi02MGYwLTRjYzMtOGQzZS04MDM2ZTZhNzE5ZjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE3NDgwMjQsImV4cCI6MTczMjYxMjAyNCwiaWF0IjoxNzMxNzQ4MDI0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.78pGO0MadZydPSuCsq7M26e_GhBSNyCAf1D_c2VUte0';


// Load data from caches and fetch customer data by IDs
useEffect(() => {
  const loadCachesAndCustomerData = async () => {
    try {
    

      // Step 1: Load IDs from cache
      const idCache = await caches.open("customerCache");
      const idResponse = await idCache.match("/customerIds");
      if (idResponse) {
        const idData = await idResponse.json();
        console.log("Loaded data from cache: in select bm", idData);
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
// Function to handle the person selection and save the customerId in cache
const handlePersonClick = async (personName) => {
  // Find the person object from customerData based on fullName
  const selectedPerson = customerData.find((person) => person.customerProfileData.fullName === personName);

  if (selectedPerson) {
    // Now you have the selected person's id
    const personId = selectedPerson.customerProfileData.id;
    setCustomerId(personId);
    await updateCacheWithCustomerId(personId); // Update cache

    // Open the cache storage and save the customerId (personId) in it
    try {
      const cache = await caches.open('bookingManagerIdCache'); // Open cache
      const response = new Response(JSON.stringify({ customerId: personId }), { // Save the data as JSON
        headers: { 'Content-Type': 'application/json' },
      });
      await cache.put('/form-data', response); // Save data with the key '/form-data'

      console.log('Data-customer id: saved to cache:', personId); // Log confirmation

      // Handle manager selection or deselection
      if (selectedManager === personName) {
        onManagerDeselect(personName); // Deselect if already selected
        setCurrentSelection(null);
      } else {
        onManagerSelect(personName); // Select new manager
        setCurrentSelection(personName);
        setDialogOpen(true); // Open dialog
        setIsAddPersonForm(false); // Ensure form is hidden
        console.log('Selected Manager ID:', personId); // You can now use this ID as needed
      }
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }
};

// useEffect to log the updated customerId
useEffect(() => {
  console.log("Updated Customer ID: use effect", customerId);
}, [customerId]);  // This will run every time customerId changes


  const handleAddPersonClick = () => {
    setDialogOpen(true); // Open dialog
    setIsAddPersonForm(true); // Switch to add person form
  };

  const handleNewPersonSubmit = (newPerson) => {
    setPeopleList([...peopleList, newPerson]); // Add new person to the list
  };

 return (
   <>
    
    <div className="flex flex-col md:w-1/3 px-4 py-4 bg-white w-full m-4 md:m-20">
      <h6 className="text-lg font-semibold mb-4 text-gray-600">اختيار المسؤول (Package {packageIndex + 1})</h6>
      <div className="flex flex-col gap-2">
        {customerData.map((person, index) => (
          <button
            key={index}
            onClick={() => handlePersonClick(person.customerProfileData.fullName)}
            className={`transition-all duration-300 transform ${
              selectedManager === person.customerProfileData.fullName
                ? "bg-blue-600 text-white scale-110 shadow-lg z-10"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            } text-sm font-semibold px-6 py-3 rounded-lg flex items-center justify-between`}
          >
            <span>{person.customerProfileData.fullName}</span>
          </button>
        ))}

        {/* Add New Person Button */}
        <button
          onClick={handleAddPersonClick}
          className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-600 transition text-sm font-semibold"
        >
          شخص اخر
        </button>
      </div>

      {/* Dialog Component */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedPerson={currentSelection}
        isAddPersonForm={isAddPersonForm}
        onSubmitPerson={handleNewPersonSubmit}
      />
    </div>
   </>
  );
}
