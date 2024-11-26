import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const FlightReservationTable = ({ data }) => {
    const [tableData, setTableData] = useState(data);
    const [editRowIndex, setEditRowIndex] = useState(null);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleTimeChange = (value, index, field) => {
        const updatedData = [...tableData];
        updatedData[index][field] = value ? dayjs(value).format('HH:mm') : '';
        setTableData(updatedData);
    };

    const handleDateChange = (value, index) => {
        const updatedData = [...tableData];
        updatedData[index].تاريخ_الرحلة = value ? dayjs(value).format('YYYY-MM-DD') : '';
        setTableData(updatedData);
    };

    const handleAddNewFlight = () => {
        const newRow = {
            رحلة_الطيران: '',
            رقم_التذكرة: '',
            الخطوط_الجوية: '',
            من: '',
            إلى: '',
            تاريخ_الرحلة: '',
            الدرجة: '',
            عدد_التوقفات: '',
            الطائرة: '',
            الأمتعة: '',
            المغادرة: '',
            الوصول: ''
        };
        setTableData([...tableData, newRow]);
        setEditRowIndex(tableData.length);
    };

    const handleSaveClick = () => {
        setEditRowIndex(null);
    };

    const handleEditClick = (index) => {
        setEditRowIndex(index);
    };

    const handleDeleteClick = (index) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setTableData(updatedData);
    };

    const handleInputChange = (index, field, value) => {
        const updatedData = [...tableData];
        updatedData[index][field] = value;
        setTableData(updatedData);
    };

    return (
        <div className="py-2 w-full overflow-hidden sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg px-12 py-4 rounded-t-lg">
                <div className="flex justify-between">
                    <button
                        className="mt-10 px-5 py-2 border border-black text-black rounded transition duration-300 hover:bg-black hover:text-white"
                        onClick={handleAddNewFlight}
                    >
                        اضافه حجز للطيران
                    </button>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                {['رحلة الطيران', 'رقم التذكرة', 'الخطوط الجوية', 'من', 'إلى', 'الدرجة', 'عدد التوقفات', 'الطائرة', 'الأمتعة', 'المغادرة', 'الوصول', 'تاريخ الرحلة', 'إجراءات'].map((header, index) => (
                                    <th key={index} className="px-2 py-6 border-b w-1/12 text-center">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, index) => (
                                    <tr key={index} className="text-center">
                                        {editRowIndex === index ? (
                                            // Multi-row/column layout in edit mode
                                            <td colSpan="13" className="p-4 border-b border-gray-300">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                    {Object.keys(row).map((field, fieldIndex) => (
                                                        <div key={fieldIndex} className="flex flex-col">
                                                            <label className="text-gray-700 font-medium mb-1">{field}</label>
                                                            {['المغادرة', 'الوصول'].includes(field) ? (
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <TimePicker
                                                                        value={dayjs(row[field], 'HH:mm')}
                                                                        onChange={(value) => handleTimeChange(value, index, field)}
                                                                        renderInput={(params) => <input {...params} className="border p-2 rounded w-full" />}
                                                                    />
                                                                </LocalizationProvider>
                                                            ) : field === 'تاريخ_الرحلة' ? (
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DatePicker
                                                                        value={dayjs(row[field], 'YYYY-MM-DD')}
                                                                        onChange={(value) => handleDateChange(value, index)}
                                                                        renderInput={(params) => <input {...params} className="border p-2 rounded w-full" />}
                                                                    />
                                                                </LocalizationProvider>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={row[field]}
                                                                    onChange={(e) => handleInputChange(index, field, e.target.value)}
                                                                    className="border p-2 rounded w-full"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Save button */}
                                                <div className="flex justify-end mt-4">
                                                    <button
                                                        onClick={handleSaveClick}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    >
                                                        حفظ
                                                    </button>
                                                </div>
                                            </td>
                                        ) : (
                                            // Standard single-row layout when not in edit mode
                                            <>
                                                {Object.keys(row).map((field, fieldIndex) => (
                                                    <td key={fieldIndex} className="px-4 py-4 border-b border-gray-300">
                                                        {row[field]}
                                                    </td>
                                                ))}
                                                <td className="px-4 py-4 border-b border-gray-300">
                                                    {editRowIndex === index ? (
                                                        <button
                                                            onClick={handleSaveClick}
                                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                                        >
                                                            حفظ
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditClick(index)}
                                                            className="px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-gray-200"
                                                        >
                                                            تعديل
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 border-b border-gray-300">
                                                    <button
                                                        onClick={() => handleDeleteClick(index)}
                                                        className="px-4 py-2 bg-transparent text-gray-700 rounded hover:bg-gray-200"
                                                    >
                                                        حذف
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13" className="text-center py-6">لا توجد بيانات</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FlightReservationTable;
