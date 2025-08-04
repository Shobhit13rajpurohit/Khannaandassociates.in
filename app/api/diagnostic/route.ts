// api/diagnostic/route.ts - Create this route to diagnose the issue
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    errors: [],
    warnings: []
  };

  try {
    // Check environment variables
    console.log("🔍 Checking environment variables...");
    
    const requiredEnvVars = [
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID',
      'FIREBASE_PRIVATE_KEY',
      'FIREBASE_CLIENT_EMAIL'
    ];

    diagnostics.envVars = {};
    requiredEnvVars.forEach(envVar => {
      const value = process.env[envVar];
      diagnostics.envVars[envVar] = {
        present: !!value,
        length: value?.length || 0,
        startsCorrectly: envVar === 'FIREBASE_PRIVATE_KEY' 
          ? value?.includes('-----BEGIN PRIVATE KEY-----') 
          : true
      };

      if (!value) {
        diagnostics.errors.push(`Missing environment variable: ${envVar}`);
      }
    });

    // Test Firebase Client SDK
    console.log("🔍 Testing Firebase Client SDK...");
    try {
      const { auth } = await import("@/lib/firebase-client");
      diagnostics.clientSDK = {
        initialized: !!auth,
        appName: auth?.app?.name || null,
        config: auth?.config || null
      };
      console.log("✅ Client SDK check passed");
    } catch (clientError: any) {
      diagnostics.errors.push(`Client SDK Error: ${clientError.message}`);
      console.error("❌ Client SDK Error:", clientError);
    }

    // Test Firebase Admin SDK
    console.log("🔍 Testing Firebase Admin SDK...");
    try {
      const { adminAuth, admin } = await import("@/lib/firebase-admin");
      
      diagnostics.adminSDK = {
        initialized: !!adminAuth,
        appsLength: admin.apps.length,
        projectId: admin.apps[0]?.options?.projectId || null
      };

      // Test admin auth connection
      try {
        await adminAuth.listUsers(1);
        diagnostics.adminSDK.connectionTest = "SUCCESS";
        console.log("✅ Admin SDK connection test passed");
      } catch (connError: any) {
        diagnostics.adminSDK.connectionTest = `FAILED: ${connError.message}`;
        diagnostics.errors.push(`Admin SDK Connection Error: ${connError.message}`);
        console.error("❌ Admin SDK Connection Error:", connError);
      }

    } catch (adminError: any) {
      diagnostics.errors.push(`Admin SDK Error: ${adminError.message}`);
      console.error("❌ Admin SDK Error:", adminError);
    }

    // Check private key format in detail
    if (process.env.FIREBASE_PRIVATE_KEY) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY;
      diagnostics.privateKeyAnalysis = {
        hasBeginMarker: privateKey.includes('-----BEGIN PRIVATE KEY-----'),
        hasEndMarker: privateKey.includes('-----END PRIVATE KEY-----'),
        hasNewlines: privateKey.includes('\\n'),
        totalLength: privateKey.length,
        startsWithQuote: privateKey.startsWith('"'),
        endsWithQuote: privateKey.endsWith('"')
      };

      if (!diagnostics.privateKeyAnalysis.hasBeginMarker || !diagnostics.privateKeyAnalysis.hasEndMarker) {
        diagnostics.errors.push("Private key format appears incorrect");
      }
    }

    // Summary
    diagnostics.summary = {
      totalErrors: diagnostics.errors.length,
      totalWarnings: diagnostics.warnings.length,
      overallStatus: diagnostics.errors.length === 0 ? "HEALTHY" : "ISSUES_FOUND"
    };

    console.log("📊 Diagnostic Summary:", diagnostics.summary);

    return NextResponse.json(diagnostics, { 
      status: diagnostics.errors.length === 0 ? 200 : 500 
    });

  } catch (error: any) {
    console.error("❌ Diagnostic route error:", error);
    
    return NextResponse.json({
      success: false,
      error: "Diagnostic failed",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}