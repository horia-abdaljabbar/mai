import React, { useState, useEffect } from "react";
import PassportForm from '../../Forms/passport';
import updatePassport from "@/controllers/PassportApis/updatePassport";
import { toast } from 'react-hot-toast';
import PassportViewModel from "@/models/PassportViewModel";
import styled from 'styled-components';

// Import the passport model
// import Passport from "@/models/passport";

const EditProductModal = ({ isOpen, onClose, rowData,onUpdate }) => {
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJhYmFmMmE4Yi02MGYwLTRjYzMtOGQzZS04MDM2ZTZhNzE5ZjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE3NDgwMjQsImV4cCI6MTczMjYxMjAyNCwiaWF0IjoxNzMxNzQ4MDI0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.78pGO0MadZydPSuCsq7M26e_GhBSNyCAf1D_c2VUte0';
  const [passportData, setPassportData] = useState(rowData || {});
  const [initialData, setInitialData] = useState(rowData);
  const [imagePreview, setImagePreview] = React.useState(null); // For displaying the preview
  const [errorsPassport, setErrorsPassport] = React.useState([]); // State to hold validation errors for customer profile
  const [loading, setLoading] = useState(false);

 console.log(rowData,"roeData");
  useEffect(() => {
    if (isOpen && rowData) {
      setPassportData(rowData); // Initialize with existing data
      setInitialData(rowData);
      // If there is an image URL in rowData, store it as well
   
    }
  }, [isOpen, rowData]);

  // Handle changes to the passport form data
  const handlePassportChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setPassportData(prevState => ({
        ...prevState,
        [name]: files[0], // For file input
      }));
    } else {
      setPassportData(prevState => ({
        ...prevState,
        [name]: value, // For other types of input
      }));
    }
      // Validate the updated profile and set errors immediately
    const passportProfileInstance = new PassportViewModel(passportData, rowData.passportId);
    const validationErrors = passportProfileInstance.validate(); // Validate based on updated form data
  
      // Update the state with errors immediately
      setErrorsPassport(validationErrors);
  };
  const handleSaveChanges = async () => {
    setLoading(true);
    // Create FormData instance
    const formData = new FormData();
    
    // Append passport data to the form data
    Object.keys(passportData).forEach(key => {
      // If the passportData field is not the file, append it normally
      if (key !== 'passportPhotoFile') {
        formData.append(key, passportData[key]);
      }
    });
  
    // If there's a file to send (e.g., passport photo), append it to the form data
    if (passportData.passportPhotoFile) {
      formData.append('passportPhotoFile', passportData.passportPhotoFile);
    }
  
    console.log(formData, "formData before save");
  
    // Check if there are changes (compared with initial data)
    const hasChanges = JSON.stringify(passportData) !== JSON.stringify(initialData);
    if (hasChanges) {
      try {
        // Assuming `updatePassport` sends formData and returns a result
        const updateResult = await updatePassport(formData, apiKey, token, rowData.passportId);
        
        if (updateResult) {
          toast.success("تم تعديل جواز السفر بشكل صحيح");
          console.log("updateResult iiiiiiiiii", updateResult.data);
          console.log([...formData]);  // Will show the FormData contents

          // Trigger the update in the table data

          onUpdate(updateResult.data);  // Pass the updated result to trigger table re-render
          console.log("Update Result:", updateResult.data);  // Check the response data

        } else {
          toast.error("هناك خطَ في تعديل جواز السفر!!");
          setLoading(false); 

        }
      } catch (error) {
        toast.error("هناك خطَ في تعديل جواز السفر!!");
        setLoading(false); 

        console.error(error);
      }
    }
    setLoading(false);
    // Close modal after saving changes
    onClose();
  };
  

  

  return (
    <div>
    {/* Loader */}
    {loading && <Loader><div className="loader-message">انتظر حتى تنتهي عملية تعديل جواز السفر</div></Loader>}
    
    {/* Your Table Component */}
    <div className={`${isOpen ? "flex" : "hidden"} fixed right-0 left-0 top-4 z-50 h-auto justify-center items-center md:inset-0 h-auto sm:h-full`}>
      <div className="relative overflow-auto px-4 w-full max-w-2xl h-auto max-h-[100vh]">
        <div className="relative bg-white rounded-2xl shadow-xl shadow-gray-700">
          {/* Modal header */}
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3 className="text-xl font-semibold">معلومات جواز السفر</h3>
            <button
              type="button"
              className="absolute top-4 left-4 text-gray-400 bg-transparent hover:bg-black-200 hover:text-gray-900 rounded-2xl text-sm p-1.5"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 space-y-6">
            <PassportForm
              passportData={passportData}  //Pass the state variable here instead of rowData
              handlePassportChange={handlePassportChange}
              origin="EditProductModal"
              errorsPassport={errorsPassport} //Pass errors to child component
            />
          </div>

          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-between">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
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
export default EditProductModal;

