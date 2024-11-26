import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

export default function ResponsiveTimePickers({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MobileTimePicker']}>
        <DemoItem className="px-2 py-6 border-b w-1/12 border-gray-300">
          <MobileTimePicker
            value={value}
            onChange={(newValue) => {
              if (newValue) {
                onChange(newValue); // Ensure newValue is valid before calling onChange
              }
            }}
            renderInput={(params) => <input {...params} className="border p-2 rounded w-full" />}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
