import React, { useState, useEffect } from "react";
import addCustomerProfile from "@/controllers/CustomerProfileApis/addCustomerProfile";
import { toast } from 'react-hot-toast';
import CustomerProfileViewModel from "@/models/CustomerProfileViewModel";
import styled from 'styled-components';
import AddNewProfileForm from '../../Forms/AddNewProfileForm';

// The `isOpen` prop is used to control visibility of the modal
const AddProfileModal = ({ isOpen, onClose, onUpdate ,rowData}) => {
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJlNDNiODZhNC0yZDVlLTRkMGEtODA0Mi05MzhkZjhiNzM2MDciLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE5NDU1MTgsImV4cCI6MTczMjgwOTUxOCwiaWF0IjoxNzMxOTQ1NTE4LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.MZbGgh56ZBGeaiZvRsxCEgGJG49f_sjc4qovsBQQGsY';
  const [formData, setFormData] = useState({});
  const [errorsCustomer, setErrorsCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const customerProfileInstance = new CustomerProfileViewModel(formData);
    const validationErrors = customerProfileInstance.validate();
    setErrorsCustomer(validationErrors);
  };

  // Handle form submission (Save changes)
  const handleSaveChanges = async () => {
    console.log(formData,"formData before adding");
    setLoading(true);
    try {
      const addResult = await addCustomerProfile(formData, apiKey, token);
      if (addResult) {
        console.log('customer added successfully!', addResult);
        toast.success("تم تسجيل هذا العميل بشكل صحيح");
      } else {
        toast.error("هناك خطَأ في إضافة هذا العميل!");
      }
    }

    catch (error) {
      console.error(error);
      toast.error("هناك خطأ في تسجيل معلومات العميل!");
    } finally {
      setLoading(false);
    }
    onClose();

  };

  return (
    <>
    <div>
            {/* Loader */}
            {loading && <Loader> <div className="loader-message"> انتظر حتى تنتهي عملية اضافةالعميل الجديد</div></Loader>}
      {/* Conditionally render the modal based on `isOpen` */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="relative overflow-auto px-4 w-full max-w-7xl h-[80vh] max-h-[100vh]">
            <div className="relative bg-white rounded-2xl shadow-xl shadow-gray-700">
              <div className="flex justify-between items-start p-5 rounded-t border-b">
                <h3 className="text-xl font-semibold">معلومات العميل</h3>
                <button
                  type="button"
                  className="absolute top-4 left-4 text-gray-400 bg-transparent hover:bg-black-200 hover:text-gray-900 rounded-2xl text-sm p-1.5"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 9l3-3 1.414 1.414L12.828 10l3.586 3.586L13 15l-3-3-3 3-1.414-1.414L7.172 10 3.586 6.414 5 5l3 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">إغلاق</span>
                </button>
              </div>

              <div className="py-4 px-6 flex flex-col">
                <AddNewProfileForm
                  formData={formData}
                  handleChange={handleChange}
                  errorsCustomer={errorsCustomer}
                  origin="AddProfileModal"

                />
              </div>

              <div className="flex justify-end p-4 border-t">
                <button
                  onClick={handleSaveChanges}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  disabled={loading}
                >
                  حفظ التغييرات
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-600 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
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

export default AddProfileModal;


