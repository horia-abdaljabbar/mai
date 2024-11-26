
import {
  Input,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import InputPhoneCountryCode from "../Forms/componants/phonefield";
import React, { useState, useEffect } from 'react';
import DatePicker from "../Forms/componants/date";
import MenuBiologicalsex from "../Forms/componants/sexMenue";
import CustomerProfileViewModel from "../models/CustomerProfileViewModel";
import styled from 'styled-components';

export const SimpleRegistrationForm=({ activeStep, formData, handleChange,errorsCustomer ,origin}) => {
  const [profile, setProfile] = useState(new CustomerProfileViewModel());

  const [currentDate, setCurrentDate] = useState('');
  console.log('Passport Data origin:', origin);


  // Get today's date and format it as YYYY-MM-DD
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10); // Extract the date part in YYYY-MM-DD format
    setCurrentDate(formattedDate);
  }, []);
  

  return (
    
    <>
    <input
              type="text"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-shrink flex-grow flex-auto border-b-2 leading-normal tracking-wide w-px flex-1 border border-t-0 border-l-0 rounded rounded px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
              placeholder="بحث"
            />
    <div className="flex flex-col w-full gap-10 mb-1 mr-18 p-4 relative">
      <Typography
        variant="h3" // H1 by default, H3 on large screens
        color="black-gray"
        className="text-center text-xl lg:text-xl"
      >
        المعلومات الشخصية للعميل
      </Typography>

      <div className="mb-1 flex flex-col md:flex-row gap-9 lg:w-full ">
        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
            الاسم الاول
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال الاسم الاول"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange}
          />
          {errorsCustomer.firstName && <span className="error-text"style={{ color: 'red' }}>{errorsCustomer.firstName}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
       الاسم الثاني
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال الثاني"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="fatherName" 
            value={formData.fatherName} 
            onChange={handleChange}
          />
           {errorsCustomer.fatherName && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.fatherName}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
         الاسم الثالث
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال الاسم الثالث"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="grandFatherName" 
            value={formData.grandFatherName} 
            onChange={handleChange}
          />
            {errorsCustomer.grandFatherName && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.grandFatherName}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
            اسم العائلة
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال العائلة"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="familyName" 
            value={formData.familyName} 
            onChange={handleChange}
          />
           {errorsCustomer.familyName && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.familyName}</span>}

        </div>

      </div>
      <div className="mb-1 flex flex-col md:flex-row gap-9 lg:w-full ">
        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
           Family name
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال اسم العائلة بالانجليزية"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="familyNameEnglish" 
            value={formData.familyNameEnglish} 
            onChange={handleChange}
          />
           {errorsCustomer.familyNameEnglish && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.familyNameEnglish}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
          Third Name
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال الاسم الثالث بالانجليزية"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="grandFatherNameEnglish" 
            value={formData.grandFatherNameEnglish} 
            onChange={handleChange}
          />
           {errorsCustomer.grandFatherNameEnglish && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.grandFatherNameEnglish}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
          Second Name
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال الاسم الثاني بالانجليزية"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="fatherNameEnglish" 
            value={formData.fatherNameEnglish} 
            onChange={handleChange}
          />
          {errorsCustomer.fatherNameEnglish && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.fatherNameEnglish}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
        First Name
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال الاسم الاول بالانجليزية"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="firstNameEnglish" 
            value={formData.firstNameEnglish} 
            onChange={handleChange}
          />
          {errorsCustomer.firstNameEnglish && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.firstNameEnglish}</span>}

        </div>

      </div>

      <div className="mb-1 flex flex-col md:flex-row gap-9 lg:w-full ">
        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
        رقم الهوية
          </Typography>
          <Input
            size="lg"
            placeholder="قم بادخال العائلة"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            maxLength={9}
            name="idNumber" 
            value={formData.idNumber} 
            onChange={handleChange}
          />
          {errorsCustomer.idNumber && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.idNumber}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
          تاريخ الميلاد
          </Typography>
       <DatePicker 
          name="dateOfBirth"
          value={formData.dateOfBirth} 
          onChange={handleChange} 
          placeholder={(origin=="EditCustomerInfoModal")?formData.dateOfBirth:formData.dateOfBirth}            
       />
         {errorsCustomer.dateOfBirth && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.dateOfBirth}</span>}

        </div>

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
      <Typography variant="h6" color="black-gray" className="-mb-3  w-1/3">
  العنوان
        </Typography>
        <Input
          type="string"
          size="lg"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500 w-full h-11"
          labelProps={{
            className: "before:content-none after:content-none relative w-full h-11",
          }}
          name="address"
          value={formData.address} 
          onChange={handleChange} 
          
        />
        {errorsCustomer.address && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.address}</span>}

        </div>
    
        <div className="mb-1 flex flex-col gap-3 lg:w-1/3">
      <Typography variant="h6" color="black-gray" className="-mb-3  w-1/3">
          البريد الالكتروني
        </Typography>
        <Input
          id="email"
         
          type="email"
          name="email"
          size="lg"
          placeholder="ادخل البريد الالكتروني"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500 w-full h-11"
          labelProps={{
            className: "before:content-none after:content-none relative w-full h-11",
          }}
          value={formData.email} 
          onChange={handleChange}
        />
          {errorsCustomer.email && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.email}</span>}

        </div>
      </div>
      
      {/* Another responsive row */}
      <div className="mb-1 flex flex-col md:flex-row gap-9 lg:w-full h-full ">

        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
        <Typography variant="h6" color="black-gray" className="-mb-3">
            رقم الهاتف المحمول
          </Typography>
          <InputPhoneCountryCode 
            name="phoneNumber"
            value={formData.phoneNumber} 
            onChange={handleChange} 
            errorMessage={errorsCustomer.phoneNumber}
            placeholder={(origin=="EditCustomerInfoModal")?formData.phoneNumber:formData.phoneNumber}            

            />
            {errorsCustomer.phoneNumber && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.phoneNumber}</span>}
{console.log(formData.phoneNumber)}
        </div>
        <div className="mb-1 flex flex-col gap-3 lg:w-1/3">
          <Typography variant="h6" color="black-gray" className="-mb-3">
          اسم للتواصل بحالة الطوارئ
          </Typography>
          <Input
            size="lg"
           
            placeholder=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
            labelProps={{
              className: "before:content-none after:content-none relative w-full min-w-[240px] h-11",
            }}
            name="emergencyContactName" 
            value={formData.emergencyContactName} 
            onChange={handleChange}
          />
          {errorsCustomer.emergencyContactName && <span className="error-text" style={{ color: 'red', fontSize: '16px' }}>{errorsCustomer.emergencyContactName}</span>}

        </div>
        <div className="mb-1 flex flex-col gap-3 lg:w-1/3">
          <Typography variant="h6" color="black-gray" className="-mb-3">
      رقم هاتف للطوارئ
          </Typography>
          <InputPhoneCountryCode 
              name="emergencyContactPhone" 
              value={formData.emergencyContactPhone} 
              onChange={handleChange} 
              errorMessage={errorsCustomer.emergencyContactPhone}
              placeholder={(origin=="EditCustomerInfoModal")?formData.emergencyContactPhone:formData.emergencyContactPhone}            

          />
        {errorsCustomer.emergencyContactPhone && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.emergencyContactPhone}</span>}

        </div>
        <div className="mb-1 flex flex-col gap-3 lg:w-1/4">
          <Typography variant="h6" color="black-gray" className="-mb-3">
    الجنس
          </Typography>
         <MenuBiologicalsex
             name="gender"
             value={formData.gender}
             onChange={(selectedSex) => handleChange({ target: { name: 'gender', value: selectedSex } }, selectedSex)}
             origin={origin}
             
         />
          {errorsCustomer.gender && <span className="error-text" style={{ color: 'red' }}>{errorsCustomer.gender}</span>}

        </div>
       
      </div>
      {/* <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;هل هذا العميل مسؤول
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        /> */}
    </div>
    </>
  );
}

export default SimpleRegistrationForm;
