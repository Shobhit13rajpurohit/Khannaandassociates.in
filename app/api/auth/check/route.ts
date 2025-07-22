import { NextResponse } from "next/server"
import { getAdminUser } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('fb-access-token')?.value

    const user = await getAdminUser(accessToken)

    if (user) {
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      })
    } else {
      return NextResponse.json(
        { success: false, user: null },
        { status: 401 }
      )
    }
  } catch (error: any) {
    console.error('Auth check API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || "Authentication check failed" },
      { status: 500 }
    )
  }
}
