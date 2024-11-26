import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BusReservationTable = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedRow, setExpandedRow] = useState(null); // Track expanded row
    const [isAddingNewBus, setIsAddingNewBus] = useState(false); // Track adding new bus
    const [editRowIndex, setEditRowIndex] = useState(null); // Track editing row
    const [tableData, setTableData] = useState(data); // Set initial data
  
    const navigate = useNavigate();
  
    const handleAddNewBus = () => {
      const newRow = { رقم_الباص: '', نوع_الباص: '', عدد_المقاعد: '', موقع_الانطلاق: '', موقع_التقف: '' };
      const newData = [...tableData, newRow];
  
      setTableData(newData); // Add the new row to the table data
      setEditRowIndex(newData.length - 1); // Set editing to the new row's index
      setExpandedRow(newData.length - 1); // Expand the new row
      setIsAddingNewBus(true);
    };
  
    const handleRowExpand = (index) => {
      setExpandedRow(expandedRow === index ? null : index); // Toggle expand
    };
  
    const handleSaveClick = (index) => {
      setEditRowIndex(null);
      setIsAddingNewBus(false);
    };
  
    const handleEditClick = (index) => {
      setEditRowIndex(index);
    };
  
    const handleDeleteClick = (index) => {
      const updatedData = tableData.filter((_, i) => i !== index);
      setTableData(updatedData);
    };
  
    const handleInputChange = (index, field, value) => {
      const newData = [...tableData];
      newData[index][field] = value;
      setTableData(newData);
    };
  
    const filteredData = tableData.filter(
      (row) =>
        searchTerm === '' || // Show all data if searchTerm is empty
        row.رقم_الباص.includes(searchTerm) ||
        row.نوع_الباص.includes(searchTerm) ||
        row.موقع_الانطلاق.includes(searchTerm) ||
        row.موقع_التقف.includes(searchTerm)
    );
  

  return (
    <div className="-my-2 py-2 w-full overflow-hidden sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
              placeholder="بحث"
            />
          </div>
          <button
            className="mt-10 px-5 py-2 border-black-400 border text-black-500 rounded transition duration-300 hover:bg-black hover:text-white focus:outline-none"
            onClick={handleAddNewBus}
          >
            اضافه حجز للباص
          </button>
        </div>
      </div>

      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-black-500 tracking-wider">رقم الباص</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-black-500 tracking-wider">نوع الباص</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-black-500 tracking-wider">عدد المقاعد</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-black-500 tracking-wider">موقع الانطلاق</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-black-500 tracking-wider">موقع_التوقف</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-black-500 tracking-wider">إجراء</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-black-500 tracking-wider">حذف</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        value={row.رقم_الباص}
                        onChange={(e) => handleInputChange(index, 'رقم_الباص', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      row.رقم_الباص
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        value={row.نوع_الباص}
                        onChange={(e) => handleInputChange(index, 'نوع_الباص', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      row.نوع_الباص
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        value={row.عدد_المقاعد}
                        onChange={(e) => handleInputChange(index, 'عدد_المقاعد', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      row.عدد_المقاعد
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        value={row.موقع_الانطلاق}
                        onChange={(e) => handleInputChange(index, 'موقع_الانطلاق', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      row.موقع_الانطلاق
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        value={row.موقع_التوقف}
                        onChange={(e) => handleInputChange(index, 'موقع_التوقف', e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      row.موقع_التوقف
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-right">
                    {editRowIndex === index ? (
                      <button
                        onClick={() => handleSaveClick(index)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        حفظ
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(index)}
                        className="flex items-center px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-right">
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="flex items-center px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-gray-200"
                    >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusReservationTable;
