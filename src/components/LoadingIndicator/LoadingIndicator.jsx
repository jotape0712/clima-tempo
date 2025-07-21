import './LoadingIndicator.css';

function LoadingIndicator({ message = "Carregando dados meteorológicos..." }) {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="weather-animation">
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
          <div className="sun">☀️</div>
          <div className="rain-drops">
            <div className="drop">💧</div>
            <div className="drop">💧</div>
            <div className="drop">💧</div>
          </div>
        </div>
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
