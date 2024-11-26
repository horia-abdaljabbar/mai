
const deleteRoomType = async (apiKey, token,roomTypeId) => {
    const apiUrl =`http://185.185.82.224/api/RoomType/RemoveRoomType/${roomTypeId}`;

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
                    console.log('RoomType deleted successfully');
                    // Optionally, handle UI updates here
                } else {
                    console.error('Failed to delete RoomType');
                }
            } catch (error) {
                console.error('Error:', error);
            }

};


export default deleteRoomType;
