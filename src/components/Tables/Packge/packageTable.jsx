import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProductModal from '../editPassPoert'; // Assuming you have this modal component
import Description from './componants/description';
import AvailableDatePicker from '@/Forms/componants/package/componant/ShowAvailabledate';


const PackageTable = ({ data , openDrawerTop }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [openCenter, setOpenCenter] = useState(false); // Manage drawer state for description

  const navigate = useNavigate();

  const handleAddNewClient = () => {
    navigate('/profile');
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const filteredData = data.filter((row) =>
    (row.package_name && row.package_name.includes(searchTerm)) ||
    (row.hotel_booking_madina && row.hotel_booking_madina.includes(searchTerm))
  );



  const openDrawerCenter = () => setOpenCenter(true); // Function to open the center drawer
  const closeDrawerCenter = () => setOpenCenter(false); // Function to close the center drawer

  const availableDates = [
    '2024-11-05',
    '2024-11-10',
    '2024-11-12',
    '2024-11-15',
    '2024-11-20',
    '2024-11-25',
  ];

  return (
    <div className="py-4 w-full overflow-hidden px-6">
      <div className="rounded-t-lg shadow-md bg-white px-8 py-4 mb-4">
        <div className="flex justify-between">
          <div className="w-3/4 flex border rounded-lg px-4 h-12 bg-gray-100">
            <span className="flex items-center text-gray-400">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.11 15.22C12.04 15.22 15.22 12.04 15.22 8.11C15.22 4.18 12.04 1 8.11 1C4.18 1 1 4.18 1 8.11C1 12.04 4.18 15.22 8.11 15.22Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 17L13.13 13.13" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round"/>
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
            className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
            onClick={openDrawerTop}
          >
            اضافة بكج جديد
          </button>
        </div>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden bg-white">
        <table className="min-w-full w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="px-6 py-3">اسم البكج</th>
              <th className="px-6 py-3">مدة البكج</th>
              <th className="px-6 py-3"> انواع الغرف</th>
              <th className="px-6 py-3"> السعر </th>
              <th className="px-6 py-3">تواريخ المتاحه</th>
              <th className="px-6 py-3"> حجز الفندق المدينة</th>
              <th className="px-6 py-3"> حجز الفندق مكة</th>
              <th className="px-6 py-3"> حجز المواصلات الداخليه</th>
              <th className="px-6 py-3">الوصف</th>
              <th className="px-6 py-3">تعديل</th>
              <th className="px-6 py-3">حذف</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <React.Fragment key={index}>
                  <tr className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.package_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.package_duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.room_types}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-700"> 
                      <AvailableDatePicker availableDates={availableDates} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.hotel_booking_madina}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.hotel_booking_mekka}</td>
                    <td className="px-6 py-4 text-sm text-gray-700"></td>
                    {/* Description button will trigger drawer */}
                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        onClick={openDrawerCenter} // Open center drawer when clicked
                      >
                        الوصف
                      </button>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        onClick={() => handleRowClick(index)}
                      >
                        تعديل
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        onClick={() => handleRowClick(index)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                  <Description openCenter={openCenter} closeDrawerCenter={closeDrawerCenter} text={row.description} />
                
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="7" className="px-6 py-4">
                        <EditProductModal
                          isOpen={expandedRow === index}
                          onClose={() => setExpandedRow(null)}
                          rowData={row}
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
                  <button
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={handleAddNewClient}
                  >
                    اضافة بكج جديد
                  </button>
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
  );
};

export default PackageTable;
