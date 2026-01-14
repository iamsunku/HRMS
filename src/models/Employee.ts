import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    employeeCode: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
    address: String,
    city: String,
    state: String,
    country: { type: String, default: 'India' },
    postalCode: String,

    // Employment Details
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    designation: { type: String, required: true },
    employmentType: {
        type: String,
        enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'],
        default: 'FULL_TIME',
    },
    joiningDate: { type: Date, required: true },
    exitDate: Date,
    status: {
        type: String,
        enum: ['ACTIVE', 'ON_LEAVE', 'RESIGNED', 'TERMINATED'],
        default: 'ACTIVE',
    },
    reportingTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },

    // Compensation
    currentSalary: Number,
    bankName: String,
    accountNumber: String,
    ifscCode: String,
    panNumber: String,
    aadharNumber: String,
}, { timestamps: true });

EmployeeSchema.index({ createdAt: -1 });

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
