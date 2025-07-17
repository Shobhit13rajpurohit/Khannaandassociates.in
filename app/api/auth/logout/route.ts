import { NextResponse } from "next/server"
import { signOut } from "@/lib/auth"

export async function POST() {
  try {
    await signOut()
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || "Logout failed" },
      { status: 500 }
    )
  }
}