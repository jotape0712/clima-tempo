import { useState } from 'react';
import './LocationButton.css';

function LocationButton({ onLocationFound, isLoading }) {
  const [locationLoading, setLocationLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador');
      return;
    }

    setLocationLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationFound(latitude, longitude);
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        let message = 'Erro ao obter localização';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = 'Permissão de localização negada';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Localização indisponível';
            break;
          case error.TIMEOUT:
            message = 'Tempo limite para obter localização';
            break;
        }
        
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutos
      }
    );
  };

  return (
    <button 
      className={`location-button ${locationLoading || isLoading ? 'loading' : ''}`}
      onClick={getCurrentLocation}
      disabled={locationLoading || isLoading}
      title="Usar minha localização atual"
    >
      {locationLoading ? (
        <>
          <div className="spinner"></div>
          Obtendo localização...
        </>
      ) : (
        <>
          📍 Minha Localização
        </>
      )}
    </button>
  );
}

export default LocationButton;
