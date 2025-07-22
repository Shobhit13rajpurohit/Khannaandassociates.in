const admin = require('firebase-admin');
const serviceAccount = require('../.env.local'); // This will not work, but it's a placeholder

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function createCollections() {
  // Create admin_users collection
  const adminUsersRef = db.collection('admin_users');
  await adminUsersRef.doc('admin-user-id').set({
    email: 'admin@khannaandassociates.com',
    name: 'Admin User',
    role: 'admin',
    created_at: new Date(),
  });

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

  console.log('Collections created successfully');
}

createCollections().catch(console.error);
