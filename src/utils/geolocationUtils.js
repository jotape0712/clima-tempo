import { APP_CONFIG } from '../constants/appConstants';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        reject(error);
      },
      { 
        timeout: APP_CONFIG.GEOLOCATION_TIMEOUT,
        enableHighAccuracy: true,
        maximumAge: 300000
      }
    );
  });
};
