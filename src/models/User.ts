import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'],
        default: 'EMPLOYEE',
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLoginAt: Date,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
