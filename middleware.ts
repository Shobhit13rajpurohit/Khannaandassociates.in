import { NextResponse, type NextRequest } from 'next/server'
import { adminAuth } from './lib/firebase-admin'

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split('Bearer ')[1]

  // If no token, return 401 for protected API routes
  if (!token) {
    if (request.nextUrl.pathname.startsWith('/api/admin/')) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    // For non-API admin routes, redirect to login
    if (request.nextUrl.pathname.startsWith('/admin/')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  // Verify the token. If invalid, return 401.
  try {
    await adminAuth.verifyIdToken(token)
  } catch (error) {
    console.error("Error verifying token in middleware:", error)
    if (request.nextUrl.pathname.startsWith('/api/admin/')) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    if (request.nextUrl.pathname.startsWith('/admin/')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // Matcher to specify which routes the middleware should run on
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
