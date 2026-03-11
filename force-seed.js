const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function forceSeed() {
    console.log('--- FORCED SYSTEM SEEDING ---');
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to Cluster.');

        // Simple Schema for seeding
        const userSchema = new mongoose.Schema({
            email: String,
            password: { type: String, required: true },
            role: String,
            firstName: String,
            lastName: String,
            isActive: { type: Boolean, default: true }
        }, { timestamps: true });

        const User = mongoose.models.User || mongoose.model('User', userSchema);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const usersToCreate = [
            { email: 'admin@kiccpa.com', role: 'SUPER_ADMIN', firstName: 'Super', lastName: 'Admin' },
            { email: 'hr@kiccpa.com', role: 'HR_MANAGER', firstName: 'Priya', lastName: 'Sharma' },
            { email: 'manager@kiccpa.com', role: 'DEPARTMENT_HEAD', firstName: 'Rahul', lastName: 'Verma' },
            { email: 'employee@kiccpa.com', role: 'EMPLOYEE', firstName: 'Amit', lastName: 'Kumar' }
        ];

        for (const userData of usersToCreate) {
            const exists = await User.findOne({ email: userData.email });
            if (!exists) {
                await User.create({
                    ...userData,
                    password: hashedPassword
                });
                console.log(`✅ Created: ${userData.email} (${userData.role})`);
            } else {
                console.log(`ℹ️ Exists: ${userData.email}`);
            }
        }

        console.log('--- SEEDING COMPLETE ---');
    } catch (err) {
        console.error('❌ SEEDING FAILED:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

forceSeed();
