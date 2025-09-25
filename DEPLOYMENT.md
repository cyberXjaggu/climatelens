# ClimateLens Deployment Guide 🚀

This guide covers various deployment options for the ClimateLens application.

## 📋 Pre-deployment Checklist

- [ ] MongoDB Atlas cluster is set up and running
- [ ] All API keys are obtained (Gemini, OpenWeather, Email)
- [ ] Environment variables are configured
- [ ] Application has been tested locally
- [ ] Code is committed to GitHub repository

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- MongoDB Atlas connection string

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/climatelens.git
   cd climatelens
   ```

2. **Configure environment variables**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - Health check: http://localhost:5000/api/health

### Production Docker Deployment

1. **Build production images**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

2. **Set up reverse proxy (Nginx)**
   ```bash
   # Configure SSL certificates
   # Update nginx.conf with your domain
   ```

## ☁️ Cloud Deployment Options

### 1. Heroku Deployment

#### Backend (Server)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create climatelens-server

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set GEMINI_API_KEY="your_gemini_key"
heroku config:set OPENWEATHER_API_KEY="your_weather_key"
heroku config:set EMAIL_HOST_USER="your_email"
heroku config:set EMAIL_HOST_PASSWORD="your_password"

# Deploy
cd server
git subtree push --prefix server heroku main
```

#### Frontend (Client)
```bash
# Deploy to Netlify or Vercel
cd client
npm run build

# Upload build folder to your hosting service
```

### 2. AWS Deployment

#### Using AWS ECS (Elastic Container Service)

1. **Push images to ECR**
   ```bash
   # Create ECR repositories
   aws ecr create-repository --repository-name climatelens-server
   aws ecr create-repository --repository-name climatelens-client

   # Build and push images
   docker build -t climatelens-server ./server
   docker build -t climatelens-client ./client

   # Tag and push to ECR
   docker tag climatelens-server:latest your-account.dkr.ecr.region.amazonaws.com/climatelens-server:latest
   docker push your-account.dkr.ecr.region.amazonaws.com/climatelens-server:latest
   ```

2. **Create ECS cluster and services**
   ```bash
   # Use AWS Console or CLI to create ECS cluster
   # Configure task definitions
   # Set up load balancers
   ```

#### Using AWS Elastic Beanstalk

1. **Prepare application**
   ```bash
   # Create Dockerrun.aws.json
   # Configure environment variables
   ```

2. **Deploy**
   ```bash
   eb init
   eb create production
   eb deploy
   ```

### 3. Google Cloud Platform (GCP)

#### Using Cloud Run

1. **Build and push to Container Registry**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/climatelens-server ./server
   gcloud builds submit --tag gcr.io/PROJECT_ID/climatelens-client ./client
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy climatelens-server \
     --image gcr.io/PROJECT_ID/climatelens-server \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### 4. DigitalOcean App Platform

1. **Connect GitHub repository**
2. **Configure build settings**
3. **Set environment variables**
4. **Deploy automatically**

## 🔧 Environment Configuration

### Production Environment Variables

#### Server (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/climatelens
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Client Environment Variables
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

## 🔒 Security Considerations

### SSL/TLS Configuration
- Use HTTPS in production
- Configure SSL certificates
- Set up proper CORS policies
- Use environment variables for secrets

### Database Security
- Use MongoDB Atlas with IP whitelisting
- Enable authentication
- Use connection string with credentials
- Regular backups

### API Security
- Rate limiting
- Input validation
- JWT token expiration
- API key rotation

## 📊 Monitoring & Logging

### Health Checks
```bash
# Server health check
curl https://your-domain.com/api/health

# Expected response
{
  "status": "healthy",
  "database": "connected",
  "uptime": 3600,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Logging Setup
- Configure application logs
- Set up error tracking (Sentry)
- Monitor performance metrics
- Set up alerts for critical issues

### Monitoring Tools
- **Application Performance**: New Relic, DataDog
- **Error Tracking**: Sentry, Bugsnag
- **Uptime Monitoring**: Pingdom, UptimeRobot
- **Log Management**: LogRocket, Papertrail

## 🔄 CI/CD Pipeline

### GitHub Actions (Included)
- Automated testing on push/PR
- Security audits
- Docker image building
- Deployment to production

### Manual Deployment Steps
1. **Test locally**
   ```bash
   npm run validate
   npm test
   ```

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   # Use your preferred deployment method
   ```

## 🚨 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Test MongoDB connection
npm run test-atlas

# Check environment variables
npm run diagnose
```

#### API Issues
```bash
# Check API keys
npm run validate

# Test endpoints
curl https://your-domain.com/api/health
```

#### Build Issues
```bash
# Clear cache
npm run clean
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Performance Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries
- Use connection pooling

## 📱 Mobile Deployment

### Progressive Web App (PWA)
- Configure service worker
- Add web app manifest
- Enable offline functionality
- Implement push notifications

### Mobile App (Optional)
- Use React Native
- Deploy to App Store/Play Store
- Configure deep linking
- Implement native features

## 🔄 Updates & Maintenance

### Regular Tasks
- Update dependencies
- Monitor security vulnerabilities
- Backup database
- Review logs and metrics
- Update API keys if needed

### Deployment Rollback
```bash
# Docker rollback
docker-compose down
docker-compose up --build

# Heroku rollback
heroku rollback v123

# Manual rollback
git revert HEAD
git push origin main
```

## 📞 Support

For deployment issues:
- Check the troubleshooting section
- Review application logs
- Contact support team
- Create GitHub issue

---

**Happy Deploying! 🚀**
