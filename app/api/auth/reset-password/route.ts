import { NextRequest, NextResponse } from "next/server";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    await sendPasswordResetEmail(auth, email);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    let errorMessage = "An unexpected error occurred.";
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          // To avoid user enumeration, we can return a generic success message
          // Or a more specific error if we're not concerned about it.
          // For this case, we'll return success to prevent email enumeration.
          return NextResponse.json({ success: true }, { status: 200 });
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        default:
          errorMessage = 'An error occurred while sending the password reset email.';
          break;
      }
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
