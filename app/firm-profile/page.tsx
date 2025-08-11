import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getActiveTeamMembers } from "@/lib/db"
import { ArrowRight, MapPin, Phone, Mail, Award, Users, Building2 } from "lucide-react"
import { Metadata } from "next"

// SEO Metadata
export const metadata: Metadata = {
  title: "Firm Profile - Khanna & Associates | Leading Law Firm Since 1948",
  description: "Discover Khanna & Associates' 75+ year legacy of legal excellence. Founded in 1948, we provide comprehensive legal services across corporate law, litigation, and international practice with offices in Delhi, Mumbai, Bangalore, New York, and London.",
  keywords: "law firm profile, Khanna Associates history, legal services India, corporate law firm, litigation lawyers, international law practice, New Delhi law firm, Mumbai lawyers, Bangalore legal services",
  openGraph: {
    title: "About Khanna & Associates - Premier Law Firm Since 1948",
    description: "Learn about our 75-year legacy of legal excellence, from our founding in 1948 to our current international presence across 5 offices.",
    url: "https://khannaassociates.com/firm-profile",
    siteName: "Khanna & Associates",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Khanna & Associates Law Firm Office"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Khanna & Associates - Leading Law Firm Since 1948",
    description: "Discover our 75-year legacy of legal excellence with offices across India and internationally.",
    images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: "https://khannaassociates.com/firm-profile"
  }
}

// Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Khanna & Associates",
  "description": "Leading law firm established in 1948, providing comprehensive legal services across corporate law, litigation, and international practice.",
  "url": "https://khannaassociates.in",
  "logo": "https://khannaassociates.in/logo.png",
  "foundingDate": "1948",
  "founder": {
    "@type": "Person",
    "name": "Late Amarnath Singh Khanna"
  },
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress", 
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore", 
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    }
  ],
  "serviceArea": ["India", "United States", "United Kingdom"],
  "legalName": "Khanna & Associates",
  "areaServed": ["IN", "US", "GB"],
  "knowsAbout": ["Corporate Law", "Civil Litigation", "Criminal Law", "Property Law", "Technology Law", "Intellectual Property", "International Law"],
  "award": ["Chambers Global Top Ranked", "Legal 500 Tier 1", "IFLR1000 Leading Firm", "Asian Legal Business Law Firm of the Year"]
}

export default async function FirmProfilePage() {
  // Fetch team members for the preview section
  const teamMembers = await getActiveTeamMembers()
  const featuredMembers = teamMembers.slice(0, 3) // Show only first 3 members

  const milestones = [
    {
      year: "1948",
      title: "Founding of the Firm",
      description: "Established by Late Amarnath Singh Khanna in New Delhi, focusing initially on criminal law and building a foundation of legal excellence.",
    },
    {
      year: "1965",
      title: "Expansion of Practice Areas",
      description: "Strategic expansion into corporate law, civil litigation, and property law under visionary second-generation leadership, establishing comprehensive legal services.",
    },
    {
      year: "1985",
      title: "Mumbai Office Establishment",
      description: "Opened our first branch office in Mumbai to serve clients in India's financial capital, expanding our reach across key business centers.",
    },
    {
      year: "2000",
      title: "Bangalore Technology Hub",
      description: "Established specialized presence in Bangalore focusing on technology law, intellectual property, and emerging digital legal frameworks.",
    },
    {
      year: "2012",
      title: "International Expansion - New York",
      description: "Launched our first international office in New York to serve global clients and facilitate cross-border legal transactions.",
    },
    {
      year: "2015",
      title: "London Office Opening",
      description: "Expanded our international presence with a strategic London office, strengthening our European legal service capabilities.",
    },
    {
      year: "2023",
      title: "75th Anniversary Celebration",
      description: "Celebrated 75 years of unparalleled legal excellence and unwavering service to clients worldwide, marking our diamond jubilee.",
    },
  ]

  const achievements = [
    {
      icon: Building2,
      number: "5",
      label: "Global Offices",
      description: "Strategic locations across India and internationally"
    },
    {
      icon: Users,
      number: "75+",
      label: "Legal Professionals",
      description: "Experienced lawyers and support staff"
    },
    {
      icon: Award,
      number: "25+",
      label: "Industry Awards",
      description: "Recognition from leading legal directories"
    }
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section with Enhanced SEO */}
        <section className="relative bg-[#1a3c61] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069')",
              filter: "brightness(0.4)",
            }}
          ></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Leading Law Firm Profile: <span className="text-[#4BB4E6]">Khanna & Associates</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Discover our remarkable 75-year legacy of legal excellence since 1948, serving clients worldwide with unmatched integrity, expertise, and innovative legal solutions.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <achievement.icon className="w-8 h-8 text-[#4BB4E6] mb-3" />
                    <div className="text-3xl font-bold mb-2">{achievement.number}</div>
                    <div className="font-semibold mb-1">{achievement.label}</div>
                    <div className="text-sm opacity-90">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Firm Overview with Enhanced Content */}
        <section className="py-20" id="about-firm">
          <div className="container mx-auto px-4">
            {/* Our Heritage */}
            <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
              <div className="lg:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?q=80&w=2005"
                  alt="Khanna and Associates Heritage - Historic law firm established in 1948 by Late Amarnath Singh Khanna"
                  width={700}
                  height={500}
                  className="rounded-lg shadow-xl object-cover"
                  priority
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-8 text-[#1a3c61]">
                  Our Distinguished Heritage: <span className="text-[#4BB4E6]">Since 1948</span>
                </h2>
                <div className="prose prose-lg text-gray-700 space-y-6">
                  <p>
                    <strong>KHANNA & ASSOCIATES</strong> was founded in 1948 by the visionary <strong>Late Amarnath Singh Khanna</strong>, a highly accomplished lawyer specializing in criminal law. His unwavering dedication to justice and society established an unforgettable legacy that continues to guide our practice today.
                  </p>
                  <p>
                    From our humble beginnings as a specialized criminal law practice in New Delhi, we have evolved into a comprehensive, full-service law firm. Our growth reflects our ability to adapt to India's changing legal landscape while maintaining the founding principles of integrity, excellence, and justice.
                  </p>
                  <p>
                    Today, our firm thrives under the leadership of seasoned legal professionals, each specializing in distinct areas of law. We continue to serve our clients and community through unwavering professionalism, dedicated public service, and meaningful charitable contributions.
                  </p>
                </div>

                {/* Quick Facts */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold text-[#1a3c61]">Founded</div>
                    <div className="text-2xl font-bold text-[#4BB4E6]">1948</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold text-[#1a3c61]">Experience</div>
                    <div className="text-2xl font-bold text-[#4BB4E6]">75+ Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision and Values */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-20">
              <div className="lg:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069"
                  alt="Khanna Associates vision and values - Modern law firm committed to excellence and innovation"
                  width={700}
                  height={500}
                  className="rounded-lg shadow-xl object-cover"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-8 text-[#1a3c61]">
                  Our Vision & <span className="text-[#4BB4E6]">Core Values</span>
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Our Vision</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To be the most trusted and respected law firm globally, recognized for our unwavering commitment to client success, ethical practice, and innovative legal solutions. We strive to set new benchmarks in legal service delivery while fostering continuous learning and excellence.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">Our Core Values</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Integrity", desc: "Upholding the highest ethical standards in all our professional dealings and client relationships." },
                      { title: "Excellence", desc: "Delivering superior legal services through deep expertise, meticulous attention to detail, and continuous improvement." },
                      { title: "Client-Centricity", desc: "Prioritizing our clients' needs and consistently achieving the best possible outcomes for their legal matters." },
                      { title: "Innovation", desc: "Embracing cutting-edge technologies and modern approaches to provide efficient, effective legal solutions." },
                      { title: "Social Responsibility", desc: "Contributing positively to society through pro bono work, community engagement, and charitable initiatives." }
                    ].map((value, index) => (
                      <div key={index} className="border-l-4 border-[#4BB4E6] pl-6">
                        <h4 className="font-semibold text-[#1a3c61] mb-2">{value.title}</h4>
                        <p className="text-gray-600">{value.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-12 text-[#1a3c61] text-center">
                Our Journey Through <span className="text-[#4BB4E6]">Seven Decades</span>
              </h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#4BB4E6] h-full hidden lg:block"></div>
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8`}>
                      <div className="lg:w-1/2 lg:pr-8">
                        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#4BB4E6]">
                          <div className="text-3xl font-bold text-[#4BB4E6] mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">{milestone.title}</h3>
                          <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                      
                      {/* Timeline Dot */}
                      <div className="hidden lg:block w-6 h-6 bg-[#4BB4E6] rounded-full border-4 border-white shadow-lg relative z-10"></div>
                      
                      <div className="lg:w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section with Enhanced SEO */}
        <section className="py-20 bg-gray-50" id="legal-team">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-[#1a3c61]">
                Meet Our Distinguished <span className="text-[#4BB4E6]">Legal Team</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our strength lies in our exceptional team of experienced legal professionals. Discover the expertise and dedication of our lawyers who have been recognized by leading legal directories and industry peers.
              </p>
            </div>

            {/* Team Member Cards */}
            {featuredMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={`/firm-profile/team/${member.slug}`}
                    className="group block"
                    aria-label={`View profile of ${member.name}, ${member.position} at Khanna & Associates`}
                  >
                    <article className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#4BB4E6]/30 transition-all duration-300 transform hover:-translate-y-2">
                      {/* Member Image */}
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image
                          src={member.image || "/placeholder-user.jpg"}
                          alt={`${member.name} - ${member.position} at Khanna & Associates law firm`}
                          fill
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Hover indicator */}
                        <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <ArrowRight className="w-5 h-5 text-[#1a3c61]" />
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#1a3c61] mb-2 group-hover:text-[#4BB4E6] transition-colors duration-200">
                          {member.name}
                        </h3>
                        <p className="text-[#4BB4E6] text-sm font-medium mb-4">
                          {member.position}
                        </p>
                        
                        {/* Brief excerpt from bio */}
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                          {member.bio.substring(0, 150)}...
                        </p>
                        
                        {/* Bottom accent line */}
                        <div className="w-0 h-1 bg-gradient-to-r from-[#4BB4E6] to-[#1a3c61] mt-6 group-hover:w-full transition-all duration-500" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Team Profiles Coming Soon</h3>
                <p className="text-gray-500">Detailed team member information will be available shortly.</p>
              </div>
            )}

            {/* View All Team Button */}
            <div className="text-center">
              <Link href="/firm-profile/team" aria-label="View complete team directory of Khanna & Associates lawyers">
                <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-10 py-4 text-lg rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  View Complete Team Directory
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Recognition & Awards with Enhanced Content */}
        <section className="py-20" id="awards-recognition">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-[#1a3c61]">
                Industry <span className="text-[#4BB4E6]">Recognition & Awards</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our commitment to legal excellence has been recognized by leading international legal directories and industry organizations worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974",
                  alt: "Chambers Global ranking - Top law firm for Corporate and M&A practice",
                  title: "Chambers Global",
                  description: "Top Ranked Firm for Corporate/M&A",
                  detail: "Consistently ranked in Band 1 for multiple practice areas"
                },
                {
                  image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071",
                  alt: "Legal 500 award - Tier 1 ranking for multiple legal practice areas",
                  title: "Legal 500",
                  description: "Tier 1 Firm for Multiple Practice Areas",
                  detail: "Leading rankings across corporate, litigation, and regulatory matters"
                },
                {
                  image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1974",
                  alt: "IFLR1000 recognition - Leading firm for Banking and Finance law",
                  title: "IFLR1000",
                  description: "Leading Firm for Banking & Finance",
                  detail: "Recognized for innovative financial law solutions"
                },
                {
                  image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1970",
                  alt: "Asian Legal Business award - Law Firm of the Year recognition",
                  title: "Asian Legal Business",
                  description: "Law Firm of the Year",
                  detail: "Outstanding performance in Asian legal markets"
                }
              ].map((award, index) => (
                <article key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-gray-100">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={award.image}
                      alt={award.alt}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3c61] mb-3">{award.title}</h3>
                  <p className="text-[#4BB4E6] font-semibold mb-3">{award.description}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{award.detail}</p>
                </article>
              ))}
            </div>

            {/* Additional Recognition */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-[#1a3c61] to-[#4BB4E6] text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Additional Accolades</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold mb-2">25+</div>
                    <div className="text-sm opacity-90">Industry Awards</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-sm opacity-90">Years of Top Rankings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-sm opacity-90">Successful Cases</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-[#1a3c61] text-white relative overflow-hidden" id="join-team">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c61] via-[#1a3c61] to-[#4BB4E6] opacity-90"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our <span className="text-[#4BB4E6]">Award-Winning</span> Team
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
              We're always seeking talented legal professionals to join our distinguished team. Explore exciting career opportunities at Khanna & Associates and be part of our continuing legacy of legal excellence.
            </p>
            
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-6 h-6 text-[#4BB4E6]" />
                <span>5 Global Offices</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6 text-[#4BB4E6]" />
                <span>24/7 Client Support</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-6 h-6 text-[#4BB4E6]" />
                <span>careers@khannaassociates.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/careers" aria-label="View career opportunities at Khanna & Associates">
                <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  View Career Opportunities
                </Button>
              </Link>
              <Link href="/contact" aria-label="Contact Khanna & Associates law firm">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1a3c61] px-10 py-4 text-lg font-semibold bg-transparent rounded-lg transition-all duration-200"
                >
                  Contact Our Firm
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="py-20 bg-gray-50" id="frequently-asked-questions">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-[#1a3c61] text-center">
              Frequently Asked <span className="text-[#4BB4E6]">Questions</span>
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "When was Khanna & Associates established?",
                  answer: "Khanna & Associates was established in 1948 by Late Amarnath Singh Khanna in New Delhi, making us one of India's longest-serving law firms with over 75 years of legal excellence."
                },
                {
                  question: "What practice areas does Khanna & Associates specialize in?",
                  answer: "We provide comprehensive legal services including corporate law, civil litigation, criminal law, property law, technology law, intellectual property, international law, banking & finance, and regulatory compliance."
                },
                {
                  question: "Where are Khanna & Associates offices located?",
                  answer: "We have five strategic offices: New Delhi (headquarters), Mumbai, Bangalore, New York, and London, enabling us to serve clients across India and internationally."
                },
                {
                  question: "What recognition has Khanna & Associates received?",
                  answer: "We are consistently ranked by leading legal directories including Chambers Global, Legal 500, IFLR1000, and Asian Legal Business, with numerous awards for excellence in various practice areas and over 25 industry recognitions."
                },
                {
                  question: "How can I contact Khanna & Associates for legal consultation?",
                  answer: "You can reach us through our website contact form, email us at info@khannaassociates.com, or call our offices directly. We provide initial consultations and have 24/7 client support available."
                },
                {
                  question: "Does Khanna & Associates handle international legal matters?",
                  answer: "Yes, with offices in New York and London, we handle complex cross-border transactions, international litigation, and provide legal services to multinational corporations and global clients."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group">
                  <summary className="text-lg font-semibold text-[#1a3c61] cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-[#4BB4E6] transform group-open:rotate-90 transition-transform duration-200" />
                  </summary>
                  <div className="mt-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation for SEO */}
        <nav aria-label="Breadcrumb" className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-[#4BB4E6] transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mx-2" />
                <span className="text-[#1a3c61] font-medium">Firm Profile</span>
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </>
  )
}