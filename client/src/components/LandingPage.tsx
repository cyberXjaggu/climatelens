import React, { useState, useEffect } from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentStory, setCurrentStory] = useState('');
  const [isPlayingStory, setIsPlayingStory] = useState(false);

  useEffect(() => {
    fetchWeatherData();
    generateAIStory();
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

  const generateAIStory = () => {
    const stories = [
      "Climate change is reshaping our world. Rising temperatures and changing weather patterns affect communities globally. Together, we can make a difference through awareness and action.",
      "Every degree matters in our fight against climate change. Local communities are experiencing unprecedented weather events. Your voice and story can inspire others to take action.",
      "From melting glaciers to rising sea levels, climate impacts are visible everywhere. Share your experiences and learn from others in your community."
    ];
    setCurrentStory(stories[Math.floor(Math.random() * stories.length)]);
  };

  const playStory = () => {
    if (!isPlayingStory && currentStory) {
      setIsPlayingStory(true);
      const utterance = new SpeechSynthesisUtterance(currentStory);
      utterance.onend = () => setIsPlayingStory(false);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
      setIsPlayingStory(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="overlay"></div>
      
      <header className="landing-header">
        <h1>🌍 ClimateLens</h1>
        <nav>
          <ul className="menu">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="login-btn" onClick={onLogin}>Login</button>
      </header>

      <main className="landing-main">
        <div className="hero-section">
          <h2>Voices from the Frontlines</h2>
          <p>Share and explore climate impact stories from around the world</p>
          <button className="cta-btn" onClick={onLogin}>Get Started</button>
        </div>

        <div className="cards-container">
          <div className="card weather-card">
            <div className="card-header">
              <i className="fa-solid fa-cloud-sun"></i>
              <h3>Local Weather</h3>
            </div>
            <div className="weather-content">
              {weatherData ? (
                <>
                  <p><strong>{weatherData.name}</strong></p>
                  <p>{weatherData.main.temp}°C, {weatherData.weather[0].description}</p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          </div>

          <div className="card story-card">
            <div className="card-header">
              <i className="fa-solid fa-book-open"></i>
              <h3>Climate Story</h3>
            </div>
            <div className="story-content">
              <p>{currentStory}</p>
              <button 
                className="play-btn" 
                onClick={playStory}
                disabled={!currentStory}
              >
                {isPlayingStory ? '⏸️ Stop' : '🎙️ Play Story'}
              </button>
            </div>
          </div>

          <div className="card features-card">
            <div className="card-header">
              <i className="fa-solid fa-map-location-dot"></i>
              <h3>Key Features</h3>
            </div>
            <div className="features-content">
              <ul>
                <li>🗺️ Interactive climate story map</li>
                <li>🤖 AI-generated climate stories</li>
                <li>🔊 Multi-language text-to-speech</li>
                <li>📧 Climate alerts & notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>Powered by ClimateLens | OpenWeather | Gemini AI</p>
      </footer>
    </div>
  );
};

export default LandingPage;