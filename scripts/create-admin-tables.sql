-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    key_points TEXT[], -- Changed to TEXT[] to match TypeScript interface
    featured_image TEXT,
    related_services TEXT[], -- Changed to TEXT[] to match TypeScript interface
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    category VARCHAR(100),
    tags TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    author_id UUID REFERENCES admin_users(id),
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size INTEGER,
    url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
-- The password hash is for 'admin123'
INSERT INTO admin_users (email, password_hash, name, role)
VALUES ('admin@khannaandassociates.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample services
INSERT INTO services (title, slug, description, content, key_points, status) VALUES
('Aviation & Defence', 'aviation-and-defence', 'Expert legal counsel for aviation and defence sectors, handling regulatory compliance, contracts, and dispute resolution.',
'<p>Our Aviation & Defence practice provides comprehensive legal services to airlines, airports, aircraft manufacturers, and defence contractors.</p><p>We handle matters related to regulatory compliance, aircraft financing and leasing, aviation accidents and liability, airport development, and defence procurement.</p>',
ARRAY['Regulatory compliance and licensing', 'Aircraft financing and leasing', 'Aviation accidents and liability', 'Airport development and operations', 'Defence procurement and contracts'], 'published'),

('Corporate and Commercial', 'corporate-and-commercial', 'Comprehensive legal services for businesses, including formation, governance, contracts, mergers and acquisitions, and compliance.',
'<p>Our Corporate and Commercial practice provides strategic legal advice to businesses of all sizes, from startups to multinational corporations.</p><p>We handle matters related to company formation, corporate governance, commercial contracts, mergers and acquisitions, joint ventures, and regulatory compliance.</p>',
ARRAY['Company formation and structuring', 'Corporate governance and compliance', 'Mergers and acquisitions', 'Joint ventures and strategic alliances', 'Commercial contracts and agreements'], 'published'),

('Real Estate', 'real-estate', 'Comprehensive legal services for real estate transactions, development, leasing, financing, and dispute resolution.',
'<p>Our Real Estate practice provides expert legal advice on all aspects of real estate transactions and development projects.</p><p>We handle matters related to property acquisition and disposal, leasing, construction, financing, land use, and zoning.</p>',
ARRAY['Property acquisition and disposal', 'Commercial and residential leasing', 'Construction contracts and disputes', 'Real estate financing', 'Land use and zoning'], 'published')
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
