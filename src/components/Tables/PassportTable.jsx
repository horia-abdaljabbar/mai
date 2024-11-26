import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EditProductModal from './editPassPoert';
import AddPassportModal from './AddPassportModal';
import deletePassport from '../../controllers/PassportApis/deletePassport';
import getAllPassports from '../../controllers/PassportApis/getAllPassports';
import getPassportImages from '@/controllers/PassportApis/getPassportImages';
import getCustomerProfileById from '@/controllers/CustomerProfileApis/getCustomerProfileById';
import { toast } from 'react-hot-toast';

const PassportTable = ({ data, setData }) => {
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJlNDNiODZhNC0yZDVlLTRkMGEtODA0Mi05MzhkZjhiNzM2MDciLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE5NDU1MTgsImV4cCI6MTczMjgwOTUxOCwiaWF0IjoxNzMxOTQ1NTE4LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.MZbGgh56ZBGeaiZvRsxCEgGJG49f_sjc4qovsBQQGsY';

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedRowEdit, setExpandedRowEdit] = useState(null);
  const [expandedRowAddPassport, setExpandedRowAddPassport] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedPassportId, setSelectedPassportId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');

  const navigate = useNavigate();

  const handleCustomerId = (id) => {
    setCustomerId(id);
    console.log('Received customerId from child:', id);
  };

  const handleAddNewClient = () => {
    navigate('/profile');
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleRowClickEdit = (index) => {
    setExpandedRowEdit(expandedRowEdit === index ? null : index);
  };

  const handleRowClickEditAddPassport = (index) => {
    setExpandedRowAddPassport(expandedRowAddPassport === index ? null : index);
  };

  // Fetch all customer profiles with a loader
  const fetchPassports = async () => {
    // setLoading(true); // Show loader before API request
    // setLoadingMessage('جاري  عرض جميع جوازات السفر'); // Loading message for image load

    try {
      const passports = await getAllPassports(apiKey, token);
      setData(passports);
      console.log('Data fetched:', data);
    } catch (error) {
      console.error('Error fetching passports:', error);
      // setLoading(false); // Show loader before API request

    } 
    // finally {
    //   setLoading(true); // Show loader before API request
    // }
    // setLoading(false); // Show loader before API request
  };

  useEffect(() => {
    fetchPassports();
  }, [apiKey, token]);

  // Update data with a loader
  const updateData = (id, updatedData) => {
    setLoading(true); // Show loader before updating
    setData((prevData) => {
      console.log("Previous Data:", prevData);
      const updatedItems = prevData.map((item) => {
        if (item.passportId === id) {
          return { ...item, ...updatedData };
        }
        return item;
      });
      console.log("Updated Data:", updatedItems);
      return updatedItems;
    });
    setLoading(false); // Hide loader after update
  };
  

  


  const [isToastTriggered, setIsToastTriggered] = useState(false);

  const handleDeletePassport = async (passportId) => {
    if (isToastTriggered) return;  // Avoid triggering the toast again
  
    const confirmDelete = window.confirm("هل انت متأكد من حذف جواز السفر هذا؟؟");
  
    if (confirmDelete) {
      setLoading(true);
      setLoadingMessage('انتظر حتى تنتهي عملية حذف جواز السفر');
  
      try {
        await deletePassport(apiKey, token, passportId);
        toast.success("تم حذف جواز السفر بنجاح");
        // toast.success("تم حذف جواز السفر بنجاح", {
        //   duration: 5000,  // How long the toast should be visible
        //   position: 'top-right',  // Toast position on the screen
        //   style: {
        //     background: '#333',  // Custom background color
        //     color: '#fff',  // Custom text color
        //   },
        //   icon: '👏',  // Custom icon (optional)
        // });  
        const updatedData = await getAllPassports(apiKey, token);
          setData(updatedData.data);
       
      } catch (error) {
        toast.error("حدث خطأ خلال عملية الحذف");
        setLoading(false); 

      } finally {
        setLoading(false);
      }
    } else {
      toast.info("تم الغاء الحذف");
      setLoading(false);
    }
  };
  

  const filteredData = (Array.isArray(data) ? data : []).filter(
    (row) =>
      (row.passportNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (row.issueDate?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (row.expiryDate?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const loadPassportImage = async (passportId) => {
    setLoading(true); // Show loader before API request
    setLoadingMessage('انتظر حتى يتم تحميل صورة جواز السفر'); // Loading message for image load
    try {
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
          setLoading(false);

      setImageSrc('/images/default-image.png'); // Provide a default image if needed
    }
    setLoading(false);

    setIsModalOpen(true); // Open the modal to display the image
  };

  return (
    <div>
      {/* Loader */}
      {loading && <Loader> <div className="loader-message">{loadingMessage}</div></Loader>}
      
      {/* Your Table Component */}
      <div className="-my-2 py-2 w-full overflow-hidden sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none rounded px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
              placeholder="بحث"
            />
          </div>
        </div>
      </div>

      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">رقم جواز السفر</th>
              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">صاحب جواز السفر</th> */}

              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">الجنسية</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">تاريخ الاصدار</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">تاريخ الانتهاء</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">صوره جواز السفر</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">عمليات</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">اضافة جواز سفر جديد</th>

              {/* <th className="px-6 py-3 border-b-2 border-gray-300">إضافة جواز سفر آخر</th> */}


            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <React.Fragment key={row.passportId}>
                  <tr >
                    <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">{row.passportNumber}</td>
                    {/* <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">{customerName}</td> */}

                    <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">{row.nationality}</td>
                    <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">{row.issueDate}</td>
                    <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">{row.expiryDate}</td>
                    <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider ">
                      <button
                        className="px-6 py-3  flex justify-center bg-black border-black-500 border text-white rounded transition duration-300 hover:bg-gray-100 hover:text-black"
                        onClick={() => loadPassportImage(row.passportId)} // Load image when clicked
                      >
                        عرض الصورة
                      </button>
                    </td>


                    <td>
                      <div className="flex space-x-4">
                        <button
                          className="px-6 py-3 w-1/2 flex justify-center bg-black border-black-500 border text-white rounded transition duration-300 hover:bg-gray-100 hover:text-black"
                          onClick={() => handleDeletePassport(row.passportId)} // Pass the passportId for deletion
                        >
                          حذف
                        </button>

                        <button
                          className="px-6 py-3 w-1/2 flex justify-center bg-black border-black-500 border text-white rounded transition duration-300 hover:bg-gray-100 hover:text-black"
                          onClick={() => handleRowClickEdit(index)} // Handle edit
                        >
                          تعديل
                        </button>

                      </div>
                    </td>

                    <td>
                    <div className="flex space-x-4">
                        <button
                          className="px-6 py-3 w-1/2 flex justify-center bg-black border-black-500 border text-white rounded transition duration-300 hover:bg-gray-100 hover:text-black"
                          onClick={() => handleRowClickEditAddPassport(index)} // Handle edit
                        >
                          +
                        </button>

                      </div>
                    </td>


                  </tr>

                  {/* Render the modal for the expanded row */}
                  {expandedRowEdit === index && (
                    <tr>
                      <td colSpan="6" className="p-4">
                        <EditProductModal
                          isOpen={expandedRowEdit === index} // Show modal if this row is expanded
                          onClose={() => setExpandedRowEdit(null)} // Close modal
                          rowData={row} // Pass row data to modal
                          onUpdate={(updatedData) => updateData(row.passportId, updatedData)} // Ensure row ID is passed
                        />
                      </td>
                    </tr>
                  )}
                  {/* Render the modal for the ADD new passport */}

{expandedRowAddPassport === index && (
                    <tr>
                      <td colSpan="6" className="p-4">
                        <AddPassportModal
                          isOpen={expandedRowAddPassport === index} // Show modal if this row is expanded
                          onClose={() => setExpandedRowAddPassport(null)} // Close modal
                          passportId={row.passportId} // Pass row data to modal
                          onCustomerIdChange={handleCustomerId}
                        />
                      </td>
                    </tr>
                  )}


                  {isModalOpen && (
                    <div
                      className="fixed inset-0 z-70 flex items-center justify-center bg-opacity-50 max-w-full h-[90vh] max-h-[90vh]"
                      onClick={() => setIsModalOpen(false)} // Close the modal when clicking outside
                    >
                      <div
                        className="bg-white p-8 rounded-lg max-w-lg w-full relative" // Added `relative` class to the modal container
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                      >
                        <button
                          className="absolute top-2 left-2 text-black font-bold" // Position the X at the top-left corner
                          onClick={() => setIsModalOpen(false)} // Close the modal
                        >
                          X
                        </button>

                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-bold">صورة جواز السفر </h2>
                        </div>
                        <div className="mt-4">
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt="Passport"
                              style={{ maxWidth: '100%', maxHeight: '400px', margin: 'auto' }}
                            />
                          ) : (
                            <p>لا توجد صورة</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}



                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  لا يوجد نتائج.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
          {/* <div>
            <p className="text-sm leading-5 text-black-700">
              اظهار <span className="font-medium">{filteredData.length}</span> من <span className="font-medium">{data.length}</span> مجموع العملاء
            </p>
          </div> */}
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

export default PassportTable;
