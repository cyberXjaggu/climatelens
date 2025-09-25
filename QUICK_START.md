# ClimateLens Quick Start Guide 🌍

## 🚀 Getting Started in 5 Minutes

### Step 1: Setup Environment Variables
```bash
cd server
npm run setup-env
```
This creates a `.env` file from `.env.example`. You need to update it with your actual credentials.

### Step 2: Configure Your .env File
Open `server/.env` and update these values:

```env
# MongoDB Atlas Connection (REQUIRED)
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/climatelens?retryWrites=true&w=majority

# API Keys (REQUIRED for full functionality)
GEMINI_API_KEY=your_actual_gemini_api_key
OPENWEATHER_API_KEY=your_actual_openweather_api_key

# Email Configuration (REQUIRED for notifications)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Step 3: Test MongoDB Atlas Connection
```bash
npm run test-atlas
```
This will verify your MongoDB Atlas connection and permissions.

### Step 4: Initialize Database
```bash
npm run init-db
```
This creates the necessary collections in your MongoDB Atlas database.

### Step 5: Start the Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

## 🔧 MongoDB Atlas Setup Checklist

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a free account and cluster

### 2. Database User Setup
- Go to Database Access
- Create a new user with read/write permissions
- Remember the username and password

### 3. Network Access
- Go to Network Access
- Add your IP address (or 0.0.0.0/0 for testing)

### 4. Get Connection String
- Go to Clusters → Connect → Connect your application
- Copy the connection string
- Replace `<username>`, `<password>`, and `<dbname>` with your values

## 📋 API Keys Setup

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

### OpenWeather API
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up and get your free API key
3. Add it to your `.env` file

### Email Configuration (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this app password in your `.env` file

## 🧪 Testing Your Setup

### Test Database Connection
```bash
npm run test-atlas
```

### Test Basic Server
```bash
npm run check-db
curl http://localhost:5000
```

### Test All Routes
```bash
# After starting the server
curl http://localhost:5000/api/auth/test
curl http://localhost:5000/api/stories/test
```

## 🚨 Common Issues & Solutions

### Authentication Failed
- ✅ Check username/password in connection string
- ✅ Verify database user permissions
- ✅ Ensure special characters are URL encoded

### Network Timeout
- ✅ Check internet connection
- ✅ Whitelist your IP in MongoDB Atlas
- ✅ Try adding 0.0.0.0/0 for testing

### Server Won't Start
- ✅ Check if port 5000 is available
- ✅ Verify all environment variables are set
- ✅ Run `npm install` to ensure dependencies

### API Errors
- ✅ Verify API keys are correct and active
- ✅ Check API quotas and limits
- ✅ Ensure proper internet connectivity

## 📁 Project Structure
```
server/
├── models/          # Database schemas
├── routes/          # API endpoints
├── services/        # Business logic
├── middleware/      # Custom middleware
├── .env            # Environment variables (create this)
├── .env.example    # Template file
└── package.json    # Dependencies and scripts
```

## 🎯 Next Steps
1. Start the client application (React frontend)
2. Test the full application flow
3. Configure additional features as needed

## 📞 Need Help?
If you encounter any issues, check the error messages carefully and refer to the troubleshooting section above.
