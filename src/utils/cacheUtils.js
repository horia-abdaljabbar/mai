// src/utils/cacheUtils.js

export const syncCustomerIdFromCache = async (setCustomerId) => {
    console.log('syncCustomerIdFromCache invoked'); // Add this log
    try {
      const cache = await caches.open('bookingManagerIdCache');
      console.log('Cache opened'); // Check if cache is being opened
      const cachedResponse = await cache.match('/form-data');
      console.log('Cache match attempted'); // Log after matching
  
      if (cachedResponse) {
        console.log('Cache response found');
        const cachedData = await cachedResponse.json();
        console.log('Cached data:', cachedData); // Log cached data
  
        if (cachedData.customerId) {
          setCustomerId(cachedData.customerId);
          console.log('Customer ID retrieved from cache:', cachedData.customerId);
        } else {
          console.log('No customerId in cached data.');
        }
      } else {
        console.log('No cached response found.');
      }
    } catch (error) {
      console.error('Error retrieving customerId from cache:', error);
    }
  };
  
  
  export const updateCacheWithCustomerId = async (newCustomerId) => {
    try {
      console.log("Updating cache with customerId:", newCustomerId);
      const cache = await caches.open("bookingManagerIdCache");
      const response = new Response(JSON.stringify({ customerId: newCustomerId }), {
        headers: { "Content-Type": "application/json" },
      });
      await cache.put("/form-data", response);
      console.log("Cache updated with new customerId.");
    } catch (error) {
      console.error("Error updating cache with customerId:", error);
    }
  };
  