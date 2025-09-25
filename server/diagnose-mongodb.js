require('dotenv').config();

const diagnoseMongoDB = () => {
  console.log('🔍 MongoDB Atlas Connection Diagnosis\n');
  
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.log('❌ MONGODB_URI not found in .env file');
    return;
  }
  
  console.log('📋 Connection String Analysis:');
  console.log('Raw URI:', mongoUri);
  console.log('');
  
  // Parse the connection string
  try {
    const url = new URL(mongoUri);
    
    console.log('🔗 Parsed Connection Details:');
    console.log('Protocol:', url.protocol);
    console.log('Username:', url.username || 'NOT SET');
    console.log('Password:', url.password ? '***HIDDEN***' : 'NOT SET');
    console.log('Host:', url.hostname);
    console.log('Database:', url.pathname.substring(1) || 'NOT SPECIFIED');
    console.log('');
    
    // Check for common issues
    console.log('🚨 Common Issues Check:');
    
    if (!url.username) {
      console.log('❌ Username is missing from connection string');
    } else {
      console.log('✅ Username is present');
    }
    
    if (!url.password) {
      console.log('❌ Password is missing from connection string');
    } else {
      console.log('✅ Password is present');
    }
    
    if (!url.pathname || url.pathname === '/') {
      console.log('⚠️  Database name not specified in connection string');
    } else {
      console.log('✅ Database name specified:', url.pathname.substring(1));
    }
    
    // Check for special characters that need encoding
    if (url.username && (url.username.includes('@') || url.username.includes(':') || url.username.includes('/'))) {
      console.log('⚠️  Username contains special characters that may need URL encoding');
    }
    
    if (url.password && (url.password.includes('@') || url.password.includes(':') || url.password.includes('/'))) {
      console.log('⚠️  Password contains special characters that may need URL encoding');
    }
    
    console.log('\n💡 Next Steps:');
    console.log('1. Verify these credentials in your MongoDB Atlas dashboard');
    console.log('2. Check Database Access → Database Users');
    console.log('3. Ensure the user has "readWrite" permissions');
    console.log('4. Check Network Access → IP Access List');
    console.log('5. Try adding 0.0.0.0/0 to IP whitelist for testing');
    
  } catch (error) {
    console.log('❌ Invalid connection string format:', error.message);
    console.log('\n📝 Expected format:');
    console.log('mongodb+srv://username:password@cluster.mongodb.net/database?options');
  }
};

diagnoseMongoDB();
