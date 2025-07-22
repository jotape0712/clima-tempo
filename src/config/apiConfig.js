// Configurações das APIs de Clima

export const API_CONFIG = {
  // WeatherAPI.com - Oferece dados históricos gratuitos limitados
  WEATHER_API: {
    KEY: import.meta.env.VITE_WEATHER_API_KEY || 'b8f7c6e5d4a3b2c1f9e8d7c6b5a4f3e2', // Substitua pela sua chave real
    BASE_URL: 'https://api.weatherapi.com/v1',
    FEATURES: {
      historical: true,
      forecast: true,
      current: true,
      maxDays: 10
    }
  },
  
  // OpenWeatherMap - Fallback
  OPENWEATHER: {
    KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || 'sua_chave_openweather', // Mantém a chave atual
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    FEATURES: {
      historical: false,
      forecast: true,
      current: true,
      maxDays: 5
    }
  }
};

export const getWeatherApiUrl = (city, days = 6) => {
  return `${API_CONFIG.WEATHER_API.BASE_URL}/forecast.json?key=${API_CONFIG.WEATHER_API.KEY}&q=${city}&days=${days}&lang=pt&aqi=no`;
};

export const getOpenWeatherUrl = (city, apiKey) => {
  return `${API_CONFIG.OPENWEATHER.BASE_URL}/forecast?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;
};
