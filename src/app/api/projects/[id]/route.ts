import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import ProjectUpdate from '@/models/ProjectUpdate';

import { cacheGet, cacheSet, cacheDelPrefix } from '@/lib/cache';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        const cacheKey = `project:${id}`;
        const cached = await cacheGet(cacheKey);
        if (cached) {
            const payload = JSON.parse(cached);
            return NextResponse.json({ success: true, data: payload });
        }

        const project = await Project.findById(id).populate('teamMembers.employeeId departments');
        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }

        const updates = await ProjectUpdate.find({ projectId: id })
            .populate('employeeId departmentId')
            .sort({ updateDate: -1 });

        const payload = {
            ...project.toObject(),
            updates
        };

        await cacheSet(cacheKey, JSON.stringify(payload), 120);

        return NextResponse.json({
            success: true,
            data: payload
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const project = await Project.findByIdAndUpdate(id, body, { new: true });
        // Invalidate project and projects lists
        await cacheDelPrefix(`project:${id}`);
        await cacheDelPrefix('projects:');
        return NextResponse.json({ success: true, data: project });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
