import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Lawyers in South Delhi | Khanna and Associates - Legal Excellence",
  description:
    "Find the best lawyers in South Delhi for all your legal needs. Khanna and Associates offers expert legal services across all neighborhoods in South Delhi.",
  keywords:
    "lawyers in South Delhi, top lawyers in South Delhi, best lawyers in South Delhi, legal services South Delhi, attorneys in South Delhi, law firm in South Delhi, Khanna and Associates South Delhi",
}

export default function LawyersInSouthDelhiPage() {
  const southDelhiAreas = [
    { name: "Lawyers in Alaknanda", path: "/lawyers-in-delhi/south-delhi/alaknanda" },
    { name: "Lawyers in Ambedkar Nagar", path: "/lawyers-in-delhi/south-delhi/ambedkar-nagar" },
    { name: "Lawyers in Badarpur", path: "/lawyers-in-delhi/south-delhi/badarpur" },
    { name: "Lawyers in Chanakypuri", path: "/lawyers-in-delhi/south-delhi/chanakypuri" },
    { name: "Lawyers in Chittaranjan Park", path: "/lawyers-in-delhi/south-delhi/chittaranjan-park" },
    { name: "Lawyers in Defence Colony", path: "/lawyers-in-delhi/south-delhi/defence-colony" },
    { name: "Lawyers in East Of Kailash", path: "/lawyers-in-delhi/south-delhi/east-of-kailash" },
    { name: "Lawyers in Golf Links", path: "/lawyers-in-delhi/south-delhi/golf-links" },
    { name: "Lawyers in Greater Kailash", path: "/lawyers-in-delhi/south-delhi/greater-kailash" },
    { name: "Lawyers in Green Park", path: "/lawyers-in-delhi/south-delhi/green-park" },
    { name: "Lawyers in Hauz Khas", path: "/lawyers-in-delhi/south-delhi/hauz-khas" },
    { name: "Lawyers in Jungpura", path: "/lawyers-in-delhi/south-delhi/jungpura" },
    { name: "Lawyers in Kalkaji", path: "/lawyers-in-delhi/south-delhi/kalkaji" },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lawyers in South Delhi</h1>
            <p className="text-xl mb-8">Find the best legal representation across all neighborhoods in South Delhi</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61] text-center">Law Firms in South Delhi</h2>

              <div className="bg-white shadow-md rounded-lg p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {southDelhiAreas.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#4BB4E6] mr-2">&gt;&gt;</span>
                      <Link href={area.path} className="text-gray-700 hover:text-[#4BB4E6]">
                        {area.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-[#1a3c61]">Expert Legal Services in South Delhi</h2>

              <p className="mb-4">
                Khanna and Associates is one of the leading law firms in South Delhi, providing comprehensive legal
                services across all neighborhoods. Our team of experienced lawyers in South Delhi offers expert legal
                counsel and representation in various practice areas.
              </p>

              <p className="mb-4">
                South Delhi is home to some of the most prestigious residential and commercial areas in the capital,
                including Greater Kailash, Defence Colony, Hauz Khas, and more. Our attorneys are well-versed in
                handling cases specific to each neighborhood, understanding the local legal landscape to provide
                tailored solutions.
              </p>

              <h3 className="text-xl font-bold mb-3 text-[#1a3c61]">Our Legal Services in South Delhi</h3>

              <p className="mb-4">Our South Delhi office offers a wide range of legal services, including:</p>

              <ul className="list-disc pl-6 mb-6">
                <li>Property Law and Real Estate Transactions</li>
                <li>Corporate and Commercial Law</li>
                <li>Civil and Criminal Litigation</li>
                <li>Family Law and Matrimonial Disputes</li>
                <li>Intellectual Property Rights</li>
                <li>Banking and Finance</li>
                <li>Wills, Trusts, and Estate Planning</li>
                <li>Consumer Protection</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 text-[#1a3c61]">Why Choose Our Lawyers in South Delhi?</h3>

              <p className="mb-4">
                When you choose Khanna and Associates for your legal needs in South Delhi, you benefit from:
              </p>

              <ul className="list-disc pl-6 mb-6">
                <li>Attorneys with deep knowledge of South Delhi's legal environment</li>
                <li>Specialized expertise in property matters common in South Delhi</li>
                <li>Personalized attention to each case</li>
                <li>Strategic legal solutions tailored to your specific needs</li>
                <li>Representation at all levels of courts and tribunals</li>
                <li>Convenient office location in South Delhi</li>
              </ul>

              <p className="mb-4">
                Whether you're looking for property lawyers in Greater Kailash, family attorneys in Defence Colony, or
                legal experts in any other part of South Delhi, Khanna and Associates has the expertise and resources to
                assist you.
              </p>
            </div>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-[#1a3c61] text-center">Contact Our South Delhi Office</h3>

              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-[#4BB4E6] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">456 Greater Kailash, South Delhi, 110048</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                    <p className="text-gray-700">+91 11 4567 8901</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                    <p className="text-gray-700">southdelhi@khannaandassociates.com</p>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-4">
                    Schedule a Consultation
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    Our team of expert lawyers in South Delhi is ready to assist you with your legal needs.
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
