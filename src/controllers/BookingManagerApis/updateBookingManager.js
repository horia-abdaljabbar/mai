
//check profileData
const updateBookingManager = async (profileData, apiKey, token,pricePackageId) => {
    const response = await fetch(`http://185.185.82.224/api/BookingManager/UpdateBooking/${pricePackageId}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            'X-API-Key': apiKey
        },
        body: JSON.stringify(profileData)
    });

    if (!response.ok) {
        throw new Error('Failed to update profile Package');
    }

    return await response.json();
};

export default updateBookingManager;
