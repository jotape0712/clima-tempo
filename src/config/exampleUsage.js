// Exemplo de uso da WeatherAPI.com
// Este arquivo demonstra como a nova API funciona

export const EXAMPLE_USAGE = {
  // 1. OBTER CHAVE GRATUITA
  signupUrl: 'https://www.weatherapi.com/signup.aspx',
  
  // 2. EXEMPLO DE RESPOSTA DA API
  sampleResponse: {
    current: {
      temp_c: 25.5,
      condition: { text: 'Parcialmente nublado' },
      humidity: 65,
      wind_kph: 15.2,
      cloud: 40,
      feelslike_c: 27.1
    },
    forecast: {
      forecastday: [
        {
          date: '2025-07-21',
          day: {
            maxtemp_c: 28.5,
            mintemp_c: 18.2,
            condition: { text: 'Sol com algumas nuvens' },
            avghumidity: 62,
            maxwind_kph: 18.4
          }
        }
        // ... mais dias
      ]
    }
  },

  // 3. VANTAGENS TÉCNICAS
  advantages: [
    'Temperatura máxima/mínima REAL do dia (não apenas previsão)',
    'Dados históricos dos últimos 7 dias',
    'Maior precisão nas condições climáticas',
    '100.000 chamadas gratuitas por mês',
    'Resposta mais rápida da API',
    'Melhor documentação e suporte'
  ],

  // 4. EXEMPLO DE IMPLEMENTAÇÃO
  implementationExample: `
    // Antes (OpenWeatherMap):
    // ❌ Só previsão futura
    // ❌ Temp. max/min estimada para hoje
    
    // Depois (WeatherAPI + Fallback):
    // ✅ Dados históricos quando disponível
    // ✅ Temp. max/min REAL do dia atual
    // ✅ Fallback automático se falhar
  `
};

// Função de teste (não usar em produção)
export const testWeatherAPI = async (city) => {
  const testKey = 'SUA_CHAVE_AQUI'; // Substitua por uma chave real
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${testKey}&q=${city}&days=5&lang=pt`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('✅ WeatherAPI funcionando:', data);
    return data;
  } catch (error) {
    console.log('❌ Erro na WeatherAPI:', error);
    return null;
  }
};
