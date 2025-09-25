const mongoose = require('mongoose');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/climatelens';
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5
    };
    
    await mongoose.connect(mongoUri, options);
    console.log('✅ Database connection successful');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Database check completed');
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  }
};

checkDatabase();