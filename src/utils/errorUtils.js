import { ERROR_MESSAGES } from '../constants/appConstants';

export const handleApiError = (error) => {
  console.error("Erro ao buscar dados:", error);
  
  if (error.response?.status === 404) {
    return ERROR_MESSAGES.CITY_NOT_FOUND;
  }
  
  if (error.response?.status === 401) {
    return ERROR_MESSAGES.AUTH_ERROR;
  }
  
  if (!navigator.onLine) {
    return ERROR_MESSAGES.NO_CONNECTION;
  }
  
  return ERROR_MESSAGES.GENERIC_ERROR;
};

export const validateCityInput = (city) => {
  if (!city || !city.trim()) {
    return { isValid: false, error: ERROR_MESSAGES.EMPTY_CITY };
  }
  
  return { isValid: true, error: null };
};
