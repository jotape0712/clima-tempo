export const API_CONFIG = {
  OPENWEATHER: {
    KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || "9e009d53824c2ceb2a854663a63e5abc",
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    FEATURES: {
      current: true,
      forecast: true,
      maxDays: 5,
      units: 'metric',
      language: 'pt_br'
    }
  },
  
  WEATHER_API: {
    KEY: import.meta.env.VITE_WEATHER_API_KEY || 'b8f7c6e5d4a3b2c1f9e8d7c6b5a4f3e2',
    BASE_URL: 'https://api.weatherapi.com/v1',
    FEATURES: {
      current: true,
      forecast: true,
      historical: true,
      maxDays: 10,
      language: 'pt'
    }
  }
};

export const buildOpenWeatherCurrentUrl = (query, isCoordinate = false) => {
  const { KEY, BASE_URL, FEATURES } = API_CONFIG.OPENWEATHER;
  const baseParams = `appid=${KEY}&lang=${FEATURES.language}&units=${FEATURES.units}`;
  
  if (isCoordinate) {
    const [lat, lon] = query;
    return `${BASE_URL}/weather?lat=${lat}&lon=${lon}&${baseParams}`;
  }
  
  return `${BASE_URL}/weather?q=${query}&${baseParams}`;
};

export const buildOpenWeatherForecastUrl = (city, apiKey) => {
  const { BASE_URL, FEATURES } = API_CONFIG.OPENWEATHER;
  return `${BASE_URL}/forecast?q=${city}&appid=${apiKey}&lang=${FEATURES.language}&units=${FEATURES.units}`;
};

export const buildWeatherApiUrl = (city, days = 6) => {
  const { KEY, BASE_URL, FEATURES } = API_CONFIG.WEATHER_API;
  return `${BASE_URL}/forecast.json?key=${KEY}&q=${city}&days=${days}&lang=${FEATURES.language}&aqi=no`;
};
