import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: String,
    headId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    budget: Number,
}, { timestamps: true });

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
