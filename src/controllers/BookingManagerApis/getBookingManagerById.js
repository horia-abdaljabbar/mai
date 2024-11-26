
const getBookingManagerById = async (bookingManagerId, apiKey, token) => {
    try {
        const response = await fetch(`http://185.185.82.224/api/BookingManager/GetBooking/${bookingManagerId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey,
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching bookingManager: ' + response.statusText);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching BookingManager:', error);
        return null; 
    }
};

export default getBookingManagerById;