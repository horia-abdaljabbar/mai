
import React, { useEffect, useState } from "react";
import { SimpleRegistrationForm } from "../../Forms/profileform";
import PassportForm from '../../Forms/passport';
import { Button, Typography, Progress } from "@material-tailwind/react";
import CustomerProfileViewModel from "../../models/CustomerProfileViewModel"; // Make sure this path is correct
import PassportViewModel from "../../models/PassportViewModel";
import addCustomerProfile from '../../controllers/CustomerProfileApis/addCustomerProfile';
import addPassport from '../../controllers/PassportApis/addPassport';
import getPassportById from '../../controllers/PassportApis/getPassportById';
import updateCustomerProfile from '../../controllers/CustomerProfileApis/updateCustomerProfile';
import updatePassport from '../../controllers/PassportApis/updatePassport';
import getCustomertProfileById from '../../controllers/CustomerProfileApis/getCustomerProfileById'
import { toast } from 'react-hot-toast';
import styled from 'styled-components';


export function StepperWithContent({ onComplete }) {
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJhYmFmMmE4Yi02MGYwLTRjYzMtOGQzZS04MDM2ZTZhNzE5ZjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE3NDgwMjQsImV4cCI6MTczMjYxMjAyNCwiaWF0IjoxNzMxNzQ4MDI0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.78pGO0MadZydPSuCsq7M26e_GhBSNyCAf1D_c2VUte0';
  const [activeStep, setActiveStep] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [submittedData, setSubmittedData] = useState([]);
  const [submittedDataPassport, setSubmittedDataPassport] = useState([]);
  const [gender, setGender] = useState("");
  const [errorsCustomer, setErrorsCustomer] = useState([]); // State to hold validation errors for customer profile
  const [errorsPassport, setErrorsPassport] = useState({}); // State for passport validation errors
  const [returnPassport, setReturnPassport] = useState({});
  const [returnCustomer, setReturnCustomer] = useState({});
  const [customerProfile, setCustomerProfile] = useState(new CustomerProfileViewModel({}));
  const [passportData, setPassportData] = useState(new PassportViewModel({}, customerId));
  const [imageFile, setImageFile] = useState(null); // For storing the image file
  const [imagePreview, setImagePreview] = useState(null); // For displaying the preview
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(""); // State for loader message

  const steps = 3; // Total steps, including the first and last step

  const isLastStep = activeStep === steps - 1;
  const isFirstStep = activeStep === 0;

  // Dynamically calculate the percentage value based on the current step
  const getProgressPercentage = () => {
    if (activeStep === 0) return '0%';
    if (activeStep === 1) return '50%';
    if (activeStep === 2) return '100%';
  };

  // Progress value for the Progress component
  const getProgressValue = () => (activeStep / (steps - 1)) * 100;

  const handleNext = async () => {

    try {
      // Handle Customer Profile Submission for Step 0
      if (activeStep === 0) {
        const CACHE_NAME = "customerCache";
    
        // Validate the current customer profile data
        const validationErrors = customerProfile.validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrorsCustomer(validationErrors);
            return;
        }
    
        try {
            setLoading(true);
            setLoadingMessage("جارٍ التحقق من بيانات العميل...");
    
            // Function to fetch cached customer IDs
            const getCachedCustomerIds = async () => {
                const cache = await caches.open(CACHE_NAME);
                const response = await cache.match("customerIds");
                if (response) {
                    const data = await response.json();
                    return data; // Return parsed list of IDs
                }
                return []; // Return an empty list if no cache exists
            };
    
            // Function to update cache with new ID
            const updateCacheWithId = async (newId) => {
                const cache = await caches.open(CACHE_NAME);
                // Open the cache
                const currentIds = await getCachedCustomerIds();
                const updatedIds = [...currentIds, newId];
                const response = new Response(JSON.stringify(updatedIds));
                await cache.put("customerIds", response);
                console.log("customer id saved to cache:", newId); // Log confirmation

            };
    
            if (returnCustomer.data && returnCustomer.data.id) {
                const existingCustomer = await getCustomertProfileById(returnCustomer.data.id, apiKey, token);
                if (existingCustomer) {
                    const updateData = {
                        ...customerProfile,
                        id: existingCustomer.id
                    };
    
                    setLoadingMessage("جارٍ تعديل بيانات العميل...");
                    const updateResult = await updateCustomerProfile(updateData, apiKey, token, returnCustomer.data.id);
                    if (updateResult) {
                        console.log("Customer updated successfully!");
                        toast.success("تم تعديل معلومات العميل بشكل صحيح");
                        setActiveStep((cur) => cur + 1);
                        await updateCacheWithId(existingCustomer.id); // Save updated ID to cache
                    } else {
                        toast.error("هناك خطأ في تعديل معلومات العميل!");
                    }
                }
            } else {
                setLoadingMessage("جارٍ إضافة بيانات العميل...");
                const addResult = await addCustomerProfile(customerProfile, apiKey, token);
                if (addResult) {
                    console.log("Customer added successfully!", addResult);
                    toast.success("تم إضافة هذا العميل بشكل صحيح");
                    setReturnCustomer(addResult);
    
                    if (addResult.data && addResult.data.id) {
                        await updateCacheWithId(addResult.data.id); // Save new ID to cache
                        setCustomerId(addResult.data.id);
                    }
                    setActiveStep((cur) => cur + 1);
                } else {
                    toast.error("هناك خطأ في إضافة هذا العميل!");
                }
            }
        } catch (error) {
            console.error("An error occurred: " + error.message);
            toast.error("هناك خطأ في إضافة هذا العميل!");
        } finally {
            setLoading(false);
            setLoadingMessage("");
        }
    }
    


      else if (activeStep === 1) {
        // Log the current passport data and ID
        // Validate the current customer profile data

        console.log("passport Data:", passportData);

        const validationErrors = passportData.validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrorsCustomer(validationErrors); // Set validation errors
          return;
        }
        try {
          setLoading(true);
          setLoadingMessage("جارٍ التحقق من بيانات جواز السفر...");
          // Check if passportId exists in the returnPassport data
          if (returnPassport.data && returnPassport.data.passportId) {
            // Step 1: Fetch the existing passport by ID
            const existingPassport = await getPassportById(returnPassport.data.passportId, apiKey, token); // Fetch passport by ID
            console.log("existingPassport.passportNumber upppp", existingPassport.data.passportNumber);  // Debugging line

            if (existingPassport) {
              // Step 3: Check if data has changed before updating
              const hasChanges = hasPassportDataChanged(passportData, existingPassport);
              console.log("Changes detected:", hasChanges);  // Debugging line

              if (!hasChanges) {
                console.log("No changes detected in passport data. Skipping update.");
                return; // Exit if no changes are detected
              }

              console.log("Updating passport with ID:", returnPassport.data.passportId);
              const formData = new FormData();
              formData.append("passportNumber", passportData.passportNumber);
              formData.append("issueDate", passportData.issueDate);
              formData.append("expiryDate", passportData.expiryDate);
              formData.append("nationality", passportData.nationality);
              formData.append("iDate", passportData.iDate);
              formData.append("passportPhoto", passportData.passportPhoto);
              formData.append("customerProfileId", passportData.customerProfileId);
              formData.append("passportId", returnPassport.data.passportId);

              // Append the passport photo file if a new one is provided
              if (passportData.passportPhotoFile) {
                console.log("Appending passportPhotoFile:", passportData.passportPhotoFile);
                formData.append("passportPhotoFile", passportData.passportPhotoFile);
              }

              // Log formData entries to verify content
              for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
              }


              // Step 2: If passport exists, update it
              setLoadingMessage("...جارٍ تعديل بيانات جواز السفر");

              const updateResult = await updatePassport(formData, apiKey, token, returnPassport.data.passportId); // Call the update API function
              if (updateResult) {
                console.log('Passport updated successfully!', updateResult);
                toast.success("تم تعديل جواز السفر بشكل صحيح");

                setActiveStep((cur) => cur + 1);
              } else {
                toast.error("هناك خطَ في تعديل جواز السفر!!");
              }
            } else {
              console.log('No existing passport found. This should not happen if the ID is valid.');
              toast.error("جواز السفر غير موجود");

            }
          }


          else {
            // Step 3: If passportId is undefined, add a new passport
            console.log("customer id before add passport:", customerId);
            console.log("passportData:", passportData);

            // Prepare formData for adding a new passport (passport data + image)
            const formData = new FormData();
            formData.append("passportNumber", passportData.passportNumber);
            formData.append("issueDate", passportData.issueDate);
            formData.append("expiryDate", passportData.expiryDate);
            formData.append("nationality", passportData.nationality);
            formData.append("passportPhoto", passportData.passportPhoto);
            formData.append("iDate", passportData.iDate);
            formData.append("customerProfileId", passportData.customerProfileId);
            // Append passport data fields to formData
            Object.keys(passportData).forEach((key) => {
              console.log(`Appending key: ${key}, value: ${passportData[key]}`);  // Check each key-value pair

              formData.append(key, passportData[key]);
            });

            // If an image is present, append the image file to formData
            // Append the image file to formData (if present)
            if (passportData.passportPhotoFile) {
              console.log("Appending passportPhotoFile:", passportData.passportPhotoFile);
              formData.append("passportPhotoFile", passportData.passportPhotoFile);
            }
            // Log formData entries to ensure it's properly populated
            for (let [key, value] of formData.entries()) {
              console.log(`${key}: ${value}`);
            }
            // Call the addPassport function with formData
            setLoadingMessage("...جارٍ إضافة بيانات جواز السفر");

            const addResult = await addPassport(formData, apiKey, token); // Call the add API function
            if (addResult) {
              console.log('Passport added successfully!', addResult);
              toast.success("تم إضافة جواز السفر بشكل صحيح");

              setReturnPassport(addResult); // Store the result in the state
              console.log('Passport ID:', addResult.data.passportId); // Check the passport ID
              setActiveStep((cur) => cur + 1);

            } else {
              toast.error("هناك خطَأ في إضافة هذا الجواز!");
            }
          }
        } catch (error) {
          console.log('An error occurred: ' + error.message); // Handle any error
        }
        finally {
          setLoading(false); // Hide the loader once the operation is complete
          setLoadingMessage(""); // Clear the loading message
        }
      }
      if (activeStep === steps - 2) {
        console.log('Reached last step: activeStep =', activeStep); // Log when last step is reached

        onComplete(); // Notify parent component to move to the next stage
      }


      // else if (!isLastStep) {
      //   setActiveStep((cur) => cur + 1);
      // } 
      // Trigger the onComplete callback when reaching the last step
      //  else if (activeStep === steps - 2) {
      //   console.log("Triggering onComplete callback...");
      //   onComplete();
      //         }

      // else if (activeStep === steps - 2) {
      //   onComplete(); // Notify parent component to move to the next stage
      // }


    }

    catch (err) {
      // Handle error
      console.error(err);
    }
  };

  // Utility function to compare passportData with existingPassport
  function hasPassportDataChanged(passportData, existingPassport) {
    // Compare passportNumber (string comparison)
    const passportNumberChanged = passportData.passportNumber !== existingPassport.data.passportNumber;

    // Compare other passport fields, excluding passportPhotoFile
    const issueDateChanged = passportData.issueDate !== existingPassport.data.issueDate;
    const expiryDateChanged = passportData.expiryDate !== existingPassport.data.expiryDate;
    const nationalityChanged = passportData.nationality !== existingPassport.data.nationality;
    const iDateChanged = passportData.iDate !== existingPassport.data.iDate;
    const customerProfileIdChanged = passportData.customerProfileId !== existingPassport.data.customerProfileId;

    // You can include more fields as required, based on your model
    // For example, if you have additional fields like 'passportType', 'birthDate', etc., add them here

    // For passportPhotoFile, we'll exclude it from the change check as per your requirement
    const passportPhotoFileChanged = false; // This ensures passportPhotoFile is ignored in the comparison

    // Log each change detected for debugging purposes
    console.log("passportNumberChanged:", passportNumberChanged);
    console.log("issueDateChanged:", issueDateChanged);
    console.log("expiryDateChanged:", expiryDateChanged);
    console.log("nationalityChanged:", nationalityChanged);
    console.log("iDateChanged:", iDateChanged);
    console.log("customerProfileIdChanged:", customerProfileIdChanged);

    // Return true if any field (except passportPhotoFile) has changed
    return passportNumberChanged || issueDateChanged || expiryDateChanged || nationalityChanged || iDateChanged || customerProfileIdChanged;
  }

  const handlePrev = () => {
    if (activeStep === 1) {
      // const lastSubmittedProfile = customerProfile;
      // console.log("pre customer profile:", lastSubmittedProfile)
      // setCustomerProfile(lastSubmittedProfile); // Load the last submitted profile
      // console.log("pre customer profile empty???" ,isEmptyObject(customerProfile));
    }
    if (activeStep === 0) {
      const lastSubmittedProfile = customerProfile;
      setCustomerProfile(lastSubmittedProfile); // Load the last submitted profile
      console.log("pre customer profile:", customerProfile);

    }
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
    }
  };
  // Function to handle changes in customer profile form
  const handleChange = (e, selectedSex) => {
    const { name, value } = e.target;
    // Create a new instance to maintain the class methods
    const updatedProfile = new CustomerProfileViewModel();
    // Merge old and new values, including gender explicitly
    Object.assign(updatedProfile, customerProfile, {
      [name]: name === "gender" ? selectedSex : value, // Assign selectedSex only if name is "gender"
    });

    // Assign gender explicitly if gender is being updated
    if (name === "gender") {
      setGender(selectedSex); // Update the state with the selected biological sex
      updatedProfile.gender = selectedSex; // Also set it in updatedProfile
    }    // Compute fullName logic
    const { firstName, fatherName, grandFatherName, familyName } = updatedProfile;
    updatedProfile.fullName = `${firstName} ${fatherName} ${grandFatherName} ${familyName}`.trim();

    const { firstNameEnglish, fatherNameEnglish, grandFatherNameEnglish, familyNameEnglish } = updatedProfile;
    updatedProfile.fullNameEnglish = `${firstNameEnglish} ${fatherNameEnglish} ${grandFatherNameEnglish} ${familyNameEnglish}`.trim();

    setCustomerProfile(updatedProfile); // Update with the new instance
    // Validate the updated profile
    // Validate the updated profile and set errors
    const validationErrors = updatedProfile.validate();
    setErrorsCustomer(validationErrors); // Update errors in state
    if (name === "gender") {
      setGender(selectedSex); // Update the state with the selected biological sex
    }
    // Validate the emergency contact phone number if it's being changed
    // if (name === 'emergencyContactPhone') {
    //   if (!value || value === 'default-value') {
    //     setErrorsCustomer({ ...errorsCustomer, emergencyContactPhone: 'رقم هاتف في حالة الطوارئ مطلوب' });
    //   } else {
    //     setErrorsCustomer({ ...errorsCustomer, emergencyContactPhone: '' });
    //   }
    // }

    // Validate the emergency contact phone number if it's being changed
    // if (name === 'phoneNumber') {
    //   if (!value || value === 'default-value') {
    //     setErrorsCustomer({ ...errorsCustomer, phoneNumber: 'رقم الجوال مطلوب' });
    //   } else {
    //     setErrorsCustomer({ ...errorsCustomer, phoneNumber: '' });
    //   }
    // }

    // Log the errors (optional, for debugging)
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
    }
  };



  // Function to handle changes in passport form
  const handlePassportChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'passportPhotoFile' && files && files[0]) {
      // Update passportPhotoFile in passportData
      const updatedData = { ...passportData, passportPhotoFile: files[0] };
      setPassportData(new PassportViewModel(updatedData, customerId));

      // Create an image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview image
      };
      reader.readAsDataURL(files[0]);
    } else {
      // Handle other form fields
      const updatedData = { ...passportData, [name]: value };
      setPassportData(new PassportViewModel(updatedData, customerId));
    }
    const validationErrors = passportData.validate();
    setErrorsPassport(validationErrors);
  };

  useEffect(() => {
    const validationErrors = passportData.validate();
    setErrorsPassport(validationErrors || {}); // Set validation errors based on the latest passportData
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
    }
  }, [passportData]); // Runs whenever passportData changes






  useEffect(() => {
    if (customerId) {
      if (customerId) {
        setPassportData(new PassportViewModel({}, customerId));
      }
    }
  }, [customerId]); // This will run whenever customerId changes

  return (
    <>
      <div>
        {/* Loader */}
        {loading && <Loader> <div className="loader-message">{loadingMessage}</div></Loader>}
        <div className="py-4 lg:px-24 lg:px-14">
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" variant="h6">
              {getProgressPercentage()}
            </Typography>
            <Typography color="blue-gray" variant="h6">
              اكتملت عملية التسجيل
            </Typography>
          </div>

          <Progress
            value={getProgressValue()}
            activeStep={activeStep}
            color={isLastStep ? 'green' : 'black'}
          />
          <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative pt-12 ">
            <div className="flex ">

              <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                <svg
                  width="18"
                  height="18"
                  className="w-4 lg:w-auto"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                    stroke="#455A64"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.9993 16.9993L13.1328 13.1328"
                    stroke="#455A64"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            {/* <input
              type="text"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-shrink flex-grow flex-auto border-b-2 leading-normal tracking-wide w-px flex-1 border border-t-0 border-l-0 rounded rounded px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
              placeholder="بحث"
            /> */}
          </div>
          <div className="mt-20 shadow-lg border shadow-black-800/4 rounded-lg bg-white bg-opacity-10 justify-center" style={{ position: 'relative' }}>
            {activeStep === 0 && (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <SimpleRegistrationForm
                  activeStep={activeStep}
                  formData={customerProfile}
                  handleChange={handleChange}
                  errorsCustomer={errorsCustomer} // Pass errors to child component
                  origin='StepperWithContent'
                />
              </div>
            )}
            {activeStep === 1 && (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="text-center p-10 text-3xl lg:text-5xl"
                >
                  معلومات جواز السفر
                </Typography>
                <PassportForm
                  passportData={passportData}
                  handlePassportChange={handlePassportChange}
                  origin="StepperWithContent"
                  imagePreview={imagePreview}
                  errorsPassport={errorsPassport} // Pass errors to child component

                />
              </div>
            )}
            {activeStep === 2 && (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="text-center p-10 text-3xl lg:text-5xl"
                >
                  تم التسجيل بنجاح
                </Typography>
              </div>
            )}

            <div className="flex gap-10 m-8 relative lg:gap-80 md:gap-40">
              <Button onClick={handlePrev} disabled={isFirstStep}>
                السابق
              </Button>
              <Button onClick={handleNext} disabled={isLastStep}>
                التالي
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
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