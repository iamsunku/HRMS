const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function testConnection() {
    const uri = process.env.MONGODB_URI;

    console.log('--- MongoDB Connection Test ---');

    if (!uri) {
        console.error('❌ Error: MONGODB_URI is not defined in .env file');
        process.exit(1);
    }

    console.log(`Attempting to connect to: ${uri.replace(/:([^:@]+)@/, ':****@')} ...`);

    try {
        await mongoose.connect(uri);
        console.log('✅ Success! Connected to MongoDB.');
        console.log('State:', mongoose.connection.readyState); // 1 = connected
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection Failed:');
        console.error(error.message);
        process.exit(1);
    }
}

testConnection();
