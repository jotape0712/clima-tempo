import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import CityHistory from './components/CityHistory/CityHistory';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('');
  const inputRef = useRef();

  const API_KEY = "9e009d53824c2ceb2a854663a63e5abc";

  // Função principal para buscar dados meteorológicos
  async function searchWeather(searchQuery, isCoordinate = false) {
    setLoading(true);
    setError(null);
    
    try {
      let url;
      if (isCoordinate) {
        const [lat, lon] = searchQuery;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&lang=pt_br&units=metric`;
      }

      const response = await axios.get(url);
      console.log('Dados meteorológicos:', response.data);
      
      setWeather(response.data);
      setCurrentCity(response.data.name);
      setError(null);
      
      // Limpar campo de input se não for busca por coordenadas
      if (!isCoordinate && inputRef.current) {
        inputRef.current.value = '';
      }
      
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      let errorMessage = "Erro ao buscar dados meteorológicos";
      
      if (err.response?.status === 404) {
        errorMessage = "Cidade não encontrada. Verifique o nome e tente novamente.";
      } else if (err.response?.status === 401) {
        errorMessage = "Erro de autenticação da API";
      } else if (!navigator.onLine) {
        errorMessage = "Sem conexão com a internet";
      }
      
      setError(errorMessage);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  // Busca por nome da cidade
  function searchCity() {
    const city = inputRef.current.value.trim();
    if (!city) {
      setError("Por favor, digite o nome de uma cidade");
      return;
    }
    
    searchWeather(city);
  }

  // Busca por geolocalização
  function handleLocationFound(lat, lon) {
    searchWeather([lat, lon], true);
  }

  // Busca por cidade do histórico
  function handleCitySelect(cityName) {
    searchWeather(cityName);
  }

  // Buscar por cidade padrão ao carregar a página
  useEffect(() => {
    // Ativar loading inicial
    setLoading(true);
    
    // Tentar obter localização automaticamente ao carregar
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationFound(latitude, longitude);
        },
        () => {
          // Se falhar, buscar por uma cidade padrão
          searchWeather('São Paulo');
        },
        { timeout: 5000 }
      );
    } else {
      // Se geolocalização não estiver disponível
      searchWeather('São Paulo');
    }
  }, []);

  // Permitir busca com Enter
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchCity();
    }
  }

  return (
    <div className='app-container'>
      <div className='container'>
        <header className='app-header'>
          <h1 className='app-title'>🌤️ Clima Tempo</h1>
          <p className='app-subtitle'>Previsão meteorológica completa e detalhada</p>
        </header>

        <div className='search-section'>
          <div className='search-container'>
            <div className='search-input-group'>
              <input 
                ref={inputRef} 
                type="text" 
                placeholder='Digite o nome da cidade...' 
                className='search-input'
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <button 
                onClick={searchCity}
                className='search-button'
                disabled={loading}
              >
                {loading ? '🔄' : '🔍'} Buscar
              </button>
            </div>
          </div>

          <CityHistory 
            onCitySelect={handleCitySelect}
            currentCity={weather}
          />
        </div>

        {error && (
          <div className="error-message">
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {loading && <LoadingIndicator />}

        {weather && !loading && (
          <div className='weather-section'>
            <WeatherInformations weather={weather} />
            <WeatherForecast city={currentCity} apiKey={API_KEY} />
          </div>
        )}

        <footer className='app-footer'>
          <p>
            Dados fornecidos por{' '}
            <a 
              href="https://openweathermap.org/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              OpenWeatherMap
            </a>
          </p>
          <p>
            Desenvolvido com ❤️ por João Pedro
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
