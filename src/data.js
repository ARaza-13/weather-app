import Validate from "./validation";

export default class Data {
  static async fetchWeather(location) {
    const errorMsg = document.getElementById("error");
    try {
      const response = await fetch(
        `${process.env.WEATHER_API_URL}/current.json?key=${process.env.API_KEY}&q=${location}`,
        { mode: "cors" },
      );

      if (!Validate.validateAPI(response, location)) {
        return null;
      }

      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.log(`Error: ${error}`);
      return null;
    }
  }

  static extractWeatherData(weatherData) {
    console.log(weatherData);
    const city = weatherData.location.name;
    const country = weatherData.location.country;
    const date = weatherData.location.localtime;
    const weatherIcon = weatherData.current.condition.icon;
    const temperatureF = weatherData.current.temp_f;
    const temperatureC = weatherData.current.temp_c;
    const feelTemperatureF = weatherData.current.feelslike_f;
    const feelTemperatureC = weatherData.current.feelslike_c;
    const weatherDescription = weatherData.current.condition.text;
    const windMph = weatherData.current.wind_mph;
    const windKph = weatherData.current.wind_kph;
    const humidity = weatherData.current.humidity;
    const cloud = weatherData.current.cloud;

    const data = {};
    data.location = `${city}, ${country}`;
    data.dateMetric = date;
    data.dateImperial = Data.formateDate(date);
    data.icon = weatherIcon;
    data.temperatureF = `${temperatureF}°F`;
    data.temperatureC = `${temperatureC}°C`;
    data.feelTemperatureF = `Feels like ${feelTemperatureF}°F`;
    data.feelTemperatureC = `Feels like ${feelTemperatureC}°C`;
    data.weatherDescription = weatherDescription;
    data.windMph = `${windMph}mph`;
    data.windKph = `${windKph}kph`;
    data.humidity = `${humidity}%`;
    data.cloud = `${cloud}%`;

    return data;
  }

  static formateDate(currentDate) {
    const date = new Date(currentDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      " " +
      strTime
    );
  }
}
