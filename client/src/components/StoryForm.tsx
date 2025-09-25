import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface StoryFormProps {
  user: any;
  token: string;
}

const StoryForm: React.FC<StoryFormProps> = ({ user, token }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    climateImpact: '',
    address: '',
    submittedBy: ''
  });
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,
          location: {
            type: 'Point',
            coordinates: selectedLocation ? [selectedLocation.lng, selectedLocation.lat] : [0, 0],
            address: formData.address
          }
        }),
      });

      if (response.ok) {
        setFormData({
          title: '',
          content: '',
          climateImpact: '',
          address: '',
          submittedBy: ''
        });
        alert('Story submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Error submitting story');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Share Your Climate Story</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Story Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <select
            value={formData.climateImpact}
            onChange={(e) => setFormData({...formData, climateImpact: e.target.value})}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Select Climate Impact</option>
            <option value="flood">Flood</option>
            <option value="drought">Drought</option>
            <option value="heatwave">Heatwave</option>
            <option value="storm">Storm</option>
            <option value="wildfire">Wildfire</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Location/Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
              style={{ flex: 1, padding: '8px' }}
            />
            <button
              type="button"
              onClick={() => setShowLocationPicker(true)}
              style={{
                padding: '8px 12px',
                background: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📍 Pick on Map
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Tell your story..."
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required
            rows={4}
            style={{ width: '100%', padding: '8px', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={formData.submittedBy}
            onChange={(e) => setFormData({...formData, submittedBy: e.target.value})}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Story
        </button>
      </form>
      
      {showLocationPicker && (
        <LocationPicker
          onLocationSelect={(lat, lng, address) => {
            setSelectedLocation({lat, lng});
            setFormData({...formData, address});
            setShowLocationPicker(false);
          }}
          onClose={() => setShowLocationPicker(false)}
        />
      )}
    </div>
  );
};

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  onClose: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, onClose }) => {
  const [selectedPos, setSelectedPos] = useState<{lat: number, lng: number} | null>(null);
  const [address, setAddress] = useState('');

  const handleMapClick = async (lat: number, lng: number) => {
    setSelectedPos({ lat, lng });
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=6591a1f5d3d972c50e8772ad8c929cdd`
      );
      const data = await response.json();
      const locationName = data[0] ? `${data[0].name}, ${data[0].country}` : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setAddress(locationName);
    } catch (error) {
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        handleMapClick(lat, lng);
      }
    });
    return null;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '80%',
        height: '70%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Select Location on Map</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    handleMapClick(latitude, longitude);
                  },
                  (error) => console.error('Geolocation error:', error)
                );
              }}
              style={{
                padding: '5px 10px',
                background: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              📍 Current Location
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
          </div>
        </div>
        
        <div style={{ height: 'calc(100% - 100px)', marginBottom: '15px' }}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={4}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <MapClickHandler />
            {selectedPos && (
              <Marker position={[selectedPos.lat, selectedPos.lng]} />
            )}
          </MapContainer>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Selected location will appear here"
            style={{ flex: 1, padding: '8px' }}
          />
          <button
            onClick={() => selectedPos && onLocationSelect(selectedPos.lat, selectedPos.lng, address)}
            disabled={!selectedPos}
            style={{
              padding: '8px 16px',
              background: selectedPos ? '#27ae60' : '#bdc3c7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: selectedPos ? 'pointer' : 'not-allowed'
            }}
          >
            Select Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;