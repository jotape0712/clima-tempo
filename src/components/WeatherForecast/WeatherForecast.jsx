import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './WeatherForecast.css';

function WeatherForecast({ city, apiKey }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    if (city) {
      fetchForecast();
    }
  }, [city]);

  const fetchForecast = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;
      const response = await axios.get(url);
      
      // Agrupar previsões por dia
      const dailyForecasts = groupForecastsByDay(response.data.list);
      setForecast(dailyForecasts);
    } catch (err) {
      console.error("Erro ao buscar previsão:", err);
      setError("Erro ao carregar previsão");
    } finally {
      setLoading(false);
    }
  };

  const groupForecastsByDay = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          date: date,
          forecasts: [],
          minTemp: item.main.temp,
          maxTemp: item.main.temp,
          mainWeather: item.weather[0]
        };
      }
      
      dailyData[dayKey].forecasts.push(item);
      dailyData[dayKey].minTemp = Math.min(dailyData[dayKey].minTemp, item.main.temp);
      dailyData[dayKey].maxTemp = Math.max(dailyData[dayKey].maxTemp, item.main.temp);
    });
    
    return Object.values(dailyData).slice(0, 5); // Primeiros 5 dias
  };

  // Funções do carrossel
  const nextSlide = () => {
    if (forecast && currentSlide < forecast.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-scroll
  useEffect(() => {
    if (isAutoScrolling && forecast) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % forecast.length);
      }, 3000);
    } else if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, forecast]);

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    carouselRef.current.touchStartX = touch.clientX;
  };

  const handleTouchMove = (e) => {
    if (!carouselRef.current.touchStartX) return;
    
    const touch = e.touches[0];
    const diff = carouselRef.current.touchStartX - touch.clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      carouselRef.current.touchStartX = null;
    }
  };

  const formatDay = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
    }
  };

  const getHourlyForecasts = (dayForecasts) => {
    return dayForecasts.slice(0, 4); // Mostrar apenas as primeiras 4 previsões do dia
  };

  if (loading) {
    return (
      <div className="forecast-loading">
        <div className="forecast-spinner"></div>
        <p>Carregando previsão...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast-error">
        <p>❌ {error}</p>
      </div>
    );
  }

  if (!forecast) {
    return null;
  }

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <h3 className="forecast-title">Previsão 5 Dias</h3>
        <span className="forecast-icon">📅</span>
      </div>
      
      <div className="carousel-nav">
        <button 
          className="carousel-btn prev"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        />
        <button 
          className="carousel-btn next"
          onClick={nextSlide}
          disabled={!forecast || currentSlide >= forecast.length - 1}
        />
      </div>
      
      <div 
        className="forecast-carousel"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div 
          className="forecast-grid"
          style={{
            transform: `translateX(-${currentSlide * 300}px)`
          }}
        >
          {forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="day-name">{formatDay(day.date)}</div>
              <div className="day-date">
                {day.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
              </div>
              
              <img
                src={`http://openweathermap.org/img/wn/${day.mainWeather.icon}@2x.png`}
                alt={day.mainWeather.description}
                className="day-weather-icon"
              />
              
              <div className="day-description">{day.mainWeather.description}</div>
              
              <div className="day-temps">
                <div className="day-temp-max">{Math.round(day.maxTemp)}°</div>
                <div className="day-temp-min">{Math.round(day.minTemp)}°</div>
              </div>
              
              <div className="day-details">
                <div className="detail-item">
                  <span className="detail-label">💨 Vento</span>
                  <span className="detail-value">{(day.forecasts[0].wind.speed * 3.6).toFixed(1)} km/h</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">💧 Umidade</span>
                  <span className="detail-value">{day.forecasts[0].main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">☁️ Nuvens</span>
                  <span className="detail-value">{day.forecasts[0].clouds.all}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🌡️ Sensação</span>
                  <span className="detail-value">{Math.round(day.forecasts[0].main.feels_like)}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-indicators">
        {forecast && forecast.map((_, index) => (
          <div
            key={index}
            className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <img 
              src="/sol.png" 
              alt="Sol" 
              className="sun-indicator"
            />
          </div>
        ))}
      </div>
      
      <div className="carousel-controls">
        <button 
          className={`auto-scroll-btn ${isAutoScrolling ? 'active' : ''}`}
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
        >
          {isAutoScrolling ? '⏸️ Pausar' : '▶️ Auto'}
        </button>
      </div>
    </div>
  );
}

export default WeatherForecast;
