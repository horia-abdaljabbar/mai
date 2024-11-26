
const deleteRoomCustomer = async (apiKey, token,roomCustomerId) => {
    const apiUrl =`http://185.185.82.224/api/RoomCustomer/RemoveRoomCustomer/${roomCustomerId}`;

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
                    console.log('roomCustomer deleted successfully');
                    // Optionally, handle UI updates here
                } else {
                    console.error('Failed to delete roomCustomer');
                }
            } catch (error) {
                console.error('Error:', error);
            }

};


export default deleteRoomCustomer;
