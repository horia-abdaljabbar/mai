import React, { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import AddNewPassportForm from '@/Forms/AddNewPassportForm';

export default function ExpandedStagesForPassport({ customerData }) {
  // State to track which passport form is expanded
  const [expandedPassportIndex, setExpandedPassportIndex] = useState(null);

  // Handle button click to expand or collapse the passport form
  const handleToggleForm = (index) => {
    setExpandedPassportIndex(expandedPassportIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Render buttons based on the number of passports */}
      <Typography variant="h5" color="blue-gray" className="text-center font-semibold">
        مراحل إضافة الجوازات
      </Typography>
      
      {customerData.passports.map((passport, index) => (
        <div key={passport.passportId} className="flex flex-col gap-2">
          {/* Button to expand/collapse form */}
          <Button
            onClick={() => handleToggleForm(index)}
            color="blue"
            fullWidth
          >
            {`إظهار التفاصيل للجواز ${index + 1}`}
          </Button>
          
          {/* Render passport form and AddNewProfile form if expanded */}
          {expandedPassportIndex === index && (
            <div className="p-4 mt-2 border border-gray-300 rounded-lg bg-gray-50">
              {/* Render PassportForm */}
              {/* <PassportForm passportData={passport} /> */}
              
              {/* Render AddNewProfile form */}
              <AddNewPassportForm customerId={customerData.customerId} passportId={passport.passportId} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
