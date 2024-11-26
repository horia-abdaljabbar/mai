
const getBusReservationById = async (busReservationId, apiKey, token) => {
    try {
        const response = await fetch(`http://185.185.82.224/api/BusReservation/GetBusReservation/${busReservationId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey,
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching customer: ' + response.statusText);
        }

        const data = await response.json();
        return data; // Return the passport data if found
    } catch (error) {
        console.error('Error fetching profile Package:', error);
        return null; // Return null if there was an error
    }
};

export default getBusReservationById;
