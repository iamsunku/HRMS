import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Employee from '@/models/Employee';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
    await dbConnect();

    // Protect seeding with a secret. Set SEED_SECRET in your environment and pass it as 'x-seed-secret' header.
    const seedSecret = process.env.SEED_SECRET;
    if (!seedSecret) {
        return NextResponse.json({ success: false, error: 'Seeding disabled (no SEED_SECRET configured).' }, { status: 403 });
    }

    const provided = request.headers.get('x-seed-secret') || '';
    if (provided !== seedSecret) {
        return NextResponse.json({ success: false, error: 'Forbidden: invalid seed secret.' }, { status: 403 });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const roles = [
            {
                firstName: 'Super',
                lastName: 'Admin',
                email: 'admin@kiccpa.com',
                role: 'SUPER_ADMIN',
                designation: 'Chief Executive Officer',
                dept: 'Executive'
            },
            {
                firstName: 'Priya',
                lastName: 'Sharma',
                email: 'hr@kiccpa.com',
                role: 'HR_MANAGER',
                designation: 'HR Manager',
                dept: 'Human Resources'
            },
            {
                firstName: 'Rahul',
                lastName: 'Verma',
                email: 'manager@kiccpa.com',
                role: 'DEPARTMENT_HEAD',
                designation: 'Tech Lead',
                dept: 'Engineering'
            },
            {
                firstName: 'Amit',
                lastName: 'Kumar',
                email: 'employee@kiccpa.com',
                role: 'EMPLOYEE',
                designation: 'Software Engineer',
                dept: 'Engineering'
            }
        ];

        const results = [];

        for (const userData of roles) {
            // 1. Create or Update Employee Record
            let employee = await Employee.findOne({ email: userData.email });
            if (!employee) {
                const count = await Employee.countDocuments();
                const employeeCode = `EMP${String(count + 1).padStart(3, '0')}`;

                employee = await Employee.create({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    employeeCode,
                    designation: userData.designation,
                    department: null, // Simplified for seed
                    joiningDate: new Date(),
                    status: 'ACTIVE',
                    currentSalary: 50000 + Math.random() * 50000,
                });
            }

            // 2. Create or Update User Login
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                await User.create({
                    email: userData.email,
                    password: hashedPassword,
                    role: userData.role,
                    employeeId: employee._id,
                    firstName: userData.firstName,
                    lastName: userData.lastName
                });
                results.push(`Created user: ${userData.email} (${userData.role})`);
            } else {
                results.push(`User already exists: ${userData.email}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            created: results
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
