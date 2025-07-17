import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

interface LocationDetail {
  name: string
  image: string
  address: string
  phone: string
  email: string
  description: string
  hours: { day: string; time: string }[]
  mapLink: string
  lawyers: { name: string; title: string; slug: string }[]
}

const locationsData: { [key: string]: LocationDetail } = {
  delhi: {
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
    address: "123 Legal Avenue, Connaught Place, New Delhi, India, 110001",
    phone: "+91 11 2345 6789",
    email: "delhi@khannaandassociates.com",
    description:
      "Our flagship office in the capital, providing comprehensive legal services across all practice areas.",
    hours: [
      { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
      { day: "Saturday", time: "10:00 AM - 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    mapLink: "https://maps.app.goo.gl/exampledelhi",
    lawyers: [
      { name: "Priya Sharma", title: "Managing Partner", slug: "priya-sharma" },
      { name: "Rajesh Kumar", title: "Senior Partner", slug: "rajesh-kumar" },
    ],
  },
  mumbai: {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070",
    address: "456 Financial Tower, Bandra Kurla Complex, Mumbai, India, 400051",
    phone: "+91 22 7654 3210",
    email: "mumbai@khannaandassociates.com",
    description:
      "Our Mumbai office is a hub for corporate, banking, and finance law, serving the city's dynamic business landscape.",
    hours: [
      { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
      { day: "Saturday", time: "Closed" },
      { day: "Sunday", time: "Closed" },
    ],
    mapLink: "https://maps.app.goo.gl/examplemumbai",
    lawyers: [{ name: "Anjali Singh", title: "Partner, Corporate Law", slug: "anjali-singh" }],
  },
  bangalore: {
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2148",
    address: "789 Tech Park, Koramangala, Bangalore, India, 560034",
    phone: "+91 80 1234 5678",
    email: "bangalore@khannaandassociates.com",
    description:
      "Specializing in IT, intellectual property, and startup legal services, our Bangalore office supports the innovation ecosystem.",
    hours: [
      { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
      { day: "Saturday", time: "10:00 AM - 1:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    mapLink: "https://maps.app.goo.gl/examplebangalore",
    lawyers: [{ name: "Sneha Reddy", title: "Associate, Intellectual Property", slug: "sneha-reddy" }],
  },
  chennai: {
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1603262531080-9f24006f219f?q=80&w=2070",
    address: "101 Marina Drive, Mylapore, Chennai, India, 600004",
    phone: "+91 44 9876 5432",
    email: "chennai@khannaandassociates.com",
    description:
      "Our Chennai office provides expert legal services in real estate, maritime law, and dispute resolution.",
    hours: [
      { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
      { day: "Saturday", time: "Closed" },
      { day: "Sunday", time: "Closed" },
    ],
    mapLink: "https://maps.app.goo.gl/examplechennai",
    lawyers: [],
  },
  dehradun: {
    name: "Dehradun",
    image: "https://images.unsplash.com/photo-1596727147130-e2014f0f8e5d?q=80&w=2070",
    address: "202 Valley View, Rajpur Road, Dehradun, India, 248001",
    phone: "+91 135 1122 3344",
    email: "dehradun@khannaandassociates.com",
    description: "Serving the Himalayan region, our Dehradun office focuses on civil, family, and property law.",
    hours: [
      { day: "Monday - Friday", time: "9:30 AM - 5:30 PM" },
      { day: "Saturday", time: "Closed" },
      { day: "Sunday", time: "Closed" },
    ],
    mapLink: "https://maps.app.goo.gl/exampledehradun",
    lawyers: [],
  },
  jaipur: {
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
    address: "303 Pink City Chambers, C-Scheme, Jaipur, India, 302001",
    phone: "+91 141 5566 7788",
    email: "jaipur@khannaandassociates.com",
    description:
      "Our Jaipur office provides legal assistance in civil, criminal, and family law matters, serving the vibrant community of Rajasthan.",
    hours: [
      { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
      { day: "Saturday", time: "10:00 AM - 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    mapLink: "https://maps.app.goo.gl/examplejaipur",
    lawyers: [],
  },
  "new-york": {
    name: "New York",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070",
    address: "100 Wall Street, New York, NY 10005, USA",
    phone: "+1 212 555 1234",
    email: "newyork@khannaandassociates.com",
    description:
      "Our international office in New York facilitates cross-border transactions and provides legal support for global clients.",
    hours: [
      { day: "Monday - Friday", time: "9:00 AM - 5:00 PM" },
      { day: "Saturday", time: "Closed" },
      { day: "Sunday", time: "Closed" },
    ],
    mapLink: "https://maps.app.goo.gl/examplenewyork",
    lawyers: [],
  },
}

export default function LocationDetailPage({ params }: { params: { location: string } }) {
  const location = locationsData[params.location]

  if (!location) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-[#1a3c61] text-white py-20">
        <Image
          src={location.image || "/placeholder.svg"}
          alt={`${location.name} Office`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-40"
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{location.name} Office</h1>
          <p className="text-xl max-w-2xl mx-auto">{location.description}</p>
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
                  <h3 className="font-semibold text-[#1a3c61] mb-2">Phone</h3>
                  <p className="text-gray-700">{location.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a3c61] mb-2">Email</h3>
                  <p className="text-gray-700">{location.email}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-[#1a3c61] mb-4">Office Hours</h3>
                <div className="grid grid-cols-2 gap-2">
                  {location.hours.map((hour, index) => (
                    <React.Fragment key={index}>
                      <div className="text-gray-700">{hour.day}</div>
                      <div className="text-gray-700">{hour.time}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link href={location.mapLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">View on Map</Button>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Lawyers at this Location</h2>
              {location.lawyers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {location.lawyers.map((lawyer, index) => (
                    <Link href={`/firm-profile/team/${lawyer.slug}`} key={index} className="group">
                      <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=100&width=100`} // Placeholder for lawyer images
                            alt={lawyer.name}
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1a3c61]">{lawyer.name}</h4>
                          <p className="text-gray-600 text-sm">{lawyer.title}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  No specific lawyers listed for this location yet. Please contact us for assistance.
                </p>
              )}
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
