const updatePassport = async (formData, apiKey, token, passportId) => {
    try {
        console.log("passport id in js function", passportId);

        const response = await fetch(`http://185.185.82.224/api/Passports/UpdatePassport/${passportId}`, {
            method: 'PUT', // Assuming you are using PUT for updating
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey,
                // 'Content-Type': 'application/json', // Don't set this when sending FormData
            },
            body: formData, // Sending the FormData directly without JSON.stringify()
        });

        // Check if the response is not OK
        if (!response.ok) {
            const errorText = await response.text(); // Get the error response body as text
            console.error('Error updating passport:', errorText); // Log the error
            throw new Error(`Error updating passport: ${response.statusText}`);
        }

        // Attempt to parse the response as JSON
        let data;
        try {
            // Check if the response is actually JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();  // Parse response as JSON if it is JSON
            } else {
                const responseText = await response.text(); // Get raw response if not JSON
                console.error('Non-JSON response:', responseText);
                throw new Error("The server did not return valid JSON.");
            }
        } catch (error) {
            // Handle any JSON parsing errors
            console.error('Failed to parse JSON:', error);
            throw new Error("The server did not return valid JSON.");
        }

        return data; // Return the parsed data if JSON is valid
    } catch (error) {
        console.error('Error updating passport:', error);
        return null; // Return null if there was an error
    }
};
export default updatePassport;
