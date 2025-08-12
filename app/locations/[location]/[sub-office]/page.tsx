// SEO-Optimized sub-office detail page with comprehensive technical improvements
export const dynamic = 'force-dynamic'

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLocationBySlug, getLocations } from "@/lib/db"
import { MapPin, Phone, Mail, Clock, Building, Users, Star, ArrowRight, Calendar, Home } from "lucide-react"
import type { Metadata } from "next"

// Enhanced metadata for sub-offices
export async function generateMetadata({ params }: { params: { location: string, "sub-office": string } }): Promise<Metadata> {
  const subOffice = await getLocationBySlug(params["sub-office"])
  const parentOffice = await getLocationBySlug(params.location)
  
  if (!subOffice || !parentOffice) {
    return {
      title: "Office Location Not Found | Khanna and Associates",
      description: "The requested office location could not be found.",
      robots: { index: false, follow: false }
    }
  }

  const practiceAreas = subOffice.practice_areas?.slice(0, 5).join(', ') || 'comprehensive legal services'
  
  return {
    title: `${subOffice.name} Law Office | ${parentOffice.name} Branch | Khanna and Associates`,
    description: `Khanna and Associates ${subOffice.name} office in ${parentOffice.name}. Expert ${practiceAreas} with experienced attorneys. Contact our ${subOffice.name} branch for legal consultation.`,
    keywords: [
      `law office ${subOffice.name}`,
      `lawyers in ${subOffice.name}`,
      `legal services ${subOffice.name}`,
      `${subOffice.name} ${parentOffice.name}`,
      `Khanna Associates ${subOffice.name}`,
      `attorney ${subOffice.name}`,
      `legal consultation ${subOffice.name}`
    ].join(', '),
    openGraph: {
      title: `${subOffice.name} Law Office | Khanna and Associates`,
      description: `Professional legal services at our ${subOffice.name} branch in ${parentOffice.name}. Expert attorneys providing comprehensive legal solutions.`,
      url: `https://khannaassociates.in/locations/${parentOffice.slug}/${subOffice.slug}`,
      siteName: "Khanna and Associates",
      locale: subOffice.country === 'India' ? 'en_IN' : 'en_US',
      type: "website",
      images: [
        {
          url: subOffice.imageUrl || `https://khannaassociates.in/images/${subOffice.slug}-office.jpg`,
          width: 1200,
          height: 630,
          alt: `Khanna and Associates ${subOffice.name} office`
        }
      ]
    },
    alternates: {
      canonical: `https://khannaassociates.in/locations/${parentOffice.slug}/${subOffice.slug}`
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
    }
  }
}

// Enhanced static generation for sub-offices
export async function generateStaticParams() {
  try {
    const locations = await getLocations()
    const params: { location: string; "sub-office": string }[] = []
    
    for (const location of locations) {
      if (location.parent_id) {
        const parent = locations.find(l => l.id === location.parent_id)
        if (parent) {
          params.push({
            location: parent.slug,
            "sub-office": location.slug,
          })
        }
      }
    }
    return params
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Sub-office structured data
function generateSubOfficeStructuredData(subOffice: any, parentOffice: any, contactInfo: any) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `Khanna and Associates ${subOffice.name}`,
    "alternateName": `${subOffice.name} Branch Office`,
    "description": `Branch office of Khanna and Associates located in ${subOffice.name}, ${parentOffice.name}. Providing expert legal services including ${subOffice.practice_areas?.slice(0, 3).join(', ') || 'legal consultation and representation'}.`,
    "image": subOffice.imageUrl || `https://khannaassociates.in/images/${subOffice.slug}-office.jpg`,
    "url": `https://khannaassociates.in/locations/${parentOffice.slug}/${subOffice.slug}`,
    "telephone": contactInfo?.phone || "+91-11-4567-8900",
    "email": contactInfo?.email || "info@khannaassociates.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": subOffice.address,
      "addressLocality": subOffice.city || parentOffice.city,
      "addressRegion": parentOffice.city,
      "addressCountry": subOffice.country === "India" ? "IN" : subOffice.country === "United Kingdom" ? "GB" : "US"
    },
    "parentOrganization": {
      "@type": "LegalService",
      "name": "Khanna and Associates",
      "url": "https://khannaassociates.in"
    },
    "branchOf": {
      "@type": "LegalService",
      "name": `Khanna and Associates ${parentOffice.name}`,
      "url": `https://khannaassociates.in/locations/${parentOffice.slug}`
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": subOffice.coordinates?.lat || parentOffice.coordinates?.lat || 28.6139,
        "longitude": subOffice.coordinates?.lng || parentOffice.coordinates?.lng || 77.2090
      },
      "geoRadius": "25000" // 25km radius for sub-office
    },
    "openingHours": subOffice.office_hours && [
      subOffice.office_hours.weekdays && `Mo-Fr ${subOffice.office_hours.weekdays}`,
      subOffice.office_hours.saturday && `Sa ${subOffice.office_hours.saturday}`,
      subOffice.office_hours.sunday && `Su ${subOffice.office_hours.sunday}`
    ].filter(Boolean),
    "serviceType": subOffice.practice_areas || parentOffice.practice_areas || [
      "Legal Consultation",
      "Legal Representation",
      "Legal Documentation"
    ]
  }

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
        "name": parentOffice.name,
        "item": `https://khannaassociates.in/locations/${parentOffice.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": subOffice.name,
        "item": `https://khannaassociates.in/locations/${parentOffice.slug}/${subOffice.slug}`
      }
    ]
  }

  return [localBusinessSchema, breadcrumbSchema]
}

export default async function SubOfficeDetailPage({ params }: { params: { location: string, "sub-office": string } }) {
  const subOffice = await getLocationBySlug(params["sub-office"])
  const parentOffice = await getLocationBySlug(params.location)

  if (!subOffice || !parentOffice) {
    notFound()
  }

  // Optimize images with proper fallbacks
  const mapImage = subOffice.map_image || "/images/default-map.jpg"
  const heroImage = subOffice.imageUrl || "/images/default-office.jpg"

  // Ensure contact_info is properly typed
  const contactInfo = typeof subOffice.contact_info === 'string' 
    ? JSON.parse(subOffice.contact_info) 
    : subOffice.contact_info

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSubOfficeStructuredData(subOffice, parentOffice, contactInfo))
        }}
      />

      {/* Enhanced hero section */}
      <header className="relative bg-[#1a3c61] text-white">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={`Khanna and Associates ${subOffice.name} branch office in ${parentOffice.name}`}
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
              <li><Link href={`/locations/${parentOffice.slug}`} className="hover:text-white transition-colors">{parentOffice.name}</Link></li>
              <li><ArrowRight className="h-4 w-4" /></li>
              <li className="text-white font-medium">{subOffice.name}</li>
            </ol>
          </nav>
          
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 text-[#4BB4E6] mr-3" />
              <span className="text-lg text-white/80">Branch Office</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {subOffice.name} Law Office
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-white/90">
              {parentOffice.name} Branch | Khanna and Associates
            </p>
            <div className="flex items-center text-lg text-white/80 mb-8">
              <MapPin className="h-5 w-5 mr-2" />
              <address className="not-italic">
                {subOffice.address}, {subOffice.city || parentOffice.city}, {subOffice.country}
              </address>
            </div>
            
            {/* Parent office link */}
            <div className="flex items-center mb-8">
              <Home className="h-5 w-5 text-[#4BB4E6] mr-2" />
              <span className="text-white/80 mr-2">Main Office:</span>
              <Link 
                href={`/locations/${parentOffice.slug}`}
                className="text-[#4BB4E6] hover:text-white transition-colors underline"
              >
                {parentOffice.name} Office
              </Link>
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
                    Call Branch
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
                    About Our {subOffice.name} Branch
                  </h2>
                  {subOffice.about_office ? (
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">{subOffice.about_office}</p>
                  ) : (
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Our {subOffice.name} branch office extends the comprehensive legal services of Khanna and Associates 
                      to clients in the {subOffice.name} area. As part of our {parentOffice.name} office network, 
                      we provide local expertise with the backing of our full-service law firm.
                    </p>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-[#1a3c61] mb-2">Branch Office Benefits</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-3"></div>
                        Local presence with convenient access
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-3"></div>
                        Full support from our {parentOffice.name} main office
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-3"></div>
                        Access to our complete legal expertise network
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-3"></div>
                        Personalized service for local clients
                      </li>
                    </ul>
                  </div>
                </header>

                {/* Branch highlights */}
                <section className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">Branch Office Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subOffice.established && (
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-3">
                          <Building className="h-6 w-6 text-[#4BB4E6] mr-2" />
                          <h4 className="font-semibold text-[#1a3c61]">Established</h4>
                        </div>
                        <p className="text-gray-700 font-medium">{subOffice.established}</p>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <Home className="h-6 w-6 text-[#4BB4E6] mr-2" />
                        <h4 className="font-semibold text-[#1a3c61]">Main Office</h4>
                      </div>
                      <Link 
                        href={`/locations/${parentOffice.slug}`}
                        className="text-[#4BB4E6] hover:text-[#1a3c61] transition-colors font-medium"
                      >
                        {parentOffice.name} Office
                      </Link>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <Users className="h-6 w-6 text-[#4BB4E6] mr-2" />
                        <h4 className="font-semibold text-[#1a3c61]">Local Team</h4>
                      </div>
                      <p className="text-gray-700">Experienced local attorneys</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <Star className="h-6 w-6 text-[#4BB4E6] mr-2" />
                        <h4 className="font-semibold text-[#1a3c61]">Service Quality</h4>
                      </div>
                      <p className="text-gray-700">Same high standards as main office</p>
                    </div>
                  </div>
                </section>

                {/* Practice areas */}
                {(subOffice.practice_areas || parentOffice.practice_areas) && (
                  <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">
                      Legal Services at {subOffice.name}
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Our {subOffice.name} branch provides access to the full range of legal services offered by Khanna and Associates:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(subOffice.practice_areas || parentOffice.practice_areas || []).map((area, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="w-3 h-3 bg-[#4BB4E6] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-[#1a3c61] mb-1">{area}</h4>
                            <p className="text-sm text-gray-600">
                              Expert {area.toLowerCase()} services available at our {subOffice.name} branch
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Location and directions */}
                <section className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">
                    Visit Our {subOffice.name} Branch
                  </h3>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <div className="relative h-[400px] bg-gray-200">
                      <Image
                        src={mapImage}
                        alt={`Map showing location of Khanna and Associates ${subOffice.name} branch office`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        {subOffice.map_link && (
                          <Link 
                            href={subOffice.map_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-gray-100 text-[#1a3c61] px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                          >
                            <MapPin className="h-5 w-5 inline mr-2" />
                            View on Google Maps
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Branch-specific directions */}
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-[#1a3c61] mb-3">Getting to Our {subOffice.name} Branch</h4>
                    <p className="text-gray-700 mb-3">
                      Our {subOffice.name} branch is conveniently located at {subOffice.address}, 
                      providing easy access for clients in the {subOffice.name} area and surrounding neighborhoods.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="px-3 py-1 bg-white rounded-full text-gray-700">Local Parking</span>
                      <span className="px-3 py-1 bg-white rounded-full text-gray-700">Public Transport Access</span>
                      <span className="px-3 py-1 bg-white rounded-full text-gray-700">Accessible Entrance</span>
                    </div>
                  </div>
                </section>
              </article>

              {/* Enhanced sidebar for branch office */}
              <aside className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden sticky top-24">
                  {/* Branch contact information */}
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold mb-6 text-[#1a3c61]">Contact {subOffice.name} Branch</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-[#4BB4E6] mt-1 mr-3 flex-shrink-0" />
                        <address className="text-gray-700 not-italic">
                          <strong>{subOffice.name} Branch Office</strong><br />
                          {subOffice.address}<br />
                          {subOffice.city || parentOffice.city}, {subOffice.country}
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
                  {(subOffice.office_hours || parentOffice.office_hours) && (
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-lg font-semibold mb-4 text-[#1a3c61] flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Branch Hours
                      </h4>
                      <div className="space-y-3">
                        {(subOffice.office_hours || parentOffice.office_hours).weekdays && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Monday - Friday</span>
                            <span className="text-gray-800 font-semibold">
                              {(subOffice.office_hours || parentOffice.office_hours).weekdays}
                            </span>
                          </div>
                        )}
                        {(subOffice.office_hours || parentOffice.office_hours).saturday && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Saturday</span>
                            <span className="text-gray-800 font-semibold">
                              {(subOffice.office_hours || parentOffice.office_hours).saturday}
                            </span>
                          </div>
                        )}
                        {(subOffice.office_hours || parentOffice.office_hours).sunday ? (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Sunday</span>
                            <span className="text-gray-800 font-semibold">
                              {(subOffice.office_hours || parentOffice.office_hours).sunday}
                            </span>
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
                          Schedule Meeting
                        </Button>
                      </Link>
                      
                      {contactInfo?.phone && (
                        <Link href={`tel:${contactInfo.phone}`} className="block">
                          <Button variant="outline" className="w-full border-[#1a3c61] text-[#1a3c61] hover:bg-[#1a3c61] hover:text-white py-3">
                            <Phone className="h-5 w-5 mr-2" />
                            Call Branch Office
                          </Button>
                        </Link>
                      )}
                      
                      <Link href={`/locations/${parentOffice.slug}`} className="block">
                        <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3">
                          <Home className="h-5 w-5 mr-2" />
                          Main {parentOffice.name} Office
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Branch-specific info box */}
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#1a3c61] mb-3">Why Choose Our {subOffice.name} Branch?</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Convenient local access in {subOffice.name}
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Same quality service as our main office
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Full backing of our {parentOffice.name} team
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                      Local knowledge and expertise
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
              Get Expert Legal Help at Our {subOffice.name} Branch
            </h2>
            <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
              Experience the convenience of local service with the expertise of a full-service law firm. 
              Our {subOffice.name} branch provides personalized legal solutions backed by the complete 
              resources of Khanna and Associates.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link href="/contact" className="flex-1">
                <Button size="lg" className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full py-4 text-lg">
                  Schedule Consultation
                </Button>
              </Link>
              {contactInfo?.phone && (
                <Link href={`tel:${contactInfo.phone}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#1a3c61] w-full py-4 text-lg"
                  >
                    Call Branch
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Additional office info */}
            <div className="mt-12 text-center">
              <p className="text-white/80 mb-4">
                Need services not available at this branch? 
              </p>
              <Link 
                href={`/locations/${parentOffice.slug}`}
                className="inline-flex items-center text-[#4BB4E6] hover:text-white transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Visit our main {parentOffice.name} office
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}