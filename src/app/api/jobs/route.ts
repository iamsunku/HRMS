import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);

        const query: any = {};

        // Basic filtering
        const department = searchParams.get('department');
        if (department) query.department = department;

        const status = searchParams.get('status');
        if (status) query.status = status;

        const search = searchParams.get('search');
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: jobs });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Add random icon color if not provided
        const colors = ['bg-blue-600', 'bg-purple-600', 'bg-pink-600', 'bg-orange-600', 'bg-indigo-600', 'bg-emerald-600'];
        if (!body.iconColor) {
            body.iconColor = colors[Math.floor(Math.random() * colors.length)];
        }

        const job = await Job.create(body);
        return NextResponse.json({ success: true, data: job }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
