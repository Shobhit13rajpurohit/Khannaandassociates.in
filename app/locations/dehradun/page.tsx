import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Globe, Users, Building } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leading Law Firm in Dehradun | Khanna and Associates - Legal Excellence",
  description:
    "Khanna and Associates is a premier law firm in Dehradun specializing in environmental law, forest rights, and land acquisition matters. Visit our Dehradun office today.",
  keywords:
    "law firm in Dehradun, legal services Dehradun, attorneys in Dehradun, lawyers in Dehradun, Khanna and Associates Dehradun, environmental law Dehradun",
  openGraph: {
    title: "Leading Law Firm in Dehradun | Khanna and Associates",
    description:
      "Premier law firm in Dehradun specializing in environmental law, forest rights, and land acquisition matters.",
    url: "https://www.khannaandassociates.com/locations/dehradun",
    siteName: "Khanna and Associates",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.khannaandassociates.com/locations/dehradun",
  },
}

export default function DehradunOfficePage() {
  const officeData = {
    city: "Dehradun",
    country: "India",
    address: "202 Rajpur Road, Dehradun, 248001",
    phone: "+91 135 2345 6789",
    email: "dehradun@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070",
    description:
      "Our Dehradun office focuses on environmental law, forest rights, and land acquisition matters. Located in the serene capital of Uttarakhand, our team works on cases related to natural resources and environmental protection.",
    teamSize: "10+ Attorneys",
    established: "2010",
    practiceAreas: [
      "Environmental Law",
      "Forest Rights",
      "Land Acquisition",
      "Natural Resources",
      "Administrative Law",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Alok Rawat",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921",
      },
      {
        name: "Nandini Joshi",
        position: "Partner, Environmental Law",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Leading Law Firm in Dehradun</h1>
            <p className="text-xl mb-8">Khanna and Associates | {officeData.country}</p>
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Our Dehradun Office</h2>
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
                  <p className="text-gray-700">English, Hindi, Garhwali</p>
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

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Why Choose Our Dehradun Office</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Environmental Expertise</h3>
              <p className="text-gray-600">
                Specialized knowledge in environmental laws and regulations specific to Uttarakhand.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Forest Rights Specialists</h3>
              <p className="text-gray-600">
                Deep understanding of forest rights and land acquisition laws in hill states.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Local Connections</h3>
              <p className="text-gray-600">
                Strong relationships with local authorities and regulatory bodies in Dehradun.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Strategic Location</h3>
              <p className="text-gray-600">
                Conveniently located on Rajpur Road with easy access to courts and government offices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Our Dehradun Office Today</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experienced attorneys in Dehradun is ready to help you navigate your legal challenges. Contact
            us today for a consultation.
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
