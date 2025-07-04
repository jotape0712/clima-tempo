
function WeatherInformations({ weather }) {
  return (
    <div className="weather-info">
      <h2>{weather.name}</h2>
      <p>Temperatura: {Math.round(weather.main.temp)}°C</p>
      <p>Sensação Térmica: {Math.round(weather.main.feels_like)}°C </p>
      <p>{weather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt="Ícone do clima"
      />
    </div>
  );
}

export default WeatherInformations;
