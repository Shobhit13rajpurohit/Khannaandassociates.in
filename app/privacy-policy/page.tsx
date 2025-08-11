import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025"

  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal identification information (Name, email address, phone number, etc.)",
        "Legal case information and documentation provided by clients",
        "Communication records and correspondence",
        "Website usage data and analytics",
        "Professional credentials and qualifications"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Providing legal services and representation",
        "Client communication and case management",
        "Billing and payment processing",
        "Legal research and case preparation",
        "Compliance with legal and regulatory requirements"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information",
        "Information may be shared with authorized third parties for legal services",
        "Court filings and legal proceedings as required by law",
        "Professional service providers bound by confidentiality agreements",
        "Legal authorities when required by law or court order"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Secure servers and database protection",
        "Regular security audits and updates",
        "Access controls and authentication protocols",
        "Employee training on data protection practices"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl mb-8">
              Your privacy and confidentiality are paramount to our legal practice. Learn how we protect your information.
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
              <h2 className="text-2xl font-bold mb-4 text-[#1a3c61]">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                At Khanna & Associates, we understand the sensitive nature of legal matters and the critical importance 
                of maintaining client confidentiality. This Privacy Policy outlines our practices regarding the collection, 
                use, and protection of your personal information. As a law firm established in 1948, we have built our 
                reputation on trust, integrity, and the highest standards of professional conduct.
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                This Privacy Policy applies to all services provided by Khanna & Associates, including our offices 
                in New Delhi, Mumbai, Bangalore, New York, and London. By engaging our services or using our website, 
                you agree to the terms outlined in this policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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

      {/* Additional Provisions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Additional Privacy Provisions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Attorney-Client Privilege</h3>
                <p className="text-gray-700">
                  All communications between you and our attorneys are protected by attorney-client privilege. 
                  This privilege belongs to you and ensures that your confidential communications remain private.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Data Retention</h3>
                <p className="text-gray-700">
                  We retain client information as required by legal and professional obligations. 
                  Client files are maintained securely and destroyed in accordance with applicable laws and bar regulations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Your Rights</h3>
                <p className="text-gray-700">
                  You have the right to access, correct, or request deletion of your personal information, 
                  subject to legal and professional obligations. Contact us to exercise these rights.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">International Transfers</h3>
                <p className="text-gray-700">
                  Given our international presence, your information may be transferred between our offices 
                  in different countries, always with appropriate safeguards and legal protections in place.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#1a3c61] mb-3">Changes to This Policy</h3>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                We will notify clients of material changes and post the updated policy on our website with a new effective date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions About Our Privacy Policy?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            If you have any questions or concerns about our privacy practices, please don't hesitate to contact us. 
            We're committed to transparency and protecting your privacy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
              Contact Our Privacy Officer
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