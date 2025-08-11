import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, Info, BookOpen, Gavel } from "lucide-react"

export default function LegalDisclaimerPage() {
  const lastUpdated = "January 15, 2025"

  const disclaimerSections = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "No Attorney-Client Relationship",
      content: [
        "This website does not create an attorney-client relationship",
        "Information provided is for general informational purposes only",
        "Formal representation requires a signed engagement letter",
        "Confidentiality protections do not apply to website communications",
        "Contact through this website does not guarantee legal representation"
      ]
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: "General Information Only",
      content: [
        "Content is provided for educational and informational purposes",
        "Information may not reflect current legal developments",
        "Laws vary by jurisdiction and individual circumstances",
        "Generic information cannot replace specific legal advice",
        "No warranties regarding accuracy or completeness of information"
      ]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "No Legal Advice",
      content: [
        "Website content does not constitute legal advice",
        "Information should not be relied upon for legal decisions",
        "Specific legal advice requires analysis of individual circumstances",
        "Professional consultation recommended for legal matters",
        "No substitute for competent legal counsel"
      ]
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Jurisdictional Limitations",
      content: [
        "Information may not apply to all jurisdictions",
        "Legal requirements vary by location and governing law",
        "International law considerations may apply",
        "Local counsel may be required for specific jurisdictions",
        "Licensing restrictions may limit representation scope"
      ]
    }
  ]

  const importantNotices = [
    {
      title: "Website Communications",
      content: "Communications sent via this website, including email forms or contact requests, are not confidential and may not be protected by attorney-client privilege. Do not include confidential or sensitive information in initial communications through this website."
    },
    {
      title: "Prior Results",
      content: "Any reference to prior results or case outcomes does not guarantee similar results in future cases. Each legal matter is unique, and past performance does not predict future outcomes. Legal results depend on specific facts, applicable law, and various other factors."
    },
    {
      title: "Professional Qualifications",
      content: "Our attorneys are licensed to practice law in specific jurisdictions. Practice limitations may apply based on licensing and local rules. We maintain professional liability insurance and comply with applicable professional conduct rules."
    },
    {
      title: "Third-Party Links",
      content: "This website may contain links to third-party websites or resources. We do not endorse or take responsibility for the content, accuracy, or reliability of external sites. Links are provided for convenience only."
    },
    {
      title: "Intellectual Property",
      content: "Content on this website, including text, images, logos, and design elements, is protected by intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited without express written permission."
    },
    {
      title: "Website Security",
      content: "While we implement reasonable security measures, no website transmission is completely secure. Users submit information at their own risk. We recommend against transmitting highly sensitive information through unsecured channels."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Disclaimer</h1>
            <p className="text-xl mb-8">
              Important legal notices and disclaimers regarding the use of this website and our professional services.
            </p>
            <p className="text-lg opacity-90">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-12">
              <div className="flex items-start mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-red-700">Important Legal Notice</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>READ THIS DISCLAIMER CAREFULLY.</strong> The information contained on this website is 
                    provided for general informational purposes only and does not constitute legal advice. 
                    No attorney-client relationship is formed by accessing or using this website.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using this website, you acknowledge that you have read and understood this disclaimer 
                    and agree to be bound by its terms. If you do not agree with these terms, please discontinue 
                    use of this website immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Khanna & Associates has been providing professional legal services since 1948. While we strive to 
                provide accurate and current information on this website, the law is complex and constantly evolving. 
                This disclaimer outlines important limitations and considerations regarding the use of our website 
                and the information contained herein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Key Disclaimers</h2>
            <div className="grid gap-8">
              {disclaimerSections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mr-4">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a3c61]">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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

      {/* Important Notices */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Additional Important Notices</h2>
            
            <div className="space-y-8">
              {importantNotices.map((notice, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-[#1a3c61] mb-4">{notice.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Limitation of Liability */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-[#1a3c61] flex items-center">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW,</strong> Khanna & Associates and its attorneys 
                  disclaim all liability for any direct, indirect, incidental, special, consequential, or punitive 
                  damages arising from the use of this website or reliance on any information contained herein.
                </p>
                <p className="leading-relaxed">
                  This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, 
                  even if we have been advised of the possibility of such damages. Some jurisdictions do not allow 
                  the exclusion or limitation of liability, so these limitations may not apply to you.
                </p>
                <p className="leading-relaxed">
                  Users of this website assume all risks associated with its use. We make no representations or 
                  warranties of any kind, express or implied, regarding the website's operation or the information, 
                  content, materials, or products included on this website.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Advertising Material</h3>
                <p className="text-gray-700">
                  This website may be considered advertising material under applicable professional rules. 
                  Prior results do not guarantee a similar outcome. The choice of a lawyer is an important decision 
                  and should not be based solely upon advertisements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Professional Responsibility</h3>
                <p className="text-gray-700">
                  Our attorneys are bound by professional responsibility rules and ethical obligations. 
                  These rules may limit our ability to represent certain clients or handle specific matters 
                  due to conflicts of interest or other professional considerations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Statute of Limitations</h3>
                <p className="text-gray-700">
                  Legal claims are subject to statutes of limitations, which vary by jurisdiction and type of claim. 
                  Delays in seeking legal counsel may result in the loss of important rights. 
                  Prompt consultation is recommended for time-sensitive matters.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">International Considerations</h3>
                <p className="text-gray-700">
                  For international matters, additional considerations may apply including foreign law, 
                  treaty obligations, and jurisdictional requirements. Specialized international legal counsel 
                  may be necessary for cross-border transactions and disputes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Notice */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-[#1a3c61] mb-4">Need Legal Advice?</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have a specific legal matter or need professional legal advice, we encourage you to 
                schedule a consultation with one of our qualified attorneys. During a consultation, we can 
                provide specific advice tailored to your situation and circumstances.
              </p>
              <p className="text-sm text-gray-600">
                Remember: This disclaimer is subject to change without notice. Please review it periodically 
                for updates and modifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Legal Matter?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            While this website provides general information, specific legal advice requires a personal consultation. 
            Contact us to schedule a meeting with one of our experienced attorneys.
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