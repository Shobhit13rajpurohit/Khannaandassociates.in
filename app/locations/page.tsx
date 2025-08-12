// Optimized locations page with performance improvements
export const dynamic = 'force-dynamic';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import IndiaPresence from "@/components/india-presence"
import { getLocations } from "@/lib/db"
import { Suspense } from "react"
import type { Location } from "@/lib/db"

// Loading component for better UX
function LocationsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Separate component for locations grid
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

  return (
    <div className="space-y-12">
      {hierarchicalLocations.map((location) => (
        <div key={location.id}>
          <Link href={`/locations/${location.slug}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={location.imageUrl || "/placeholder.svg"}
                  alt={location.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white">{location.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-lg line-clamp-2">{location.address}</p>
              </div>
            </div>
          </Link>
          {location.sub_offices && location.sub_offices.length > 0 && (
            <div className="mt-8">
              <h4 className="text-2xl font-bold text-[#1a3c61] mb-4 ml-4">Sub-Offices</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {location.sub_offices.map((subOffice) => (
                  <Link href={`/locations/${location.slug}/${subOffice.slug}`} key={subOffice.id} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48 w-full">
                        <Image
                          src={subOffice.imageUrl || "/placeholder.svg"}
                          alt={subOffice.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-2xl font-semibold text-white">{subOffice.name}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 line-clamp-2">{subOffice.address}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default async function LocationsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-[#1a3c61] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Global Presence</h1>
          <p className="text-xl max-w-2xl mx-auto">
            With offices in key cities across India and an international presence, we are strategically positioned to
            serve your legal needs worldwide.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Suspense fallback={<LocationsLoading />}>
            <LocationsGrid />
          </Suspense>
        </div>
      </section>

      <IndiaPresence />

      <section className="py-16 bg-[#4BB4E6] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Can't Find an Office Near You?</h2>
          <p className="text-lg mb-8">Our legal experts are available for virtual consultations. Contact us today.</p>
          <Link href="/contact">
            <Button variant="outline" className="bg-white text-[#4BB4E6] hover:bg-[#1a3c61] hover:text-white">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
