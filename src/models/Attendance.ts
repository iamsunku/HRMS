import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    checkIn: Date,
    checkOut: Date,
    breakStart: Date,
    breakEnd: Date,
    workingHours: Number,
    status: {
        type: String,
        enum: ['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'ON_LEAVE', 'HOLIDAY'],
        default: 'PRESENT',
    },
    remarks: String,
}, { timestamps: true });

// Compound index for unique employee daily attendance
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
