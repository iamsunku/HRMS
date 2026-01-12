import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === '/login' || path === '/api/auth/login' || path === '/api/auth/register' || path === '/api/health';

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        // If user is already logged in and tries to access login, redirect to dashboard
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
        // If user is not logged in and tries to access protected route, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// Config to match all paths except static files, images, etc.
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};
