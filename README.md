# 🌤️ Weather App

Um aplicativo web moderno, desenvolvido em **React + Vite**, que permite consultar a previsão do tempo em tempo real para qualquer cidade do mundo, utilizando a API pública da [OpenWeatherMap](https://openweathermap.org/).

## 🚀 Tecnologias

- React
- Vite
- Axios (para requisições HTTP)
- OpenWeatherMap API

---

## 📂 Funcionalidades

✅ Buscar cidade e exibir clima atual  
✅ Mostrar temperatura, sensação térmica, descrição do clima e ícone do clima  
✅ Layout moderno, responsivo e tema escuro   
✅ Feito com React + Hooks (useState, useRef)

## 🔧 Configuração e Deploy

### Variáveis de Ambiente

Para o deploy em produção, configure as seguintes variáveis de ambiente:

```bash
VITE_OPENWEATHER_API_KEY=sua_chave_da_openweathermap
VITE_WEATHER_API_KEY=sua_chave_da_weatherapi
```

### Deploy no Vercel

1. Configure as variáveis de ambiente no painel do Vercel
2. O projeto já inclui configuração otimizada no `vercel.json`
3. Build automático com `npm run build`

### Instalação Local

```bash
npm install
npm run dev
```

https://clima-tempo-g9aq.vercel.app/
