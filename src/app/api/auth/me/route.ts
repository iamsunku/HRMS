import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Employee from '@/models/Employee';

export async function GET() {
    try {
        await dbConnect();
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
        }

        const decoded: any = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
        }

        // Fetch user details
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // If linked to an employee, fetch employee name
        let firstName = user.firstName || 'User';
        let lastName = user.lastName || '';

        if (user.employeeId) {
            const employee = await Employee.findById(user.employeeId).select('firstName lastName');
            if (employee) {
                firstName = employee.firstName;
                lastName = employee.lastName;
            }
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName,
                lastName
            }
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
