# ClimateLens Server 🌍

Backend API server for the ClimateLens climate awareness platform.

## 🚀 Quick Start

### 1. Setup Environment
```bash
npm run setup-env
```

### 2. Configure .env file
Update the created `.env` file with your actual credentials:
- MongoDB Atlas connection string
- API keys (Gemini, OpenWeather)
- Email configuration

### 3. Validate Configuration
```bash
npm run validate
```

### 4. Test Database Connection
```bash
npm run test-atlas
```

### 5. Initialize Database
```bash
npm run init-db
```

### 6. Start Server
```bash
npm start
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start development server with auto-reload |
| `npm run setup-env` | Create .env file from template |
| `npm run validate` | Validate all configuration |
| `npm run test-atlas` | Test MongoDB Atlas connection |
| `npm run init-db` | Initialize database collections |
| `npm run check-db` | Check database connection |
| `npm run setup` | Complete setup process |
| `npm run health` | Check server health |

## 🔧 Configuration

### Required Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/climatelens

# Server
PORT=5000

# API Keys
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
WEATHER_API_URL=https://api.openweathermap.org/data/2.5

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## 🛠 API Endpoints

### Health & Status
- `GET /` - Server status
- `GET /api/health` - Detailed health check

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Stories
- `GET /api/stories` - Get all stories
- `POST /api/stories` - Create new story
- `GET /api/stories/:id` - Get specific story
- `PUT /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `DELETE /api/user/account` - Delete user account

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read

## 🗄 Database Schema

### Collections
- **users** - User accounts and profiles
- **stories** - Climate stories and reports
- **notifications** - System notifications
- **otps** - One-time passwords for verification

### User Schema
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  languagePreference: String (enum: ['english', 'hindi', 'nepali']),
  createdAt: Date
}
```

### Story Schema
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (ref: 'User'),
  location: {
    type: String,
    coordinates: [Number]
  },
  images: [String],
  tags: [String],
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Request size limits
- Input validation
- Error handling

## 🚨 Error Handling

The server includes comprehensive error handling:
- Database connection errors
- Authentication failures
- Validation errors
- API rate limiting
- Graceful shutdown

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "healthy",
  "database": "connected",
  "uptime": 3600,
  "memory": {...},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string format
   - Verify credentials
   - Ensure IP whitelist in Atlas

2. **API Key Errors**
   - Verify API keys are active
   - Check quotas and limits
   - Ensure proper permissions

3. **Email Configuration**
   - Use app passwords for Gmail
   - Enable 2FA first
   - Check SMTP settings

4. **Port Already in Use**
   - Change PORT in .env
   - Kill existing processes
   - Use different port

### Debug Mode
Set `NODE_ENV=development` for detailed error messages.

## 📁 Project Structure

```
server/
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Story.js
│   ├── Notification.js
│   └── OTP.js
├── routes/              # Express routes
│   ├── auth.js
│   ├── stories.js
│   ├── notifications.js
│   └── user.js
├── services/            # Business logic
│   ├── emailService.js
│   └── aiService.js
├── middleware/          # Custom middleware
│   └── auth.js
├── .env                 # Environment variables
├── .env.example         # Template file
├── index.js             # Main server file
├── initDB.js            # Database initialization
├── checkDB.js           # Database connection test
└── package.json         # Dependencies
```

## 🔄 Development Workflow

1. Make changes to code
2. Server auto-reloads (if using `npm run dev`)
3. Test endpoints with curl or Postman
4. Check logs for errors
5. Validate with health check

## 📈 Performance

- Connection pooling for MongoDB
- Request/response compression
- Efficient database queries
- Memory usage monitoring
- Graceful error handling

## 🤝 Contributing

1. Follow existing code style
2. Add tests for new features
3. Update documentation
4. Test thoroughly before committing

## 📞 Support

For issues and questions:
1. Check this README
2. Review error logs
3. Validate configuration
4. Test database connection
