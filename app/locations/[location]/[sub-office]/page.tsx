// Optimized location detail page
export const dynamic = 'force-dynamic'

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLocationBySlug, getLocations } from "@/lib/db"
import { MapPin, Phone, Mail, Globe, Users, Building } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { location: string, "sub-office": string } }): Promise<Metadata> {
  const location = await getLocationBySlug(params["sub-office"])
  if (!location) {
    return {
      title: "Location Not Found",
      description: "The requested location could not be found.",
    }
  }

  return {
    title: `Top Law Firm in ${location.name} | Khanna and Associates`,
    description: `Khanna and Associates is a premier law firm in ${location.name} offering comprehensive legal services. Visit our ${location.name} office today.`,
    keywords: `law firm in ${location.name}, top law firm in ${location.name}, legal services ${location.name}, attorneys in ${location.name}, lawyers in ${location.name}, Khanna and Associates ${location.name}`,
    openGraph: {
      title: `Top Law Firm in ${location.name} | Khanna and Associates`,
      description: `Premier law firm in ${location.name} offering comprehensive legal services.`,
      url: `https://k-a-in-git-main-shobhits-projects-3b5979eb.vercel.app/locations/${params.location}/${location.slug}`,
      siteName: "Khanna and Associates",
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://k-a-in-git-main-shobhits-projects-3b5979eb.vercel.app/locations/${params.location}/${location.slug}`,
    },
  }
}

// Enable static generation for better performance
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

export default async function SubOfficeDetailPage({ params }: { params: { location: string, "sub-office": string } }) {
  const location = await getLocationBySlug(params["sub-office"])

  if (!location) {
    notFound()
  }

  // Optimize image loading
  const mapImage = location.map_image || "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2031"
  const heroImage = location.imageUrl || "/placeholder.svg"

  // Ensure contact_info is properly typed
  const contactInfo = typeof location.contact_info === 'string' 
    ? JSON.parse(location.contact_info) 
    : location.contact_info

  return (
    <div className="min-h-screen">
      {/* Hero Section with optimized background */}
      <section className="relative bg-[#1a3c61] text-white">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={`${location.name} office`}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Law Firm in {location.name}</h1>
            <p className="text-xl mb-8">Khanna and Associates | {location.country}</p>
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Our {location.name} Office</h2>
              {location.about_office && (
                <p className="text-gray-700 mb-8">{location.about_office}</p>
              )}

              {location.established && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Building className="h-6 w-6 text-[#4BB4E6] mr-2" />
                      <h3 className="font-semibold text-[#1a3c61]">Established</h3>
                    </div>
                    <p className="text-gray-700">{location.established}</p>
                  </div>
                </div>
              )}

              {location.practice_areas && location.practice_areas.length > 0 && (
                <>
                  <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Practice Areas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {location.practice_areas.map((area, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                        <p className="text-gray-700">{area}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Location</h3>
              <div className="rounded-lg overflow-hidden h-[400px] relative mb-8">
                <Image
                  src={mapImage}
                  alt={`Map of ${location.name} Office`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {location.map_link && (
                    <Link href={location.map_link} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">
                        View on Google Maps
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#4BB4E6] mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{location.address}, {location.city}, {location.country}</p>
                    </div>
                    {contactInfo && typeof contactInfo === 'object' && (
                      <>
                        {contactInfo.phone && (
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                            <p className="text-gray-700">{contactInfo.phone}</p>
                          </div>
                        )}
                        {contactInfo.email && (
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                            <p className="text-gray-700">{contactInfo.email}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {location.office_hours && (
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Office Hours</h3>
                    <div className="space-y-2">
                      {location.office_hours.weekdays && (
                        <div className="flex justify-between">
                          <p className="text-gray-600">Monday - Friday:</p>
                          <p className="text-gray-700 font-medium">{location.office_hours.weekdays}</p>
                        </div>
                      )}
                      {location.office_hours.saturday && (
                        <div className="flex justify-between">
                          <p className="text-gray-600">Saturday:</p>
                          <p className="text-gray-700 font-medium">{location.office_hours.saturday}</p>
                        </div>
                      )}
                      {location.office_hours.sunday && (
                        <div className="flex justify-between">
                          <p className="text-gray-600">Sunday:</p>
                          <p className="text-gray-700 font-medium">{location.office_hours.sunday}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <Link href="/contact">
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-3">
                      Schedule a Consultation
                    </Button>
                  </Link>
                  {contactInfo && typeof contactInfo === 'object' && contactInfo.email && (
                    <Link href={`mailto:${contactInfo.email}`}>
                      <Button variant="outline" className="w-full border-[#1a3c61] text-[#1a3c61]">
                        Contact This Office
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Our {location.name} Office Today</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experienced attorneys in {location.name} is ready to help you navigate your legal challenges. Contact us today for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
                Schedule a Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
