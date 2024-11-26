
const getAllBookingManager = async (apiKey, token) => {
    const response = await fetch('http://185.185.82.224/api/BookingManager/ListBookings', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch rice bookingmanagers list');
    }

    const data = await response.json();
    return data; 
};


export default getAllBookingManager;
