import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const token = request.cookies.get("blogAuthToken")

  // If not authenticated and trying to access admin pages, redirect to login
  if (!token && request.nextUrl.pathname.startsWith("/blog/admin")) {
    return NextResponse.redirect(new URL("/blog/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/blog/admin/:path*",
}
