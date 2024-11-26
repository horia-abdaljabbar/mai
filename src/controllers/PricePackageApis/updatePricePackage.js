

const updatePricePackage = async (profileData, apiKey, token,pricePackageId) => {
    // `YOUR_API_ENDPOINT_HERE/${profileData.id}`
    const response = await fetch(`http://185.185.82.224/api/PricePackage/UpdatePricePackage/${pricePackageId}`, {
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

export default updatePricePackage;
