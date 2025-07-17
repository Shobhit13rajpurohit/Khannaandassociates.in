import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Globe, Users, Building } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Law Firm in Delhi | Khanna and Associates - Legal Excellence",
  description:
    "Khanna and Associates is a premier law firm in Delhi offering comprehensive legal services across all practice areas. Visit our Delhi headquarters today.",
  keywords:
    "law firm in Delhi, top law firm in Delhi, legal services Delhi, attorneys in Delhi, lawyers in Delhi, Khanna and Associates Delhi",
  openGraph: {
    title: "Top Law Firm in Delhi | Khanna and Associates",
    description:
      "Premier law firm in Delhi offering comprehensive legal services across all practice areas since 1948.",
    url: "https://www.khannaandassociates.com/locations/delhi",
    siteName: "Khanna and Associates",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.khannaandassociates.com/locations/delhi",
  },
}

export default function DelhiOfficePage() {
  const officeData = {
    city: "Delhi",
    country: "India",
    address: "123 Legal Avenue, New Delhi, 110001",
    phone: "+91 11 2345 6789",
    email: "delhi@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2031",
    description:
      "Our Delhi office serves as the headquarters of Khanna and Associates, established in 1948. Located in the heart of New Delhi, our team of experienced attorneys provides comprehensive legal services across all practice areas.",
    teamSize: "50+ Attorneys",
    established: "1948",
    practiceAreas: [
      "Corporate and Commercial",
      "Litigation",
      "Intellectual Property",
      "Banking and Finance",
      "Real Estate",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Rajiv Khanna",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
      },
      {
        name: "Priya Sharma",
        position: "Managing Partner",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
      },
      {
        name: "Vikram Mehta",
        position: "Partner, Banking & Finance",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      },
    ],
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${officeData.image}')`,
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Law Firm in Delhi</h1>
            <p className="text-xl mb-8">Khanna and Associates | {officeData.country}</p>
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Our Delhi Office</h2>
              <p className="text-gray-700 mb-8">{officeData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Building className="h-6 w-6 text-[#4BB4E6] mr-2" />
                    <h3 className="font-semibold text-[#1a3c61]">Established</h3>
                  </div>
                  <p className="text-gray-700">{officeData.established}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Users className="h-6 w-6 text-[#4BB4E6] mr-2" />
                    <h3 className="font-semibold text-[#1a3c61]">Team Size</h3>
                  </div>
                  <p className="text-gray-700">{officeData.teamSize}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Globe className="h-6 w-6 text-[#4BB4E6] mr-2" />
                    <h3 className="font-semibold text-[#1a3c61]">Languages</h3>
                  </div>
                  <p className="text-gray-700">English, Hindi, Punjabi</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Practice Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {officeData.practiceAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                    <p className="text-gray-700">{area}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Key Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {officeData.teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#1a3c61]">{member.name}</h4>
                      <p className="text-gray-600 text-sm">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Location</h3>
              <div className="rounded-lg overflow-hidden h-[400px] relative mb-8">
                <Image
                  src={officeData.mapImage || "/placeholder.svg"}
                  alt={`Map of ${officeData.city} Office`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link href={`https://maps.google.com/?q=${encodeURIComponent(officeData.address)}`} target="_blank">
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">View on Google Maps</Button>
                  </Link>
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
                      <p className="text-gray-700">{officeData.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{officeData.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{officeData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Monday - Friday:</p>
                      <p className="text-gray-700 font-medium">{officeData.officeHours.weekdays}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Saturday:</p>
                      <p className="text-gray-700 font-medium">{officeData.officeHours.saturday}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Sunday:</p>
                      <p className="text-gray-700 font-medium">{officeData.officeHours.sunday}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-3">
                    Schedule a Consultation
                  </Button>
                  <Button variant="outline" className="w-full border-[#1a3c61] text-[#1a3c61]">
                    Contact This Office
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Our Delhi Office Today</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experienced attorneys in Delhi is ready to help you navigate your legal challenges. Contact us
            today for a consultation.
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
