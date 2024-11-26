const DeleteCustomerProfile = async ( apiKey, token,customerId) => {
  const apiUrl = `http://185.185.82.224/api/CustomerProfiles/RemoveProfile/${customerId}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': apiKey,
      },
    });

    if (response.ok) {
      console.log('customer deleted successfully');
      // Optionally, handle UI updates here or return a success response
      return { success: true };
    } else {
      // If the response is not ok, try to get the error message
      const errorText = await response.text();
      console.error(`Failed to delete customer. Status: ${response.status}. Response: ${errorText}`);
      throw new Error(`Failed to delete customer. Status: ${response.status}. Response: ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error; // Rethrow to allow higher-level handling
  }
  };
  
  export default DeleteCustomerProfile;
  