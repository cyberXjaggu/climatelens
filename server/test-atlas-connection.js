const mongoose = require('mongoose');
require('dotenv').config();

const testAtlasConnection = async () => {
  console.log('🔍 Testing MongoDB Atlas connection...\n');
  
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.error('❌ MONGODB_URI not found in .env file');
    console.log('💡 Please run: npm run setup-env');
    process.exit(1);
  }
  
  if (mongoUri.includes('your-username') || mongoUri.includes('your-password')) {
    console.error('❌ Please update MONGODB_URI in .env with your actual credentials');
    console.log('🔗 Format: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/climatelens?retryWrites=true&w=majority');
    process.exit(1);
  }
  
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    // Set connection options for better error handling
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      minPoolSize: 5
    };
    
    await mongoose.connect(mongoUri, options);
    console.log('✅ MongoDB Atlas connection successful!');
    
    // Test database operations
    console.log('📊 Testing database operations...');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📁 Found ${collections.length} collections:`, collections.map(c => c.name));
    
    // Test write operation
    const testCollection = db.collection('connection_test');
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Connection test successful' 
    });
    console.log('✅ Write operation successful');
    
    // Test read operation
    const testDoc = await testCollection.findOne({ test: true });
    console.log('✅ Read operation successful');
    
    // Clean up test document
    await testCollection.deleteOne({ test: true });
    console.log('✅ Cleanup successful');
    
    await mongoose.disconnect();
    console.log('\n🎉 All tests passed! Your MongoDB Atlas connection is working perfectly.');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Authentication Error Solutions:');
      console.log('   1. Check your username and password in the connection string');
      console.log('   2. Ensure your database user has proper permissions');
      console.log('   3. Verify the database name in your connection string');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('\n💡 Network Error Solutions:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify your IP address is whitelisted in MongoDB Atlas');
      console.log('   3. Try adding 0.0.0.0/0 to Network Access for testing');
    } else if (error.message.includes('MongoServerSelectionError')) {
      console.log('\n💡 Server Selection Error Solutions:');
      console.log('   1. Ensure your MongoDB Atlas cluster is running');
      console.log('   2. Check the cluster URL in your connection string');
      console.log('   3. Verify your cluster region and availability');
    }
    
    process.exit(1);
  }
};

testAtlasConnection();
