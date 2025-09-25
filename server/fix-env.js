const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing .env file MongoDB URI...\n');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found');
  console.log('💡 Run: npm run setup-env first');
  process.exit(1);
}

try {
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Fix double @@ issue in MongoDB URI
  const originalUri = envContent.match(/MONGODB_URI=(.+)/);
  if (originalUri && originalUri[1].includes('@@')) {
    console.log('🔍 Found double @@ in MongoDB URI, fixing...');
    
    const fixedUri = originalUri[1].replace('@@', '@');
    envContent = envContent.replace(originalUri[1], fixedUri);
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Fixed MongoDB URI in .env file');
    console.log(`📝 Updated URI: ${fixedUri}`);
  } else {
    console.log('✅ MongoDB URI looks correct');
  }
  
  console.log('\n🚀 Now try running: npm run test-atlas');
  
} catch (error) {
  console.error('❌ Error fixing .env file:', error.message);
}
