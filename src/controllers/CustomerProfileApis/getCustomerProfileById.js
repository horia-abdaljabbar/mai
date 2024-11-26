const getCustomerProfileById = async (customerId, apiKey, token) => {
  try {
    console.log('Fetching profile for customerId:', customerId);

    const response = await fetch(`http://185.185.82.224/api/CustomerProfiles/GetCustomerProfiles/${customerId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get response as text for debugging
      console.error(`Failed to fetch customer profile. Status: ${response.status}. Response: ${errorText}`);
      throw new Error(`Failed to fetch customer profile. Status: ${response.status}. Response: ${errorText}`);
    }

    // Try to parse the JSON response
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("The server did not return valid JSON:", error);
      throw new Error("The server did not return valid JSON.");
    }

    console.log('Fetched data:', data);
    return data; // Return the fetched customer profile
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null; // Return null if there was an error
  }
};

export default getCustomerProfileById;
