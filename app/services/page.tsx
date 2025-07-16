import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const services = [
    "Aviation & Defence",
    "Arbitration and Reconciliation",
    "Banking and Finance & Insurance",
    "Bankruptcy and Insolvency",
    "Capital Markets",
    "Competition/Antitrust",
    "Criminal & Civil",
    "Corporate and Commercial",
    "Energy and Natural Resources",
    "Financial Services & Fintech",
    "Funds",
    "Healthcare and Life Sciences",
    "Immigration",
    "Information Technology",
    "Intellectual Property",
    "International Domain",
    "Legal Outsourcing Work(LPO)",
    "Media and Entertainment",
    "Matrimonial",
    "Private Client practice",
    "Real Estate",
    "Taxation (Direct and Indirect Taxation)",
    "Technology Media and Telecom",
  ]

  // Mapping service names to reliable image URLs
  const serviceImageMap = {
    "Aviation & Defence": "/images/practice-areas/aviation-defence.png",
    "Arbitration and Reconciliation": "/images/practice-areas/arbitration.png",
    "Banking and Finance & Insurance": "/images/practice-areas/banking-finance.png",
    "Bankruptcy and Insolvency": "/images/practice-areas/banking-finance.png",
    "Capital Markets": "/images/practice-areas/banking-finance.png",
    "Competition/Antitrust": "/images/practice-areas/corporate.png",
    "Criminal & Civil": "/images/practice-areas/arbitration.png",
    "Corporate and Commercial": "/images/practice-areas/corporate.png",
    "Energy and Natural Resources": "/images/practice-areas/real-estate.png",
    "Financial Services & Fintech": "/images/practice-areas/banking-finance.png",
    Funds: "/images/practice-areas/banking-finance.png",
    "Healthcare and Life Sciences": "/images/practice-areas/corporate.png",
    Immigration: "/images/practice-areas/corporate.png",
    "Information Technology": "/images/practice-areas/intellectual-property.png",
    "Intellectual Property": "/images/practice-areas/intellectual-property.png",
    "International Domain": "/images/practice-areas/corporate.png",
    "Legal Outsourcing Work(LPO)": "/images/practice-areas/corporate.png",
    "Media and Entertainment": "/images/practice-areas/intellectual-property.png",
    Matrimonial: "/images/practice-areas/arbitration.png",
    "Private Client practice": "/images/practice-areas/corporate.png",
    "Real Estate": "/images/practice-areas/real-estate.png",
    "Taxation (Direct and Indirect Taxation)": "/images/practice-areas/corporate.png",
    "Technology Media and Telecom": "/images/practice-areas/intellectual-property.png",
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1200&width=2000&text=Our+Practice+Areas')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Practice Areas</h1>
            <p className="text-xl mb-8">
              Comprehensive legal services tailored to your specific needs across multiple practice areas.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Comprehensive Legal Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Khanna and Associates, we offer a wide range of legal services to meet the diverse needs of our
              clients. Our team of experienced attorneys specializes in various practice areas to provide expert counsel
              and representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={
                      serviceImageMap[service] ||
                      `/placeholder.svg?height=800&width=1200&text=${service.replace(/&/g, "and") || "/placeholder.svg"}`
                    }
                    alt={service}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{service}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Our team provides expert legal counsel in {service.toLowerCase()}, helping clients navigate complex
                    legal challenges with confidence and clarity.
                  </p>
                  <Link href={`/services/${service.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}>
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full flex items-center justify-center">
                      Learn More <span className="ml-2">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Legal+Team+Meeting"
                alt="Legal Team Meeting"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Why Choose Khanna and Associates</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#4BB4E6] rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3c61]">Experienced Team</h3>
                    <p className="text-gray-600">
                      Our attorneys bring decades of combined experience across various practice areas.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4BB4E6] rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3c61]">Client-Centered Approach</h3>
                    <p className="text-gray-600">
                      We prioritize understanding your unique needs to deliver tailored legal solutions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4BB4E6] rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3c61]">Proven Track Record</h3>
                    <p className="text-gray-600">
                      Our success stories span decades, with numerous favorable outcomes for our clients.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4BB4E6] rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3c61]">Global Perspective</h3>
                    <p className="text-gray-600">
                      We handle both domestic and international legal matters with equal expertise.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Legal Needs?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experienced attorneys is ready to help you navigate your legal challenges. Contact us today for
            a consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
              Schedule a Consultation
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg"
            >
              Learn More About Our Team
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
