import { useState, useEffect } from 'react';
import { weatherService } from '../services/weatherService';
import { getCurrentLocation } from '../utils/geolocationUtils';
import { validateCityInput } from '../utils/errorUtils';
import { APP_CONFIG } from '../constants/appConstants';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('');

  const searchWeather = async (query, isCoordinate = false) => {
    setLoading(true);
    setError(null);

    if (!isCoordinate) {
      const validation = validateCityInput(query);
      if (!validation.isValid) {
        setError(validation.error);
        setLoading(false);
        return;
      }
    }

    const result = await weatherService.getCurrentWeather(query, isCoordinate);

    if (result.success) {
      setWeather(result.data);
      setCurrentCity(result.data.name);
      setError(null);
    } else {
      setError(result.error);
      setWeather(null);
    }

    setLoading(false);
  };

  const searchByLocation = async () => {
    try {
      setLoading(true);
      const { lat, lon } = await getCurrentLocation();
      await searchWeather([lat, lon], true);
    } catch (error) {
      console.warn('Erro na geolocalização, usando cidade padrão:', error);
      await searchWeather(APP_CONFIG.DEFAULT_CITY);
    }
  };

  const searchByCity = async (cityName) => {
    await searchWeather(cityName);
  };

  useEffect(() => {
    searchByLocation();
  }, []);

  return {
    weather,
    loading,
    error,
    currentCity,
    searchByCity,
    searchByLocation,
    setError
  };
};
