import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD'],
        default: 'PLANNING'
    },
    startDate: { type: Date, required: true },
    endDate: Date,
    client: String,
    budget: Number,
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'MEDIUM'
    },
    teamMembers: [{
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
        role: String
    }],
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }]
}, { timestamps: true });

ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ status: 1 });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
