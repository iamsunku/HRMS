import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Employee from '@/models/Employee';
import Department from '@/models/Department';
import ProjectUpdate from '@/models/ProjectUpdate';

export async function GET() {
    await dbConnect();

    try {
        // Clear existing projects to avoid duplicates during seeding
        await Project.deleteMany({});
        await ProjectUpdate.deleteMany({});

        // Get some employees and departments
        const employees = await Employee.find({});
        const departments = await Department.find({});

        if (employees.length === 0 || departments.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Please seed employees and departments first.'
            }, { status: 400 });
        }

        const projectData = [
            {
                name: 'KICCPA AI Portal',
                description: 'A comprehensive AI-driven portal for employee performance and resource tracking.',
                status: 'IN_PROGRESS',
                priority: 'HIGH',
                startDate: new Date(),
                deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
                departments: [departments[0]._id, departments[1]._id].filter(Boolean),
                teamMembers: employees.slice(0, 3).map(emp => ({ employeeId: emp._id, role: 'Developer' }))
            },
            {
                name: 'Financial System Audit',
                description: 'Annual internal audit for tax compliance and budget optimization.',
                status: 'PLANNING',
                priority: 'CRITICAL',
                startDate: new Date(),
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                departments: [departments[2]._id].filter(Boolean),
                teamMembers: employees.slice(3, 5).map(emp => ({ employeeId: emp._id, role: 'Auditor' }))
            }
        ];

        const createdProjects = await Project.insertMany(projectData);

        // Add some daily updates
        const updates = [
            {
                projectId: createdProjects[0]._id,
                departmentId: departments[0]._id,
                employeeId: employees[0]._id,
                taskTitle: 'API Foundation Setup',
                description: 'Implemented basic CRUD for the AI models and integrated with the main gateway.',
                status: 'COMPLETED',
                progress: 100,
                hoursSpent: 6
            },
            {
                projectId: createdProjects[0]._id,
                departmentId: departments[1]._id,
                employeeId: employees[1]._id,
                taskTitle: 'Frontend UI Mockups',
                description: 'Designing the dashboard interface for the AI portal using Figma and Tailwind.',
                status: 'IN_PROGRESS',
                progress: 45,
                hoursSpent: 12
            }
        ];

        await ProjectUpdate.insertMany(updates);

        return NextResponse.json({
            success: true,
            message: 'Project database seeded successfully',
            projects: createdProjects.length,
            updates: updates.length
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
