// controllers/updateCustomerProfile.js
const updateCustomerProfile = async (profileData, apiKey, token, customerId) => {
    try {
        const response = await fetch(`http://185.185.82.224/api/CustomerProfiles/UpdateProfile/${customerId}`, {
            method: 'PUT', // or 'PATCH' depending on your API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // if your API requires authorization
                'X-API-Key': apiKey
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Get the error response body for better debugging
            console.error('Error updating customer profile:', errorText); // Log for debugging
            throw new Error(`Failed to update customer profile: ${response.statusText}`);
        }

        // Try parsing the response as JSON
        let data;
        try {
            data = await response.json();  // Attempt to parse response as JSON
        } catch (error) {
            // Handle cases where the response is not in JSON format
            const nonJsonText = await response.text(); // Capture non-JSON body
            console.error('Non-JSON response:', nonJsonText); // Log for debugging
            throw new Error("The server did not return valid JSON.");
        }

        return data; // Return the parsed data if JSON is valid
    } catch (error) {
        console.error('Error during customer profile update:', error);
        throw error;  // Re-throw the error for higher-level handling
    }
};

export default updateCustomerProfile;
