const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Manually load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const envConfig = envFile.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  // Initialize Firebase Admin SDK
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: envConfig.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: envConfig.FIREBASE_CLIENT_EMAIL,
        privateKey: envConfig.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }
} else {
  console.error(".env.local file not found. Please ensure it's in the root directory.");
  process.exit(1);
}


async function migrateLocations() {
  console.log("Starting location migration...");

  const adminDb = admin.firestore();
  const locationsRef = adminDb.collection('locations');
  const snapshot = await locationsRef.get();

  if (snapshot.empty) {
    console.log('No locations found.');
    return;
  }

  const batch = adminDb.batch();
  snapshot.docs.forEach(doc => {
    const location = doc.data();
    if (!location.slug && location.name) {
      const slug = location.name.toLowerCase().replace(/\s+/g, '-');
      const locationRef = locationsRef.doc(doc.id);
      batch.update(locationRef, { slug });
      console.log(`Updating location ${doc.id} with slug: ${slug}`);
    }
  });

  await batch.commit();
  console.log("Location migration finished.");
}

migrateLocations().then(() => {
  process.exit(0);
}).catch(error => {
  console.error("Migration failed:", error);
  process.exit(1);
});
