
var map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
maxZoom: 18
}).addTo(map);
// Gets the users location.
navigator.geolocation.getCurrentPosition(function(location) {
const lat = location.coords.latitude;
const lng = location.coords.longitude;

// Map marker.
map.setView([lat, lng], 13);
L.marker([lat, lng]).addTo(map);
});

// Get user's location using geolocation API
navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    // This api key form Openweathermap allows me to retrive weather data.
    const KEY = "4a5ebf887f4f10abf6c6fd1178767fdf";
    
    // API endpoint.
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`;

    // This is used to fetch weather information from the API.
    fetch(API)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // This code shows the location name.
        const location = data.name;
        document.querySelector("#location").innerHTML = location;
        
        // This code gets the weather description e.g. scatterd clouds.
        const weatherDescription = data.weather[0].description;
        document.querySelector("#weather-description").innerHTML = weatherDescription;
        
        // This code gets the weather icon code
        const weather = data.weather[0].icon;
        
        // Set weather icon URL
        const IconUrl = `https://openweathermap.org/img/w/${weather}.png`;
        
        //This code shows the weather icon in html.
        document.querySelector("#weather-icon").innerHTML = `<img src="${IconUrl}">`;
        
        // This code gets the temperature.
        const currenttemperature = data.main.temp;
        document.querySelector("#temperature").innerHTML = `Temperature: ${currenttemperature}°C`;


// This is used to get the time and date.
document.getElementById("theanddatetime").innerHTML = new Date();

})
.catch(error => {
  console.error(error);
});

});