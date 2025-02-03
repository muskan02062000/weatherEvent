
const axios = require("axios");
 
const fetchWeather = async (location, date) => {
    try {
const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: location,
                appid: process.env.WEATHER_API_KEY,
                units: "metric"
            }
        });
        return {
            temperature: response.data.main.temp,
            weather: response.data.weather[0].description
        };
    } catch (error) {
        console.error("Weather API Error:", error);
        return null;
    }
};
 
module.exports = fetchWeather;
