import { useEffect, useState } from 'react';
import {
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";

export function Country() {
  const [countries, setCountries] = useState([]); // List of countries
  const [cities, setCities] = useState([]); // List of cities for selected country
  const [selectedCountry, setSelectedCountry] = useState("");

  // Fetch list of countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();
        if (data && data.data) {
          setCountries(data.data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch cities for the selected country
  const fetchCities = async (countryName) => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: countryName }),
      });
      const data = await response.json();
      if (data && data.data) {
        setCities(data.data);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  };

  // Handle country selection
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setCities([]); // Clear previous cities before fetching new ones
    fetchCities(value);
  };

  return (
    <div className="w-2/12 ">
      <h2>اختار الدولة</h2>
      <Select
       
        value={selectedCountry}
        className=''
        onChange={(e) => handleCountryChange(e)}
      >
        {countries.map(({ country }) => (
          <Option key={country} value={country}>
            {country}
          </Option>
        ))}
      </Select>

      {cities.length > 0 && (
        <>
          <Typography>المدينة</Typography>
          <Select label="المدينة">
            {cities.map((city, index) => (
              <Option key={index} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </>
      )}
    </div>
  );
};

export default Country;
