import React, { useEffect, useState } from "react";
import DatePicker from '../Forms/componants/date';
import PassportViewModel from "../models/PassportViewModel";
import getPassportImages from "@/controllers/PassportApis/getPassportImages";
import styled from 'styled-components';

const PassportForm = ({ isOpen, onClose, passportData, setPassportData, imagePreview, handlePassportChange, origin, errorsPassport }) => {
  const [imageSrc, setImageSrc] = useState(null); // State to store image source
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJhYmFmMmE4Yi02MGYwLTRjYzMtOGQzZS04MDM2ZTZhNzE5ZjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE3NDgwMjQsImV4cCI6MTczMjYxMjAyNCwiaWF0IjoxNzMxNzQ4MDI0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.78pGO0MadZydPSuCsq7M26e_GhBSNyCAf1D_c2VUte0';
  const [loading, setLoading] = useState(false);

  console.log('errorsPassport', errorsPassport);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Passport Data:', passportData);
    handlePassportChange({ target: { name: 'passport', value: passportData } });
  };
  console.log('Passport Data in passport form:', passportData.passportId);

  console.log('Passport Data origin:', origin);

  useEffect(() => {
    if (origin === "EditProductModal" && passportData?.passportId) {
      loadPassportImage(passportData.passportId); // Call function to load passport image
    }
  }, [origin, passportData?.passportId]); // Trigger whenever origin or passportId changes

  const loadPassportImage = async (passportId) => {
    try {
      setLoading(true);
      const imageData = await getPassportImages(apiKey, token, passportId); // Get the image data

      if (imageData && imageData.status && imageData.image) {
        // Check if imageData contains status and image fields
        const base64Image = imageData.image; // Extract the base64 string from the response

        // Ensure base64Image starts with "data:image/png;base64," if it doesn't already
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setImageSrc(imageUrl); // Set the image source to display the image
      } else {
        // If no image data is found, fallback to a default image
        console.error('Image data not found in response:', imageData);
        setImageSrc('/images/default-image.png'); // Use the correct path to the default image
      }
    } catch (error) {
      console.error('Error loading passport image:', error);
      setImageSrc('/images/default-image.png'); // Provide a default image if needed
    }
    finally {
      setLoading(false); // Stop the loader after the image is loaded or on error
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-6 gap-6 p-10">
        {/* Passport Number Input */}
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="passportNumber" className="block mb-2 text-sm font-medium text-gray-900">
            رقم جواز السفر
          </label>
          <input
            type="number"
            name="passportNumber"
            id="passportNumber"
            value={passportData.passportNumber}
            onChange={handlePassportChange}
            className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
            placeholder={(origin == "EditProductModal") ? passportData.passportNumber : "12345..."}
            required
          />
          {errorsPassport.passportNumber && <span className="error-text" style={{ color: 'red' }}>{errorsPassport.passportNumber}</span>}


        </div>
        {/* Nationality Input */}
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="nationality" className="block mb-2 text-sm font-medium text-gray-900">
            الجنسية
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            value={passportData.nationality}
            onChange={handlePassportChange}
            className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
            placeholder={(origin == "EditProductModal") ? passportData.nationality : "فلسطينية"}
            required
          />
          {errorsPassport.nationality && <span className="error-text" style={{ color: 'red' }}>{errorsPassport.nationality}</span>}

        </div>
        {/* Issue Date */}
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="issueDate" className="block mb-2 text-sm font-medium text-gray-900">
            تاريخ الاصدار
          </label>
          <DatePicker
            name="issueDate"
            value={passportData.issueDate}
            onChange={handlePassportChange}
            placeholder={(origin == "EditProductModal") ? passportData.issueDate : passportData.issueDate}
          />
          {errorsPassport.issueDate && <span className="error-text" style={{ color: 'red' }}>{errorsPassport.issueDate}</span>}

        </div>
        {/* Expiry Date */}
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium text-gray-900">
            تاريخ الانتهاء
          </label>
          <DatePicker
            name="expiryDate"
            value={passportData.expiryDate}
            onChange={handlePassportChange}
            placeholder={(origin == "EditProductModal") ? passportData.expiryDate : passportData.expiryDate}

          />
          {errorsPassport.expiryDate && <span className="error-text" style={{ color: 'red' }}>{errorsPassport.expiryDate}</span>}

        </div>
      </div>

      {/* File upload section */}
      <div>
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-6 border-2 border-dashed border-black-600 rounded-xl bg-white text-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-700">صوره جواز السفر</h2>
          <p className="mt-2 text-gray-500">قم بتحميل الصورة (SVG, PNG, JPG, or GIF)</p>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            name="passportPhotoFile"
            accept="image/png, image/jpeg, image/webp"
            onChange={handlePassportChange}
          />

          <div>
            {/* Conditionally render the loader or the image */}
            {origin === "EditProductModal" ? (
              <>
                {loading && <Loader>
                  <div className="loader-message">انتظر حتى يتم تحميل صورة جواز السفر</div>
                </Loader>}{/* Show loader */}
                <img
                  src={imageSrc} // Use the loaded image
                  alt="Uploaded Passport"
                  style={{ maxWidth: '70%', maxHeight: '200px', margin: 'auto' }}
                />
              </>
            ) : (
              <>
                {loading && <Loader></Loader>}{/* Show loader */}
                <img
                  src={imagePreview}
                  alt=""
                  style={{ maxWidth: '70%', maxHeight: '200px', margin: 'auto' }}
                />
              </>
            )}
          </div>
        </label>

        {/* Show error message only if there's no valid image */}
        <div className="text-center">
          {!imageSrc && errorsPassport.passportPhotoFile && (
            <span className="error-text" style={{ color: 'red' }}>
              {errorsPassport.passportPhotoFile}
            </span>
          )}
        </div>
      </div>

    </form>
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
export default PassportForm;
