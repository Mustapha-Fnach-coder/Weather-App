import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { FaThermometerHalf, FaThermometerThreeQuarters, FaTint, FaWind, FaSearch } from 'react-icons/fa';

const apiKEY = 'a2dc2a188344efe2fc5d1e172df3992b';
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

function App() {
  const [weather, setWeather] = useState({});
  const [input, setInput] = useState('');
  const [city, setCity] = useState('Rabat');

  useEffect(() => {
    fetchWeather('Casablanca');
  }, []);

  const fetchWeather = async (arg) => {
    try {
      const response = await fetch(`${apiURL}${arg}&appid=${apiKEY}`);
      const data = await response.json();
      setWeather(data);
      setCity(data.name);
      localStorage.setItem('city', arg);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    fetchWeather(input);
    setInput('');
  };

  const getBackgroundImage = () => {
    if (weather.main?.temp > 25) {
      return 'https://example.com/sunny.jpg'; // Image ensoleillée
    }
    if (weather.main?.temp < 15) {
      return 'https://example.com/rainy.jpg'; // Image pluvieuse
    }
    return 'https://example.com/cloudy.jpg'; // Image nuageuse
  };

  return (
    <div className="container mt-5" style={{ backgroundImage: `url(${getBackgroundImage()})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <h1 className="text-center mb-4">Weather APP</h1>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-center mb-4">{city}</h2>

      <div className="row text-center">
        <WeatherDetail icon={<FaThermometerHalf />} title="Temperature" value={`${weather.main?.temp} °C`} />
        <WeatherDetail icon={<FaThermometerThreeQuarters />} title="Max" value={`${weather.main?.temp_max} °C`} />
        <WeatherDetail icon={<FaThermometerHalf />} title="Min" value={`${weather.main?.temp_min} °C`} />
      </div>

      <div className="row text-center mt-4">
        <WeatherDetail icon={<FaTint />} title="Humidity" value={`${weather.main?.humidity}%`} />
        <WeatherDetail icon={<FaWind />} title="Wind Speed" value={`${weather.wind?.speed} KM`} />
      </div>
    </div>
  );
}

const WeatherDetail = ({ icon, title, value }) => (
  <div className="col-md-4 mb-4">
    <div className="detail-card"> {/* Ajoutez la classe ici */}
      <h4>{title}</h4>
      <div className="d-flex justify-content-center align-items-center">
        <span className="me-3">{icon}</span>
        <h3>{value}</h3>
      </div>
    </div>
  </div>
);

export default App;
