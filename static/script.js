document.getElementById('weather-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  getWeatherByCity(city);
});

function getWeatherByCity(city) {
  const apiKey = 'ea4b05419bf5b6d0d57b7443bda8d598';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données météorologiques:', error);
      document.getElementById('weather-result').innerHTML = `<p>Erreur lors de la récupération des données météorologiques. Veuillez réessayer.</p>`;
    });
}

function getWeatherByCoordinates(lat, lon) {
  const apiKey = 'ea4b05419bf5b6d0d57b7443bda8d598';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données météorologiques:', error);
      document.getElementById('weather-result').innerHTML = `<p>Erreur lors de la récupération des données météorologiques. Veuillez réessayer.</p>`;
    });
}

function displayWeather(data) {
  if (data.cod === 200) {
    const temperature = data.main.temp;
    let season = '';

    if (temperature >= -35 && temperature <= -5) {
      season = 'Hiver';
    } else if (temperature > -5 && temperature <= 5) {
      season = 'Printemps';
    } else if (temperature > 5 && temperature <= 15) {
      season = 'Automne';
    } else if (temperature > 15 && temperature <= 35) {
      season = 'Été';
    }

    document.getElementById('Name').innerHTML = `<h2>${data.name}</h2><p><strong>Température actuelle:</strong> ${data.main.temp}°C</p>`;
    document.getElementById('Description').innerHTML = `<p><strong>Description:</strong> ${data.weather[0].description}</p><p><strong>Saison:</strong>${season} </p>`;
    document.getElementById('Temp').innerHTML = `
      <i class="fas fa-thermometer-half"></i>
      <p><strong>Température min:</strong> ${data.main.temp_min}°C </p><p><strong>Température max:</strong> ${data.main.temp_max}°C </p>`;
    document.getElementById('Humidite').innerHTML = `<i class="fas fa-tint"></i><p><strong>Humidité:</strong> ${data.main.humidity}%</p>`;
    document.getElementById('Vent').innerHTML = `<i class="fas fa-wind"></i><p><strong>Vitesse du Vent:</strong> ${data.wind.speed} m/s</p>`;
    document.getElementById('Lever').innerHTML = `<i class="fas fa-sunrise"></i><p><strong>Lever du Soleil:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>`;
    document.getElementById('Coucher').innerHTML = `<i class="fas fa-sunset"></i><p><strong>Coucher du Soleil:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>`;
    document.getElementById('TempR').innerHTML = `<i class="fas fa-temperature-low"></i><p><strong>Température Ressentie:</strong> ${data.main.feels_like}°C</p>`;
    document.getElementById('Precipitation').innerHTML = `<i class="fas fa-cloud-showers-heavy"></i><p><strong>Précipitations:</strong> ${data.rain ? data.rain['1h'] : 0}mm</p>`;
    document.getElementById('Visibilite').innerHTML = `<i class="fas fa-eye"></i><p><strong>Visibilité:</strong> ${data.visibility / 1000} km</p>`;
      } else {
        document.getElementById('weather-result').innerHTML = `<p>Erreur: ${data.message}</p>`;
      }
  }


function setDefaultLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCoordinates(lat, lon);
    }, error => {
      console.error('Erreur de géolocalisation:', error);
      document.getElementById('weather-result').innerHTML = `<p>Erreur de géolocalisation. Veuillez saisir une ville manuellement.</p>`;
    });
  } else {
    document.getElementById('weather-result').innerHTML = `<p>Géolocalisation non supportée par votre navigateur. Veuillez saisir une ville manuellement.</p>`;
  }
}

function updateTime() {
  const timeElement = document.getElementById('current-time');
  setInterval(() => {
      const now = new Date();
      timeElement.innerHTML = `Heure: ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  }, 1000);
}


document.addEventListener('DOMContentLoaded', function() {
  setDefaultLocation();
  updateTime();
  setInterval(updateTime, 1000);
});




        