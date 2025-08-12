"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Building, Globe, Users, Award, ArrowRight } from "lucide-react"

interface CityOffice {
  city: string
  type: "metro" | "service" | "assistance"
  path: string
  state?: string
  description?: string
  established?: string
  specialties?: string[]
}

export default function IndiaPresence() {
  const [activeTab, setActiveTab] = useState<string>("all")

  // Enhanced city data with SEO-friendly information
  const metroOffices: CityOffice[] = [
    { 
      city: "Delhi", 
      type: "metro", 
      path: "/locations/delhi",
      state: "Delhi",
      description: "Headquarters with full-service legal practice",
      established: "2010",
      specialties: ["Corporate Law", "Criminal Law", "Civil Litigation"]
    },
    { 
      city: "Mumbai", 
      type: "metro", 
      path: "/locations/mumbai",
      state: "Maharashtra", 
      description: "Financial capital office specializing in corporate law",
      established: "2015",
      specialties: ["Corporate Law", "Banking Law", "Securities Law"]
    },
    { 
      city: "Bangalore", 
      type: "metro", 
      path: "/locations/bangalore",
      state: "Karnataka",
      description: "Technology hub office for IP and corporate matters",
      established: "2017",
      specialties: ["Intellectual Property", "Technology Law", "Corporate Law"]
    },
    { 
      city: "Chennai", 
      type: "metro", 
      path: "/locations/chennai",
      state: "Tamil Nadu",
      description: "South India headquarters for regional legal services",
      established: "2018",
      specialties: ["Maritime Law", "Corporate Law", "Real Estate"]
    },
    { 
      city: "Kolkata", 
      type: "metro", 
      path: "/locations/kolkata",
      state: "West Bengal",
      description: "Eastern India office for comprehensive legal services",
      established: "2019",
      specialties: ["Commercial Law", "Labor Law", "Family Law"]
    },
  ]

  const serviceOffices: CityOffice[] = [
    { 
      city: "Jaipur", 
      type: "service", 
      path: "/locations/jaipur",
      state: "Rajasthan",
      description: "Rajasthan service office for regional legal matters",
      specialties: ["Property Law", "Family Law", "Criminal Defense"]
    },
    { 
      city: "Pune", 
      type: "service", 
      path: "/locations/pune",
      state: "Maharashtra",
      description: "Western Maharashtra legal services hub",
      specialties: ["Corporate Law", "Real Estate", "Employment Law"]
    },
    { 
      city: "Hyderabad", 
      type: "service", 
      path: "/locations/hyderabad",
      state: "Telangana",
      description: "Telangana service center for technology and corporate law",
      specialties: ["Technology Law", "Corporate Law", "IP Law"]
    },
    { 
      city: "Ahmedabad", 
      type: "service", 
      path: "/locations/ahmedabad",
      state: "Gujarat",
      description: "Gujarat's commercial capital legal services",
      specialties: ["Commercial Law", "Tax Law", "Corporate Law"]
    },
  ]

  const assistanceCities: CityOffice[] = [
    { city: "Chandigarh", type: "assistance", path: "/lawyers-in-chandigarh", state: "Punjab/Haryana" },
    { city: "Lucknow", type: "assistance", path: "/lawyers-in-lucknow", state: "Uttar Pradesh" },
    { city: "Goa", type: "assistance", path: "/lawyers-in-goa", state: "Goa" },
    { city: "Dehradun", type: "assistance", path: "/locations/dehradun", state: "Uttarakhand" },
    { city: "Indore", type: "assistance", path: "/lawyers-in-indore", state: "Madhya Pradesh" },
    { city: "Bhopal", type: "assistance", path: "/lawyers-in-bhopal", state: "Madhya Pradesh" },
    { city: "Patna", type: "assistance", path: "/lawyers-in-patna", state: "Bihar" },
    { city: "Guwahati", type: "assistance", path: "/lawyers-in-guwahati", state: "Assam" },
    { city: "Kochi", type: "assistance", path: "/lawyers-in-kochi", state: "Kerala" },
    { city: "Nagpur", type: "assistance", path: "/lawyers-in-nagpur", state: "Maharashtra" },
    { city: "Surat", type: "assistance", path: "/lawyers-in-surat", state: "Gujarat" },
    { city: "Vadodara", type: "assistance", path: "/lawyers-in-vadodara", state: "Gujarat" },
  ]

  const allCities = [...metroOffices, ...serviceOffices, ...assistanceCities]

  const displayCities =
    activeTab === "all"
      ? allCities
      : activeTab === "metro"
        ? metroOffices
        : activeTab === "service"
          ? serviceOffices
          : assistanceCities

  // Generate structured data for organization locations
  const generateLocationStructuredData = () => {
    const locationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Khanna and Associates",
      "alternateName": "Khanna & Associates Law Firm",
      "description": "Leading law firm with pan-India presence across 70+ cities, providing comprehensive legal services through metro offices, service centers, and local assistance networks.",
      "url": "https:/khannaassociates.in",
      "logo": "https:/khannaassociates.in/logo.png",
      "foundingDate": "2010",
      "foundingLocation": {
        "@type": "Place",
        "name": "Delhi, India"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "100+"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "India"
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 20.5937,
          "longitude": 78.9629
        },
        "geoRadius": "2000000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Legal Services Across India",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Metro City Legal Services",
              "description": "Full-service legal practice in major metropolitan cities"
            },
            "areaServed": metroOffices.map(office => ({
              "@type": "City",
              "name": office.city,
              "addressRegion": office.state,
              "addressCountry": "IN"
            }))
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Regional Legal Services",
              "description": "Specialized legal services in key regional centers"
            },
            "areaServed": serviceOffices.map(office => ({
              "@type": "City",
              "name": office.city,
              "addressRegion": office.state,
              "addressCountry": "IN"
            }))
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Local Legal Assistance",
              "description": "Legal assistance and consultation in tier-2 and tier-3 cities"
            },
            "areaServed": assistanceCities.map(office => ({
              "@type": "City",
              "name": office.city,
              "addressRegion": office.state,
              "addressCountry": "IN"
            }))
          }
        ]
      },
      "location": [
        ...metroOffices.map(office => ({
          "@type": "Place",
          "name": `Khanna and Associates ${office.city} Office`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": office.city,
            "addressRegion": office.state,
            "addressCountry": "IN"
          },
          "url": `https:/khannaassociates.in${office.path}`
        })),
        ...serviceOffices.map(office => ({
          "@type": "Place",
          "name": `Khanna and Associates ${office.city} Service Office`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": office.city,
            "addressRegion": office.state,
            "addressCountry": "IN"
          },
          "url": `https:/khannaassociates.in${office.path}`
        }))
      ],
      "sameAs": [
        "https://www.linkedin.com/company/khanna-associates",
        "https://twitter.com/khannaassoc",
        "https://www.facebook.com/khannaassociates"
      ]
    }

    return JSON.stringify(locationData)
  }

  return (
    <section className="py-16 bg-gray-50" itemScope itemType="https://schema.org/Organization">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateLocationStructuredData()
        }}
      />

      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a3c61]">
            Pan-India Legal Network
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
            Established in Delhi in 2010, Khanna and Associates has grown into India's leading law firm network. 
            With offices in 5 metro cities, service centers in 4 regional hubs, and legal assistance available 
            in 70+ cities across India, we bring expert legal services closer to you.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2 text-[#4BB4E6]" />
              <span>Since 2010</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-[#4BB4E6]" />
              <span>100+ Legal Experts</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-[#4BB4E6]" />
              <span>70+ Cities Coverage</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Office Statistics and Navigation */}
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="space-y-6">
              <article className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a3c61] to-[#4BB4E6] flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl font-bold text-white">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3c61] mb-2">Metro City Offices</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Full-service legal offices in Delhi (HQ), Mumbai, Bangalore, Chennai, and Kolkata 
                    providing comprehensive legal solutions for individuals and businesses.
                  </p>
                </div>
              </article>

              <article className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4BB4E6] to-[#1a3c61] flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3c61] mb-2">Regional Service Centers</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Specialized service offices in Jaipur, Pune, Hyderabad, and Ahmedabad offering 
                    focused legal services for regional clients and businesses.
                  </p>
                </div>
              </article>

              <article className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4BB4E6] to-[#1a3c61] flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-xl font-bold text-white">70+</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3c61] mb-2">Cities with Legal Assistance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Extensive network of 100+ experienced legal associates across India, 
                    enabling us to provide legal assistance in over 70 cities nationwide.
                  </p>
                </div>
              </article>
            </div>

            {/* Interactive Navigation */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Explore Our Locations</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={activeTab === "all" ? "default" : "outline"}
                  className={`${activeTab === "all" ? "bg-[#1a3c61] hover:bg-[#4BB4E6]" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("all")}
                  aria-label="Show all office locations"
                >
                  All Locations ({allCities.length})
                </Button>
                <Button
                  variant={activeTab === "metro" ? "default" : "outline"}
                  className={`${activeTab === "metro" ? "bg-[#1a3c61] hover:bg-[#4BB4E6]" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("metro")}
                  aria-label="Show metro city offices"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Metro Offices ({metroOffices.length})
                </Button>
                <Button
                  variant={activeTab === "service" ? "default" : "outline"}
                  className={`${activeTab === "service" ? "bg-[#1a3c61] hover:bg-[#4BB4E6]" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("service")}
                  aria-label="Show service center offices"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Service Centers ({serviceOffices.length})
                </Button>
                <Button
                  variant={activeTab === "assistance" ? "default" : "outline"}
                  className={`${activeTab === "assistance" ? "bg-[#1a3c61] hover:bg-[#4BB4E6]" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("assistance")}
                  aria-label="Show cities with legal assistance"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Legal Assistance ({assistanceCities.length})
                </Button>
              </div>

              {/* City Grid with Enhanced Information */}
              <div className="space-y-4">
                {activeTab === "metro" && (
                  <div className="space-y-3">
                    {metroOffices.map((office, index) => (
                      <Link
                        key={index}
                        href={office.path}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-[#4BB4E6] hover:shadow-md transition-all group"
                        aria-label={`Visit ${office.city} office page`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-[#1a3c61] group-hover:text-[#4BB4E6] transition-colors">
                              {office.city} Office
                            </h4>
                            <p className="text-sm text-gray-600">{office.state}</p>
                            {office.description && (
                              <p className="text-sm text-gray-500 mt-1">{office.description}</p>
                            )}
                            {office.specialties && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {office.specialties.slice(0, 2).map((specialty, i) => (
                                  <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#4BB4E6] transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {activeTab === "service" && (
                  <div className="space-y-3">
                    {serviceOffices.map((office, index) => (
                      <Link
                        key={index}
                        href={office.path}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-[#4BB4E6] hover:shadow-md transition-all group"
                        aria-label={`Visit ${office.city} service office page`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-[#1a3c61] group-hover:text-[#4BB4E6] transition-colors">
                              {office.city} Service Center
                            </h4>
                            <p className="text-sm text-gray-600">{office.state}</p>
                            {office.description && (
                              <p className="text-sm text-gray-500 mt-1">{office.description}</p>
                            )}
                            {office.specialties && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {office.specialties.slice(0, 2).map((specialty, i) => (
                                  <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#4BB4E6] transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {(activeTab === "assistance" || activeTab === "all") && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(activeTab === "all" ? allCities : assistanceCities).map((city, index) => (
                      <Link
                        key={index}
                        href={city.path}
                        className={`px-3 py-3 rounded-lg text-center transition-all hover:shadow-md group ${
                          city.type === "metro"
                            ? "bg-[#1a3c61] text-white hover:bg-[#4BB4E6]"
                            : city.type === "service"
                              ? "bg-[#4BB4E6] text-white hover:bg-[#1a3c61]"
                              : "bg-gray-100 text-[#1a3c61] hover:bg-gray-200 border border-gray-200"
                        }`}
                        aria-label={`Find lawyers in ${city.city}`}
                      >
                        <div className="font-medium">{city.city}</div>
                        {city.state && (
                          <div className="text-xs opacity-80 mt-1">{city.state}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* India Map Visualization */}
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#1a3c61] mb-4 text-center">
                Our Pan-India Legal Network
              </h3>
              <div className="relative">
                <Image
                  src="/images/india-map.png"
                  alt="Khanna and Associates law firm offices across India - Delhi, Mumbai, Bangalore, Chennai, Kolkata, Jaipur, Pune, Hyderabad, Ahmedabad and 70+ cities"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  priority={false}
                  loading="lazy"
                />
                
                {/* Map Legend */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#1a3c61] rounded-full mr-2"></div>
                      <span>Metro Offices (5)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#4BB4E6] rounded-full mr-2"></div>
                      <span>Service Centers (4)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                      <span>Legal Assistance (70+)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-6 bg-gradient-to-r from-[#1a3c61] to-[#4BB4E6] p-6 rounded-lg text-white text-center">
              <h3 className="text-lg font-semibold mb-2">Need Legal Assistance?</h3>
              <p className="text-sm mb-4 opacity-90">
                Find our nearest office or get connected with local legal experts in your city
              </p>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="bg-white text-[#1a3c61] hover:bg-gray-100 border-white"
                >
                  Contact Us Today
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional SEO Content */}
        <footer className="mt-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-[#1a3c61] mb-4">
              Why Choose Khanna and Associates for Legal Services Across India?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-[#1a3c61] mb-2">Local Expertise</h4>
                <p>Deep understanding of local laws and regulations in each state and city we serve.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1a3c61] mb-2">Consistent Quality</h4>
                <p>Same high standards of legal service delivery across all our offices and service centers.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1a3c61] mb-2">Comprehensive Coverage</h4>
                <p>From metro cities to tier-2 towns, we ensure legal assistance is always within reach.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}