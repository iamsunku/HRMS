import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Employee from '@/models/Employee';

export async function GET() {
    try {
        await dbConnect();
        const employees = await Employee.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: employees });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Auto-generate employee code if missing (Basic example logic)
        if (!body.employeeCode) {
            const count = await Employee.countDocuments();
            body.employeeCode = `EMP${String(count + 1).padStart(5, '0')}`;
        }

        const employee = await Employee.create(body);
        return NextResponse.json({ success: true, data: employee }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
