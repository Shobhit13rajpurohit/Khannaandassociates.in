// SEO-Optimized locations page with comprehensive technical improvements
export const dynamic = 'force-dynamic';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import IndiaPresence from "@/components/india-presence"
import { getLocations } from "@/lib/db"
import { Suspense } from "react"
import type { Location } from "@/lib/db"
import type { Metadata } from "next"

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "Law Firm Offices & Locations Across India & International | Khanna and Associates",
  description: "Find Khanna and Associates law firm offices in major Indian cities including Delhi, Mumbai, Bangalore, Chennai, Kolkata, Pune, Hyderabad, Ahmedabad, Jaipur, and international locations. Contact our expert legal teams today.",
  keywords: [
    "law firm offices India",
    "legal services locations",
    "Khanna and Associates offices",
    "lawyers in Delhi Mumbai Bangalore",
    "legal consultation centers India",
    "top law firm branches",
    "attorney offices India",
    "legal services Delhi Mumbai Chennai Kolkata Pune Hyderabad Bangalore Ahmedabad Jaipur Chandigarh Bhopal Indore Lucknow Patna Guwahati Kochi Nagpur Surat Vadodara Goa Dehradun",
    "international law firm offices"
  ].join(", "),
  openGraph: {
    title: "Law Firm Offices & Locations | Khanna and Associates",
    description: "Comprehensive legal services across India and international locations. Find our nearest office for expert legal consultation.",
    url: "https://khannaassociates.in/locations",
    siteName: "Khanna and Associates",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://khannaassociates.in/images/locations-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Khanna and Associates Law Firm Offices Across India"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm Offices & Locations | Khanna and Associates",
    description: "Find our law firm offices across India. Expert legal services in major cities.",
    images: ["https://khannaassociates.in/images/locations-hero.jpg"]
  },
  alternates: {
    canonical: "https://khannaassociates.in/locations"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code"
  }
}

// Enhanced JSON-LD structured data
function generateStructuredData(locations: Location[]) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Khanna and Associates",
    "alternateName": "Khanna & Associates Law Firm",
    "description": "Premier law firm providing comprehensive legal services across India and internationally",
    "url": "https://khannaassociates.in",
    "logo": "https://khannaassociates.in/logo.png",
    "image": "https://khannaassociates.in/images/firm-hero.jpg",
    "telephone": "+91-11-4567-8900",
    "email": "info@khannaassociates.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Legal Avenue",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country", 
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "serviceType": [
      "Corporate Law",
      "Criminal Law", 
      "Civil Litigation",
      "Family Law",
      "Property Law",
      "Tax Law",
      "Employment Law",
      "Intellectual Property Law"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Services",
      "itemListElement": locations.map(location => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "LegalService",
          "name": `Legal Services in ${location.name}`,
          "areaServed": {
            "@type": "City",
            "name": location.name,
            "addressCountry": location.country
          }
        }
      }))
    },
    "location": locations.map(location => {
      const contactInfo = typeof location.contact_info === 'string' 
        ? JSON.parse(location.contact_info) 
        : location.contact_info;
      
      return {
        "@type": "Place",
        "name": `Khanna and Associates ${location.name} Office`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": location.address,
          "addressLocality": location.city,
          "addressRegion": location.city,
          "addressCountry": location.country === "India" ? "IN" : location.country === "United Kingdom" ? "GB" : "US"
        },
        "telephone": contactInfo?.phone || "+9194616-20007",
        "url": `https://khannaassociates.in/locations/${location.slug}`,
        "geo": location.coordinates && {
          "@type": "GeoCoordinates",
          "latitude": location.coordinates.lat,
          "longitude": location.coordinates.lng
        }
      }
    }),
    "sameAs": [
      "https://www.linkedin.com/company/khanna-associates",
      "https://twitter.com/khannaassoc",
      "https://www.facebook.com/khannaassociates"
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
        "name": "Our Locations",
        "item": "https://khannaassociates.in/locations"
      }
    ]
  };

  return [organizationSchema, breadcrumbSchema];
}

// Enhanced loading component with better accessibility
function LocationsLoading() {
  return (
    <div className="space-y-16">
      {/* India section loading */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-label="Loading India office locations">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              aria-hidden="true"
            >
              <div className="h-48 bg-gray-300" />
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2" />
                <div className="h-3 bg-gray-300 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* International section loading */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="h-8 bg-gray-300 rounded w-80 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-label="Loading international office locations">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              aria-hidden="true"
            >
              <div className="h-48 bg-gray-300" />
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2" />
                <div className="h-3 bg-gray-300 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading office locations...</span>
    </div>
  )
}

// Enhanced locations grid with better SEO structure - FIXED VERSION
async function LocationsGrid() {
  const locations = await getLocations()
  
  const hierarchicalLocations = locations.reduce((acc, location) => {
    if (location.parent_id) {
      const parent = acc.find(l => l.id === location.parent_id)
      if (parent) {
        if (!parent.sub_offices) {
          parent.sub_offices = []
        }
        parent.sub_offices.push(location)
      }
    } else {
      acc.push(location)
    }
    return acc
  }, [] as Location[])

  // Separate India and International locations
  const indiaLocations = hierarchicalLocations.filter(location => 
    location.country === 'India' || location.country === 'IN'
  )
  
  const internationalLocations = hierarchicalLocations.filter(location => 
    location.country !== 'India' && location.country !== 'IN'
  )

  const renderLocationCard = (location: Location) => (
    <article key={location.id} className="space-y-6">
      <Link 
        href={`/locations/${location.slug}`} 
        className="group block"
        aria-label={`View details for ${location.name} office`}
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={location.imageUrl || "/images/default-office.jpg"}
              alt={`Khanna and Associates law firm office in ${location.name}, ${location.country}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={[...indiaLocations, ...internationalLocations].indexOf(location) < 3}
              loading={[...indiaLocations, ...internationalLocations].indexOf(location) < 3 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <h3 className="text-2xl font-bold text-white mb-1">
                {location.name}
              </h3>
              <p className="text-white/90 text-sm">
                {location.country}
              </p>
            </div>
          </div>
          <div className="p-6">
            <address className="text-gray-700 text-base not-italic line-clamp-2">
              {location.address}
            </address>
            {location.practice_areas && location.practice_areas.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-2">Key Practice Areas:</p>
                <div className="flex flex-wrap gap-1">
                  {location.practice_areas.slice(0, 3).map((area, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-[#4BB4E6]/10 text-[#1a3c61] text-xs rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                  {location.practice_areas.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{location.practice_areas.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {/* Sub-offices section with improved structure */}
      {location.sub_offices && location.sub_offices.length > 0 && (
        <section className="mt-8">
          <h4 className="text-xl font-semibold text-[#1a3c61] mb-4 ml-4">
            {location.name} Sub-Offices
          </h4>
          <div className="grid grid-cols-1 gap-4 ml-8">
            {location.sub_offices.map((subOffice) => (
              <Link 
                href={`/locations/${location.slug}/${subOffice.slug}`} 
                key={subOffice.id} 
                className="group block"
                aria-label={`View details for ${subOffice.name} sub-office`}
              >
                <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="flex">
                    <div className="relative w-24 h-20 flex-shrink-0">
                      <Image
                        src={subOffice.imageUrl || "/images/default-office.jpg"}
                        alt={`${subOffice.name} sub-office`}
                        fill
                        className="object-cover"
                        sizes="96px"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h5 className="font-semibold text-[#1a3c61] group-hover:text-[#4BB4E6] transition-colors">
                        {subOffice.name}
                      </h5>
                      <address className="text-sm text-gray-600 not-italic line-clamp-1">
                        {subOffice.address}
                      </address>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )

  return (
    <>
      {/* Structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(locations))
        }}
      />
      
      <div className="space-y-20">
        {/* India Offices Section */}
        {indiaLocations.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#1a3c61] mb-4">
                Our Offices in India
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive legal services across major Indian cities with experienced attorneys ready to assist you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {indiaLocations.map(renderLocationCard)}
            </div>
          </section>
        )}

        {/* International Offices Section */}
        {internationalLocations.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#1a3c61] mb-4">
                Our International Offices
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional legal representation across international markets with deep understanding of local and international law.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internationalLocations.map(renderLocationCard)}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default async function LocationsPage() {
  return (
    <div className="min-h-screen">
      {/* Enhanced hero section with better semantic structure and added image */}
      <header className="relative bg-[#1a3c61] text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern conference room with oval wooden table and chairs - Khanna and Associates office"
            fill
            className="object-cover opacity-100"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1a3c61]/20" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Global Legal Network
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            With strategically located offices across India's major cities and international presence, 
            Khanna and Associates provides accessible, expert legal services wherever you need us. 
            From Delhi to Mumbai, Bangalore to Chennai, and beyond - we're here to serve you.
          </p>
          
          {/* Quick location finder */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm mb-3 text-white/90">Find an office near you:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad'].map(city => (
                  <Link 
                    key={city}
                    href={`/locations/${city.toLowerCase()}`}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content section with enhanced structure */}
      <main>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LocationsLoading />}>
              <LocationsGrid />
            </Suspense>
          </div>
        </section>

        {/* India presence component */}
        <IndiaPresence />

        {/* Enhanced CTA section */}
        <section className="py-16 bg-[#4BB4E6] text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Need Legal Assistance?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Can't find an office near you? Our legal experts are available for virtual consultations 
              and can provide remote legal services across India and internationally.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="bg-white text-[#4BB4E6] hover:bg-[#1a3c61] hover:text-white border-white px-8 py-3"
                >
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#4BB4E6] px-8 py-3"
                >
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}