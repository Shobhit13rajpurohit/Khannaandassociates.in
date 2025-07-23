import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // No authentication required - allow all requests
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/blog/admin/:path*",
}