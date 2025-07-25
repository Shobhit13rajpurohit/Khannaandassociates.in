import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import IndiaPresence from "@/components/india-presence"
import { getLocations } from "@/lib/db"

export default async function LocationsPage() {
  const locations = await getLocations()

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Our Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the nearest Khanna and Associates office to you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Link href={`/locations/${location.slug}`} key={index} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      src={location.map_link || "/placeholder.svg"}
                      alt={location.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-2xl font-semibold text-white">{location.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">{location.address}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
