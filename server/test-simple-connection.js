const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing MongoDB Atlas Connection (Simple Test)...\n');
  
  const uri = process.env.MONGODB_URI;
  console.log('Using URI:', uri.replace(/:([^:@]{8})[^:@]*@/, ':****@')); // Hide password
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });

  try {
    console.log('🔌 Attempting to connect...');
    await client.connect();
    
    console.log('✅ Connection successful!');
    
    // Test database access
    const db = client.db('climatelens');
    const collections = await db.listCollections().toArray();
    
    console.log('📊 Database access successful');
    console.log('📁 Collections found:', collections.length);
    
    // Try to create a test document
    const testCollection = db.collection('connection_test');
    const result = await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Connection test successful'
    });
    
    console.log('✅ Write test successful, inserted ID:', result.insertedId);
    
    // Clean up
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Cleanup successful');
    
    console.log('\n🎉 All tests passed! MongoDB Atlas is working correctly.');
    console.log('The issue might be with Mongoose connection options.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n🚨 AUTHENTICATION ERROR - Solutions:');
      console.log('1. Go to MongoDB Atlas → Database Access');
      console.log('2. Check if user "climatelens" exists');
      console.log('3. If exists, click "Edit" and reset the password');
      console.log('4. If not exists, create new user:');
      console.log('   - Username: climatelens');
      console.log('   - Password: climatelens123');
      console.log('   - Role: Read and write to any database');
      console.log('5. Update your .env file with the correct password');
    } else if (error.message.includes('IP not authorized')) {
      console.log('\n🚨 IP ACCESS ERROR - Solutions:');
      console.log('1. Go to MongoDB Atlas → Network Access');
      console.log('2. Click "Add IP Address"');
      console.log('3. Select "Allow access from anywhere" (0.0.0.0/0)');
      console.log('4. Or add your specific IP address');
    } else if (error.message.includes('timeout')) {
      console.log('\n🚨 NETWORK ERROR - Solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Try using a VPN');
      console.log('3. Check if your firewall is blocking the connection');
    }
    
  } finally {
    await client.close();
  }
}

testConnection();
