import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = new Set(['/login', '/signup']);

export function middleware(request: NextRequest) {
  const token = request.cookies.has('jwt');
  const isPublicPath = PUBLIC_PATHS.has(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure the matcher to apply the middleware only to protected pages
export const config = {
  matcher: ['/((?!_next|api|login|signup).*)'], // Matches all routes except login/register, _next/static, and API
};
