const addCustomerProfile = async (customerProfile, apiKey, token) => {
    const apiUrl = "http://185.185.82.224/api/CustomerProfiles/AddProfile";
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey,
            },
            body: JSON.stringify(customerProfile),
        });

        // Check if the response is successful
        if (!response.ok) {
            // Optionally log the response text for debugging
            const errorDetails = await response.text();  // Use .text() to handle non-JSON error messages
            console.error('API error details:', errorDetails);
            throw new Error(`Network response was not ok: ${response.status} - ${errorDetails || 'Unknown error'}`);
        }

        // Attempt to parse JSON from the response
        let data;
        try {
            data = await response.json();
        } catch (error) {
            // Handle non-JSON responses (like HTML or plain text errors)
            console.error('Error parsing JSON:', error);
            throw new Error('The server did not return valid JSON.');
        }

        return data;

    } catch (error) {
        // General error handling for the fetch operation
        console.error('Request failed:', error);
        throw error;
    }
};

export default addCustomerProfile;
