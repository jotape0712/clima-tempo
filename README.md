# 🌤️ Clima Tempo

Uma aplicação web moderna para consulta de previsão do tempo em tempo real, desenvolvida com React + Vite.

## 🚀 Tecnologias

- React 19
- Vite
- Axios
- OpenWeatherMap API
- CSS3

## ✨ Funcionalidades

- Busca por cidade com previsão atual
- Detecção automática de localização
- Histórico de cidades pesquisadas
- Sistema de cidades favoritas
- Previsão estendida de 5 dias
- Interface responsiva e moderna
- Tema escuro otimizado

## 🛠️ Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/jotape0712/clima-tempo.git

# Entre no diretório
cd clima-tempo

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🌐 Deploy

A aplicação está disponível em: https://previsaotempo-pi.vercel.app/

## � Configuração

Para usar sua própria chave da API, crie um arquivo `.env` na raiz do projeto:

```env
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── config/             # Configurações da API
├── constants/          # Constantes da aplicação
├── hooks/              # Hooks customizados
├── services/           # Serviços de API
├── utils/              # Funções utilitárias
└── assets/             # Recursos estáticos
```

