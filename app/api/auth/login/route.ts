import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/firebase-client";
import { adminAuth } from "@/lib/firebase-admin";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Sign in with client SDK to verify password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    // Create session cookie with Admin SDK
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const options = {
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json({ success: true, user: { uid: user.uid, email: user.email } }, { status: 200 });
    response.cookies.set(options);

    return response;
  } catch (error: any) {
    let errorMessage = "An unexpected error occurred.";
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid credentials. Please check your email and password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        default:
          errorMessage = 'An error occurred during login. Please try again.';
          break;
      }
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 401 });
  }
}
