import React, { useEffect } from "react";
import DatePicker from '../Forms/componants/date';
import PassportViewModel from "../models/PassportViewModel";
import ExpandedStagesForPassport from "@/components/Tables/ExpandedStagesForPassport";

const AddNewPassportForm = ({ isOpen, onClose, origin, handlePassportChange, passportData, errorsPassport, imagePreview }) => {
  const [imageSrc, setImageSrc] = React.useState(null); // State to store image source
  const [customerId, setCustomerId] = React.useState(0);

  // Condition to determine if the fields should be read-only
  const isReadOnly = origin === "PassportsForEachCustomer";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Passport Data:', passportData);
    handlePassportChange({ target: { name: 'passport', value: passportData } });
  };

  const getInputClassNames = () => {
    return origin === 'PassportsForEachCustomer'
      ? 'bg-gray-200 cursor-not-allowed'
      : 'bg-white';
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
            className={`shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5 ${getInputClassNames()}`}
            required
            readOnly={isReadOnly} // Make read-only if origin is "PassportsForEachCustomer"
          />
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
            className={`shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5 ${getInputClassNames()}`}
            required
            readOnly={isReadOnly} // Make read-only if origin is "PassportsForEachCustomer"
          />
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
          readOnly={isReadOnly} // Make read-only if origin is "PassportsForEachCustomer"
        />
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
          readOnly={isReadOnly} // Make read-only if origin is "PassportsForEachCustomer"
        />
      </div>
      </div>

      {/* File upload section */}
      <div
  className={`flex flex-col items-center justify-center w-full max-w-lg mx-auto p-6 border-2 border-dashed rounded-xl bg-white text-center cursor-pointer ${
    isReadOnly ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
  }`}
  style={{
    pointerEvents: isReadOnly ? 'none' : 'auto', // Disable interactions if read-only
    borderColor: isReadOnly ? 'gray' : 'black', // Change border color conditionally
  }}
>
<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center ">
<svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
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
      disabled={isReadOnly} // Disable the file upload if read-only
    />
  </label>

  {/* Conditional rendering of image */}
  <img
    src={imagePreview}
    alt="جواز السفر"
    style={{
      maxWidth: '70%',
      maxHeight: '200px',
      margin: 'auto',
      opacity: isReadOnly ? 0.6 : 1, // Dim the image when read-only
    }}
  />

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

export default AddNewPassportForm;
