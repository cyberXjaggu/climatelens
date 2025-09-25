const mongoose = require('mongoose');
require('dotenv').config();

const testAtlasConnection = async () => {
  console.log('🌐 Testing MongoDB Atlas connection...');
  console.log('📍 Connection URI:', process.env.MONGODB_URI ? 'Found in .env' : 'Missing in .env');
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env file');
    console.log('💡 Please update your .env file with the Atlas connection string');
    return;
  }
  
  // Hide sensitive parts of the URI for logging
  const safeUri = process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@');
  console.log('🔗 Connecting to:', safeUri);
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout for Atlas
      socketTimeoutMS: 45000, // 45 second socket timeout
    });
    
    console.log('✅ MongoDB Atlas connection successful!');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
    console.log('🌍 Connected to Atlas cluster');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.length > 0 ? collections.map(c => c.name) : 'No collections yet');
    
    // Test write operation
    const testCollection = mongoose.connection.db.collection('connection_test');
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Atlas connection test successful' 
    });
    console.log('✅ Write test successful');
    
    // Clean up test document
    await testCollection.deleteOne({ test: true });
    console.log('✅ Cleanup successful');
    
    await mongoose.disconnect();
    console.log('✅ Atlas connection test completed successfully');
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Authentication Solutions:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Make sure the database user exists in Atlas');
      console.log('3. Verify the user has proper permissions');
    } else if (error.message.includes('IP not in whitelist')) {
      console.log('\n💡 Network Access Solutions:');
      console.log('1. Add your IP address to Atlas Network Access');
      console.log('2. Or allow access from anywhere (0.0.0.0/0)');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 DNS/Connection Solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the cluster URL is correct');
      console.log('3. Make sure the cluster is running');
    }
    
    console.log('\n🔧 General troubleshooting:');
    console.log('1. Double-check your connection string format');
    console.log('2. Ensure your cluster is active in Atlas dashboard');
    console.log('3. Try connecting from Atlas dashboard first');
  }
};

testAtlasConnection();
