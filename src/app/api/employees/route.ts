import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Employee from '@/models/Employee';
import { cacheGet, cacheSet, cacheDelPrefix } from '@/lib/cache';

export async function GET(request: Request) {
    try {
        await dbConnect();

        const url = new URL(request.url);
        const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
        let limit = parseInt(url.searchParams.get('limit') || '25', 10);
        limit = Math.min(Math.max(1, limit), 100); // cap limit between 1 and 100

        const query: any = {};
        const skip = (page - 1) * limit;

        const cacheKey = `employees:page:${page}:limit:${limit}`;
        const cached = await cacheGet(cacheKey);
        if (cached) {
            const payload = JSON.parse(cached);
            return NextResponse.json({ success: true, data: payload.data, meta: payload.meta });
        }

        const [data, total] = await Promise.all([
            Employee.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Employee.countDocuments(query),
        ]);

        const totalPages = Math.max(1, Math.ceil(total / limit));

        const meta = { total, page, limit, totalPages };
        await cacheSet(cacheKey, JSON.stringify({ data, meta }), 60);

        return NextResponse.json({ success: true, data, meta });
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
        // Invalidate employees cache pages
        await cacheDelPrefix('employees:');

        return NextResponse.json({ success: true, data: employee }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
