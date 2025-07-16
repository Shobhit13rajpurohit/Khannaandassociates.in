import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Define service data
const serviceData: Record<
  string,
  {
    title: string
    description: string
    image: string
    content: string[]
    keyPoints: string[]
    relatedServices: string[]
  }
> = {
  "aviation-and-defence": {
    title: "Aviation & Defence",
    description:
      "Expert legal counsel for aviation and defence sectors, handling regulatory compliance, contracts, and dispute resolution.",
    image: "/placeholder.svg?height=800&width=1200&text=Aviation+and+Defence",
    content: [
      "Our Aviation & Defence practice provides comprehensive legal services to airlines, airports, aircraft manufacturers, and defence contractors.",
      "We handle matters related to regulatory compliance, aircraft financing and leasing, aviation accidents and liability, airport development, and defence procurement.",
      "Our team has extensive experience in navigating the complex regulatory frameworks governing the aviation and defence industries, both domestically and internationally.",
      "We work closely with industry stakeholders to provide strategic advice on business operations, risk management, and dispute resolution.",
    ],
    keyPoints: [
      "Regulatory compliance and licensing",
      "Aircraft financing and leasing",
      "Aviation accidents and liability",
      "Airport development and operations",
      "Defence procurement and contracts",
      "Dispute resolution and litigation",
    ],
    relatedServices: ["Corporate and Commercial", "International Domain", "Arbitration and Reconciliation"],
  },
  "arbitration-and-reconciliation": {
    title: "Arbitration and Reconciliation",
    description: "Effective dispute resolution through arbitration, mediation, and reconciliation services.",
    image: "/placeholder.svg?height=800&width=1200&text=Arbitration+and+Reconciliation",
    content: [
      "Our Arbitration and Reconciliation practice offers alternative dispute resolution services that provide efficient, cost-effective solutions outside of traditional litigation.",
      "We represent clients in domestic and international arbitration proceedings across various sectors, including commercial, construction, energy, and investment disputes.",
      "Our team includes experienced arbitrators and mediators who facilitate negotiations and help parties reach mutually acceptable resolutions.",
      "We assist clients in drafting arbitration clauses, selecting arbitrators, and navigating the procedural aspects of arbitration proceedings.",
    ],
    keyPoints: [
      "Domestic and international arbitration",
      "Commercial mediation",
      "Negotiated settlements",
      "Drafting arbitration clauses",
      "Enforcement of arbitral awards",
      "Institutional and ad hoc arbitration",
    ],
    relatedServices: ["Corporate and Commercial", "International Domain", "Banking and Finance & Insurance"],
  },
  "banking-and-finance-and-insurance": {
    title: "Banking and Finance & Insurance",
    description:
      "Comprehensive legal services for banking, finance, and insurance sectors, covering regulatory compliance, transactions, and dispute resolution.",
    image: "/placeholder.svg?height=800&width=1200&text=Banking+and+Finance",
    content: [
      "Our Banking and Finance & Insurance practice provides expert legal advice to banks, financial institutions, insurance companies, and other financial service providers.",
      "We handle matters related to regulatory compliance, banking transactions, project finance, insurance claims, and financial restructuring.",
      "Our team has extensive experience in advising on complex financial products, securitization, derivatives, and structured finance transactions.",
      "We work closely with clients to navigate the evolving regulatory landscape and develop innovative solutions to their legal and business challenges.",
    ],
    keyPoints: [
      "Banking regulation and compliance",
      "Project finance and infrastructure",
      "Insurance claims and coverage",
      "Financial restructuring and insolvency",
      "Securitization and structured finance",
      "Financial litigation and dispute resolution",
    ],
    relatedServices: ["Corporate and Commercial", "Bankruptcy and Insolvency", "Capital Markets"],
  },
  "corporate-and-commercial": {
    title: "Corporate and Commercial",
    description:
      "Comprehensive legal services for businesses, including formation, governance, contracts, mergers and acquisitions, and compliance.",
    image: "/placeholder.svg?height=800&width=1200&text=Corporate+and+Commercial",
    content: [
      "Our Corporate and Commercial practice provides strategic legal advice to businesses of all sizes, from startups to multinational corporations.",
      "We handle matters related to company formation, corporate governance, commercial contracts, mergers and acquisitions, joint ventures, and regulatory compliance.",
      "Our team has extensive experience in structuring complex transactions, conducting due diligence, and negotiating and drafting agreements that protect our clients' interests.",
      "We work closely with clients to understand their business objectives and provide tailored legal solutions that support their growth and success.",
    ],
    keyPoints: [
      "Company formation and structuring",
      "Corporate governance and compliance",
      "Mergers and acquisitions",
      "Joint ventures and strategic alliances",
      "Commercial contracts and agreements",
      "Corporate restructuring",
    ],
    relatedServices: ["Banking and Finance & Insurance", "Intellectual Property", "Competition/Antitrust"],
  },
  "intellectual-property": {
    title: "Intellectual Property",
    description:
      "Protection and enforcement of intellectual property rights, including patents, trademarks, copyrights, and trade secrets.",
    image: "/placeholder.svg?height=800&width=1200&text=Intellectual+Property",
    content: [
      "Our Intellectual Property practice helps clients protect, manage, and leverage their intellectual property assets.",
      "We handle matters related to patents, trademarks, copyrights, trade secrets, licensing, and IP litigation.",
      "Our team has extensive experience in conducting IP audits, developing IP strategies, and enforcing IP rights both domestically and internationally.",
      "We work with clients across various industries, including technology, pharmaceuticals, media, and consumer products, to maximize the value of their intellectual property.",
    ],
    keyPoints: [
      "Patent prosecution and litigation",
      "Trademark registration and protection",
      "Copyright registration and enforcement",
      "Trade secret protection",
      "IP licensing and commercialization",
      "IP portfolio management",
    ],
    relatedServices: ["Corporate and Commercial", "Media and Entertainment", "Technology Media and Telecom"],
  },
  "real-estate": {
    title: "Real Estate",
    description:
      "Comprehensive legal services for real estate transactions, development, leasing, financing, and dispute resolution.",
    image: "/placeholder.svg?height=800&width=1200&text=Real+Estate",
    content: [
      "Our Real Estate practice provides expert legal advice on all aspects of real estate transactions and development projects.",
      "We handle matters related to property acquisition and disposal, leasing, construction, financing, land use, and zoning.",
      "Our team has extensive experience in representing developers, investors, lenders, landlords, and tenants in complex real estate transactions.",
      "We work closely with clients to navigate regulatory requirements, conduct due diligence, and structure transactions that achieve their business objectives.",
    ],
    keyPoints: [
      "Property acquisition and disposal",
      "Commercial and residential leasing",
      "Construction contracts and disputes",
      "Real estate financing",
      "Land use and zoning",
      "Real estate litigation",
    ],
    relatedServices: ["Corporate and Commercial", "Banking and Finance & Insurance", "Environmental Law"],
  },
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = params.service

  // Check if service exists in our data
  if (!serviceData[service]) {
    // For services we don't have detailed data for, create a generic page
    const title = service
      .split("-")
      .map((word) => (word === "and" ? "and" : word.charAt(0).toUpperCase() + word.slice(1)))
      .join(" ")

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#1a3c61] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/placeholder.svg?height=800&width=1200&text=${service.replace(/-/g, " ")}'`,
              filter: "brightness(0.4)",
            }}
          ></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl mb-8">Expert legal counsel and representation in {title.toLowerCase()} matters.</p>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Our {title} Services</h2>
                <p className="text-gray-700 mb-6">
                  At Khanna and Associates, our {title} practice provides comprehensive legal services to clients facing
                  complex legal challenges in this area. Our experienced attorneys bring deep industry knowledge and
                  practical expertise to help you navigate the legal landscape with confidence.
                </p>
                <p className="text-gray-700 mb-6">
                  We understand the unique challenges and opportunities in the {title.toLowerCase()} sector and work
                  closely with our clients to develop tailored legal strategies that align with their business
                  objectives and protect their interests.
                </p>
                <p className="text-gray-700 mb-6">
                  Our team stays up-to-date with the latest legal developments and industry trends to provide you with
                  cutting-edge advice and representation.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">How We Can Help</h3>
                <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                  <li>Comprehensive legal advice on {title.toLowerCase()} matters</li>
                  <li>Regulatory compliance and risk management</li>
                  <li>Contract negotiation and drafting</li>
                  <li>Dispute resolution and litigation</li>
                  <li>Strategic planning and business advisory services</li>
                  <li>Due diligence and transaction support</li>
                </ul>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Why Choose Khanna and Associates</h3>
                  <ul className="space-y-3">
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
                      <p className="text-gray-700">Decades of experience in {title.toLowerCase()} law</p>
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
                      <p className="text-gray-700">Deep industry knowledge and practical expertise</p>
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
                      <p className="text-gray-700">Client-centered approach with personalized solutions</p>
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
                      <p className="text-gray-700">Proven track record of successful outcomes</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                  <Image
                    src={`/placeholder.svg?height=800&width=1200&text=${service.replace(/-/g, " ")}`}
                    alt={title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Contact Us</h3>
                    <p className="text-gray-600 mb-6">
                      Speak with our {title} specialists today to discuss your legal needs and how we can assist you.
                    </p>
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-4">
                      Schedule a Consultation
                    </Button>
                    <div className="text-center text-gray-500 text-sm">
                      Or call us at{" "}
                      <a href="tel:+911123456789" className="text-[#4BB4E6] font-semibold">
                        +91 11 2345 6789
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Related Practice Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=800&width=1200&text=Corporate+and+Commercial"
                    alt="Corporate and Commercial"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Corporate and Commercial</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Strategic legal advice for businesses of all sizes, from startups to multinational corporations.
                  </p>
                  <Link href="/services/corporate-and-commercial">
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">Learn More</Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=800&width=1200&text=Arbitration+and+Reconciliation"
                    alt="Arbitration and Reconciliation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Arbitration and Reconciliation</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Alternative dispute resolution services that provide efficient, cost-effective solutions.
                  </p>
                  <Link href="/services/arbitration-and-reconciliation">
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">Learn More</Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=800&width=1200&text=Banking+and+Finance"
                    alt="Banking and Finance"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Banking and Finance</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Expert legal advice to banks, financial institutions, insurance companies, and other financial
                    service providers.
                  </p>
                  <Link href="/services/banking-and-finance-and-insurance">
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1a3c61] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your {title} Legal Needs?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our team of experienced attorneys is ready to help you navigate your legal challenges. Contact us today
              for a consultation.
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
      </main>
    )
  }

  const data = serviceData[service]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${data.image}')`,
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
            <p className="text-xl mb-8">{data.description}</p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Our {data.title} Services</h2>

              {data.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-6">
                  {paragraph}
                </p>
              ))}

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">How We Can Help</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                {data.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Why Choose Khanna and Associates</h3>
                <ul className="space-y-3">
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
                    <p className="text-gray-700">Decades of experience in {data.title.toLowerCase()} law</p>
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
                    <p className="text-gray-700">Deep industry knowledge and practical expertise</p>
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
                    <p className="text-gray-700">Client-centered approach with personalized solutions</p>
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
                    <p className="text-gray-700">Proven track record of successful outcomes</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <Image
                  src={data.image || "/placeholder.svg"}
                  alt={data.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Contact Us</h3>
                  <p className="text-gray-600 mb-6">
                    Speak with our {data.title} specialists today to discuss your legal needs and how we can assist you.
                  </p>
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-4">
                    Schedule a Consultation
                  </Button>
                  <div className="text-center text-gray-500 text-sm">
                    Or call us at{" "}
                    <a href="tel:+911123456789" className="text-[#4BB4E6] font-semibold">
                      +91 11 2345 6789
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Related Practice Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.relatedServices.map((relatedService, index) => {
              const slug = relatedService.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")
              const relatedData = serviceData[slug] || {
                title: relatedService,
                image: `/placeholder.svg?height=800&width=1200&text=${relatedService.replace(/&/g, "and")}`,
              }

              return (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={
                        relatedData.image ||
                        `/placeholder.svg?height=800&width=1200&text=${relatedService.replace(/&/g, "and")}`
                      }
                      alt={relatedData.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-semibold text-white">{relatedData.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Expert legal counsel and representation in {relatedData.title.toLowerCase()} matters.
                    </p>
                    <Link href={`/services/${slug}`}>
                      <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">Learn More</Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your {data.title} Legal Needs?</h2>
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
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
