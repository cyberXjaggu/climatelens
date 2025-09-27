import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import StoryDetail from './StoryDetail';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Story {
  _id: string;
  title: string;
  content: string;
  location: {
    coordinates: [number, number];
    address: string;
  };
  climateImpact: string;
  submittedBy: string;
  aiGenerated?: boolean;
  createdAt: string;
}

const Map: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/stories`);
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const climateIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c">
        <circle cx="12" cy="12" r="10" fill="#e74c3c" stroke="white" stroke-width="2"/>
      </svg>
    `),
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={4}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {stories.map((story) => (
        <Marker
          key={story._id}
          position={[story.location.coordinates[1], story.location.coordinates[0]]}
          icon={climateIcon}
          eventHandlers={{
            click: () => setSelectedStory(story)
          }}
        >
          <Popup>
            <div style={{ maxWidth: '200px' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>{story.title}</h4>
              <p><strong>Impact:</strong> {story.climateImpact}</p>
              <p>{story.content.substring(0, 100)}...</p>
              <button 
                onClick={() => setSelectedStory(story)}
                style={{ 
                  background: '#3498db', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '3px', 
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Read Full Story
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {selectedStory && (
        <StoryDetail
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </MapContainer>
  );
};

export default Map;