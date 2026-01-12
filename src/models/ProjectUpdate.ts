import mongoose from 'mongoose';

const ProjectUpdateSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    updateDate: { type: Date, default: Date.now },
    taskTitle: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['TO_DO', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED'],
        default: 'IN_PROGRESS'
    },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    hoursSpent: Number,
}, { timestamps: true });

export default mongoose.models.ProjectUpdate || mongoose.model('ProjectUpdate', ProjectUpdateSchema);
