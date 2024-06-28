import "./style.css";
require("dotenv").config();

async function fetchWeather(location) {
  try {
    const response = await fetch(
      `${process.env.WEATHER_API_URL}/current.json?key=${process.env.API_KEY}&q=${location}`,
      { mode: "cors" },
    );
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

fetchWeather("New York");
