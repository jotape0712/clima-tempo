# 🌤️ Weather App

Um aplicativo web moderno, desenvolvido em **React + Vite**, que permite consultar a previsão do tempo em tempo real para qualquer cidade do mundo, utilizando múltiplas APIs de clima para maior precisão e confiabilidade.

## 🚀 Tecnologias

- React
- Vite
- Axios (para requisições HTTP)
- OpenWeatherMap API
- WeatherAPI (implementada em 21/07/2025)

---

## 📂 Funcionalidades

✅ Buscar cidade e exibir clima atual  
✅ Mostrar temperatura, sensação térmica, descrição do clima e ícone do clima  
✅ Layout moderno, responsivo e tema escuro   
✅ Feito com React + Hooks (useState, useRef)  
✅ **NOVO:** Sistema de fallback com múltiplas APIs para maior confiabilidade  
✅ **NOVO:** Melhor precisão nos dados meteorológicos

## 🆕 Atualização 21/07/2025

### Principais Mudanças:

- **🔄 Nova API Implementada**: Adicionada WeatherAPI como fonte alternativa de dados meteorológicos
- **⚡ Sistema de Fallback**: Se uma API falhar, o sistema automaticamente utiliza a API alternativa
- **📈 Maior Confiabilidade**: Redução significativa de falhas na busca por dados do clima
- **🔧 Otimizações**: Melhorias na performance e tratamento de erros
- **🌐 Cobertura Ampliada**: Melhor cobertura geográfica com duas fontes de dados

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