const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment configuration...\n');

const envExamplePath = path.join(__dirname, '.env.example');
const envPath = path.join(__dirname, '.env');

try {
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    console.log('Please manually update it with your MongoDB Atlas credentials.\n');
    return;
  }

  // Copy .env.example to .env
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  fs.writeFileSync(envPath, envExample);
  
  console.log('✅ Created .env file from .env.example');
  console.log('\n📝 Please update the following in your .env file:');
  console.log('   1. MONGODB_URI - Replace with your MongoDB Atlas connection string');
  console.log('   2. GEMINI_API_KEY - Add your Google Gemini API key');
  console.log('   3. OPENWEATHER_API_KEY - Add your OpenWeather API key');
  console.log('   4. EMAIL_HOST_USER - Add your email for notifications');
  console.log('   5. EMAIL_HOST_PASSWORD - Add your email app password');
  console.log('\n🔗 Your MongoDB Atlas connection string should look like:');
  console.log('   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/climatelens?retryWrites=true&w=majority');
  console.log('\n⚡ After updating .env, run: npm run check-db');
  
} catch (error) {
  console.error('❌ Error setting up environment:', error.message);
}
