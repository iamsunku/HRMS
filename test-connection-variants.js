const mongoose = require('mongoose');
require('dotenv').config();

let uri = process.env.MONGODB_URI;

async function test() {
    console.log('Original URI Length:', uri.length);

    // Attempt 1: As is
    try {
        console.log('Attempt 1: Connecting with raw URI...');
        await mongoose.connect(uri);
        console.log('SUCCESS!');
        return;
    } catch (e) {
        console.log('Attempt 1 Failed:', e.message);
    }

    // Attempt 2: Strip quotes and whitespace
    let cleanUri = uri.replace(/^["'](.*)["']$/, '$1').trim();
    console.log('Cleaned URI Length:', cleanUri.length);
    try {
        console.log('Attempt 2: Connecting with cleaned URI...');
        await mongoose.connect(cleanUri);
        console.log('SUCCESS!');
        return;
    } catch (e) {
        console.log('Attempt 2 Failed:', e.message);
    }

    // Attempt 3: Check for @ in password that isn't encoded
    if (cleanUri.includes('@', cleanUri.indexOf(':') + 1) && !cleanUri.includes('%40')) {
        console.log('Potential Issue: Unencoded @ detected in password.');
    }
}

test();
