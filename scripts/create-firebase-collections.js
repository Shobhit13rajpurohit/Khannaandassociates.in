// 1. Load environment variables from your .env.local file first
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// 2. Require the firebase-admin library
const admin = require('firebase-admin');

// 3. Build the service account object using the environment variables
// This object needs to be defined BEFORE you initialize the app
const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID, // Add this to your .env.local if available
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID, // Add this to your .env.local if available
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
};

// 4. Initialize the Firebase Admin SDK with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 5. Get a reference to the Firestore database
const db = admin.firestore();

/**
 * An asynchronous function to create initial collections and documents in Firestore.
 */
async function createCollections() {
  console.log("Starting to create collections...");

  // Create admin_users collection
  const adminUsersRef = db.collection('admin_users');
  await adminUsersRef.doc('admin-user-id').set({
    email: 'admin@khannaandassociates.com',
    name: 'Admin User',
    role: 'admin',
    created_at: new Date(),
  });
  console.log("-> 'admin_users' collection created.");

  // Create services collection
  const servicesRef = db.collection('services');
  await servicesRef.add({
    title: 'Aviation & Defence',
    slug: 'aviation-and-defence',
    description: 'Expert legal counsel for aviation and defence sectors, handling regulatory compliance, contracts, and dispute resolution.',
    content: '<p>Our Aviation & Defence practice provides comprehensive legal services to airlines, airports, aircraft manufacturers, and defence contractors.</p><p>We handle matters related to regulatory compliance, aircraft financing and leasing, aviation accidents and liability, airport development, and defence procurement.</p>',
    key_points: ['Regulatory compliance and licensing', 'Aircraft financing and leasing', 'Aviation accidents and liability', 'Airport development and operations', 'Defence procurement and contracts'],
    status: 'published',
    created_at: new Date(),
    updated_at: new Date(),
  });
  await servicesRef.add({
    title: 'Corporate and Commercial',
    slug: 'corporate-and-commercial',
    description: 'Comprehensive legal services for businesses, including formation, governance, contracts, mergers and acquisitions, and compliance.',
    content: '<p>Our Corporate and Commercial practice provides strategic legal advice to businesses of all sizes, from startups to multinational corporations.</p><p>We handle matters related to company formation, corporate governance, commercial contracts, mergers and acquisitions, joint ventures, and regulatory compliance.</p>',
    key_points: ['Company formation and structuring', 'Corporate governance and compliance', 'Mergers and acquisitions', 'Joint ventures and strategic alliances', 'Commercial contracts and agreements'],
    status: 'published',
    created_at: new Date(),
    updated_at: new Date(),
  });
  await servicesRef.add({
    title: 'Real Estate',
    slug: 'real-estate',
    description: 'Comprehensive legal services for real estate transactions, development, leasing, financing, and dispute resolution.',
    content: '<p>Our Real Estate practice provides expert legal advice on all aspects of real estate transactions and development projects.</p><p>We handle matters related to property acquisition and disposal, leasing, construction, financing, land use, and zoning.</p>',
    key_points: ['Property acquisition and disposal', 'Commercial and residential leasing', 'Construction contracts and disputes', 'Real estate financing', 'Land use and zoning'],
    status: 'published',
    created_at: new Date(),
    updated_at: new Date(),
  });
  console.log("-> 'services' collection populated.");

  // Create blog_posts collection
  const blogPostsRef = db.collection('blog_posts');
  await blogPostsRef.add({
    title: 'Sample Blog Post',
    slug: 'sample-blog-post',
    content: '<p>This is a sample blog post.</p>',
    excerpt: 'This is a sample blog post.',
    category: 'Sample Category',
    tags: ['sample', 'tag'],
    status: 'published',
    author_id: 'admin-user-id',
    created_at: new Date(),
    updated_at: new Date(),
  });
  console.log("-> 'blog_posts' collection created.");

  // Create media collection
  const mediaRef = db.collection('media');
  await mediaRef.add({
    filename: 'sample-image.jpg',
    original_name: 'sample-image.jpg',
    file_type: 'image/jpeg',
    file_size: 12345,
    url: 'https://example.com/sample-image.jpg',
    alt_text: 'Sample Image',
    created_at: new Date(),
  });
  console.log("-> 'media' collection created.");


  console.log('✅ Collections created successfully!');
}

// Execute the function and catch any potential errors
createCollections().catch(error => {
    console.error("❌ An error occurred while creating collections:", error);
});