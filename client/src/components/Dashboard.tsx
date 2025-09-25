import React, { useState, useEffect } from 'react';

interface DashboardProps {
  user: any;
  token: string;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, token, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ name: '', languagePreference: '' });
  const [stories, setStories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
    fetchStories();
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchStories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setStories(data.filter((story: any) => story.userId === user.id));
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        alert('Password changed successfully');
        setShowChangePassword(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to change password');
      }
    } catch (error) {
      alert('Error changing password');
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      
      if (response.ok) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000 }}>
      <div style={{ background: 'white', margin: '50px auto', maxWidth: '800px', height: '80vh', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: '#2c3e50', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
          <h2>User Dashboard</h2>
          <button onClick={onClose} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>×</button>
        </div>
        
        <div style={{ display: 'flex', height: 'calc(100% - 60px)' }}>
          <div style={{ width: '200px', background: '#ecf0f1', padding: '20px' }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                background: activeTab === 'profile' ? '#3498db' : 'white',
                color: activeTab === 'profile' ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                background: activeTab === 'stories' ? '#3498db' : 'white',
                color: activeTab === 'stories' ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              My Stories
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              style={{
                width: '100%',
                padding: '10px',
                background: activeTab === 'notifications' ? '#3498db' : 'white',
                color: activeTab === 'notifications' ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              Notifications
            </button>
          </div>
          
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            {activeTab === 'profile' && (
              <div>
                <h3>Profile Information</h3>
                <form onSubmit={updateProfile}>
                  <div style={{ marginBottom: '15px' }}>
                    <label>Name:</label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label>Language:</label>
                    <select
                      value={profile.languagePreference}
                      onChange={(e) => setProfile({...profile, languagePreference: e.target.value})}
                      style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="nepali">Nepali</option>
                    </select>
                  </div>
                  <button type="submit" style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}>
                    Update Profile
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowChangePassword(true)}
                    style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Change Password
                  </button>
                </form>
              </div>
            )}
            
            {activeTab === 'stories' && (
              <div>
                <h3>My Stories ({stories.length})</h3>
                {stories.map((story: any) => (
                  <div key={story._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '4px' }}>
                    <h4>{story.title}</h4>
                    <p><strong>Impact:</strong> {story.climateImpact}</p>
                    <p>{story.content.substring(0, 100)}...</p>
                    <small>Submitted: {new Date(story.createdAt).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h3>Notifications ({notifications.filter((n: any) => !n.read).length} unread)</h3>
                {notifications.length > 0 ? notifications.map((notif: any) => (
                  <div key={notif._id} style={{ 
                    border: '1px solid #ddd', 
                    padding: '15px', 
                    marginBottom: '10px', 
                    borderRadius: '4px',
                    background: notif.read ? 'white' : '#e3f2fd',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p>{notif.message}</p>
                      <small>{new Date(notif.createdAt).toLocaleDateString()}</small>
                    </div>
                    {!notif.read && (
                      <button 
                        onClick={() => markNotificationAsRead(notif._id)}
                        style={{ padding: '5px 10px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                )) : (
                  <p>No notifications</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {showChangePassword && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              width: '400px'
            }}>
              <h3 style={{ marginBottom: '20px' }}>Change Password</h3>
              <form onSubmit={handleChangePassword}>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="submit" 
                    style={{ flex: 1, padding: '10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Change Password
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowChangePassword(false)}
                    style={{ flex: 1, padding: '10px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;