//weather Api points 
const apiKey = 'b63536f0f03087aa89a4573e202a545e';
const city = 'Accra';
const units = 'metric';

const temperatureEl = document.getElementById('temperature');
const conditionsEl = document.getElementById('conditions');
const forecastListEl = document.getElementById('forecast-list');
const iconEl = document.getElementById('weather-icon');

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const current = data.list[0];
    const temp = Math.round(current.main.temp);

    const descriptions = current.weather.map(w =>
      w.description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ).join(', ');

    const iconCode = current.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    iconEl.src = iconURL;
    iconEl.alt = descriptions;

    temperatureEl.innerHTML = `<strong>Current Temperature:</strong> ${temp}°C`;
    conditionsEl.innerHTML = `<strong>Conditions:</strong> ${descriptions}`;

    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    forecastListEl.innerHTML = '';

    forecast.forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const dayTemp = Math.round(day.main.temp);
      const forecastIconCode = day.weather[0].icon;
      const forecastIconURL = `https://openweathermap.org/img/wn/${forecastIconCode}.png`;
      const listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${forecastIconURL}" alt="${day.weather[0].description}" /> <strong>${dayName}:</strong> ${dayTemp}°C`;
      forecastListEl.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    temperatureEl.textContent = '';
    conditionsEl.textContent = '';
    forecastListEl.innerHTML = '<li>Unable to retrieve weather data at this time.</li>';
  });

