const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('🔍 Testing MongoDB connection...');
  
  try {
    // Try to connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/climatelens', {
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solutions:');
      console.log('1. Start MongoDB service: net start MongoDB');
      console.log('2. Or start manually: mongod --dbpath "C:\\data\\db"');
      console.log('3. Make sure MongoDB is installed');
    }
  }
};

testConnection();
