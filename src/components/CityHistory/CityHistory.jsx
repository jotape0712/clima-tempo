import { useState, useEffect } from 'react';
import './CityHistory.css';

function CityHistory({ onCitySelect, currentCity, showOnlyFavoriteButton = false, showOnlyList = false }) {
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Carregar dados do localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
    const savedRecents = JSON.parse(localStorage.getItem('weatherRecentSearches') || '[]');
    
    setFavorites(savedFavorites);
    setRecentSearches(savedRecents);
  }, []);

  const addToFavorites = (city) => {
    const newFavorite = {
      name: city.name,
      country: city.sys?.country || '',
      coord: city.coord,
      id: city.id
    };

    const updatedFavorites = favorites.filter(fav => fav.id !== city.id);
    updatedFavorites.unshift(newFavorite);
    
    const limitedFavorites = updatedFavorites.slice(0, 10);
    setFavorites(limitedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(limitedFavorites));
  };

  const removeFromFavorites = (cityId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== cityId);
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const addToRecentSearches = (city) => {
    const newRecent = {
      name: city.name,
      country: city.sys?.country || '',
      coord: city.coord,
      id: city.id,
      timestamp: Date.now()
    };

    const updatedRecents = recentSearches.filter(recent => recent.id !== city.id);
    updatedRecents.unshift(newRecent);
    
    const limitedRecents = updatedRecents.slice(0, 15);
    setRecentSearches(limitedRecents);
    localStorage.setItem('weatherRecentSearches', JSON.stringify(limitedRecents));
  };

  const isFavorite = (cityId) => {
    return favorites.some(fav => fav.id === cityId);
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}m atrás`;
    return 'Agora';
  };

  // Adicionar cidade atual às buscas recentes quando ela mudar
  useEffect(() => {
    if (currentCity) {
      addToRecentSearches(currentCity);
    }
  }, [currentCity?.id]);

  // Se for para mostrar apenas o botão de favorito
  if (showOnlyFavoriteButton) {
    return (
      <button 
        className={`favorite-btn ${isFavorite(currentCity.id) ? 'favorited' : ''}`}
        onClick={() => isFavorite(currentCity.id) 
          ? removeFromFavorites(currentCity.id)
          : addToFavorites(currentCity)
        }
        title={isFavorite(currentCity.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite(currentCity.id) ? '❤️' : '🤍'}
      </button>
    );
  }

  // Se for para mostrar apenas a lista (página de histórico)
  if (showOnlyList) {
    return (
      <div className="history-page-list">
        {/* Favoritos */}
        {favorites.length > 0 && (
          <div className="history-section">
            <div className="section-header">
              <h2 className="section-title">⭐ Favoritos</h2>
              <button 
                className="clear-section-btn"
                onClick={() => {
                  setFavorites([]);
                  localStorage.removeItem('weatherFavorites');
                }}
              >
                Limpar
              </button>
            </div>
            
            <div className="history-grid">
              {favorites.map((city) => (
                <div key={city.id} className="history-card">
                  <div 
                    className="card-content"
                    onClick={() => onCitySelect(city.name)}
                  >
                    <div className="city-name-card">{city.name}</div>
                    <div className="city-country-card">{city.country}</div>
                  </div>
                  <button 
                    className="remove-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(city.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buscas Recentes */}
        {recentSearches.length > 0 && (
          <div className="history-section">
            <div className="section-header">
              <h2 className="section-title">🕒 Buscas Recentes</h2>
              <button 
                className="clear-section-btn"
                onClick={() => {
                  setRecentSearches([]);
                  localStorage.removeItem('weatherRecentSearches');
                }}
              >
                Limpar
              </button>
            </div>
            
            <div className="history-grid">
              {recentSearches.slice(0, 12).map((city) => (
                <div key={`${city.id}-${city.timestamp}`} className="history-card">
                  <div 
                    className="card-content"
                    onClick={() => onCitySelect(city.name)}
                  >
                    <div className="city-name-card">{city.name}</div>
                    <div className="city-details-card">
                      {city.country} • {formatTimeAgo(city.timestamp)}
                    </div>
                  </div>
                  <button 
                    className="remove-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedRecents = recentSearches.filter(
                        recent => recent.timestamp !== city.timestamp
                      );
                      setRecentSearches(updatedRecents);
                      localStorage.setItem('weatherRecentSearches', JSON.stringify(updatedRecents));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado Vazio */}
        {favorites.length === 0 && recentSearches.length === 0 && (
          <div className="empty-history-page">
            <div className="empty-icon">🌤️</div>
            <div className="empty-message">Nenhum histórico ainda</div>
            <div className="empty-subtitle">Pesquise por cidades para ver o histórico aqui</div>
          </div>
        )}
      </div>
    );
  }

  // Renderização da sidebar original (caso não seja nenhum dos modos especiais)
  return (
    <>
      {/* Botão de Toggle */}
      <div className="history-toggle">
        <button 
          className="toggle-history-btn"
          onClick={() => {
            console.log('Toggle clicked, current state:', showHistory);
            setShowHistory(!showHistory);
          }}
        >
          📋 Histórico
        </button>
        
        {currentCity && (
          <button 
            className={`favorite-btn ${isFavorite(currentCity.id) ? 'favorited' : ''}`}
            onClick={() => isFavorite(currentCity.id) 
              ? removeFromFavorites(currentCity.id)
              : addToFavorites(currentCity)
            }
            title={isFavorite(currentCity.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite(currentCity.id) ? '❤️' : '🤍'}
          </button>
        )}
      </div>

      {/* Overlay */}
      {showHistory && (
        <div className="sidebar-overlay" onClick={() => setShowHistory(false)} />
      )}

      {/* Sidebar */}
      <div className={`history-sidebar ${showHistory ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Histórico & Favoritos</h3>
          <button 
            className="close-sidebar-btn"
            onClick={() => setShowHistory(false)}
          >
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {/* Favoritos */}
          {favorites.length > 0 && (
            <div className="sidebar-section">
              <div className="section-header">
                <h4 className="section-title">⭐ Favoritos</h4>
                <button 
                  className="clear-section-btn"
                  onClick={() => {
                    setFavorites([]);
                    localStorage.removeItem('weatherFavorites');
                  }}
                >
                  Limpar
                </button>
              </div>
              
              <ul className="sidebar-list">
                {favorites.map((city) => (
                  <li key={city.id} className="sidebar-item">
                    <div 
                      className="city-info"
                      onClick={() => {
                        onCitySelect(city.name);
                        setShowHistory(false);
                      }}
                    >
                      <div className="city-name-sidebar">{city.name}</div>
                      <div className="city-country">{city.country}</div>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(city.id);
                      }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Buscas Recentes */}
          {recentSearches.length > 0 && (
            <div className="sidebar-section">
              <div className="section-header">
                <h4 className="section-title">🕒 Recentes</h4>
                <button 
                  className="clear-section-btn"
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('weatherRecentSearches');
                  }}
                >
                  Limpar
                </button>
              </div>
              
              <ul className="sidebar-list">
                {recentSearches.slice(0, 8).map((city) => (
                  <li key={`${city.id}-${city.timestamp}`} className="sidebar-item">
                    <div 
                      className="city-info"
                      onClick={() => {
                        onCitySelect(city.name);
                        setShowHistory(false);
                      }}
                    >
                      <div className="city-name-sidebar">{city.name}</div>
                      <div className="city-details">
                        {city.country} • {formatTimeAgo(city.timestamp)}
                      </div>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedRecents = recentSearches.filter(
                          recent => recent.timestamp !== city.timestamp
                        );
                        setRecentSearches(updatedRecents);
                        localStorage.setItem('weatherRecentSearches', JSON.stringify(updatedRecents));
                      }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Estado Vazio */}
          {favorites.length === 0 && recentSearches.length === 0 && (
            <div className="empty-sidebar">
              <div className="empty-icon">🌤️</div>
              <div className="empty-message">Nenhum histórico ainda</div>
              <div className="empty-subtitle">Pesquise por cidades para ver o histórico aqui</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CityHistory;
