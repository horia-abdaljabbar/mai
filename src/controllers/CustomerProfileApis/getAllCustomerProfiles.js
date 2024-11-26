const getAllCustomerProfiles = async (apiKey, token) => {
  try {
    const response = await fetch('http://185.185.82.224/api/CustomerProfiles/GetListCustomerProfiles', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch customer profiles. Status: ${response.status}. Response: ${errorText}`);
      throw new Error(`Failed to fetch customer profiles. Status: ${response.status}. Response: ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();

        if (data && data.errorCode) {
          // Handle specific error codes like 1003
          switch (data.errorCode) {
            case 1003:
              console.error(`Error code 1003: ${data.message || 'Invalid request'}`);
              break;
            case 1042:
              console.error(`Server returned error code 1042: ${data.message || 'Unknown error'}`);
              break;
            default:
              console.error(`Error code ${data.errorCode}: ${data.message || 'Unknown error'}`);
          }
          return null; // Return null or empty data
        }
      } catch (error) {
        console.error("Error parsing JSON response:", error);
        throw new Error("The server did not return valid JSON.");
      }
    } else {
      const text = await response.text();
      console.error("Unexpected non-JSON response:", text);
      throw new Error("Unexpected response format.");
    }

    return data || [];

  } catch (error) {
    console.error('Error fetching customer profiles:', error);
    throw error; // Propagate the error to be handled by the calling function
  }
};
export default getAllCustomerProfiles;
