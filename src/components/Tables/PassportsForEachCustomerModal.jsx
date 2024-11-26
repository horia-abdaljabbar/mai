import React, { useState, useEffect } from 'react';
import AddNewPassportForm from '@/Forms/AddNewPassportForm';
import getPassportImages from '../../controllers/PassportApis/getPassportImages'

const PassportsForEachCustomerModal = ({ isOpen, onClose, rowData }) => {
    const [selectedPassports, setSelectedPassports] = useState({});
    const [errorsPassport, setErrorsPassport] = useState({});
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(false); // Loader state
    const [loadingMessage, setLoadingMessage] = useState('');
    const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJhYmFmMmE4Yi02MGYwLTRjYzMtOGQzZS04MDM2ZTZhNzE5ZjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzE3NDgwMjQsImV4cCI6MTczMjYxMjAyNCwiaWF0IjoxNzMxNzQ4MDI0LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.78pGO0MadZydPSuCsq7M26e_GhBSNyCAf1D_c2VUte0';
    if (!isOpen) return null;

    const handlePassportClick = (passport) => {
        setSelectedPassports((prevSelected) => {
            const updatedSelected = { ...prevSelected };
            if (updatedSelected[passport.passportId]) {
                delete updatedSelected[passport.passportId];
            } else {
                updatedSelected[passport.passportId] = passport;
                loadPassportImage(passport.passportId); // Load the image for the selected passport
            }
            return updatedSelected;
        });

        loadPassportImage(passport.passportId); // Load the image for the selected passport
        loadPassportImage(passport.passportId); // Load the image for the selected passport
        console.log(passport.passportId, "passport.passportId");
    };


    const handleCloseForm = (passportId) => {
        setSelectedPassports((prevSelected) => {
            const updatedSelected = { ...prevSelected };
            delete updatedSelected[passportId];
            return updatedSelected;
        });
    };
    const loadPassportImage = async (passportId) => {
        // setLoading(true); // Show loader before API request
        // setLoadingMessage('انتظر حتى يتم تحميل صورة جواز السفر'); // Loading message for image load
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
            //   setLoading(false);

            setImageSrc('/images/default-image.png'); // Provide a default image if needed
        }
        // setLoading(false);

        // setIsModalOpen(true); // Open the modal to display the image
    };



    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
            onClick={onClose} // Close the modal when clicking on the overlay
        >
            <div
                className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div className="relative overflow-auto px-4 w-full max-w-2xl h-auto max-h-[100vh]">

                    <h2 className="text-2xl font-semibold mb-4">{rowData?.name}</h2>

                    {/* Main Scrollable Content for Passport Buttons and Forms */}
                    <div className="space-y-4 mb-4 overflow-y-auto max-h-[70vh]">
                        {/* max-h-[70vh] ensures the modal content area is scrollable when the content exceeds 70% of the viewport height */}
                        {rowData?.passportsData?.map((passport, index) => (
                            <div key={passport.passportId}>
<button
  className="px-6 py-3 bg-transparent border-2 border-green-500 text-green-500 font-semibold rounded-lg transition duration-300 ease-in-out transform hover:bg-green-500 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
  onClick={() => handlePassportClick(passport)}
>
  <span className="flex items-center space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10c0 5.523-4.477 10-10 10S1 15.523 1 10 5.477 0 10 0s10 4.477 10 10z" />
    </svg>
    <span>{`جواز السفر ${index + 1}`}</span>
  </span>
</button>





                                {selectedPassports[passport.passportId] && (
                                    <div className="mt-4">
                                        <AddNewPassportForm
                                            origin="PassportsForEachCustomer"
                                            passportData={passport} // Pass specific passport data to the form
                                            errorsPassport={errorsPassport}
                                            onClose={() => handleCloseForm(passport.passportId)} // Close this form when needed
                                            imagePreview={imageSrc}

                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PassportsForEachCustomerModal;
