import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Users, Building, Award } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Lawyers in Malviya Nagar, Jaipur | Khanna and Associates",
  description:
    "Looking for expert legal services in Malviya Nagar, Jaipur? Khanna and Associates offers specialized legal counsel for real estate, corporate law, family matters, and civil litigation.",
  keywords:
    "lawyers in Malviya Nagar, attorneys Malviya Nagar Jaipur, legal services Malviya Nagar, best law firm Malviya Nagar, real estate lawyer Jaipur, corporate law Malviya Nagar",
  openGraph: {
    title: "Top Lawyers in Malviya Nagar, Jaipur | Khanna and Associates",
    description:
      "Expert legal services in Malviya Nagar, Jaipur for real estate, corporate law, family matters, and civil litigation.",
    url: "https://www.khannaandassociates.com/locations/jaipur/malviya-nagar",
    siteName: "Khanna and Associates",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.khannaandassociates.com/locations/jaipur/malviya-nagar",
  },
}

export default function MalviyaNagarPage() {
  const officeData = {
    name: "Malviya Nagar",
    address: "204, Crystal Mall, Malviya Nagar, Jaipur, 302017",
    phone: "+91 141 4072 890",
    email: "malviyanagar@khannaandassociates.com",
    image: "/placeholder.svg?height=600&width=1200",
    mapImage: "/placeholder.svg?height=400&width=600",
    description:
      "Our Malviya Nagar office serves one of Jaipur's most prestigious residential and commercial areas, providing expert legal services to businesses and individuals in this thriving locality. Located in the heart of Malviya Nagar, our office is easily accessible and equipped with modern facilities to serve our clients efficiently.",
    established: "2010",
    teamSize: "12+ Attorneys",
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    practiceAreas: [
      "Real Estate Law",
      "Corporate Law",
      "Family Law",
      "Civil Litigation",
      "Documentation",
      "Legal Consultation",
    ],
    teamMembers: [
      {
        name: "Rajesh Sharma",
        position: "Senior Partner",
        image: "/placeholder.svg?height=300&width=300",
        expertise: "Real Estate Law",
      },
      {
        name: "Priya Agarwal",
        position: "Partner",
        image: "/placeholder.svg?height=300&width=300",
        expertise: "Corporate Law",
      },
      {
        name: "Vikram Singh",
        position: "Associate",
        image: "/placeholder.svg?height=300&width=300",
        expertise: "Civil Litigation",
      },
    ],
    nearbyAreas: [
      "Jawahar Nagar",
      "Malviya Nagar Sector 1-13",
      "Gaurav Tower Area",
      "Ridhi Sidhi Crossing",
      "Fortis Hospital Area",
    ],
    testimonials: [
      {
        name: "Suresh Goyal",
        position: "Business Owner",
        image: "/placeholder.svg?height=100&width=100",
        text: "The team at Khanna and Associates in Malviya Nagar provided exceptional legal support for my business. Their expertise in corporate law helped me navigate complex regulatory issues with ease.",
      },
      {
        name: "Meena Kumari",
        position: "Homeowner",
        image: "/placeholder.svg?height=100&width=100",
        text: "I approached Khanna and Associates for a property dispute in Malviya Nagar. Their real estate lawyers were knowledgeable and resolved my case efficiently. Highly recommended!",
      },
      {
        name: "Rahul Jain",
        position: "Entrepreneur",
        image: "/placeholder.svg?height=100&width=100",
        text: "The documentation services provided by Khanna and Associates in Malviya Nagar were thorough and professional. They ensured all my business contracts were legally sound.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Lawyers in Malviya Nagar, Jaipur</h1>
            <p className="text-xl mb-8">Expert legal services in one of Jaipur's premier neighborhoods</p>
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Our Malviya Nagar Office</h2>
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
                    <Award className="h-6 w-6 text-[#4BB4E6] mr-2" />
                    <h3 className="font-semibold text-[#1a3c61]">Recognition</h3>
                  </div>
                  <p className="text-gray-700">Top Rated in Malviya Nagar</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Our Legal Services in Malviya Nagar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {officeData.practiceAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                    <p className="text-gray-700">{area}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Our Legal Team in Malviya Nagar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {officeData.teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#1a3c61]">{member.name}</h4>
                      <p className="text-gray-600 text-sm">{member.position}</p>
                      <p className="text-[#4BB4E6] text-sm mt-1">{member.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Areas We Serve Near Malviya Nagar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                {officeData.nearbyAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                    <p className="text-gray-700">{area}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Location</h3>
              <div className="rounded-lg overflow-hidden h-[400px] relative mb-8">
                <Image
                  src={officeData.mapImage || "/placeholder.svg"}
                  alt={`Map of ${officeData.name} Office`}
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">What Our Clients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeData.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#1a3c61]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">
                  What legal services do you offer in Malviya Nagar?
                </h3>
                <p className="text-gray-700">
                  Our Malviya Nagar office provides comprehensive legal services including real estate law, corporate
                  law, family law, civil litigation, documentation, and general legal consultation.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">
                  How can I schedule an appointment with your Malviya Nagar office?
                </h3>
                <p className="text-gray-700">
                  You can schedule an appointment by calling our office at {officeData.phone}, sending an email to{" "}
                  {officeData.email}, or using the online appointment form on our website.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Do you serve areas near Malviya Nagar?</h3>
                <p className="text-gray-700">
                  Yes, we serve all areas in and around Malviya Nagar, including Jawahar Nagar, all sectors of Malviya
                  Nagar, Gaurav Tower Area, Ridhi Sidhi Crossing, and the Fortis Hospital Area.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">
                  What are your office hours in Malviya Nagar?
                </h3>
                <p className="text-gray-700">
                  Our Malviya Nagar office is open Monday to Friday from {officeData.officeHours.weekdays}, Saturday
                  from {officeData.officeHours.saturday}, and closed on Sundays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance in Malviya Nagar?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experienced attorneys at Malviya Nagar is ready to help you with all your legal needs. Contact
            us today for expert legal counsel.
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
