const deleteProfilePackage = async ( profilePackage, apiKey, token,profilePackageId) => {
    const apiUrl =`http://185.185.82.224/api/ProfilePackage/RemoveProfilePackage/${profilePackageId}`;

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
                    console.log('profilePackage deleted successfully');
                    // Optionally, handle UI updates here
                } else {
                    console.error('Failed to delete profilePackage');
                }
            } catch (error) {
                console.error('Error:', error);
            }

    return response.json();
};


export default deleteProfilePackage;
