"use strict;"

async function loadLocation() {
  try {
    const myIpAddress = await fetch("https://api.ipify.org?format=json");
    const ipAddress = await myIpAddress.json();
    console.log("My IP Address is: ", ipAddress);

    const response = await fetch(
      "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=" +
        ipAddress.ip,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
          "x-rapidapi-key":
            "b55afc69a0mshdbfe9d068e57070p1f9850jsn50b9594f15df",
        },
      }
    );
    const location = await response.json();

    document.getElementById("city").innerHTML = location.city;
    document.getElementById("country").innerHTML = location.country;
    document.getElementById("isp").innerHTML = location.isp;

    console.log("Location:", location);

    const responseW = await fetch(
      "https://weather-api167.p.rapidapi.com/api/weather/forecast" +
        "?lat=" +
        location.latitude +
        "&lon=" +
        location.longitude +
        "&units=imperial&mode=json&lang=en",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weather-api167.p.rapidapi.com",
          "x-rapidapi-key":
            "b55afc69a0mshdbfe9d068e57070p1f9850jsn50b9594f15df",
        },
      }
    );

    const weather = await responseW.json();
    console.log("Full Weather API Response:", weather); // Log full response

    // Check if weather data exists and update the DOM accordingly
    if (weather && weather.list && weather.list[0] && weather.list[0].weather) {
      document.getElementById("weather").innerHTML =
        weather.list[0].weather[0].description;
      console.log(weather.list[0].weather[0].main);
    } else {
      document.getElementById("weather").innerHTML =
        "Weather data not available.";
      console.error(
        "Weather data is missing or incorrectly formatted:",
        weather
      );
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("weather").innerHTML =
      "Failed to load weather data.";
  }
}

loadLocation();


// GET Method Examples

// Fetch trending GIFs from GIPHY
fetch(`https://api.giphy.com/v1/gifs/trending?api_key=bqMJusEQvP7kFXiM3y2F2WrAkmuWk28s&limit=50&rating=pg-13`)
  .then(response => response.json())
  .then(data => {
    const gifContainer = document.getElementById("gif");
    const randomGif = data.data[Math.floor(Math.random() * data.data.length)];
    if (randomGif) {
      const img = document.createElement("img");
      img.src = randomGif.images.fixed_height.url;
      gifContainer.appendChild(img);
    } else {
      gifContainer.innerHTML = "No GIFs found.";
    }
  })
  .catch(error => console.error("Error fetching GIPHY API:", error));

// Fetch a random number trivia
const randomNumber = Math.floor(Math.random() * 300) + 1;
fetch(`http://numbersapi.com/${randomNumber}/trivia`)
  .then(response => response.text())
  .then(data => {
    document.getElementById("trivia").innerText = data;
  })
  .catch(error => console.error("Error fetching trivia:", error));

// Fetch today's date fact
const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
fetch(`http://numbersapi.com/${month}/${day}/date`)
  .then(response => response.text())
  .then(data => {
    document.getElementById("date-fact").innerText = data;
  })
  .catch(error => console.error("Error fetching date fact:", error));

// Fetch a random country
fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    document.getElementById("country-name").innerText = randomCountry.name.common;
    document.getElementById("country-population").innerText = `Population: ${randomCountry.population}`;
    document.getElementById("country-region").innerText = `Region: ${randomCountry.region}`;
  })
  .catch(error => console.error("Error fetching country data:", error));

// Fetch a random useless fact
fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
  .then(response => response.json())
  .then(data => {
    document.getElementById("random-fact").innerText = data.text;
  })
  .catch(error => console.error("Error fetching useless fact:", error));
