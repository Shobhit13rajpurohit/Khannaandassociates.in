import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Lawyers in Jaipur | Khanna and Associates - Legal Excellence",
  description:
    "Find the best lawyers in Jaipur for all your legal needs. Khanna and Associates offers expert legal services across all areas of Jaipur.",
  keywords:
    "lawyers in Jaipur, best lawyers in Jaipur, top lawyers in Jaipur, legal services Jaipur, attorneys in Jaipur, law firm in Jaipur, Khanna and Associates Jaipur",
}

export default function LawyersInJaipurPage() {
  const jaipurAreas = [
    { name: "Lawyers in Malviya Nagar", path: "/lawyers-in-jaipur/malviya-nagar" },
    { name: "Lawyers in Mansarovar", path: "/lawyers-in-jaipur/mansarovar" },
    { name: "Lawyers in Vaishali Nagar", path: "/lawyers-in-jaipur/vaishali-nagar" },
    { name: "Lawyers in C-Scheme", path: "/lawyers-in-jaipur/c-scheme" },
    { name: "Lawyers in Jagatpura", path: "/lawyers-in-jaipur/jagatpura" },
    { name: "Lawyers in Raja Park", path: "/lawyers-in-jaipur/raja-park" },
    { name: "Lawyers in Tonk Road", path: "/lawyers-in-jaipur/tonk-road" },
    { name: "Lawyers in Jhotwara", path: "/lawyers-in-jaipur/jhotwara" },
  ]

  const specialtyLawyers = [
    { name: "Civil Lawyers in Jaipur", path: "/lawyers-in-jaipur/civil-lawyers" },
    { name: "Property Lawyers in Jaipur", path: "/lawyers-in-jaipur/property-lawyers" },
    { name: "Criminal Lawyers in Jaipur", path: "/lawyers-in-jaipur/criminal-lawyers" },
    { name: "Family Lawyers in Jaipur", path: "/lawyers-in-jaipur/family-lawyers" },
    { name: "Divorce Lawyers in Jaipur", path: "/lawyers-in-jaipur/divorce-lawyers" },
    { name: "Corporate Lawyers in Jaipur", path: "/lawyers-in-jaipur/corporate-lawyers" },
    { name: "Consumer Court Lawyers in Jaipur", path: "/lawyers-in-jaipur/consumer-court-lawyers" },
    { name: "High Court Lawyers in Jaipur", path: "/lawyers-in-jaipur/high-court-lawyers" },
    { name: "Labour Law Lawyers in Jaipur", path: "/lawyers-in-jaipur/labour-law-lawyers" },
    { name: "Tax Lawyers in Jaipur", path: "/lawyers-in-jaipur/tax-lawyers" },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lawyers in Jaipur</h1>
            <p className="text-xl mb-8">Find the best legal representation across all areas of Jaipur</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61] text-center">Law Firms in Jaipur</h2>

              <div className="bg-white shadow-md rounded-lg p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jaipurAreas.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#4BB4E6] mr-2">&gt;&gt;</span>
                      <Link href={area.path} className="text-gray-700 hover:text-[#4BB4E6]">
                        {area.name}
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
              <h2 className="text-2xl font-bold mb-4 text-[#1a3c61]">Expert Legal Services in Jaipur</h2>

              <p className="mb-4">
                Khanna and Associates is one of the leading law firms in Jaipur, providing comprehensive legal services
                across the Pink City. Our team of experienced lawyers in Jaipur offers expert legal counsel and
                representation in various practice areas.
              </p>

              <p className="mb-4">
                Whether you need legal assistance in Malviya Nagar, Mansarovar, Vaishali Nagar, or any other area of
                Jaipur, our attorneys are well-versed in handling cases specific to each region. We understand the local
                legal landscape and provide tailored solutions to meet your needs.
              </p>

              <h3 className="text-xl font-bold mb-3 text-[#1a3c61]">Our Legal Services in Jaipur</h3>

              <p className="mb-4">Our Jaipur office specializes in:</p>

              <ul className="list-disc pl-6 mb-6">
                <li>Real Estate and Property Law</li>
                <li>Heritage Property Matters</li>
                <li>Tourism Law</li>
                <li>Civil and Criminal Litigation</li>
                <li>Family Law and Matrimonial Disputes</li>
                <li>Corporate and Commercial Law</li>
                <li>Intellectual Property Rights</li>
                <li>Consumer Protection</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 text-[#1a3c61]">Why Choose Our Lawyers in Jaipur?</h3>

              <p className="mb-4">
                When you choose Khanna and Associates for your legal needs in Jaipur, you benefit from:
              </p>

              <ul className="list-disc pl-6 mb-6">
                <li>Deep knowledge of Jaipur's legal environment</li>
                <li>Specialized expertise in heritage property laws unique to Jaipur</li>
                <li>Personalized attention to each case</li>
                <li>Strategic legal solutions tailored to your specific needs</li>
                <li>Representation at all levels of courts and tribunals</li>
                <li>Convenient office location in Jaipur</li>
              </ul>

              <p className="mb-4">
                As one of the best law firms in Jaipur, we pride ourselves on our commitment to excellence and client
                satisfaction. Our team of top lawyers in Jaipur is dedicated to providing high-quality legal services
                with integrity and professionalism.
              </p>
            </div>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-[#1a3c61] text-center">Contact Our Jaipur Office</h3>

              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-[#4BB4E6] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">101 Pink City Road, Jaipur, 302001</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                    <p className="text-gray-700">+91 141 2345 6789</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                    <p className="text-gray-700">jaipur@khannaandassociates.com</p>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-4">
                    Schedule a Consultation
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    Our team of expert lawyers in Jaipur is ready to assist you with your legal needs.
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
