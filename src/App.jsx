import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';

function App() {
  const [weather, setWeather] = useState(null);
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "9e009d53824c2ceb2a854663a63e5abc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data); // aqui atualiza o estado
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setWeather(null);
    }
  }

  return (
    <div className='container'>
      <h1>Clima</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade!' />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather} />}
    </div>
  );
}

export default App;
