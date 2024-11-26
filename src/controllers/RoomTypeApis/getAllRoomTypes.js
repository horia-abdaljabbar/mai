
const getAllRoomTypes = async (apiKey, token) => {
    const response = await fetch('http://185.185.82.224/api/RoomType/ListRoomTypes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch rice RoomTypes list');
    }

    const data = await response.json();
    return data; 
};


export default getAllRoomTypes;
