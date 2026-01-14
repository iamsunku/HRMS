import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { cacheGet, cacheSet, cacheDelPrefix } from '@/lib/cache';

export async function GET(request: Request) {
    try {
        await dbConnect();

        const url = new URL(request.url);
        const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
        let limit = parseInt(url.searchParams.get('limit') || '25', 10);
        limit = Math.min(Math.max(1, limit), 100);
        const skip = (page - 1) * limit;

        const cacheKey = `projects:page:${page}:limit:${limit}`;
        const cached = await cacheGet(cacheKey);
        if (cached) {
            const payload = JSON.parse(cached);
            return NextResponse.json({ success: true, data: payload.data, meta: payload.meta });
        }

        const [data, total] = await Promise.all([
            Project.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Project.countDocuments({}),
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
        const project = await Project.create(body);
        // Invalidate projects cache
        await cacheDelPrefix('projects:');
        return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
