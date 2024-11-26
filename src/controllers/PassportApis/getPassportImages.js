const getPassportImages = async (apiKey, token, passportId) => {
  const apiUrl = `http://185.185.82.224/api/Passports/GetPassportImages/${passportId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get the error response body
      console.error('Error fetching image:', errorText); // Log the error for debugging
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Check the Content-Type to determine if the response is an image or JSON
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      // If it's JSON, parse it
      const data = await response.json();
      console.log('Received JSON data:', data); // Log the data for debugging
      return data;  // Return parsed JSON data
    } else if (contentType && contentType.includes('image')) {
      // If it's an image, convert the response to a Blob and create a URL
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      
      // Optionally, clean up the object URL after it's used
      // URL.revokeObjectURL(imageUrl); // Uncomment this if needed when you're done with the image
      
      return imageUrl;  // Return the image URL (you can use it as src in <img>)
    } else {
      // Handle unexpected content types
      throw new Error('Unexpected content type: ' + contentType);
    }

  } catch (error) {
    console.error('Error fetching passport images:', error);
    throw error;  // Re-throw the error for higher-level handling
  }
};

export default getPassportImages;
