
const getRoomTypeById = async (roomTypeId, apiKey, token) => {
    try {
        const response = await fetch(`http://185.185.82.224/api/RoomType/GetRoomType/${roomTypeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey,
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching RoomType: ' + response.statusText);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching RoomType:', error);
        return null; 
    }
};

export default getRoomTypeById;
