import { useState, useEffect } from 'react';
import axios from 'axios';
import { getWeatherApiUrl, getOpenWeatherUrl } from '../../config/apiConfig';
import './WeatherForecast.css';

function WeatherForecast({ city, apiKey }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      // Usar WeatherAPI.com para dados mais completos (incluindo histórico do dia atual)
      const weatherApiUrl = getWeatherApiUrl(city, 6);
      
      const response = await axios.get(weatherApiUrl);
      
      // Processar dados da WeatherAPI
      const dailyForecasts = processWeatherApiData(response.data);
      setForecast(dailyForecasts);
    } catch (err) {
      console.error("Erro ao buscar previsão:", err);
      // Fallback para OpenWeatherMap se WeatherAPI falhar
      try {
        const fallbackUrl = getOpenWeatherUrl(city, apiKey);
        const fallbackResponse = await axios.get(fallbackUrl);
        const dailyForecasts = groupForecastsByDay(fallbackResponse.data.list);
        setForecast(dailyForecasts);
      } catch (fallbackErr) {
        setError("Erro ao carregar previsão");
      }
    } finally {
      setLoading(false);
    }
  };

  // Nova função para processar dados da WeatherAPI.com
  const processWeatherApiData = (data) => {
    const dailyForecasts = [];
    
    // Processar dados atuais e históricos do dia atual
    const today = new Date();
    const currentDay = {
      date: today,
      minTemp: data.current.temp_c,
      maxTemp: data.current.temp_c,
      mainWeather: {
        description: data.current.condition.text.toLowerCase()
      },
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph / 3.6, // Converter km/h para m/s para compatibilidade
      clouds: data.current.cloud,
      feelsLike: data.current.feelslike_c
    };

    // Se existirem dados históricos/atuais mais completos para hoje
    if (data.forecast && data.forecast.forecastday && data.forecast.forecastday[0]) {
      const todayForecast = data.forecast.forecastday[0];
      currentDay.minTemp = todayForecast.day.mintemp_c;
      currentDay.maxTemp = todayForecast.day.maxtemp_c;
      currentDay.mainWeather.description = todayForecast.day.condition.text.toLowerCase();
      currentDay.humidity = todayForecast.day.avghumidity;
    }
    
    dailyForecasts.push(currentDay);

    // Processar previsões futuras
    if (data.forecast && data.forecast.forecastday) {
      data.forecast.forecastday.slice(1, 5).forEach(day => {
        dailyForecasts.push({
          date: new Date(day.date),
          minTemp: day.day.mintemp_c,
          maxTemp: day.day.maxtemp_c,
          mainWeather: {
            description: day.day.condition.text.toLowerCase()
          },
          humidity: day.day.avghumidity,
          windSpeed: day.day.maxwind_kph / 3.6, // Converter km/h para m/s
          clouds: day.day.avgvis_km < 10 ? 80 : 20, // Estimativa baseada na visibilidade
          feelsLike: (day.day.mintemp_c + day.day.maxtemp_c) / 2 // Estimativa
        });
      });
    }
    
    return dailyForecasts.slice(0, 5);
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
          mainWeather: item.weather[0],
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          clouds: item.clouds.all,
          feelsLike: item.main.feels_like
        };
      }
      
      dailyData[dayKey].forecasts.push(item);
      dailyData[dayKey].minTemp = Math.min(dailyData[dayKey].minTemp, item.main.temp);
      dailyData[dayKey].maxTemp = Math.max(dailyData[dayKey].maxTemp, item.main.temp);
    });
    
    return Object.values(dailyData).slice(0, 5); // Primeiros 5 dias
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: 'numeric', 
        month: 'short'
      });
    }
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
        <h3 className="forecast-title">📅 Previsão para os próximos 5 dias</h3>
        <p className="forecast-subtitle">Acompanhe o clima durante a semana</p>
      </div>
      
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="card-header">
              <div className="day-info">
                <h4 className="day-date">{formatDate(day.date)}</h4>
              </div>
            </div>
            
            <div className="card-content">
              <p className="weather-description">{day.mainWeather.description}</p>
              
              <div className="temperature-range">
                <div className="temp-max">
                  <span className="temp-value">{Math.round(day.maxTemp)}°</span>
                  <span className="temp-label">Máx</span>
                </div>
                <div className="temp-divider"></div>
                <div className="temp-min">
                  <span className="temp-value">{Math.round(day.minTemp)}°</span>
                  <span className="temp-label">Mín</span>
                </div>
              </div>
              
              <div className="weather-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-icon"></span>
                    <span className="detail-text">{day.humidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
