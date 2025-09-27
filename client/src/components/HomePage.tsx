import React, { useState, useEffect } from 'react';
import './HomePage.css';

interface HomePageProps {
  user: any;
  token: string;
  onShowMap: () => void;
  onShowDashboard: () => void;
  onShowAIStory: () => void;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  user, 
  token, 
  onShowMap, 
  onShowDashboard, 
  onShowAIStory, 
  onLogout 
}) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [recentStories, setRecentStories] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchWeatherData();
    fetchRecentStories();
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6591a1f5d3d972c50e8772ad8c929cdd&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  const fetchRecentStories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/stories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setRecentStories(data.slice(0, 3));
    } catch (error) {
      console.error('Stories fetch error:', error);
    }
  };

  const fetchNotifications = () => {
    setNotifications([
      { id: 1, type: 'weather', message: 'Heavy rainfall expected in your area', time: '2 hours ago' },
      { id: 2, type: 'story', message: 'New climate story shared nearby', time: '5 hours ago' }
    ]);
  };

  return (
    <div className="home-page">
      <div className="overlay"></div>
      
      <header className="home-header">
        <h1>🌍 ClimateLens</h1>
        <nav>
          <ul className="menu">
            <li><a href="#home" className="active">Home</a></li>
            <li><button onClick={onShowMap} className="nav-btn">Map</button></li>
            <li><button onClick={onShowAIStory} className="nav-btn">AI Story</button></li>
            <li><button onClick={onShowDashboard} className="nav-btn">Dashboard</button></li>
          </ul>
        </nav>
        <div className="user-section">
          <span>Welcome, {user.name}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="home-main">
        <div className="hero-section">
          <h2>Welcome back, {user.name}!</h2>
          <p>Continue sharing and exploring climate stories from your community</p>
        </div>

        <div className="cards-container">
          <div className="card weather-card">
            <div className="card-header">
              <i className="fa-solid fa-cloud-sun"></i>
              <h3>Current Weather</h3>
            </div>
            <div className="weather-content">
              {weatherData ? (
                <>
                  <p><strong>{weatherData.name}</strong></p>
                  <p>{weatherData.main.temp}°C, {weatherData.weather[0].description}</p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <p>Wind: {weatherData.wind.speed} m/s</p>
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          </div>

          <div className="card actions-card">
            <div className="card-header">
              <i className="fa-solid fa-plus-circle"></i>
              <h3>Quick Actions</h3>
            </div>
            <div className="actions-content">
              <button className="action-btn" onClick={onShowAIStory}>
                🤖 Generate AI Story
              </button>
              <button className="action-btn" onClick={onShowMap}>
                🗺️ Explore Map
              </button>
              <button className="action-btn" onClick={onShowDashboard}>
                📊 View Dashboard
              </button>
            </div>
          </div>

          <div className="card stories-card">
            <div className="card-header">
              <i className="fa-solid fa-book-open"></i>
              <h3>Recent Stories</h3>
            </div>
            <div className="stories-content">
              {recentStories.length > 0 ? (
                recentStories.map((story) => (
                  <div key={story._id} className="story-item">
                    <h4>{story.title}</h4>
                    <p>{story.content.substring(0, 80)}...</p>
                    <span className="story-meta">{story.climateImpact} • {story.location.address}</span>
                  </div>
                ))
              ) : (
                <p>No recent stories. <button onClick={onShowAIStory} className="link-btn">Generate one now!</button></p>
              )}
            </div>
          </div>

          <div className="card notifications-card">
            <div className="card-header">
              <i className="fa-solid fa-bell"></i>
              <h3>Notifications</h3>
            </div>
            <div className="notifications-content">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <div className={`notification-icon ${notification.type}`}>
                      {notification.type === 'weather' ? '🌦️' : '📖'}
                    </div>
                    <div className="notification-text">
                      <p>{notification.message}</p>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No new notifications</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>Powered by ClimateLens | OpenWeather | Gemini AI</p>
      </footer>
    </div>
  );
};

export default HomePage;