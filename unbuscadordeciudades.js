// Función para realizar la búsqueda y obtener el pronóstico del tiempo
function searchWeather() {
    const apiKey = 'TU_API_KEY'; // Reemplaza 'TU_API_KEY' con tu propia API key de OpenWeatherMap
    const city = document.getElementById('search-input').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
    // Realizar solicitud a la API
    fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
        // Actualizar la información en la página HTML
        document.getElementById('current-temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('current-wind').textContent = `Wind: ${data.wind.speed} km/h`;
      })
     .catch(error => console.log('Error fetching weather data:', error));
  
    // Obtener el pronóstico de 3 días
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
    fetch(forecastUrl)
     .then(response => response.json())
     .then(data => {
        // Actualizar la información en la página HTML para los próximos 3 días
        for (let i = 0; i < 3; i++) {
          const dayIndex = i * 8; // Se obtiene la información de cada día a intervalos de 8 (cada 3 horas)
          document.getElementById(`day${i+1}-temperature`).textContent = `Temperature: ${data.list[dayIndex].main.temp}°C`;
          document.getElementById(`day${i+1}-wind`).textContent = `Wind: ${data.list[dayIndex].wind.speed} km/h`;
        }
      })
     .catch(error => console.log('Error fetching forecast data:', error));
  }
  
  // Event listener para el botón de búsqueda
  document.getElementById('search-button').addEventListener('click', searchWeather);
