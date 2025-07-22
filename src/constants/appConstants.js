export const APP_CONFIG = {
  NAME: 'Clima Tempo',
  SUBTITLE: 'Previsão meteorológica completa e detalhada',
  DEFAULT_CITY: 'São Paulo',
  GEOLOCATION_TIMEOUT: 5000,
};

export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'Cidade não encontrada. Verifique o nome e tente novamente.',
  AUTH_ERROR: 'Erro de autenticação da API',
  NO_CONNECTION: 'Sem conexão com a internet',
  GENERIC_ERROR: 'Erro ao buscar dados meteorológicos',
  EMPTY_CITY: 'Por favor, digite o nome de uma cidade',
};

export const PAGES = {
  HOME: 'home',
  HISTORY: 'history',
};

export const STORAGE_KEYS = {
  FAVORITE_CITIES: 'favoriteCities',
  CITY_HISTORY: 'cityHistory',
};
