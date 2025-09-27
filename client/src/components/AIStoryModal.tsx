import React, { useState, useEffect } from 'react';

interface AIStoryModalProps {
  user: any;
  token: string;
  onClose: () => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

const AIStoryModal: React.FC<AIStoryModalProps> = ({ user, token, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('Detecting location...');
  const [story, setStory] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [language, setLanguage] = useState('english');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const detectLocation = async (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Location detected:', { latitude, longitude });
          
          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=6591a1f5d3d972c50e8772ad8c929cdd`
            );
            const data = await response.json();
            
            resolve({
              latitude,
              longitude,
              city: data[0]?.name || 'Unknown City',
              country: data[0]?.country || 'Unknown Country'
            });
          } catch (error) {
            resolve({
              latitude,
              longitude,
              city: 'Unknown City',
              country: 'Unknown Country'
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        { timeout: 10000 }
      );
    });
  };

  const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6591a1f5d3d972c50e8772ad8c929cdd&units=metric`
    );
    const data = await response.json();
    console.log('Weather data:', data);
    
    return {
      temperature: data.main?.temp || 25,
      description: data.weather?.[0]?.description || 'clear sky',
      humidity: data.main?.humidity || 50,
      windSpeed: data.wind?.speed || 5
    };
  };

  const generateAIStory = async () => {
    setLoading(true);
    
    try {
      // Step 1: Detect location
      setStep('Detecting your location...');
      const locationData = await detectLocation();
      setLocation(locationData);
      console.log('Location detection completed:', locationData);

      // Step 2: Fetch weather data
      setStep('Fetching weather data...');
      const weatherData = await fetchWeatherData(locationData.latitude, locationData.longitude);
      setWeather(weatherData);
      console.log('Weather data fetched:', weatherData);

      // Step 3: Generate AI story
      setStep('Generating climate story...');
      console.log('Sending request with language:', language);
      
      const response = await fetch('http://localhost:5000/api/stories/generate-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location: locationData,
          weather: weatherData,
          language: language
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('AI story response:', data);
      
      if (response.ok && data.story) {
        setStory(data.story);
        setStep('Story generated successfully!');
      } else {
        console.error('API Error:', data.error || 'Unknown error');
        throw new Error(data.error || 'Failed to generate story');
      }
    } catch (error) {
      console.error('Error generating AI story:', error);
      setStep('Error occurred. Retrying...');
      
      // Fallback stories in different languages
      let fallbackStory;
      if (language === 'hindi') {
        fallbackStory = `${location?.city || 'आपके क्षेत्र'} में जलवायु परिवर्तन नई चुनौतियां पैदा कर रहा है। वर्तमान मौसम की स्थिति ${weather?.description || 'बदलते मौसम के पैटर्न'} के साथ हमें पर्यावरण जागरूकता और सामुदायिक कार्रवाई के महत्व की याद दिलाती है। हमें मिलकर इस समस्या का समाधान खोजना होगा।`;
      } else if (language === 'nepali') {
        fallbackStory = `${location?.city || 'तपाईंको क्षेत्र'} मा जलवायु परिवर्तनले नयाँ चुनौतीहरू सिर्जना गरिरहेको छ। हालको मौसमी अवस्था ${weather?.description || 'परिवर्तनशील ढाँचा'} ले हामीलाई वातावरणीय चेतना र सामुदायिक कार्यको महत्त्वको सम्झना गराउँछ।`;
      } else {
        fallbackStory = `In ${location?.city || 'your area'}, climate change is creating new challenges. The current weather conditions with ${weather?.description || 'changing patterns'} remind us of the importance of environmental awareness and community action.`;
      }
      
      setStory(fallbackStory);
    } finally {
      setLoading(false);
    }
  };

  const speakStory = () => {
    if (!speechSynthesis || !story) return;

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(story);
    
    // Set language based on selection
    switch (language) {
      case 'hindi':
        utterance.lang = 'hi-IN';
        break;
      case 'nepali':
        utterance.lang = 'ne-NP';
        break;
      default:
        utterance.lang = 'en-US';
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    speechSynthesis.speak(utterance);
  };

  const saveStory = async () => {
    if (!story || !location) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: `AI Generated Story - ${location.city}`,
          content: story,
          userId: user.id,
          location: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
            address: `${location.city}, ${location.country}`
          },
          climateImpact: 'other',
          submittedBy: 'AI Generated',
          aiGenerated: true
        })
      });

      if (response.ok) {
        alert('Story saved successfully!');
      } else {
        throw new Error('Failed to save story');
      }
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Error saving story');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        border: '1px solid #333'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>AI Climate Story Generator</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
        </div>

        {!story && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label>Language: </label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                style={{ padding: '5px', marginLeft: '10px' }}
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="nepali">Nepali</option>
              </select>
            </div>
            
            <button
              onClick={generateAIStory}
              disabled={loading}
              style={{
                padding: '12px 24px',
                background: loading ? '#bdc3c7' : '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px'
              }}
            >
              {loading ? 'Generating...' : 'Generate Climate Story'}
            </button>
            
            {loading && (
              <div style={{ marginTop: '15px', color: '#7f8c8d' }}>
                {step}
              </div>
            )}
          </div>
        )}

        {story && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3>Your Climate Story</h3>
              {location && (
                <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                  📍 {location.city}, {location.country}
                </p>
              )}
              {weather && (
                <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                  🌡️ {weather.temperature}°C, {weather.description}
                </p>
              )}
            </div>

            <div style={{
              backgroundColor: '#3f32cdff',
              
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              {story}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={speakStory}
                style={{
                  padding: '10px 20px',
                  background: isPlaying ? '#e74c3c' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? '⏸️ Stop' : '🔊 Listen'}
              </button>

              <button
                onClick={saveStory}
                style={{
                  padding: '10px 20px',
                  background: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                💾 Save Story
              </button>

              <button
                onClick={() => {
                  setStory('');
                  setLocation(null);
                  setWeather(null);
                  setStep('');
                }}
                style={{
                  padding: '10px 20px',
                  background: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                🔄 Generate New
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStoryModal;