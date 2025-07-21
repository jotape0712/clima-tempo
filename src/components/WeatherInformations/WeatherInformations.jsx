import './WeatherInformations.css';

function WeatherInformations({ weather }) {
  // Função para converter direção do vento em graus para texto
  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  // Função para converter timestamp Unix para horário local
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para avaliar condições de direção
  const getDrivingCondition = () => {
    const visibility = weather.visibility || 10000;
    const windSpeed = weather.wind?.speed || 0;
    const hasRain = weather.rain?.['1h'] && weather.rain['1h'] > 0;
    const hasSnow = weather.snow?.['1h'] && weather.snow['1h'] > 0;

    if (visibility < 1000 || windSpeed > 15 || hasRain || hasSnow) {
      return { condition: "Ruim", color: "#ff4757", icon: "🔴" };
    } else if (visibility < 5000 || windSpeed > 10) {
      return { condition: "Cuidado", color: "#ffa502", icon: "🟡" };
    } else {
      return { condition: "Bom", color: "#2ed573", icon: "🟢" };
    }
  };

  const drivingCondition = getDrivingCondition();

  return (
    <div className="weather-container">
      {/* Cabeçalho da Cidade */}
      <div className="weather-header">
        <h1 className="city-name">{weather.name}, {weather.sys?.country}</h1>
      </div>

      {/* Grid Principal com Temperatura e Ícone */}
      <div className="weather-main-grid">
        <div className="temperature-section">
          <div className="current-temp">
            {Math.round(weather.main.temp)}
            <span className="temp-unit">°C</span>
          </div>
          <p className="condition">{weather.weather[0].description}</p>
          <p className="feels-like">Sensação: {Math.round(weather.main.feels_like)}°C</p>
        </div>
        
        <div className="weather-icon-section">
          <img 
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      </div>

      {/* Detalhes Principais do Tempo */}
      <div className="weather-details-clean">
        <div className="detail-group">
          <div className="detail-title">Umidade</div>
          <div className="detail-value-large">{weather.main.humidity}%</div>
        </div>
        
        <div className="detail-group">
          <div className="detail-title">Vento</div>
          <div className="detail-value-large">{(weather.wind?.speed * 3.6).toFixed(1)}</div>
          <div className="detail-subtitle">km/h {getWindDirection(weather.wind?.deg)}</div>
        </div>
        
        <div className="detail-group">
          <div className="detail-title">Pressão</div>
          <div className="detail-value-large">{weather.main.pressure}</div>
          <div className="detail-subtitle">hPa</div>
        </div>
        
        <div className="detail-group">
          <div className="detail-title">Visibilidade</div>
          <div className="detail-value-large">{((weather.visibility || 0) / 1000).toFixed(1)}</div>
          <div className="detail-subtitle">km</div>
        </div>
      </div>

      {/* Informações Extras */}
      <div className="weather-extras">
        <div className="extra-item">
          <div className="extra-label">Mín</div>
          <div className="extra-value">{Math.round(weather.main.temp_min)}°C</div>
        </div>
        
        <div className="extra-item">
          <div className="extra-label">Máx</div>
          <div className="extra-value">{Math.round(weather.main.temp_max)}°C</div>
        </div>
        
        <div className="extra-item">
          <div className="extra-label">Nascer</div>
          <div className="extra-value">{formatTime(weather.sys.sunrise)}</div>
        </div>
        
        <div className="extra-item">
          <div className="extra-label">Pôr</div>
          <div className="extra-value">{formatTime(weather.sys.sunset)}</div>
        </div>
        
        {weather.rain?.['1h'] && (
          <div className="extra-item">
            <div className="extra-label">Chuva</div>
            <div className="extra-value">{weather.rain['1h']}mm</div>
          </div>
        )}
        
        <div className="extra-item">
          <div className="extra-label">Condições</div>
          <div className="extra-value" style={{color: drivingCondition.color}}>
            {drivingCondition.condition}
          </div>
        </div>
      </div>

      {/* Última Atualização */}
      <div className="update-info">
        Atualizado em {new Date().toLocaleString('pt-BR')}
      </div>
    </div>
  );
}

export default WeatherInformations;
