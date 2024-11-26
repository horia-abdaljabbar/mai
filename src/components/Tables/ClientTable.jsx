import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProductModal from './editPassPoert'; // Assuming you have this modal component
import EditCustomerInfoModal from '../Tables/EditCustomerInfoModal'
import deleteCustomerProfile from '../../controllers/CustomerProfileApis/deleteCustomerProfile';
import getAllCustomerProfiles from '../../controllers/CustomerProfileApis/getAllCustomerProfiles'; // Import your API call to get all customers
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import AddProfileModal from './AddProfileModal';
import ExpandedStagesForPassport from './ExpandedStagesForPassport';
import getCustomerProfileById from '@/controllers/CustomerProfileApis/getCustomerProfileById';
import PassportsForEachCustomerModal from './PassportsForEachCustomerModal';


const DataTable = ({ data, setData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [finalData, setFinalData] = useState({});
  const [expandedRow, setExpandedRow] = useState(null); // To track the currently expanded row
  const [expandedRowEdit, setExpandedRowEdit] = useState(null); // To track the currently expanded row
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');
  const [expandedRowAddProfile, setExpandedRowAddProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProfile, setSelectedProfile] = React.useState({}); // To store the profile data


  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJhYmFmMmE4Yi02MGYwLTRjYzMtOGQzZS04MDM2ZTZhNzE5ZjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE3NDgwMjQsImV4cCI6MTczMjYxMjAyNCwiaWF0IjoxNzMxNzQ4MDI0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.78pGO0MadZydPSuCsq7M26e_GhBSNyCAf1D_c2VUte0';

  const navigate = useNavigate();
  const fetchProfileById = async (profileId) => {
    try {
      console.log('profileId', profileId);
  
      const response = await getCustomerProfileById(profileId, apiKey, token);
      console.log('response', response);
  
      // Log passportsData directly before setting the state
      console.log('Passports Data:', response.passportsData);
  
      setSelectedProfile(response    ); // Store fetched profile data in state
  
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  
  // Log the updated selectedProfile using useEffect
  useEffect(() => {
    console.log('Updated selectedProfile:', selectedProfile);
  }, [selectedProfile]);
  
  
  const handleRowClick = (index, profileId) => {
    console.log('Clicked index:', index);
  
    // Toggle expanded row
    setExpandedRow(expandedRow === index ? null : index);
  
    // Fetch the profile data if it's not already loaded
    if (!selectedProfile || selectedProfile.id !== profileId) {
      fetchProfileById(profileId);
    }
  };
  const handleRowClickEdit = (index) => {
    console.log('Clicked index:', index);
    setExpandedRowEdit(expandedRowEdit === index ? null : index); // Toggle the modal for the clicked row
  };

  const handleAddNewClient = () => {
    navigate('/AddNewProfileForm');
  };
  // Open the modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Close the modal
  const handleCloseModal = () => {
    console.log('Modal closed'); // Debugging line
    setIsModalOpen(false);
  };


  // Fetch customer profiles
  const fetchCustomerProfiles = async () => {
    try {
      const customers = await getAllCustomerProfiles(apiKey, token);
      // console.log("Fetched customers:", customers); // Log fetched customers
      setData(customers);
      // console.log("Fetched customers:", data); // Log fetched customers
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('هناك خطأ في تحميل العملاء');
    }
  };

  useEffect(() => {
    fetchCustomerProfiles();
  }, [apiKey, token]);

  // Function to update a specific row in data
  const updateData = (id, updatedData) => {
    // console.log("Updating data for ID:", id);
    // console.log("Updated data:", updatedData);

    setData((prevData) => {
      const newData = prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      fetchCustomerProfiles(); // Re-fetch data after update

      // console.log("New Data After Update:", newData);
      return newData;
    });
  };

  // // This effect runs when 'data' changes
  // useEffect(() => {
  //   console.log("Updated data:", data);
  // }, [data]);



  // Function to handle deletion of a client
  const handleDeleteClient = async (customerId) => {
    const confirmDelete = window.confirm("هل انت متاكد من عملية الحذف؟؟");
    if (confirmDelete) {
      setLoading(true); // Show loader before API request
      setLoadingMessage('انتظر حتى تنتهي عملية حذف العميل'); // Loading message for image load
      try {
        // Call the API to delete the customer
        await deleteCustomerProfile(apiKey, token, customerId);
        console.log("Customer deleted successfully!", customerId);
        toast.success("تم حذف العميل بنجاح");

        // Fetch the updated list of customers
        const updatedData = await getAllCustomerProfiles(apiKey, token);
        setData(updatedData); // Update the state with new data

        // Set notification message
        // setNotification(`Customer with ID ${customerId} has been deleted successfully!`);
      } catch (error) {
        toast.error("حدث خطأ خلال عملية الحذف");
        setLoading(false);
      } finally {
        setLoading(false); // Hide loader after API request is completed
      }

    }

    else {
      toast.info("تم الغاء الحذف");
      setLoading(false);

    }


  };


  // Filter data based on search term
  const filteredData = data.filter(
    (row) =>
      (row.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (row.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (row.phoneNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );




  return (
    <div>
      {/* Loader */}
      {loading && <Loader> <div className="loader-message">{loadingMessage}</div></Loader>}
      <div className="py-4 w-full overflow-hidden px-6">
        <div className="rounded-t-lg shadow-md bg-white px-8 py-4 mb-4">
          <div className="flex justify-between">
            <div className="w-3/4 flex border rounded-lg px-4 h-12 bg-gray-100">
              <span className="flex items-center text-gray-400">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.11 15.22C12.04 15.22 15.22 12.04 15.22 8.11C15.22 4.18 12.04 1 8.11 1C4.18 1 1 4.18 1 8.11C1 12.04 4.18 15.22 8.11 15.22Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 17L13.13 13.13" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 flex-grow bg-gray-100 border-none text-gray-600 placeholder-gray-400 focus:outline-none"
                placeholder="بحث"
              />
            </div>
            <button
              className="mt-10 px-5 py-2 border-black-400 border text-black-500 rounded transition duration-300 hover:bg-black hover:text-white focus:outline-none"
              onClick={handleOpenModal} // Load image when clicked
            >
              اضافة عميل جديد
            </button>
            <AddProfileModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onUpdate={() => { }}

            />      {/* Render the modal for the ADD new passport */}
          </div>
        </div>

        <div className="shadow-md rounded-lg overflow-hidden bg-white">
          <table className="min-w-full w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="px-6 py-3">اسم العميل</th>
                <th className="px-6 py-3">البريد الالكتروني</th>
                <th className="px-6 py-3">رقم الهاتف </th>
                <th className="px-6 py-3">سجل الرحل</th>
                <th className="px-6 py-3">جواز السفر</th>
                <th className="px-6 py-3">عمليات</th>
                {/* <th className="px-6 py-3"> حجز الفندق مكة</th>
        <th className="px-6 py-3"> حجز المواصلات الداخليه</th>
        <th className="px-6 py-3">الوصف</th>
        <th className="px-6 py-3">تعديل</th>
        <th className="px-6 py-3">حذف</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <React.Fragment key={row.id}>
                    <tr className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.phoneNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button className="px-5 py-5  border-gray-600 rounded transition duration-300 hover:bg-black hover:text-white focus:outline-none">
                          عرض تفاصيل
                        </button>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700"> <button
                        className="px-6 py-5  border-gray-300 rounded transition duration-300 hover:bg-black hover:text-white focus:outline-none"
                        onClick={() => handleRowClick(index,row.id)} // Handle modal opening

                      >
                        عرض تفاصيل
                      </button></td>
                      <td className="px-6 py-4 text-sm text-gray-700"> <div className="flex space-x-4"> {/* Adjust space between buttons if needed */}
                        <button
                          className="px-6 py-3 w-1/2 flex justify-center bg-black border-black-500 border text-white rounded transition duration-300 hover:bg-gray-100 hover:text-black"
                          onClick={() => handleDeleteClient(row.id)} // Handle delete
                        >
                          حذف
                        </button>
                        {/* {console.log(row.id)} */}
                        <button
                          className="px-6 py-3 w-1/2 flex justify-center bg-black border-black-500 border text-white rounded transition duration-300 hover:bg-gray-100 hover:text-black"
                          onClick={() => handleRowClickEdit(index)} // Handle edit
                        >
                          تعديل
                        </button>
                      </div>
                      </td>

                    </tr>

                    {/* Render the modal for the expanded row */}
                    {expandedRow === index && selectedProfile && (
                <PassportsForEachCustomerModal
                  isOpen={expandedRow === index}
                  onClose={() => setExpandedRow(null)}
                  rowData={selectedProfile}
                />
              )}



                    {expandedRowEdit === index && (
                      <tr>
                        <td colSpan="6" className="p-4  ">
                          <EditCustomerInfoModal
                            isOpen={expandedRowEdit === index} // Show modal if this row is expanded
                            onClose={() => setExpandedRowEdit(null)} // Close modal
                            rowData={row} // Pass row data to the modal
                            onUpdate={(updatedData) => updateData(row.id, updatedData)} // Ensure row ID is passed
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    لا يوجد نتائج.
                    <br />
                    {/* <button
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={handleAddNewClient}
            >
              اضافة بكج جديد
            </button> */}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-4 bg-gray-100 text-gray-600">
            <p className="text-sm">
              اظهار <span className="font-medium">{filteredData.length}</span> من <span className="font-medium">{data.length}</span> مجموع العملاء
            </p>
          </div>
        </div>

        {/* Center Drawer Component */}
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
export default DataTable;


