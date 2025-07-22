import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const path = request.nextUrl.searchParams.get("path")

  if (!path) {
    return NextResponse.json({ message: "Missing path" }, { status: 400 })
  }

  revalidatePath(path)

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
