const deleteBusReservation = async ( apiKey, token,busReservationId) => {
    console.log(busReservationId);
    const apiUrl =`http://185.185.82.224/api/BusReservation/RemoveBusReservation/${busReservationId}`;

    try {
                const response = await fetch(apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': apiKey,
                    },
                    // body: JSON.stringify(profilePackage),
                });
                
                if (response.ok) {
                    console.log('busReservation deleted successfully');
                    // Optionally, handle UI updates here
                } else {
                    console.error('Failed to delete busReservation');
                }
            } catch (error) {
                console.error('Error:', error);
            }

    return response.json();
};


export default deleteBusReservation;
