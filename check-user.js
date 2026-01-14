const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://theiamsunku:O1u00Uqj8M4O3m50@cluster0.k5vye.mongodb.net/HRM_KICCPA?retryWrites=true&w=majority';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function test() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');
        const user = await User.findOne({ email: 'admin@kiccpa.com' });

        if (!user) {
            console.log('RESULT: USER_NOT_FOUND');
        } else {
            console.log('RESULT: USER_EXISTS');
            console.log('EMAIL:', user.email);
        }
    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

test();
