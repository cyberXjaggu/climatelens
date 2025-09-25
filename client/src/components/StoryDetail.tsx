import React from 'react';

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

interface StoryDetailProps {
  story: Story;
  onClose: () => void;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story, onClose }) => {
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
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>{story.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <p style={{ color: '#7f8c8d', fontSize: '14px', margin: '5px 0' }}>
            📍 {story.location.address}
          </p>
          <p style={{ color: '#7f8c8d', fontSize: '14px', margin: '5px 0' }}>
            🌡️ Climate Impact: {story.climateImpact}
          </p>
          <p style={{ color: '#7f8c8d', fontSize: '14px', margin: '5px 0' }}>
            👤 By: {story.submittedBy || 'Anonymous'} {story.aiGenerated && '(AI Generated)'}
          </p>
          <p style={{ color: '#7f8c8d', fontSize: '14px', margin: '5px 0' }}>
            📅 {new Date(story.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          fontSize: '16px',
          lineHeight: '1.6'
        }}>
          {story.content}
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;