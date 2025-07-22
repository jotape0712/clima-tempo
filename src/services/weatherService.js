import axios from 'axios';
import { buildOpenWeatherCurrentUrl, buildOpenWeatherForecastUrl } from '../config/apiConfig';
import { handleApiError } from '../utils/errorUtils';

class WeatherService {
  async getCurrentWeather(query, isCoordinate = false) {
    try {
      const url = buildOpenWeatherCurrentUrl(query, isCoordinate);
      const response = await axios.get(url);
      
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: handleApiError(error)
      };
    }
  }

  async getForecast(city, apiKey) {
    try {
      const url = buildOpenWeatherForecastUrl(city, apiKey);
      const response = await axios.get(url);
      
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: handleApiError(error)
      };
    }
  }
}

export const weatherService = new WeatherService();
export default weatherService;
