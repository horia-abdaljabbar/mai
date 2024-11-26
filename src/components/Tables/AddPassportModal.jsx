import React, { useState, useEffect } from "react";
import AddNewPassportForm from '../../Forms/AddNewPassportForm'
import { toast } from 'react-hot-toast';
import PassportViewModel from "@/models/PassportViewModel";
import addPassport from "@/controllers/PassportApis/addPassport";
import getPassportById from '@/controllers/PassportApis/getPassportById'
import styled from 'styled-components';


// Import the passport model
// import Passport from "@/models/passport";

const AddPassportModal = ({ isOpen, onClose, passportId, onCustomerIdChange }) => {
    const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiIyZTk4M2I4Ni1jNzRmLTQ5ZjUtODMyNS03NTU3MTkzZmU2YzgiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE0OTczNzQsImV4cCI6MTczMjM2MTM3NCwiaWF0IjoxNzMxNDk3Mzc0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.dP2T39wXhCiXNxwGU1XLDKqZwUltU5t4tZPphfYtIZc';
    const [customerId, setCustomerId] = React.useState(0);
    const [passportData, setPassportData] = React.useState(new PassportViewModel({}, customerId));
    const [imageSrc, setImageSrc] = React.useState(null); // State to store image source
    const [errorsPassport, setErrorsPassport] = React.useState({}); // State for passport validation errors
    const [imagePreview, setImagePreview] = React.useState(null); // For displaying the preview
    const [loading, setLoading] = React.useState(false); // Add loading state



    const handlePassportChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'passportPhotoFile' && files && files[0]) {
            // Update passportPhotoFile in passportData
            const updatedData = { ...passportData, passportPhotoFile: files[0] };
            setPassportData(new PassportViewModel(updatedData, customerId));

            // Create an image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the preview image
            };
            reader.readAsDataURL(files[0]);
        } else {
            // Handle other form fields
            const updatedData = { ...passportData, [name]: value };
            setPassportData(new PassportViewModel(updatedData, customerId));
        }
        const validationErrors = passportData.validate();
        setErrorsPassport(validationErrors);
    };
    const handleAddition = async () => {
        setLoading(true); // Set loading to true when starting the request
        console.log("customer id before add passport:", customerId);
        console.log("passportData:", passportData);

        // Prepare formData for adding a new passport (passport data + image)
        const formData = new FormData();
        formData.append("passportNumber", passportData.passportNumber);
        formData.append("issueDate", passportData.issueDate);
        formData.append("expiryDate", passportData.expiryDate);
        formData.append("nationality", passportData.nationality);
        formData.append("passportPhoto", passportData.passportPhoto);
        formData.append("iDate", passportData.iDate);
        formData.append("customerProfileId", customerId);
        // Append passport data fields to formData
        Object.keys(passportData).forEach((key) => {
            console.log(`Appending key: ${key}, value: ${passportData[key]}`);  // Check each key-value pair

            formData.append(key, passportData[key]);
        });

        // If an image is present, append the image file to formData
        // Append the image file to formData (if present)
        if (passportData.passportPhotoFile) {
            console.log("Appending passportPhotoFile:", passportData.passportPhotoFile);
            formData.append("passportPhotoFile", passportData.passportPhotoFile);
        }
        // Log formData entries to ensure it's properly populated
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        // Call the addPassport function with formData
      try {
            const addResult = await addPassport(formData, apiKey, token);
            if (addResult) {
                toast.success("تم إضافة جواز السفر بشكل صحيح");
            } else {
                toast.error("هناك خطَأ في إضافة هذا الجواز!");
                setLoading(false); // Set loading to false after completion

            }
        } catch (error) {
            toast.error("حدث خطأ أثناء إضافة الجواز");
            setLoading(false); // Set loading to false after completion

        } finally {
            setLoading(false); // Set loading to false after completion
        }
        onClose();
    };
    useEffect(() => {
        const fetchPassportData = async () => {
            try {
                const passportData = await getPassportById(passportId, apiKey, token);
                console.log('passportData:', passportData);
                // Now you can use the customerId as needed
                // setCustomerId(passportData.data.customerProfileId);
                const fetchedCustomerId=passportData.data.customerProfileId;
                // console.log('passportData customer id:', customerId);
                setCustomerId(fetchedCustomerId);
                onCustomerIdChange(fetchedCustomerId);  // Pass it to parent via callback
            } catch (error) {
                console.error('Error fetching passport data:', error);
            }
        };

        fetchPassportData();
    }, [onCustomerIdChange, apiKey, token]); // Only trigger when passportId, apiKey, or token change

    // New useEffect to log the updated customerId
    useEffect(() => {
        console.log('Updated customerId:', customerId);
    }, [customerId]); // This will log when customerId change

    return (
   <div>
            {/* Loader */}
            {loading && <Loader> <div className="loader-message">انتظر حتى تنتهي عملية اضافة جواز السفر</div></Loader>}
      
      {/* Your Table Component */}
        <div className={`${isOpen ? "flex" : "hidden"} fixed right-0 left-0 top-4 z-50 h-auto justify-center items-center md:inset-0 h-auto sm:h-full`}>
            <div className="relative overflow-auto px-4 w-full max-w-2xl h-auto max-h-[100vh]">
                <div className="relative bg-white rounded-2xl shadow-xl shadow-gray-700">
                    {/* Modal header */}
                    <div className="flex justify-between items-start p-5 rounded-t border-b">
                        <h3 className="text-xl font-semibold">إضافة جواز سفر جديد</h3>
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
               <div>
                    <div className="p-6 space-y-6">
                        <AddNewPassportForm
                            origin="EditProductModal"
                            handlePassportChange={handlePassportChange}
                            passportData={passportData}
                            errorsPassport={errorsPassport}
                            imagePreview={imagePreview}

                        />
                    </div>
               </div>

                    {/* Modal footer */}
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-between">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handleAddition}
                        >
                            إضافة
                        </button>
                        <button
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={onClose}
                        >
                            الغاء
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
export default AddPassportModal;

