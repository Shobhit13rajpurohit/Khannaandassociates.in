import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split('Bearer ')[1]

  const verificationUrl = new URL('/api/auth/verify-token', request.url)

  const handleUnauthorized = () => {
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

  if (!token) {
    return handleUnauthorized()
  }

  try {
    const response = await fetch(verificationUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    if (!response.ok) {
      return handleUnauthorized()
    }

    const data = await response.json()

    if (!data.success) {
      return handleUnauthorized()
    }
  } catch (error) {
    console.error('Error verifying token in middleware:', error)
    return handleUnauthorized()
  }

  return NextResponse.next()
}

export const config = {
  // Matcher to specify which routes the middleware should run on
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
