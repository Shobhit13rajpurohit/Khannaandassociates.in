import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLocationBySlug, getLocations } from "@/lib/db"

export async function generateStaticParams() {
  const locations = await getLocations()
  return locations.map(location => ({
    location: location.slug,
  }))
}

export default async function LocationDetailPage({ params }: { params: { location: string } }) {
  const location = await getLocationBySlug(params.location)

  if (!location) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-[#1a3c61] text-white py-20">
       <Image
  src={location.imageUrl || "/placeholder.svg"} 
  alt={`${location.name} Office`}
  fill
  className="absolute inset-0 object-cover opacity-40"
/>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{location.name} Office</h1>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Contact Information</h2>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-[#1a3c61] mb-2">Address</h3>
                  <p className="text-gray-700">{location.address}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-[#1a3c61] mb-2">Contact</h4>
                  <p className="text-gray-700">{location.contact_info}</p>
                </div>
              </div>

              <div className="mt-8">
                <Link href={location.map_link} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">View on Map</Button>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Lawyers at this Location</h2>
              <p className="text-gray-600">
                No specific lawyers listed for this location yet. Please contact us for assistance.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white w-full">Contact This Office</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
