import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase-client";
import { adminAuth } from "@/lib/firebase-admin";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req: NextRequest) {
  try {
    console.log("🔐 Login attempt started");
    
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid request format" }, 
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      console.error("❌ Missing email or password");
      return NextResponse.json(
        { success: false, error: "Email and password are required" }, 
        { status: 400 }
      );
    }

    console.log("📧 Attempting to sign in with email:", email);

    // Check if Firebase is properly initialized
    if (!auth) {
      console.error("❌ Firebase auth not initialized");
      return NextResponse.json(
        { success: false, error: "Authentication service unavailable" }, 
        { status: 500 }
      );
    }

    // Sign in with client SDK to verify password
    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Client SDK authentication successful");
    } catch (authError: any) {
      console.error("❌ Client SDK authentication failed:", authError.code, authError.message);
      
      let errorMessage = "An unexpected error occurred.";
      if (authError.code) {
        switch (authError.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials. Please check your email and password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your connection.';
            break;
          default:
            errorMessage = `Authentication error: ${authError.message}`;
            break;
        }
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage, code: authError.code }, 
        { status: 401 }
      );
    }

    const user = userCredential.user;
    console.log("👤 User authenticated:", user.uid);

    // Get ID token
    let idToken;
    try {
      idToken = await user.getIdToken();
      console.log("🎫 ID token obtained successfully");
    } catch (tokenError) {
      console.error("❌ Failed to get ID token:", tokenError);
      return NextResponse.json(
        { success: false, error: "Failed to generate authentication token" }, 
        { status: 500 }
      );
    }

    // Check if Admin SDK is properly initialized
    if (!adminAuth) {
      console.error("❌ Firebase Admin SDK not initialized");
      return NextResponse.json(
        { success: false, error: "Server authentication service unavailable" }, 
        { status: 500 }
      );
    }

    // Create session cookie with Admin SDK
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    let sessionCookie;
    try {
      sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
      console.log("🍪 Session cookie created successfully");
    } catch (sessionError) {
      console.error("❌ Failed to create session cookie:", sessionError);
      return NextResponse.json(
        { success: false, error: "Failed to create session" }, 
        { status: 500 }
      );
    }

    // Set cookie options
    const cookieOptions = {
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn / 1000, // maxAge expects seconds, not milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/'
    };

    console.log("🍪 Setting cookie with options:", {
      ...cookieOptions,
      value: `${sessionCookie.substring(0, 10)}...` // Don't log full cookie
    });

    const response = NextResponse.json(
      { 
        success: true, 
        user: { 
          uid: user.uid, 
          email: user.email,
          emailVerified: user.emailVerified 
        } 
      }, 
      { status: 200 }
    );
    
    response.cookies.set(cookieOptions);

    console.log("✅ Login successful for user:", user.uid);
    return response;

  } catch (error: any) {
    console.error("❌ Unexpected error in login route:", error);
    
    // Don't expose internal errors to client in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message 
      : "An unexpected error occurred during login";
      
    return NextResponse.json(
      { success: false, error: errorMessage }, 
      { status: 500 }
    );
  }
}
