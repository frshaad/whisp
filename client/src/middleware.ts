import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has('jwt');

  if (!hasToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
