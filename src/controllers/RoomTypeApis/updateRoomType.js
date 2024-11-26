
//check profileData
const updateRoomType = async (profileData, apiKey, token,roomTypeId) => {
    const response = await fetch(`http://185.185.82.224/api/RoomType/UpdateRoomType/${roomTypeId}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            'X-API-Key': apiKey
        },
        body: JSON.stringify(profileData)
    });

    if (!response.ok) {
        throw new Error('Failed to update Room Type');
    }

    return await response.json();
};

export default updateRoomType;
