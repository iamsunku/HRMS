import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true }, // e.g., 'Bangalore', 'Remote'
    type: {
        type: String,
        enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'],
        default: 'FULL_TIME'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'DRAFT', 'URGENT', 'CLOSED'],
        default: 'ACTIVE'
    },
    candidates: { type: Number, default: 0 },
    budget: { type: String }, // e.g., '25-35 LPA'
    manager: { type: String }, // Hiring Manager Name
    experience: { type: String },
    description: { type: String },
    requirements: { type: String },
    postedDate: { type: Date, default: Date.now },
    closingDate: { type: Date },
    iconColor: { type: String, default: 'bg-blue-600' }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
