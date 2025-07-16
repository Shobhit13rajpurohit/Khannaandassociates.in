import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"

export default function LocationsPage() {
  const locations = [
    {
      city: "Delhi",
      country: "India",
      address: "123 Legal Avenue, New Delhi, 110001",
      phone: "+91 11 2345 6789",
      email: "delhi@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
      slug: "delhi",
    },
    {
      city: "Mumbai",
      country: "India",
      address: "456 Marine Drive, Mumbai, 400001",
      phone: "+91 22 2345 6789",
      email: "mumbai@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070",
      slug: "mumbai",
    },
    {
      city: "Bangalore",
      country: "India",
      address: "789 MG Road, Bangalore, 560001",
      phone: "+91 80 2345 6789",
      email: "bangalore@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2148",
      slug: "bangalore",
    },
    {
      city: "Jaipur",
      country: "India",
      address: "101 Pink City Road, Jaipur, 302001",
      phone: "+91 141 2345 6789",
      email: "jaipur@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070",
      slug: "jaipur",
    },
    {
      city: "Dehradun",
      country: "India",
      address: "202 Rajpur Road, Dehradun, 248001",
      phone: "+91 135 2345 6789",
      email: "dehradun@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070",
      slug: "dehradun",
    },
    {
      city: "Gurgaon",
      country: "India",
      address: "303 Cyber City, Gurgaon, 122001",
      phone: "+91 124 2345 6789",
      email: "gurgaon@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1586592707296-1fc0bc662df3?q=80&w=2070",
      slug: "gurgaon",
    },
    {
      city: "New York",
      country: "USA",
      address: "404 Madison Avenue, New York, NY 10022",
      phone: "+1 212 345 6789",
      email: "newyork@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070",
      slug: "new-york",
    },
    {
      city: "London",
      country: "UK",
      address: "505 Baker Street, London, W1U 8EW",
      phone: "+44 20 7946 0321",
      email: "london@khannaandassociates.com",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
      slug: "london",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Global Presence</h1>
            <p className="text-xl mb-8">
              With offices across India and international locations, we provide seamless legal services worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Our Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit one of our offices to meet with our experienced legal team. We have a global presence to serve
              clients worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={location.image || "/placeholder.svg"}
                    alt={`${location.city} Office`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{location.city}</h3>
                    <p className="text-white/80">{location.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#4BB4E6] mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-600">{location.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#4BB4E6] mr-2 flex-shrink-0" />
                      <p className="text-gray-600">{location.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-[#4BB4E6] mr-2 flex-shrink-0" />
                      <p className="text-gray-600">{location.email}</p>
                    </div>
                  </div>
                  <Link href={`/locations/${location.slug}`}>
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">View Office Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Our Global Network</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With strategic locations around the world, we provide comprehensive legal services to clients globally.
            </p>
          </div>

          <div className="relative h-[400px] md:h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1589519160732-57fc6fef1c34?q=80&w=2070"
              alt="World Map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#1a3c61]/10"></div>

            {/* Location Markers */}
            <div className="absolute top-[45%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-[#4BB4E6] rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-[#4BB4E6] rounded-full absolute top-0"></div>
            </div>
            <div className="absolute top-[30%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-[#4BB4E6] rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-[#4BB4E6] rounded-full absolute top-0"></div>
            </div>
            <div className="absolute top-[35%] left-[48%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-[#4BB4E6] rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-[#4BB4E6] rounded-full absolute top-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact our team of experienced attorneys at any of our global offices. We're here to help with your legal
            needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
              Schedule a Consultation
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
