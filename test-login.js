const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://theiamsunku:O1u00Uqj8M4O3m50@cluster0.k5vye.mongodb.net/HRM_KICCPA?retryWrites=true&w=majority';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function test() {
    try {
        await mongoose.connect(MONGODB_URI);
        const user = await User.findOne({ email: 'admin@kiccpa.com' });

        if (!user) {
            console.log('USER_NOT_FOUND');
        } else {
            const isMatch = await bcrypt.compare('password123', user.password);
            console.log('PASSWORD_MATCH:', isMatch);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

test();
