const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

async function checkConnection() {
    console.log('Testing URI:', uri ? uri.replace(/:([^@]+)@/, ':****@') : 'MISSING');
    try {
        await mongoose.connect(uri);
        console.log('SUCCESS: Connected to MongoDB.');

        const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({}));
        const count = await User.countDocuments();
        console.log('User Count in DB:', count);

        if (count === 0) {
            console.log('WARNING: No users found in database. You need to SEED the database.');
        }
    } catch (err) {
        console.error('FAILURE: Could not connect to MongoDB.');
        console.error('Error Details:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

checkConnection();
