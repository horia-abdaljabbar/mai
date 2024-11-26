
const deleteBookingManager = async (apiKey, token,bookingManagerId) => {
    const apiUrl =`http://185.185.82.224/api/BookingManager/DeleteBooking/${21}`;

    try {
                const response = await fetch(apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': apiKey,
                    },
                });
                
                if (response.ok) {
                    console.log('BookingManager deleted successfully');
                    // Optionally, handle UI updates here
                } else {
                    console.error('Failed to delete BookingManager');
                }
            } catch (error) {
                console.error('Error:', error);
            }

};


export default deleteBookingManager;
