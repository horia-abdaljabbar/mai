const getAllPassports = async (apiKey, token) => {
  try {
    const response = await fetch('http://185.185.82.224/api/Passports/ListPassports', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': apiKey,
      },
    });

    // Check if the response was successful
    if (!response.ok) {
      // Log the response body or status for debugging
      const errorText = await response.text();
      console.error(`Failed to fetch passports. Status: ${response.status}. Response: ${errorText}`);
      throw new Error(`Failed to fetch passports. Status: ${response.status}. Response: ${errorText}`);
    }

    // Check if the content type is JSON before parsing
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      try {
        const data = await response.json();
        return data; // Return the passport data
      } catch (error) {
        // Handle non-JSON responses
        console.error("The server did not return valid JSON:", error);
        throw new Error("The server did not return valid JSON.");
      }
    } else {
      // If the response is not JSON, handle it as plain text (e.g., error messages)
      const errorText = await response.text();
      console.error("The server returned an unexpected response:", errorText);
      throw new Error(`The server returned an unexpected response: ${errorText}`);
    }

  } catch (error) {
    console.error('Error fetching passports:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

export default getAllPassports;
