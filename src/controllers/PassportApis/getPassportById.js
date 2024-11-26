const getPassportById = async (passportId, apiKey, token) => {
    try {
      const response = await fetch(`http://185.185.82.224/api/Passports/GetPassport/${passportId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': apiKey,
        }
      });
  
      if (!response.ok) {
        // Log the status and response for debugging
        const errorText = await response.text(); // Get response as text for debugging
        console.error(`Failed to fetch passport. Status: ${response.status}. Response: ${errorText}`);
        throw new Error(`Failed to fetch passport. Status: ${response.status}. Response: ${errorText}`);
      }
  
      const data = await response.json();

      return data; // Ensure the data contains passportNumber
  
    } catch (error) {
      console.error('Error fetching passport:', error);
      return null; // Return null if there was an error
    }
  };
  
  export default getPassportById;
  