import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Lawyers in Delhi | Khanna and Associates - Legal Excellence",
  description:
    "Find the best lawyers in Delhi for all your legal needs. Khanna and Associates offers expert legal services across all areas of Delhi including South, North, East and West Delhi.",
  keywords:
    "lawyers in Delhi, top lawyers in Delhi, best lawyers in Delhi, legal services Delhi, attorneys in Delhi, law firm in Delhi, Khanna and Associates Delhi",
}

export default function LawyersInDelhiPage() {
  const delhiRegions = [
    { name: "Lawyers in South Delhi", path: "/lawyers-in-delhi/south-delhi" },
    { name: "Lawyers in North Delhi", path: "/lawyers-in-delhi/north-delhi" },
    { name: "Lawyers in East Delhi", path: "/lawyers-in-delhi/east-delhi" },
    { name: "Lawyers in West Delhi", path: "/lawyers-in-delhi/west-delhi" },
  ]

  const specialtyLawyers = [
    { name: "Civil Lawyers near me", path: "/lawyers-in-delhi/civil-lawyers" },
    { name: "High Court Lawyers near me", path: "/lawyers-in-delhi/high-court-lawyers" },
    { name: "Court Marriage Lawyers near me", path: "/lawyers-in-delhi/court-marriage-lawyers" },
    { name: "Divorce Lawyers near me", path: "/lawyers-in-delhi/divorce-lawyers" },
    { name: "Property Lawyers near me", path: "/lawyers-in-delhi/property-lawyers" },
    { name: "Criminal Lawyers near me", path: "/lawyers-in-delhi/criminal-lawyers" },
    { name: "Consumer Court Lawyers near me", path: "/lawyers-in-delhi/consumer-court-lawyers" },
    { name: "Labour & Service Lawyers near me", path: "/lawyers-in-delhi/labour-service-lawyers" },
    { name: "Cyber Crime Lawyers near me", path: "/lawyers-in-delhi/cyber-crime-lawyers" },
    { name: "Cheque Bounce Lawyers near me", path: "/lawyers-in-delhi/cheque-bounce-lawyers" },
    { name: "Family Lawyers near me", path: "/lawyers-in-delhi/family-lawyers" },
    { name: "Medical Negligence Lawyers near me", path: "/lawyers-in-delhi/medical-negligence-lawyers" },
    { name: "Muslim Law Lawyers near me", path: "/lawyers-in-delhi/muslim-law-lawyers" },
    { name: "Supreme Court Lawyers near me", path: "/lawyers-in-delhi/supreme-court-lawyers" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lawyers in Delhi</h1>
            <p className="text-xl mb-8">Find the best legal representation across all areas of Delhi</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61] text-center">Law Firms in Delhi</h2>

              <div className="bg-white shadow-md rounded-lg p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {delhiRegions.map((region, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#4BB4E6] mr-2">&gt;&gt;</span>
                      <Link href={region.path} className="text-gray-700 hover:text-[#4BB4E6]">
                        {region.name}
                      </Link>
                    </div>
                  ))}

                  {specialtyLawyers.map((lawyer, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#4BB4E6] mr-2">&gt;&gt;</span>
                      <Link href={lawyer.path} className="text-gray-700 hover:text-[#4BB4E6]">
                        {lawyer.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-[#1a3c61]">Expert Legal Services in Delhi</h2>

              <p className="mb-4">
                Khanna and Associates is one of the leading law firms in Delhi, providing comprehensive legal services
                across all areas of the city. Our team of experienced lawyers in Delhi offers expert legal counsel and
                representation in various practice areas.
              </p>

              <p className="mb-4">
                Whether you need legal assistance in South Delhi, North Delhi, East Delhi, or West Delhi, our attorneys
                are well-versed in handling cases specific to each region. We understand the local legal landscape and
                provide tailored solutions to meet your needs.
              </p>

              <h3 className="text-xl font-bold mb-3 text-[#1a3c61]">Our Legal Services in Delhi</h3>

              <p className="mb-4">Our Delhi office offers a wide range of legal services, including:</p>

              <ul className="list-disc pl-6 mb-6">
                <li>Corporate and Commercial Law</li>
                <li>Civil and Criminal Litigation</li>
                <li>Property Law and Real Estate</li>
                <li>Family Law and Matrimonial Disputes</li>
                <li>Intellectual Property Rights</li>
                <li>Banking and Finance</li>
                <li>Labor and Employment Law</li>
                <li>Consumer Protection</li>
                <li>Cyber Law</li>
                <li>Medical Negligence</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 text-[#1a3c61]">Why Choose Our Lawyers in Delhi?</h3>

              <p className="mb-4">
                When you choose Khanna and Associates for your legal needs in Delhi, you benefit from:
              </p>

              <ul className="list-disc pl-6 mb-6">
                <li>77+ years of legal excellence and experience</li>
                <li>A team of specialized attorneys for different practice areas</li>
                <li>Personalized attention to each case</li>
                <li>Strategic legal solutions tailored to your specific needs</li>
                <li>Representation at all levels of courts and tribunals</li>
                <li>Offices in convenient locations across Delhi</li>
              </ul>

              <p className="mb-4">
                Whether you're looking for lawyers in South Delhi for property matters, attorneys in North Delhi for
                corporate issues, or legal experts in any other part of Delhi, Khanna and Associates has the expertise
                and resources to assist you.
              </p>
            </div>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-[#1a3c61] text-center">Contact Our Delhi Office</h3>

              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-[#4BB4E6] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">123 Legal Avenue, New Delhi, 110001</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                    <p className="text-gray-700">+91 11 2345 6789</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                    <p className="text-gray-700">delhi@khannaandassociates.com</p>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-4">
                    Schedule a Consultation
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    Our team of expert lawyers in Delhi is ready to assist you with your legal needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
