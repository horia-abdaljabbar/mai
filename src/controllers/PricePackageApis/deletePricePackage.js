const deletePricePackage = async ( pricePackage, apiKey, token,pricePackageId) => {
    const apiUrl =`http://185.185.82.224/api/PricePackage/RemovePricePackage/${pricePackageId}`;

    try {
                const response = await fetch(apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': apiKey,
                    },
                    body: JSON.stringify(pricePackage),
                });
                
                if (response.ok) {
                    console.log('pricePackage deleted successfully');
                    // Optionally, handle UI updates here
                } else {
                    console.error('Failed to delete pricePackage');
                }
            } catch (error) {
                console.error('Error:', error);
            }

    return response.json();
};


export default deletePricePackage;
