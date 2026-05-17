import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // Redux persist might store token in localStorage, but middleware can't access that directly. Better to use cookies.

  // For simplicity, we'll check for a session cookie. But since we're using localStorage, we'll do client-side protection.
  // Actually, middleware is server-side. The token is stored in localStorage (client only). So middleware won't see it.
  // Alternative: Use a server-side session or cookie. For now, we'll do client-side protection in layout.
  
  // We'll implement client-side protection in the dashboard layout instead.
  return NextResponse.next();
}

// Optionally, protect routes that start with /dashboard, /company, /tenders (but tenders public, so exclude)
export const config = {
  matcher: ['/dashboard/:path*', '/company/:path*'],
};