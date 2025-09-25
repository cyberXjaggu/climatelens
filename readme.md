
# ClimateLens 🌍

<!-- Banner -->
![ClimateLens Banner](./banner.svg)

> **Making climate education accessible to everyone through the power of AI storytelling** 🌱

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%5E18.0.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/atlas)
[![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange)](https://ai.google.dev/)
[![Climate Action](https://img.shields.io/badge/Climate-Action-brightgreen)](https://sdgs.un.org/goals/goal13)

A comprehensive climate awareness platform that educates users about climate issues through **AI-generated stories**, **interactive maps**, and **real-time weather data**.

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

```
climatelens/
├── client/                 # React frontend
│   ├── public/             # Static files
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   │   ├── AIStoryModal.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── HomePage.css
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LandingPage.css
│   │   │   ├── Map.tsx
│   │   │   ├── OTPVerification.tsx
│   │   │   ├── OTPVerification.css
│   │   │   ├── StoryDetail.tsx
│   │   │   ├── StoryForm.tsx
│   │   │   └── StoryList.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   ├── setupTests.ts
│   │   └── tsconfig.json
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── server/                 # Node.js backend
│   ├── models/            # Database schemas
│   │   ├── Notification.js
│   │   ├── OTP.js
│   │   ├── Story.js
│   │   └── User.js
│   ├── routes/            # API endpoints
│   │   ├── auth.js
│   │   ├── notifications.js
│   │   ├── stories.js
│   │   └── user.js
│   ├── services/          # Business logic
│   │   ├── aiService.js
│   │   └── emailService.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── index.js          # Server entry point
│   ├── package.json
│   ├── README.md
│   └── ... (other server files)
│
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/cyberXjaggu/climatelens.git
cd climatelens
```

### 2. Install dependencies
```bash
# For frontend
cd client
npm install

# For backend
cd ../server
npm install
```

### 3. Setup environment variables
Create a `.env` file inside `/server`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
OPENWEATHER_API_KEY=your_openweather_key
MAPBOX_API_KEY=your_mapbox_key
AI_API_KEY=your_google_gemini_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### 4. Run the project
```bash
# Run backend
cd server
npm start

# Run frontend
cd ../client
npm start
```

---

## 📜 License
This project is licensed under the MIT License.

---

## 🔮 Roadmap
- 📱 Mobile-first PWA support
- 📊 Advanced analytics dashboard
- 🌎 More language support
- 🎙️ Voice-based story submission

---

## 👥 Developers

This project was developed by:

### **Core Developers**
- **Jagarnath Mali** 🎯
- **Prashant Chandra Kushwaha** 🚀

*Thank you for your dedication to climate awareness and education!*

---

## 👐 Contributing
Contributions are welcome!
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request 🎉

---

## ✨ About ClimateLens

ClimateLens is not just a project — it's a movement for climate awareness. Together we can learn, adapt, and take action. 🌱🌍⚡

*Made with ❤️ for our planet*
```