const addPassport = async (formData, apiKey, token) => {
  try {
    const response = await fetch("http://185.185.82.224/api/Passports/AddPassport", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "apiKey": apiKey,
      },
      body: formData, // Sending FormData directly
    });

    if (!response.ok) {
      // If the response is not OK, get the response text for debugging purposes
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to add passport. Status: ${response.status} - ${errorText}`);
    }

    // Attempt to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (error) {
      // Handle cases where the response is not valid JSON
      console.error("Error parsing JSON:", error);
      throw new Error("The server did not return valid JSON.");
    }

    // Return the parsed JSON data
    return data;
    
  } catch (error) {
    // General error handling
    console.error("Error adding passport:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default addPassport;
