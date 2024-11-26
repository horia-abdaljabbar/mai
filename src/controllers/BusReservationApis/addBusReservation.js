const addBusReservation = async (busReservation, apiKey, token) => {
    console.log("busReservation before sending:", busReservation); // Log busReservation

    const apiUrl ="http://185.185.82.224/api/BusReservation/AddBusReservation";
   
    // console.log("Sending requestData:", JSON.stringify(requestData)); // Log for debugging

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'x-api-key': apiKey,
        },
        body: JSON.stringify(busReservation),
    });
    

    if (!response.ok) {
        // Optionally log the response for debugging
        const errorDetails = await response.json();
        console.error('API error details:', errorDetails);
        throw new Error(`Network response was not ok: ${response.status} - ${errorDetails.message || 'Unknown error'}`);
    }

    return response.json();
};


export default addBusReservation;
