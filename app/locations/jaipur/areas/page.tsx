import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Law Firm in Jaipur | Legal Services in All Areas of Jaipur | Khanna and Associates",
  description:
    "Looking for top lawyers in Jaipur? Khanna and Associates provides expert legal services across all areas of Jaipur including Malviya Nagar, Vaishali Nagar, and Mansarovar.",
  keywords:
    "lawyers in Jaipur, law firm Jaipur, legal services Jaipur, Malviya Nagar lawyers, Vaishali Nagar attorneys, Mansarovar legal services, best lawyers in Jaipur",
  openGraph: {
    title: "Best Law Firm in Jaipur | Legal Services in All Areas of Jaipur",
    description:
      "Expert legal services across all areas of Jaipur including Malviya Nagar, Vaishali Nagar, and Mansarovar.",
    url: "https://www.khannaandassociates.com/locations/jaipur/areas",
    siteName: "Khanna and Associates",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.khannaandassociates.com/locations/jaipur/areas",
  },
}

export default function JaipurAreasPage() {
  const jaipurAreas = [
    {
      name: "Malviya Nagar",
      description:
        "Our Malviya Nagar office serves one of Jaipur's most prestigious residential and commercial areas, providing expert legal services to businesses and individuals in this thriving locality.",
      address: "204, Crystal Mall, Malviya Nagar, Jaipur, 302017",
      phone: "+91 141 4072 890",
      email: "malviyanagar@khannaandassociates.com",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Real Estate Law", "Corporate Law", "Family Law", "Civil Litigation"],
      slug: "malviya-nagar",
    },
    {
      name: "Vaishali Nagar",
      description:
        "Located in the western part of Jaipur, our Vaishali Nagar office provides comprehensive legal services to the growing residential and business community in this modern neighborhood.",
      address: "301, Apex Tower, Vaishali Nagar, Jaipur, 302021",
      phone: "+91 141 4072 891",
      email: "vaishalinagar@khannaandassociates.com",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Property Law", "Commercial Law", "Intellectual Property", "Contract Law"],
      slug: "vaishali-nagar",
    },
    {
      name: "Mansarovar",
      description:
        "Our Mansarovar office serves the southern part of Jaipur, providing accessible legal services to residents and businesses in this rapidly developing area of the city.",
      address: "105, Ridhi Sidhi Tower, Mansarovar, Jaipur, 302020",
      phone: "+91 141 4072 892",
      email: "mansarovar@khannaandassociates.com",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Corporate Law", "Civil Litigation", "Family Law", "Documentation"],
      slug: "mansarovar",
    },
    {
      name: "C-Scheme",
      description:
        "Located in the heart of Jaipur, our C-Scheme office provides premium legal services to businesses and high-net-worth individuals in this upscale commercial and residential district.",
      address: "402, Ganpati Plaza, C-Scheme, Jaipur, 302001",
      phone: "+91 141 4072 893",
      email: "cscheme@khannaandassociates.com",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Corporate Advisory", "Mergers & Acquisitions", "Taxation", "International Law"],
      slug: "c-scheme",
    },
    {
      name: "Raja Park",
      description:
        "Our Raja Park office serves this bustling commercial and residential area, providing expert legal counsel to local businesses and residents in central Jaipur.",
      address: "203, Shyam Tower, Raja Park, Jaipur, 302004",
      phone: "+91 141 4072 894",
      email: "rajapark@khannaandassociates.com",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Real Estate", "Family Law", "Civil Matters", "Documentation"],
      slug: "raja-park",
    },
    {
      name: "Jagatpura",
      description:
        "Serving the southeastern part of Jaipur, our Jagatpura office provides legal services to the growing residential communities and businesses in this developing area.",
      address: "101, Apex Square, Jagatpura, Jaipur, 302017",
      phone: "+91 141 4072 895",
      email: "jagatpura@khannaandassociates.com",
      image: "/placeholder.svg?height=400&width=600",
      services: ["Property Law", "Civil Litigation", "Family Matters", "Documentation"],
      slug: "jagatpura",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Services Across Jaipur</h1>
            <p className="text-xl mb-8">Expert legal counsel in every neighborhood of the Pink City</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Our Presence in Jaipur</h2>
            <p className="text-lg text-gray-700 mb-8">
              Khanna and Associates has established a strong presence across Jaipur, with offices and legal experts
              serving every major area of the city. Our team of experienced attorneys provides comprehensive legal
              services tailored to the specific needs of each neighborhood and its residents.
            </p>
            <div className="flex justify-center">
              <Link href="/locations/jaipur">
                <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">About Our Jaipur Office</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Areas We Serve in Jaipur</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jaipurAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={area.image || "/placeholder.svg"}
                    alt={`${area.name}, Jaipur Office`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{area.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{area.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#4BB4E6] mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-600">{area.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#4BB4E6] mr-2 flex-shrink-0" />
                      <p className="text-gray-600">{area.phone}</p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-[#1a3c61] mb-2">Key Services:</h4>
                  <ul className="mb-6">
                    {area.services.map((service, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 mb-1">
                        <div className="w-1.5 h-1.5 bg-[#4BB4E6] rounded-full mr-2"></div>
                        {service}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/locations/jaipur/${area.slug}`}>
                    <Button className="w-full bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#1a3c61] text-center">
              Why Choose Khanna and Associates in Jaipur
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Local Expertise</h3>
                <p className="text-gray-700">
                  Our attorneys in Jaipur have deep knowledge of local laws, regulations, and court procedures,
                  providing you with a significant advantage in your legal matters.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Accessible Locations</h3>
                <p className="text-gray-700">
                  With multiple offices across Jaipur, we ensure that expert legal assistance is always conveniently
                  accessible, no matter where you are in the city.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Comprehensive Services</h3>
                <p className="text-gray-700">
                  From real estate and corporate law to family matters and civil litigation, our team provides a full
                  spectrum of legal services to meet all your needs.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Client-Focused Approach</h3>
                <p className="text-gray-700">
                  We prioritize understanding your unique situation and objectives, tailoring our legal strategies to
                  achieve the best possible outcomes for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance in Jaipur?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact our team of experienced attorneys at any of our Jaipur locations. We're here to help with your legal
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">Which areas of Jaipur do you serve?</h3>
                <p className="text-gray-700">
                  We have offices and provide legal services across all major areas of Jaipur, including Malviya Nagar,
                  Vaishali Nagar, Mansarovar, C-Scheme, Raja Park, and Jagatpura, as well as surrounding localities.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">
                  What types of legal services do you offer in Jaipur?
                </h3>
                <p className="text-gray-700">
                  Our Jaipur offices provide comprehensive legal services including real estate law, corporate law,
                  family law, civil litigation, intellectual property, contract law, and documentation services.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">
                  How can I schedule a consultation with your lawyers in Jaipur?
                </h3>
                <p className="text-gray-700">
                  You can schedule a consultation by calling our main Jaipur office, contacting the specific area office
                  nearest to you, or using the online appointment form on our website.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#1a3c61]">
                  Do you offer virtual consultations for clients in Jaipur?
                </h3>
                <p className="text-gray-700">
                  Yes, we offer virtual consultations via video call or phone for clients who prefer remote meetings or
                  are unable to visit our offices in person.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
