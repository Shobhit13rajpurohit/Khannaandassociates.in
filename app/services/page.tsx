import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"
import { getPublishedServices } from "@/lib/db"

export const dynamic = 'force-dynamic';

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: 'Legal Services in India | Top Law Firm | Khanna and Associates',
  description: 'Expert legal services across 23+ practice areas including Corporate Law, Banking, Real Estate, Immigration, IP, and more. Top-rated attorneys in India with proven results.',
  keywords: [
    'legal services India',
    'law firm India',
    'corporate lawyers',
    'banking law',
    'real estate lawyers',
    'immigration lawyers',
    'intellectual property law',
    'taxation lawyers',
    'arbitration lawyers',
    'criminal lawyers',
    'matrimonial lawyers',
    'best law firm India'
  ].join(', '),
  authors: [{ name: 'Khanna and Associates' }],
  creator: 'Khanna and Associates',
  publisher: 'Khanna and Associates',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Legal Services in India | Top Law Firm | Khanna and Associates',
    description: 'Expert legal services across 23+ practice areas including Corporate Law, Banking, Real Estate, Immigration, IP, and more. Top-rated attorneys in India with proven results.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Khanna and Associates',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070',
        width: 2070,
        height: 1380,
        alt: 'Professional Legal Services - Khanna and Associates',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Services in India | Top Law Firm | Khanna and Associates',
    description: 'Expert legal services across 23+ practice areas. Top-rated attorneys in India with proven results.',
    images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070'],
  },
  alternates: {
    canonical: 'https://khannaassociates.in/services',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

// JSON-LD Schema for better search engine understanding
function generateLegalServiceSchema() {
  const services = [
    "Arbitration and Reconciliation",
    "Aviation & Defence", 
    "Banking and Finance & Insurance",
    "Bankruptcy and Insolvency",
    "Capital Markets",
    "Competition/Antitrust",
    "Corporate and Commercial",
    "Criminal & Civil",
    "Energy and Natural Resources",
    "Financial Services & Fintech",
    "Funds",
    "Healthcare and Life Sciences",
    "Immigration", 
    "Information Technology",
    "Intellectual Property",
    "International Domain",
    "Legal Outsourcing Work(LPO)",
    "Matrimonial",
    "Media and Entertainment",
    "Private Client practice",
    "Real Estate",
    "Taxation (Direct and Indirect Taxation)",
    "Technology Media and Telecom"
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Khanna and Associates",
    "description": "Leading law firm in India providing comprehensive legal services across 23+ practice areas",
    "url": "https://khannaassociates.in",
    "logo": "https://khannaassociates.in/logo.png",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    "telephone": "+919461620007",
    "email": "info@khannaassociates.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6139,
      "longitude": 77.2090
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "serviceType": services,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "description": `Professional ${service.toLowerCase()} legal services in India`
        }
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "₹₹₹",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "INR",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://www.linkedin.com/company/khanna-associates",
      "https://twitter.com/khannaassociates"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://khannaassociates.in"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Legal Services",
        "item": "https://khannaassociates.in/services"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What legal services do you provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide comprehensive legal services across 23+ practice areas including Corporate Law, Banking & Finance, Real Estate, Immigration, Intellectual Property, Taxation, Criminal Law, and more."
        }
      },
      {
        "@type": "Question", 
        "name": "Do you handle corporate legal matters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we specialize in corporate and commercial law, including mergers & acquisitions, compliance, contracts, and corporate restructuring."
        }
      },
      {
        "@type": "Question",
        "name": "Can you help with immigration matters?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our immigration lawyers assist with visas, work permits, citizenship applications, and all immigration-related legal matters."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, breadcrumbSchema, faqSchema])
      }}
    />
  );
}

// Loading component with better accessibility
function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-label="Loading services">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="bg-gray-200 animate-pulse rounded-lg h-64"
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading legal services...</span>
    </div>
  );
}

// Enhanced Services Grid Component
async function ServicesGrid() {
  const servicesData = await getPublishedServices();
  
  // Sort services alphabetically by title
  const services = servicesData.sort((a, b) => a.title.localeCompare(b.title));

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">No services available</h3>
        <p className="text-gray-500">Please check back later for our legal services.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" itemScope itemType="https://schema.org/ItemList">
        {services.map((service, index) => (
          <div key={service.id} itemScope itemType="https://schema.org/Service" itemProp="itemListElement">
            <meta itemProp="position" content={(index + 1).toString()} />
            <Link 
              href={`/services/${service.slug}`} 
              prefetch={false}
              title={`Learn more about ${service.title} legal services`}
            >
              <ServiceCard 
                title={service.title} 
                imageUrl={service.featured_image} 
                standalone={true}
                itemProp="name"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Featured Services for Local SEO */}
      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-6 text-[#1a3c61] text-center">
          Top Legal Services in India
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
          {[
            "Corporate Law Delhi",
            "Banking Lawyers India", 
            "Real Estate Legal Services",
            "Immigration Lawyers",
            "IP Law Firm India",
            "Tax Lawyers Delhi",
            "Criminal Defense",
            "Matrimonial Lawyers",
            "Arbitration Services",
            "Competition Law",
            "Healthcare Law",
            "Aviation Lawyers"
          ].map((keyword) => (
            <div key={keyword} className="text-gray-600 hover:text-[#1a3c61] transition-colors">
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      {generateLegalServiceSchema()}
      <div className="min-h-screen">
        {/* Enhanced Hero Section with better semantic HTML */}
        <header className="relative bg-[#1a3c61] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
              filter: "brightness(0.4)",
            }}
            role="img"
            aria-label="Professional legal office environment"
          />
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Expert Legal Services in India
                <span className="block text-3xl md:text-4xl lg:text-5xl text-[#4BB4E6] mt-2">
                  23+ Practice Areas
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl">
                Leading law firm providing comprehensive legal solutions across Corporate Law, Banking & Finance, 
                Real Estate, Immigration, Intellectual Property, and more. Trusted by businesses and individuals 
                across India.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-[#4BB4E6] px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ 500+ Cases Won
                </span>
                <span className="bg-[#4BB4E6] px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ 15+ Years Experience  
                </span>
                <span className="bg-[#4BB4E6] px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ Pan-India Presence
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Services Grid with enhanced SEO */}
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a3c61]">
                Comprehensive Legal Practice Areas
              </h2>
              <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                Our experienced team of attorneys provides expert legal counsel across India's most critical 
                practice areas. From multinational corporations to individual clients, we deliver results-driven 
                legal solutions with unmatched expertise and dedication.
              </p>
            </div>

            <Suspense fallback={<ServicesGridSkeleton />}>
              <ServicesGrid />
            </Suspense>

            {/* Why Choose Us Section for Authority Building */}
            <section className="mt-20 bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-3xl font-bold mb-8 text-[#1a3c61] text-center">
                Why Choose Khanna and Associates?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  {/* <div className="text-4xl mb-4">⚖️</div> */}
                  <h4 className="text-xl font-semibold mb-3 text-[#1a3c61]">
                    Proven Track Record
                  </h4>
                  <p className="text-gray-600">
                    Over 500 successful cases with 98% client satisfaction rate across all practice areas.
                  </p>
                </div>
                <div className="text-center">
                  {/* <div className="text-4xl mb-4">🏆</div> */}
                  <h4 className="text-xl font-semibold mb-3 text-[#1a3c61]">
                    Industry Recognition
                  </h4>
                  <p className="text-gray-600">
                    Awarded "Law Firm of the Year" and recognized by leading legal directories.
                  </p>
                </div>
                <div className="text-center">
                  {/* <div className="text-4xl mb-4">🌐</div> */}
                  <h4 className="text-xl font-semibold mb-3 text-[#1a3c61]">
                    Pan-India Expertise
                  </h4>
                  <p className="text-gray-600">
                    Deep understanding of Indian law with offices across major cities.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Enhanced CTA Section */}
        <section className="py-16 bg-[#1a3c61] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Resolve Your Legal Matters?
            </h2>
            <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed">
              Our team of experienced attorneys is ready to provide expert legal guidance tailored to your specific needs. 
              Get started with a consultation today and experience the difference of working with India's trusted legal experts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Schedule Free Consultation
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg font-semibold bg-transparent transition-all duration-300"
              >
                Call +919461620007
              </Button>
            </div>
            <p className="text-sm opacity-90">
              Available 24/7 for urgent legal matters • Free initial consultation • No win, no fee options available
            </p>
          </div>
        </section>
      </div>
    </>
  );
}