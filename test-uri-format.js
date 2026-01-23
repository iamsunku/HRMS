const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MONGODB_URI is not set in environment.');
    process.exit(1);
}

// Check if URI contains quotes or other weird stuff
if (uri.startsWith('"') || uri.endsWith('"')) {
    console.warn('WARNING: MONGODB_URI starts or ends with quotes. This might be the issue.');
}

async function test() {
    try {
        console.log('Attempting connection...');
        // Try stripping quotes just in case
        const cleanUri = uri.replace(/^"(.*)"$/, '$1');
        await mongoose.connect(cleanUri);
        console.log('SUCCESS: Connected with clean URI.');
    } catch (err) {
        console.error('FAILURE:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

test();
