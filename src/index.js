import "./style.css";
import Controller from "./controller";
require("dotenv").config();

const searchButton = document.getElementById("submit-button");

searchButton.onclick = () => {
  Controller.searchWeather();
};
