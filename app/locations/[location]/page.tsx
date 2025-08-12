// SEO-Optimized location detail page with comprehensive technical improvements
export const dynamic = 'force-dynamic'

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLocationBySlug, getLocations } from "@/lib/db"
import { MapPin, Phone, Mail, Clock, Building, Users, Star, ArrowRight, Calendar } from "lucide-react"
import type { Metadata } from "next"
import MapComponent from "@/components/map-component"

// Enhanced metadata generation with city-specific optimization
export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
  const location = await getLocationBySlug(params.location)
  if (!location) {
    return {
      title: "Location Not Found | Khanna and Associates",
      description: "The requested office location could not be found.",
      robots: { index: false, follow: false }
    }
  }

  const practiceAreas = location.practice_areas?.slice(0, 5).join(', ') || 'comprehensive legal services'
  const cityKeywords = [
    `law firm in ${location.name}`,
    `lawyers in ${location.name}`,
    `attorneys in ${location.name}`,
    `legal services ${location.name}`,
    `top law firm ${location.name}`,
    `legal consultation ${location.name}`,
    `legal advice ${location.name}`,
    `${location.name} law office`,
    `legal experts ${location.name}`,
    `law practice ${location.name}`
  ]

  return {
    title: `Top Law Firm in ${location.name} | Expert Legal Services | Khanna and Associates`,
    description: `Leading law firm in ${location.name}, ${location.country}. Expert ${practiceAreas} with experienced attorneys. Contact our ${location.name} office for consultation. Established legal practice serving ${location.name} community.`,
    keywords: cityKeywords.join(', '),
    openGraph: {
      title: `Premier Law Firm in ${location.name} | Khanna and Associates`,
      description: `Expert legal services in ${location.name}. Comprehensive legal solutions with experienced attorneys serving ${location.name} and surrounding areas.`,
      url: `https://khannaassociates.in/locations/${location.slug}`,
      siteName: "Khanna and Associates",
      locale: location.country === 'India' ? 'en_IN' : 'en_US',
      type: "website",
      images: [
        {
          url: location.imageUrl || `https://khannaassociates.in/images/${location.slug}-office.jpg`,
          width: 1200,
          height: 630,
          alt: `Khanna and Associates law firm office in ${location.name}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Top Law Firm in ${location.name} | Khanna and Associates`,
      description: `Expert legal services in ${location.name}. Contact our experienced attorneys for consultation.`,
      images: [location.imageUrl || `https://khannaassociates.in/images/${location.slug}-office.jpg`]
    },
    alternates: {
      canonical: `https://khannaassociates.in/locations/${location.slug}`
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
    other: {
      'geo.region': location.country === 'India' ? `IN-${location.city}` : location.country,
      'geo.placename': location.name,
      'geo.position': location.coordinates ? `${location.coordinates.lat};${location.coordinates.lng}` : undefined,
      'ICBM': location.coordinates ? `${location.coordinates.lat}, ${location.coordinates.lng}` : undefined
    }
  }
}

// Enhanced static generation
export async function generateStaticParams() {
  try {
    const locations = await getLocations()
    return locations
      .filter(location => !location.parent_id) // Only main offices for this route
      .map(location => ({
        location: location.slug,
      }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Enhanced structured data generation
function generateLocationStructuredData(location: any, contactInfo: any) {
  const schemas = []

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `Khanna and Associates ${location.name}`,
    "alternateName": `Khanna & Associates ${location.name} Office`,
    "description": `Premier law firm in ${location.name} offering comprehensive legal services including ${location.practice_areas?.slice(0, 3).join(', ') || 'legal consultation, litigation, and legal advice'}.`,
    "image": location.imageUrl || `https://khannaassociates.in/images/${location.slug}-office.jpg`,
    "logo": "https://khannaassociates.in/logo.png",
    "url": `https://khannaassociates.in/locations/${location.slug}`,
    "telephone": contactInfo?.phone || "+91-11-4567-8900",
    "email": contactInfo?.email || "info@khannaassociates.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "addressRegion": location.city,
      "postalCode": location.postal_code || "",
      "addressCountry": location.country === "India" ? "IN" : location.country === "United Kingdom" ? "GB" : "US"
    },
    "geo": location.coordinates && {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "openingHours": location.office_hours && [
      location.office_hours.weekdays && `Mo-Fr ${location.office_hours.weekdays}`,
      location.office_hours.saturday && `Sa ${location.office_hours.saturday}`,
      location.office_hours.sunday && `Su ${location.office_hours.sunday}`
    ].filter(Boolean),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": location.coordinates?.lat || 28.6139,
        "longitude": location.coordinates?.lng || 77.2090
      },
      "geoRadius": "50000" // 50km radius
    },
    "priceRange": "$$",
    "currenciesAccepted": location.country === "India" ? "INR" : location.country === "United Kingdom" ? "GBP" : "USD",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "UPI"],
    "parentOrganization": {
      "@type": "LegalService",
      "name": "Khanna and Associates",
      "url": "https://khannaassociates.in"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": location.name,
        "addressCountry": location.country
      }
    ],
    "serviceType": location.practice_areas || [
      "Legal Consultation",
      "Civil Litigation", 
      "Corporate Law",
      "Criminal Defense",
      "Family Law"
    ],
    "sameAs": [
      "https://www.linkedin.com/company/khanna-associates",
      "https://twitter.com/khannaassoc",
      "https://www.facebook.com/khannaassociates"
    ]
  }

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Legal Services in ${location.name}`,
    "provider": {
      "@type": "LegalService",
      "name": `Khanna and Associates ${location.name}`
    },
    "areaServed": {
      "@type": "City",
      "name": location.name,
      "addressCountry": location.country
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Services",
      "itemListElement": location.practice_areas?.map((area: string, index: number) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": area,
          "description": `Professional ${area.toLowerCase()} services in ${location.name}`
        }
      })) || []
    }
  }

  // Breadcrumb Schema
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
        "name": "Locations",
        "item": "https://khannaassociates.in/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location.name,
        "item": `https://khannaassociates.in/locations/${location.slug}`
      }
    ]
  }

  return [localBusinessSchema, professionalServiceSchema, breadcrumbSchema]
}

export default async function LocationDetailPage({ params }: { params: { location: string } }) {
  const location = await getLocationBySlug(params.location)

  if (!location) {
    notFound()
  }

  // Optimize images with proper fallbacks
  const mapImage = location.map_image || "/images/default-map.jpg"
  const heroImage = location.imageUrl || "/images/default-office.jpg"

  // Ensure contact_info is properly typed
  const contactInfo = typeof location.contact_info === 'string' 
    ? JSON.parse(location.contact_info) 
    : location.contact_info

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocationStructuredData(location, contactInfo))
        }}
      />

      {/* Enhanced hero section with better semantic structure */}
      <header className="relative bg-[#1a3c61] text-white">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={`Khanna and Associates law firm office in ${location.name}, ${location.country}`}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><ArrowRight className="h-4 w-4" /></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Locations</Link></li>
              <li><ArrowRight className="h-4 w-4" /></li>
              <li className="text-white font-medium">{location.name}</li>
            </ol>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Premier Law Firm in {location.name}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-white/90">
              Expert Legal Services | Khanna and Associates
            </p>
            <div className="flex items-center text-lg text-white/80 mb-8">
              <MapPin className="h-5 w-5 mr-2" />
              <address className="not-italic">
                {location.address}, {location.city}, {location.country}
              </address>
            </div>
            
            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-4 text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Consultation
                </Button>
              </Link>
              {contactInfo?.phone && (
                <Link href={`tel:${contactInfo.phone}`}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-4 text-lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        {/* Office details section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              <article className="lg:w-2/3">
                <header className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a3c61]">
                    About Our {location.name} Office
                  </h2>
                  {location.about_office ? (
                    <p className="text-lg text-gray-700 leading-relaxed">{location.about_office}</p>
                  ) : (
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our {location.name} office is strategically located to serve clients across {location.city} and surrounding areas. 
                      With a team of experienced attorneys, we provide comprehensive legal services tailored to meet the unique 
                      needs of our clients in {location.name}.
                    </p>
                  )}
                </header>

                {/* Office highlights */}
                {(location.established || location.practice_areas?.length) && (
                  <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">Office Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {location.established && (
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="flex items-center mb-3">
                            <Building className="h-6 w-6 text-[#4BB4E6] mr-2" />
                            <h4 className="font-semibold text-[#1a3c61]">Established</h4>
                          </div>
                          <p className="text-gray-700 font-medium">{location.established}</p>
                        </div>
                      )}
                      
                      {contactInfo?.phone && (
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="flex items-center mb-3">
                            <Users className="h-6 w-6 text-[#4BB4E6] mr-2" />
                            <h4 className="font-semibold text-[#1a3c61]">Expert Team</h4>
                          </div>
                          <p className="text-gray-700">Experienced attorneys serving {location.name}</p>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-3">
                          <Star className="h-6 w-6 text-[#4BB4E6] mr-2" />
                          <h4 className="font-semibold text-[#1a3c61]">Client-Focused</h4>
                        </div>
                        <p className="text-gray-700">Personalized legal solutions</p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Practice areas */}
                {location.practice_areas && location.practice_areas.length > 0 && (
                  <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">
                      Legal Services in {location.name}
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Our {location.name} office provides comprehensive legal services across multiple practice areas:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {location.practice_areas.map((area, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="w-3 h-3 bg-[#4BB4E6] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-[#1a3c61] mb-1">{area}</h4>
                            <p className="text-sm text-gray-600">
                              Professional {area.toLowerCase()} services in {location.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Location map */}
                <section className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">
                    Visit Our {location.name} Office
                  </h3>
                  <MapComponent
                    locationName={location.name}
                    address={location.address}
                    mapLink={location.map_link}
                    mapImage={mapImage}
                    coordinates={location.coordinates}
                  />
                  
                  {/* Directions and accessibility info */}
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-[#1a3c61] mb-3">Getting to Our Office</h4>
                    <p className="text-gray-700 mb-3">
                      Our {location.name} office is conveniently located at {location.address}, easily accessible by public transport and with parking facilities nearby.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="px-3 py-1 bg-white rounded-full text-gray-700">Parking Available</span>
                      <span className="px-3 py-1 bg-white rounded-full text-gray-700"> Public Transport</span>
                      <span className="px-3 py-1 bg-white rounded-full text-gray-700">Accessible</span>
                    </div>
                  </div>
                </section>

                {/* Sub-offices */}
                {location.sub_offices && location.sub_offices.length > 0 && (
                  <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">
                      Additional Offices in {location.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {location.sub_offices.map((subOffice) => (
                        <Link 
                          href={`/locations/${location.slug}/${subOffice.slug}`} 
                          key={subOffice.id} 
                          className="group block"
                        >
                          <article className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative h-48 w-full">
                              <Image
                                src={subOffice.imageUrl || "/images/default-office.jpg"}
                                alt={`${subOffice.name} office location`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 p-4">
                                <h4 className="text-xl font-semibold text-white">{subOffice.name}</h4>
                              </div>
                            </div>
                            <div className="p-6">
                              <address className="text-gray-700 not-italic mb-3">{subOffice.address}</address>
                              <div className="flex items-center text-[#4BB4E6] group-hover:text-[#1a3c61] transition-colors">
                                <span className="text-sm font-medium">Visit this office</span>
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              {/* Enhanced sidebar */}
              <aside className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden sticky top-24">
                  {/* Contact information */}
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold mb-6 text-[#1a3c61]">Contact Our {location.name} Office</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-[#4BB4E6] mt-1 mr-3 flex-shrink-0" />
                        <address className="text-gray-700 not-italic">
                          <strong>{location.name} Office</strong><br />
                          {location.address}<br />
                          {location.city}, {location.country}
                        </address>
                      </div>
                      
                      {contactInfo && typeof contactInfo === 'object' && (
                        <>
                          {contactInfo.phone && (
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                              <Link 
                                href={`tel:${contactInfo.phone}`}
                                className="text-gray-700 hover:text-[#4BB4E6] transition-colors"
                              >
                                {contactInfo.phone}
                              </Link>
                            </div>
                          )}
                          {contactInfo.email && (
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                              <Link 
                                href={`mailto:${contactInfo.email}`}
                                className="text-gray-700 hover:text-[#4BB4E6] transition-colors"
                              >
                                {contactInfo.email}
                              </Link>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Office hours */}
                  {location.office_hours && (
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-lg font-semibold mb-4 text-[#1a3c61] flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Office Hours
                      </h4>
                      <div className="space-y-3">
                        {location.office_hours.weekdays && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Monday - Friday</span>
                            <span className="text-gray-800 font-semibold">{location.office_hours.weekdays}</span>
                          </div>
                        )}
                        {location.office_hours.saturday && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Saturday</span>
                            <span className="text-gray-800 font-semibold">{location.office_hours.saturday}</span>
                          </div>
                        )}
                        {location.office_hours.sunday ? (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Sunday</span>
                            <span className="text-gray-800 font-semibold">{location.office_hours.sunday}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Sunday</span>
                            <span className="text-gray-500">Closed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="p-6">
                    <div className="space-y-3">
                      <Link href="/contact" className="block">
                        <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full py-3 text-lg">
                          <Calendar className="h-5 w-5 mr-2" />
                          Schedule Consultation
                        </Button>
                      </Link>
                      
                      {contactInfo?.phone && (
                        <Link href={`tel:${contactInfo.phone}`} className="block">
                          <Button variant="outline" className="w-full border-[#1a3c61] text-[#1a3c61] hover:bg-[#1a3c61] hover:text-white py-3">
                            <Phone className="h-5 w-5 mr-2" />
                            Call {location.name} Office
                          </Button>
                        </Link>
                      )}
                      
                      {contactInfo?.email && (
                        <Link href={`mailto:${contactInfo.email}`} className="block">
                          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3">
                            <Mail className="h-5 w-5 mr-2" />
                            Send Email
                          </Button>
                        </Link>
                      )}
                    </div>
                    
                    {/* Emergency contact note */}
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Emergency Legal Services:</strong> For urgent legal matters outside office hours, 
                        please call our 24/7 emergency line: <Link href="tel:+919461620007" className="font-semibold underline">+919461620007</Link>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional info box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#1a3c61] mb-3">Why Choose Our {location.name} Office?</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Local expertise in {location.name} legal matters
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Experienced attorneys fluent in local languages
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Convenient location in {location.city}
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Comprehensive legal services under one roof
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Enhanced CTA section */}
        <section className="py-16 bg-[#1a3c61] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Expert Legal Help in {location.name}?
            </h2>
            <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
              Our experienced team of attorneys in {location.name} is ready to provide you with personalized legal solutions. 
              Whether you need consultation, representation, or ongoing legal support, we're here to help you navigate 
              your legal challenges with confidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link href="/contact" className="flex-1">
                <Button size="lg" className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full py-4 text-lg">
                  Get Free Consultation
                </Button>
              </Link>
              {contactInfo?.phone && (
                <Link href={`tel:${contactInfo.phone}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#1a3c61] w-full py-4 text-lg"
                  >
                    Call Now
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Client-focused approach
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Experienced team
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                Established practice
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}