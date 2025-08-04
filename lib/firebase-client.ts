// lib/firebase-client.ts - Updated with better error handling
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

console.log("🔧 Initializing Firebase Client SDK...");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration
const requiredFields = [
  'apiKey',
  'authDomain', 
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId'
];

console.log("🔍 Validating Firebase config:");
requiredFields.forEach(field => {
  const value = firebaseConfig[field as keyof typeof firebaseConfig];
  console.log(`${field}: ${value ? '✅ Present' : '❌ Missing'}`);
  if (!value) {
    console.error(`❌ Missing required Firebase config: ${field}`);
  }
});

let app;
let db;
let auth;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  console.log("✅ Firebase app initialized");
  
  db = getFirestore(app);
  console.log("✅ Firestore initialized");
  
  auth = getAuth(app);
  console.log("✅ Firebase Auth initialized");
  
} catch (error: any) {
  console.error("❌ Firebase Client SDK initialization failed:", error.message);
  console.error("Config used:", firebaseConfig);
  throw error;
}

export { app, db, auth };