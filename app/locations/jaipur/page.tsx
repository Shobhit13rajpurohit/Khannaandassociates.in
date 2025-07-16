import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Globe, Users, Building } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Law Firm in Jaipur | Khanna and Associates - Legal Excellence",
  description:
    "Khanna and Associates is a top-rated law firm in Jaipur offering expert legal services in real estate, heritage property matters, and tourism law. Visit our Jaipur office today.",
  keywords:
    "law firm in Jaipur, best law firm in Jaipur, top law firm in Jaipur, legal services Jaipur, attorneys in Jaipur, lawyers in Jaipur, Khanna and Associates Jaipur",
  openGraph: {
    title: "Best Law Firm in Jaipur | Khanna and Associates",
    description:
      "Top-rated law firm in Jaipur offering expert legal services in real estate, heritage property matters, and tourism law.",
    url: "https://www.khannaandassociates.com/locations/jaipur",
    siteName: "Khanna and Associates",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.khannaandassociates.com/locations/jaipur",
  },
}

export default function JaipurOfficePage() {
  const officeData = {
    city: "Jaipur",
    country: "India",
    address: "101 Pink City Road, Jaipur, 302001",
    phone: "+91 141 2345 6789",
    email: "jaipur@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070",
    description:
      "Our Jaipur office specializes in real estate law, heritage property matters, and tourism law. Located in the historic Pink City, our team provides expert legal counsel to businesses and individuals.",
    teamSize: "15+ Attorneys",
    established: "2005",
    practiceAreas: [
      "Real Estate",
      "Heritage Property Law",
      "Tourism Law",
      "Commercial Contracts",
      "Dispute Resolution",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Deepak Sharma",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
      },
      {
        name: "Sunita Agarwal",
        position: "Partner, Real Estate",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Best Law Firm in Jaipur</h1>
            <p className="text-xl mb-8">Khanna and Associates | {officeData.country}</p>
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Our Jaipur Office</h2>
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
                  <p className="text-gray-700">English, Hindi, Rajasthani</p>
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
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Why Choose Our Jaipur Office</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Local Expertise</h3>
              <p className="text-gray-600">
                Our team has deep knowledge of Jaipur's legal landscape and business environment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Heritage Property Specialists</h3>
              <p className="text-gray-600">
                Specialized expertise in heritage property laws unique to Jaipur and Rajasthan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Tourism Industry Focus</h3>
              <p className="text-gray-600">
                Dedicated legal support for Jaipur's thriving tourism and hospitality sector.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Central Location</h3>
              <p className="text-gray-600">
                Conveniently located in the heart of Jaipur for easy access to courts and business districts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">What Our Jaipur Clients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
                    alt="Rajesh Agarwal"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#1a3c61]">Rajesh Agarwal</h4>
                  <p className="text-sm text-gray-500">Real Estate Developer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Khanna and Associates provided exceptional legal counsel during our heritage property acquisition.
                Their expertise in Jaipur's real estate laws was invaluable."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974"
                    alt="Priya Sharma"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#1a3c61]">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Hotel Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a hotel owner in Jaipur, I've relied on Khanna and Associates for all my legal needs. Their
                understanding of tourism laws has helped my business thrive."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974"
                    alt="Vikram Singh"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#1a3c61]">Vikram Singh</h4>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The team at Khanna and Associates in Jaipur has been our trusted legal partner for over a decade. Their
                commercial contract expertise is second to none."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Our Jaipur Office Today</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experienced attorneys in Jaipur is ready to help you navigate your legal challenges. Contact us
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
