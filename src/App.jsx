import { useState, useRef } from 'react';
import './App.css';
import { useWeather } from './hooks/useWeather';
import { APP_CONFIG, PAGES } from './constants/appConstants';
import { API_CONFIG } from './config/apiConfig';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import CityHistory from './components/CityHistory/CityHistory';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);
  const inputRef = useRef();
  
  const {
    weather,
    loading,
    error,
    currentCity,
    searchByCity,
    setError
  } = useWeather();

  function searchCity() {
    const city = inputRef.current.value.trim();
    searchByCity(city);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  function handleCitySelect(cityName) {
    searchByCity(cityName);
    setCurrentPage(PAGES.HOME);
  }

  function goToHistoryPage() {
    setCurrentPage(PAGES.HISTORY);
  }

  function goToHomePage() {
    setCurrentPage(PAGES.HOME);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchCity();
    }
  }

  return (
    <div className='app-container'>
      {currentPage === PAGES.HOME ? (
        <div className='container'>
          <header className='app-header'>
            <h1 className='app-title'>🌤️ {APP_CONFIG.NAME}</h1>
            <p className='app-subtitle'>{APP_CONFIG.SUBTITLE}</p>
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

            <div className="action-buttons">
              <button 
                className="history-page-btn"
                onClick={goToHistoryPage}
              >
                📋 Histórico
              </button>
              
              {weather && (
                <CityHistory 
                  onCitySelect={handleCitySelect}
                  currentCity={weather}
                  showOnlyFavoriteButton={true}
                />
              )}
            </div>
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
              <WeatherForecast city={currentCity} apiKey={API_CONFIG.OPENWEATHER.KEY} />
            </div>
          )}

          <div className="api-info-notice">
            <div className="notice-icon">❓</div>
            <div className="notice-content">
              <strong>Observação sobre os dados:</strong>
              <p>As temperaturas máxima e mínima são calculadas do momento atual até o fim do dia. Dados anteriores ao horário da consulta não são incluídos pela limitação da API de previsão.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='history-page'>
          <header className='history-page-header'>
            <button 
              className='back-button'
              onClick={goToHomePage}
            >
              ← Voltar
            </button>
            <h1 className='history-page-title'>📋 Histórico & Favoritos</h1>
          </header>
          
          <div className='history-page-content'>
            <CityHistory 
              onCitySelect={handleCitySelect}
              currentCity={weather}
              showOnlyList={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
