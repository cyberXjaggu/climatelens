const fs = require('fs');
const path = require('path');
require('dotenv').config();

const validateConfiguration = async () => {
  console.log('🔍 Validating ClimateLens Configuration...\n');
  
  let allValid = true;
  const issues = [];
  
  // Check if .env file exists
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found');
    console.log('💡 Run: npm run setup-env');
    return false;
  }
  
  console.log('✅ .env file found');
  
  // Validate MongoDB URI
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    issues.push('MONGODB_URI is missing');
    allValid = false;
  } else if (mongoUri.includes('your-username') || mongoUri.includes('your-password')) {
    issues.push('MONGODB_URI contains placeholder values');
    allValid = false;
  } else if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    issues.push('MONGODB_URI format is invalid');
    allValid = false;
  } else {
    console.log('✅ MongoDB URI configured');
  }
  
  // Validate API Keys
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey || geminiKey.includes('your-api-key') || geminiKey.length < 20) {
    issues.push('GEMINI_API_KEY is missing or invalid');
    allValid = false;
  } else {
    console.log('✅ Gemini API key configured');
  }
  
  const weatherKey = process.env.OPENWEATHER_API_KEY;
  if (!weatherKey || weatherKey.length < 20) {
    issues.push('OPENWEATHER_API_KEY is missing or invalid');
    allValid = false;
  } else {
    console.log('✅ OpenWeather API key configured');
  }
  
  // Validate Email Configuration
  const emailUser = process.env.EMAIL_HOST_USER;
  const emailPass = process.env.EMAIL_HOST_PASSWORD;
  
  if (!emailUser || emailUser.includes('your-email')) {
    issues.push('EMAIL_HOST_USER is missing or contains placeholder');
    allValid = false;
  } else if (!emailUser.includes('@')) {
    issues.push('EMAIL_HOST_USER is not a valid email format');
    allValid = false;
  } else {
    console.log('✅ Email user configured');
  }
  
  if (!emailPass || emailPass.includes('your-app-password') || emailPass.length < 8) {
    issues.push('EMAIL_HOST_PASSWORD is missing or invalid');
    allValid = false;
  } else {
    console.log('✅ Email password configured');
  }
  
  // Validate Port
  const port = process.env.PORT || 5000;
  if (isNaN(port) || port < 1000 || port > 65535) {
    issues.push('PORT is invalid');
    allValid = false;
  } else {
    console.log(`✅ Port configured: ${port}`);
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allValid) {
    console.log('🎉 All configurations are valid!');
    console.log('✅ Your ClimateLens server is ready to run');
    console.log('\n🚀 Next steps:');
    console.log('   1. npm run test-atlas  (test MongoDB connection)');
    console.log('   2. npm run init-db     (initialize database)');
    console.log('   3. npm start           (start the server)');
  } else {
    console.log('❌ Configuration issues found:');
    issues.forEach(issue => console.log(`   • ${issue}`));
    console.log('\n💡 Please fix these issues in your .env file');
    console.log('📖 Refer to QUICK_START.md for detailed setup instructions');
  }
  
  return allValid;
};

// Test API connectivity (optional)
const testAPIConnectivity = async () => {
  console.log('\n🌐 Testing API connectivity...');
  
  try {
    // Test OpenWeather API
    const weatherKey = process.env.OPENWEATHER_API_KEY;
    if (weatherKey && weatherKey.length > 20) {
      const fetch = require('node-fetch').default || require('node-fetch');
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherKey}`;
      
      try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
          console.log('✅ OpenWeather API connection successful');
        } else {
          console.log('⚠️  OpenWeather API key may be invalid');
        }
      } catch (error) {
        console.log('⚠️  Could not test OpenWeather API (network issue)');
      }
    }
  } catch (error) {
    console.log('⚠️  API connectivity test skipped (node-fetch not available)');
  }
};

validateConfiguration().then(isValid => {
  if (isValid) {
    testAPIConnectivity();
  }
  process.exit(isValid ? 0 : 1);
});
