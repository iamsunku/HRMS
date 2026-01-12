import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
    try {
        const conn = await dbConnect();
        const state = conn.connection.readyState;
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        const statusMap = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];

        return NextResponse.json({
            success: true,
            status: statusMap[state],
            message: 'Backend is active and DB connection attempted.'
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
