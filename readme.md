
# ClimateLens 🌍

A comprehensive climate awareness platform that educates users about climate issues through AI-generated stories, interactive maps, and real-time weather data.

## 🌟 Features

- **AI-Generated Climate Stories** - Location-based climate stories using Google Gemini AI
- **Interactive Maps** - Visualize climate events and stories on interactive maps
- **Multi-language Support** - Stories available in English, Hindi, and Nepali
- **Text-to-Speech** - Audio narration for accessibility
- **Real-time Weather Data** - Integration with OpenWeather API
- **User Authentication** - Secure login/signup with email verification
- **Story Submission** - Users can submit their own climate stories
- **Notifications** - Weather alerts and climate event notifications

## 🚀 Tech Stack

### Frontend
- **React.js** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling
- **Web Speech API** - Text-to-speech functionality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### APIs & Services
- **OpenWeather API** - Weather and climate data
- **Mapbox** - Interactive maps
- **Nodemailer** - Email notifications


## 📁 Project Structure

climatelens/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── middleware/       # Custom middleware
│   └── package.json
├── README.md
└── .gitignore