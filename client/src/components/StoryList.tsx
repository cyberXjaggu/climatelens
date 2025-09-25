import React, { useState, useEffect } from 'react';

interface Story {
  _id: string;
  title: string;
  content: string;
  climateImpact: string;
  location: {
    address: string;
  };
  submittedBy?: string;
  createdAt: string;
}

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stories');
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Recent Climate Stories</h3>
      <div>
        {stories.map((story) => (
          <div
            key={story._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              background: 'white'
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              {story.title}
            </h4>
            
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              <span style={{
                background: '#e74c3c',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                marginRight: '10px'
              }}>
                {story.climateImpact}
              </span>
              {story.location.address}
            </div>
            
            <p style={{ margin: '10px 0', lineHeight: '1.4' }}>
              {story.content.length > 150 
                ? `${story.content.substring(0, 150)}...` 
                : story.content
              }
            </p>
            
            {story.submittedBy && (
              <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                - {story.submittedBy}
              </div>
            )}
          </div>
        ))}
        
        {stories.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            No stories yet. Be the first to share your climate experience!
          </p>
        )}
      </div>
    </div>
  );
};

export default StoryList;