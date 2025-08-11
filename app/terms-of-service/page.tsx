import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scale, Users, Globe, FileCheck } from "lucide-react"

export default function TermsOfServicePage() {
  const lastUpdated = "January 15, 2025"

  const sections = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Scope of Legal Services",
      content: [
        "Legal representation and advocacy in various practice areas",
        "Legal consultation and advisory services",
        "Document preparation and review",
        "Court representation and litigation support",
        "Transactional and corporate legal services"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Responsibilities",
      content: [
        "Provide complete and accurate information",
        "Cooperate fully in the representation process",
        "Pay fees and expenses as agreed upon",
        "Maintain confidentiality of legal strategies",
        "Follow legal advice and court orders"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Jurisdiction and Governing Law",
      content: [
        "Services governed by laws of the jurisdiction where services are provided",
        "Disputes resolved through appropriate legal channels",
        "Compliance with local bar association rules",
        "International matters governed by applicable treaties",
        "Choice of law provisions in engagement letters"
      ]
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Professional Standards",
      content: [
        "Adherence to highest ethical and professional standards",
        "Compliance with applicable bar association rules",
        "Maintaining attorney-client privilege and confidentiality",
        "Avoiding conflicts of interest",
        "Continuous professional development and competence"
      ]
    }
  ]

  const termsSections = [
    {
      title: "1. Attorney-Client Relationship",
      content: "An attorney-client relationship is established only through a signed engagement letter or retainer agreement. This website and its content do not create an attorney-client relationship. Initial consultations do not guarantee representation."
    },
    {
      title: "2. Fees and Billing",
      content: "Legal fees are charged according to agreed-upon fee arrangements, which may include hourly rates, flat fees, contingency fees, or retainer arrangements. Clients are responsible for costs and expenses incurred in connection with their matter."
    },
    {
      title: "3. Limitation of Liability",
      content: "Our liability is limited to the scope of services provided and agreed upon in the engagement letter. We are not responsible for outcomes beyond our control or decisions made contrary to our legal advice."
    },
    {
      title: "4. Confidentiality and Privilege",
      content: "All client communications and information are protected by attorney-client privilege and professional confidentiality rules. We maintain strict confidentiality policies and secure information handling procedures."
    },
    {
      title: "5. Termination of Services",
      content: "Either party may terminate the attorney-client relationship subject to ethical obligations and court approval where required. Clients remain responsible for fees and costs incurred up to termination."
    },
    {
      title: "6. Professional Conduct",
      content: "Our practice is governed by applicable rules of professional conduct, bar association regulations, and ethical guidelines. We maintain professional indemnity insurance and comply with continuing education requirements."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl mb-8">
              Understanding the terms and conditions that govern our professional legal services and client relationships.
            </p>
            <p className="text-lg opacity-90">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-[#4BB4E6] p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[#1a3c61]">Professional Legal Services Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service govern the provision of legal services by Khanna & Associates. By engaging our 
                services, you agree to these terms and conditions. Our firm has been providing exceptional legal services 
                since 1948, maintaining the highest standards of professional conduct and ethical practice across all our 
                offices worldwide.
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                These terms apply to all legal services provided by our firm, including consultations, representation, 
                document preparation, and advisory services. Please read these terms carefully and contact us if you 
                have any questions about your rights and obligations as our client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Service Framework</h2>
            <div className="grid gap-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#4BB4E6]/10 rounded-lg flex items-center justify-center text-[#4BB4E6] mr-4">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a3c61]">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Detailed Terms and Conditions</h2>
            
            <div className="space-y-8">
              {termsSections.map((section, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-[#1a3c61] mb-4">{section.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-12">
              <h3 className="text-lg font-semibold text-[#1a3c61] mb-3 flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Important Notice
              </h3>
              <p className="text-gray-700">
                <strong>No Attorney-Client Relationship:</strong> Viewing this website or contacting our firm does not 
                create an attorney-client relationship. An attorney-client relationship is established only through a 
                signed engagement letter or retainer agreement after conflicts checking and mutual agreement to representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Dispute Resolution</h3>
                <p className="text-gray-700 mb-4">
                  Any disputes arising from our professional relationship will be resolved through:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Direct negotiation and discussion</li>
                  <li>• Mediation through approved mediators</li>
                  <li>• Arbitration if mutually agreed</li>
                  <li>• Appropriate court jurisdiction</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Professional Insurance</h3>
                <p className="text-gray-700 mb-4">
                  Our firm maintains comprehensive professional liability insurance including:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Professional indemnity coverage</li>
                  <li>• Cyber liability protection</li>
                  <li>• International coverage</li>
                  <li>• Coverage across all practice areas</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Quality Assurance</h3>
                <p className="text-gray-700 mb-4">
                  We maintain high-quality legal services through:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Regular training and education</li>
                  <li>• Peer review processes</li>
                  <li>• Client feedback systems</li>
                  <li>• Compliance monitoring</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">International Standards</h3>
                <p className="text-gray-700 mb-4">
                  Our global practice adheres to:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• International bar standards</li>
                  <li>• Local jurisdiction requirements</li>
                  <li>• Cross-border compliance</li>
                  <li>• Multi-jurisdictional ethics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions About Our Terms of Service?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Our experienced attorneys are available to discuss these terms and answer any questions about 
            our professional services and client relationships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
              Schedule a Consultation
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg bg-transparent inline-flex items-center gap-2"
              >
                Back to Home
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}