

const updateProfilePackage = async (profileData, apiKey, token,profilePackageId) => {
    // `YOUR_API_ENDPOINT_HERE/${profileData.id}`
    const response = await fetch(`http://185.185.82.224/api/ProfilePackage/UpdateProfilePackage/${profilePackageId}`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // if your API requires authorization
            'X-API-Key': apiKey
        },
        body: JSON.stringify(profileData)
    });

    if (!response.ok) {
        throw new Error('Failed to update profile Package');
    }

    return await response.json();
};

export default updateProfilePackage;
