const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Manually load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
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

const locationsData = [
    {
      name: "Delhi",
      address: "123 Legal Avenue, Connaught Place, New Delhi, India, 110001",
      city: "New Delhi",
      country: "India",
      contact_info: "+91 11 2345 6789",
      map_link: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
    },
    {
      name: "Mumbai",
      address: "456 Financial Tower, Bandra Kurla Complex, Mumbai, India, 400051",
      city: "Mumbai",
      country: "India",
      contact_info: "+91 22 7654 3210",
      map_link: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070",
    },
    {
      name: "Bangalore",
      address: "789 Tech Park, Koramangala, Bangalore, India, 560034",
      city: "Bangalore",
      country: "India",
      contact_info: "+91 80 1234 5678",
      map_link: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2148",
    },
    {
      name: "Chennai",
      address: "101 Marina Drive, Mylapore, Chennai, India, 600004",
      city: "Chennai",
      country: "India",
      contact_info: "+91 44 9876 5432",
      map_link: "https://images.unsplash.com/photo-1603262531080-9f24006f219f?q=80&w=2070",
    },
    {
      name: "Dehradun",
      address: "202 Valley View, Rajpur Road, Dehradun, India, 248001",
      city: "Dehradun",
      country: "India",
      contact_info: "+91 135 1122 3344",
      map_link: "https://images.unsplash.com/photo-1596727147130-e2014f0f8e5d?q=80&w=2070",
    },
    {
      name: "Jaipur",
      address: "303 Pink City Chambers, C-Scheme, Jaipur, India, 302001",
      city: "Jaipur",
      country: "India",
      contact_info: "+91 141 5566 7788",
      map_link: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
    },
    {
      name: "New York",
      address: "100 Wall Street, New York, NY 10005, USA",
      city: "New York",
      country: "USA",
      contact_info: "+1 212 555 1234",
      map_link: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070",
    },
  ]

async function migrateLocations() {
  console.log("Starting location migration...");

  const adminDb = admin.firestore();

  for (const location of locationsData) {
    try {
      const slug = location.name.toLowerCase().replace(/\s+/g, "-");
      const newLocation = {
        ...location,
        slug,
        created_at: admin.firestore.Timestamp.now(),
        updated_at: admin.firestore.Timestamp.now(),
      };
      await adminDb.collection("locations").add(newLocation);
      console.log(`Successfully migrated ${location.name}`);
    } catch (error) {
      console.error(`Error migrating ${location.name}:`, error);
    }
  }

  console.log("Location migration finished.");
}

migrateLocations().then(() => {
  process.exit(0);
}).catch(error => {
  console.error("Migration failed:", error);
  process.exit(1);
});
