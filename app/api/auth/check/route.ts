import { NextRequest, NextResponse } from "next/server";
// import { adminAuth } from "@/lib/firebase";
import { adminAuth } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return NextResponse.json({ success: true, user: decodedClaims }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid session" }, { status: 401 });
  }
}
