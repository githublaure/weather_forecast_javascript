
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Paris');
  const [forecast, setForecast] = useState([]);

  const API_KEY = 'oafbe8035b88726c0e80be71t4409330';

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(`https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${API_KEY}`);
      setWeather(response.data);
      fetchForecast(cityName);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const response = await axios.get(`https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${API_KEY}&units=metric`);
      setForecast(response.data.daily);
    } catch (error) {
      console.error('Error fetching forecast:', error);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  if (!weather) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="col-sm">
        <h1>
          <a href="#" onClick={() => fetchWeather('Paris')}>Paris</a> 🥖-
          <a href="#" onClick={() => fetchWeather('Roma')}>Roma</a> 🛶 -
          <a href="#" onClick={() => fetchWeather('Bangkok')}>Bangkok</a> 🛺 -
          <a href="#" onClick={() => fetchWeather('Madrid')}>Madrid</a> 🍇 -
          <a href="#" onClick={() => fetchWeather('Amsterdam')}>Amsterdam</a> 🚲
        </h1>

        <div className="citychoice">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input type="submit" value="search city" />
          </form>
        </div>
      </div>

      <div className="weather-app">
        <div className="row">
          <div className="col">
            <div id="forecast">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <div className="weather-forecast-date">{new Date(day.time * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <img src={day.condition.icon_url} alt={day.condition.description} width="42" />
                  <div className="weather-forecast-temperatures">
                    <span className="weather-forecast-temperature-max">{Math.round(day.temperature.maximum)}° max</span>
                    <span className="temperature-separator" style={{ color: '#7aa2e2' }}> | </span>
                    <span className="weather-forecast-temperature-min" style={{ fontWeight: 'bold' }}>{Math.round(day.temperature.minimum)}° min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col" style={{ textAlign: 'center' }}>
            <p id="temperature">{Math.round(weather.temperature.current)}</p>
            <img src={weather.condition.icon_url} alt={weather.condition.description} width="100" />
            <p>{weather.city}</p>
            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <span>{weather.condition.description}</span>
            <br />
            <span className="corp">
              humidity: {weather.temperature.humidity}%
              <br />
              wind: {Math.round(weather.wind.speed)}km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
