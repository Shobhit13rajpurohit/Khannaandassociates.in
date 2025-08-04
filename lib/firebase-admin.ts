// lib/firebase-admin.ts - Updated with better error handling
import * as admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";

console.log("🔧 Initializing Firebase Admin SDK...");
console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("Client Email:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("Has Private Key:", !!process.env.FIREBASE_PRIVATE_KEY);
console.log("Storage Bucket:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

if (!admin.apps.length) {
  try {
    // Validate required environment variables
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing");
    }
    if (!process.env.FIREBASE_CLIENT_EMAIL) {
      throw new Error("FIREBASE_CLIENT_EMAIL is missing");
    }
    if (!process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error("FIREBASE_PRIVATE_KEY is missing");
    }

    // Handle both local and Vercel private key formats
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      // Replace literal \n with actual newlines (for local development)
      privateKey = privateKey.replace(/\\n/g, "\n");
    }
    
    // Validate private key format
    if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
      throw new Error("FIREBASE_PRIVATE_KEY appears to be malformed - missing header");
    }
    if (!privateKey.includes("-----END PRIVATE KEY-----")) {
      throw new Error("FIREBASE_PRIVATE_KEY appears to be malformed - missing footer");
    }

    console.log("🔑 Private key format validated");

    const credential = admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    });

    console.log("📋 Credential object created");

    admin.initializeApp({
      credential: credential,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

    console.log("✅ Firebase Admin SDK initialized successfully");

    // Test the connection
    admin.auth().listUsers(1)
      .then(() => console.log("✅ Admin Auth connection test successful"))
      .catch((error) => console.error("❌ Admin Auth connection test failed:", error.message));

  } catch (error: any) {
    console.error("❌ Firebase Admin SDK initialization failed:", error.message);
    console.error("Stack trace:", error.stack);
  }
} else {
  console.log("♻️  Firebase Admin SDK already initialized");
}

let adminAuth: admin.auth.Auth;
let adminDb: admin.firestore.Firestore;
let adminStorage: () => any;

try {
  adminAuth = admin.auth();
  adminDb = admin.firestore();
  adminStorage = () => getStorage(admin.app());
  console.log("✅ Admin services exported successfully");
} catch (error: any) {
  console.error("❌ Failed to export admin services:", error.message);
  throw error;
}

export { admin, adminAuth, adminDb, adminStorage };