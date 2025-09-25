import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AIStoryModal from './components/AIStoryModal';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAIStory, setShowAIStory] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'map'

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!user && !showAuth) {
    return <LandingPage onLogin={() => setShowAuth(true)} />;
  }

  if (!user && showAuth) {
    return <Auth onLogin={handleLogin} />;
  }

  if (currentView === 'map') {
    return (
      <div className="map-page">
        <div className="overlay"></div>
        
        <header className="map-header">
          <h1>🌍 ClimateLens</h1>
          <nav>
            <ul className="menu">
              <li><button onClick={() => setCurrentView('home')} className="nav-btn">Home</button></li>
              <li><a href="#map" className="active">Map</a></li>
              <li><button onClick={() => setShowAIStory(true)} className="nav-btn">AI Story</button></li>
              <li><button onClick={() => setShowDashboard(true)} className="nav-btn">Dashboard</button></li>
            </ul>
          </nav>
          <div className="search-section">
            <input 
              type="text" 
              placeholder="Search location for stories..." 
              className="location-search"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const location = (e.target as HTMLInputElement).value;
                  if (location) {
                    // Search for stories by location
                    console.log('Searching for stories in:', location);
                  }
                }
              }}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="user-section">
            <span>Welcome, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        
        <main className="map-main">
          <div className="map-container">
            <Map />
          </div>
          
          <div className="sidebar">
            <StoryForm user={user} token={token!} />
            <StoryList />
          </div>
        </main>
        
        {showDashboard && (
          <Dashboard
            user={user}
            token={token!}
            onClose={() => setShowDashboard(false)}
          />
        )}
        
        {showAIStory && (
          <AIStoryModal
            user={user}
            token={token!}
            onClose={() => setShowAIStory(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <HomePage
        user={user}
        token={token!}
        onShowMap={() => setCurrentView('map')}
        onShowDashboard={() => setShowDashboard(true)}
        onShowAIStory={() => setShowAIStory(true)}
        onLogout={handleLogout}
      />
      
      {showDashboard && (
        <Dashboard
          user={user}
          token={token!}
          onClose={() => setShowDashboard(false)}
        />
      )}
      
      {showAIStory && (
        <AIStoryModal
          user={user}
          token={token!}
          onClose={() => setShowAIStory(false)}
        />
      )}
    </>
  );
}

export default App;