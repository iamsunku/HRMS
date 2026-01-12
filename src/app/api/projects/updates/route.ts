import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ProjectUpdate from '@/models/ProjectUpdate';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const update = await ProjectUpdate.create(body);
        return NextResponse.json({ success: true, data: update }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
