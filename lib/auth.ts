import { auth, adminAuth, adminDb } from "./firebase"
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
}

// Sign in function
export async function signIn(
  email: string,
  password: string
): Promise<{ user: User; adminData: { role: string; created_at: string } }> {
  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Get admin user from Firestore
    const adminUserDoc = await adminDb
      .collection("admin_users")
      .doc(user.uid)
      .get()

    if (!adminUserDoc.exists) {
      throw new Error("Invalid email or password")
    }

    const adminData = adminUserDoc.data() as {
      role: string
      created_at: string
    }

    return {
      user,
      adminData,
    }
  } catch (error) {
    console.error("Sign in error:", error)
    throw error // Re-throw the error to be caught by the API route
  }
}

// Get current admin user by validating the access token
export async function getAdminUser(
  accessToken: string | undefined
): Promise<AdminUser | null> {
  try {
    if (!accessToken) {
      return null
    }

    const decodedToken = await adminAuth.verifyIdToken(accessToken)
    const uid = decodedToken.uid

    const adminUserDoc = await adminDb.collection("admin_users").doc(uid).get()

    if (!adminUserDoc.exists) {
      return null
    }

    const adminUserData = adminUserDoc.data() as {
      email: string
      role: string
      created_at: string
    }

    return {
      id: uid,
      email: adminUserData.email,
      role: adminUserData.role,
      created_at: adminUserData.created_at,
    }
  } catch (error) {
    console.error("Get admin user error:", error)
    return null
  }
}

// Sign out function
export async function signOut(): Promise<void> {
  try {
    const cookieStore = cookies()

    // Clear cookies
    cookieStore.delete("fb-access-token")

    // Sign out from Firebase
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}

// Middleware helper to check authentication
export async function checkAuth(
  request: NextRequest
): Promise<AdminUser | null> {
  try {
    const accessToken = request.cookies.get("fb-access-token")?.value

    if (!accessToken) {
      return null
    }

    const decodedToken = await adminAuth.verifyIdToken(accessToken)
    const uid = decodedToken.uid

    const adminUserDoc = await adminDb.collection("admin_users").doc(uid).get()

    if (!adminUserDoc.exists) {
      return null
    }

    const adminUserData = adminUserDoc.data() as {
      email: string
      role: string
      created_at: string
    }

    return {
      id: uid,
      email: adminUserData.email,
      role: adminUserData.role,
      created_at: adminUserData.created_at,
    }
  } catch (error) {
    console.error("Check auth error:", error)
    return null
  }
}
