
const getAllBusReservations = async (apiKey, token) => {
    const response = await fetch('http://185.185.82.224/api/BusReservation/ListBusReservations', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch Bus Reservations');
    }

    const data = await response.json();
    return data; // Return the data containing customer information
};


export default getAllBusReservations;
