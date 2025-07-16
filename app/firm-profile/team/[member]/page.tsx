import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Award, BookOpen, Calendar } from "lucide-react"

// Team member data
const teamMembersData: Record<
  string,
  {
    name: string
    position: string
    image: string
    expertise: string
    education: string
    experience: string
    email: string
    phone: string
    linkedin: string
    languages: string[]
    achievements: string[]
    publications: Array<{ title: string; year: string }>
    bio: string
    longBio: string[]
    practiceAreas: string[]
  }
> = {
  "rajiv-khanna": {
    name: "Rajiv Khanna",
    position: "Senior Partner",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
    expertise: "Corporate Law",
    education: "Harvard Law School, LL.M.",
    experience: "35+ years",
    email: "rajiv.khanna@khannaandassociates.com",
    phone: "+91 11 2345 6789",
    linkedin: "linkedin.com/in/rajivkhanna",
    languages: ["English", "Hindi", "Punjabi"],
    achievements: [
      "Listed in Chambers Global for Corporate/M&A (2015-2023)",
      "Recognized by Legal 500 as a Leading Individual in Corporate Law",
      "Former President of the Bar Association of Delhi",
      "Advisor to the Ministry of Corporate Affairs on Companies Act amendments",
      "Led legal teams on transactions worth over $5 billion",
    ],
    publications: [
      { title: "Corporate Governance in India: Evolving Landscape", year: "2022" },
      { title: "Mergers & Acquisitions: Legal Framework and Challenges", year: "2019" },
      { title: "Foreign Direct Investment in India: Legal Perspectives", year: "2015" },
    ],
    bio: "Rajiv leads our corporate practice with unparalleled expertise and dedication. With over 35 years of experience, he has advised on some of the most significant corporate transactions in India.",
    longBio: [
      "Rajiv Khanna is a Senior Partner at Khanna and Associates, heading the firm's Corporate Law practice. With over 35 years of experience, he is widely recognized as one of India's leading corporate lawyers.",
      "Rajiv's practice focuses on mergers and acquisitions, joint ventures, private equity, and corporate restructuring. He has advised on some of the most significant corporate transactions in India, representing both domestic and international clients across various sectors including technology, pharmaceuticals, manufacturing, and financial services.",
      "Before joining Khanna and Associates, Rajiv worked at a leading international law firm in New York and served as General Counsel for a multinational corporation. His diverse experience gives him a unique perspective on corporate legal matters, combining international best practices with deep knowledge of the Indian legal landscape.",
      "Rajiv is actively involved in legal education and regularly speaks at conferences and seminars on corporate law topics. He has contributed to various legal publications and serves on the boards of several companies and non-profit organizations.",
    ],
    practiceAreas: [
      "Mergers & Acquisitions",
      "Joint Ventures",
      "Private Equity",
      "Corporate Restructuring",
      "Foreign Direct Investment",
      "Corporate Governance",
    ],
  },
  "priya-sharma": {
    name: "Priya Sharma",
    position: "Managing Partner",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
    expertise: "Intellectual Property",
    education: "Stanford Law School, J.D.",
    experience: "28+ years",
    email: "priya.sharma@khannaandassociates.com",
    phone: "+91 11 2345 6790",
    linkedin: "linkedin.com/in/priyasharma",
    languages: ["English", "Hindi", "French"],
    achievements: [
      "Named 'IP Lawyer of the Year' by Legal Era (2020)",
      "Board Member of the Intellectual Property Association of India",
      "Published author on IP rights in the digital age",
      "Represented clients in 100+ trademark and patent disputes",
      "Guest lecturer at National Law University, Delhi",
    ],
    publications: [
      { title: "Intellectual Property Rights in the Digital Age", year: "2021" },
      { title: "Patent Protection Strategies for Technology Companies", year: "2018" },
      { title: "Trademark Law: Indian and International Perspectives", year: "2014" },
    ],
    bio: "Priya specializes in intellectual property law and has successfully represented numerous international clients in complex IP disputes. Her strategic approach has helped clients protect their valuable intellectual assets.",
    longBio: [
      "Priya Sharma is the Managing Partner at Khanna and Associates and heads the firm's Intellectual Property practice. With 28 years of experience, she is recognized as one of India's foremost IP lawyers.",
      "Priya's practice encompasses all aspects of intellectual property law, including patents, trademarks, copyrights, and trade secrets. She has successfully represented numerous international and domestic clients in complex IP disputes and has developed comprehensive IP protection strategies for businesses across various sectors.",
      "Her expertise is particularly sought after in the technology, pharmaceutical, and entertainment industries, where she has helped clients navigate the complex intersection of innovation, business, and law. Priya's strategic approach has helped clients protect their valuable intellectual assets while maximizing their commercial potential.",
      "Before joining Khanna and Associates, Priya worked at a specialized IP firm in Silicon Valley and served as IP counsel for a major technology company. She brings this global perspective to her practice, helping clients protect their intellectual property rights both in India and internationally.",
    ],
    practiceAreas: [
      "Patents",
      "Trademarks",
      "Copyrights",
      "Trade Secrets",
      "IP Litigation",
      "IP Licensing",
      "Technology Transfer",
    ],
  },
  "vikram-mehta": {
    name: "Vikram Mehta",
    position: "Partner, Banking & Finance",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
    expertise: "Banking and Finance",
    education: "London School of Economics, LL.M.",
    experience: "20+ years",
    email: "vikram.mehta@khannaandassociates.com",
    phone: "+91 11 2345 6791",
    linkedin: "linkedin.com/in/vikrammehta",
    languages: ["English", "Hindi", "Gujarati"],
    achievements: [
      "Advisor to the Reserve Bank of India on banking regulations",
      "Led legal teams on 50+ major financing transactions",
      "Recognized by IFLR1000 as a 'Market Leader'",
      "Member of the Banking Law Reform Committee",
      "Speaker at international banking conferences",
    ],
    publications: [
      { title: "Banking Regulations in India: A Comprehensive Guide", year: "2020" },
      { title: "Project Finance: Legal Structures and Risk Allocation", year: "2017" },
      { title: "Financial Restructuring: Legal Framework and Case Studies", year: "2013" },
    ],
    bio: "Vikram brings 20 years of experience in banking and finance law, advising major financial institutions and corporations. His expertise spans structured finance, project finance, and regulatory compliance.",
    longBio: [
      "Vikram Mehta is a Partner at Khanna and Associates, leading the firm's Banking and Finance practice. With over 20 years of experience, he is recognized as a leading expert in financial services law.",
      "Vikram's practice covers all aspects of banking and finance law, including project finance, acquisition finance, structured finance, and financial restructuring. He has advised major financial institutions, corporations, and government bodies on complex financial transactions and regulatory matters.",
      "His expertise is particularly valued in infrastructure financing, where he has played a key role in numerous landmark projects in the energy, transportation, and telecommunications sectors. Vikram's deep understanding of financial regulations and market practices enables him to provide practical, business-oriented advice to clients navigating complex financial landscapes.",
      "Before joining Khanna and Associates, Vikram worked at a leading international law firm in London and served as in-house counsel for a global investment bank. This diverse experience gives him unique insights into the needs and perspectives of financial institutions and corporate borrowers alike.",
    ],
    practiceAreas: [
      "Project Finance",
      "Acquisition Finance",
      "Structured Finance",
      "Financial Restructuring",
      "Banking Regulation",
      "Debt Capital Markets",
      "Securitization",
    ],
  },
}

export default function TeamMemberPage({ params }: { params: { member: string } }) {
  const memberSlug = params.member

  // Check if member exists in our data
  if (!teamMembersData[memberSlug]) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-[#1a3c61] mb-6">Team Member Not Found</h1>
          <p className="text-gray-600 mb-8">The team member profile you're looking for doesn't exist.</p>
          <Link href="/firm-profile/team">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">View All Team Members</Button>
          </Link>
        </div>
      </div>
    )
  }

  const member = teamMembersData[memberSlug]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1a3c61] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto md:mx-0">
                <div className="absolute inset-0 rounded-full bg-[#4BB4E6]/20 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{member.name}</h1>
              <p className="text-xl text-[#4BB4E6] mb-4">{member.position}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                <div className="bg-white/10 px-4 py-2 rounded-full">
                  <span className="text-sm">{member.expertise}</span>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-full">
                  <span className="text-sm">{member.experience} Experience</span>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-full">
                  <span className="text-sm">{member.education}</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href={`mailto:${member.email}`} className="bg-[#4BB4E6] hover:bg-[#3a9fd1] p-3 rounded-full">
                  <Mail className="h-5 w-5" />
                </a>
                <a href={`tel:${member.phone}`} className="bg-[#4BB4E6] hover:bg-[#3a9fd1] p-3 rounded-full">
                  <Phone className="h-5 w-5" />
                </a>
                <a
                  href={`https://${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4BB4E6] hover:bg-[#3a9fd1] p-3 rounded-full"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About {member.name}</h2>

              {member.longBio.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}

              <h3 className="text-2xl font-semibold mt-12 mb-6 text-[#1a3c61]">Practice Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {member.practiceAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                    <p className="text-gray-700">{area}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">Achievements & Recognition</h3>
              <div className="space-y-4 mb-12">
                {member.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <Award className="h-5 w-5 text-[#4BB4E6] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">Publications</h3>
              <div className="space-y-4 mb-12">
                {member.publications.map((publication, index) => (
                  <div key={index} className="flex items-start">
                    <BookOpen className="h-5 w-5 text-[#4BB4E6] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">{publication.title}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <p className="text-gray-500 text-sm">{publication.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                      <a href={`mailto:${member.email}`} className="text-gray-700 hover:text-[#4BB4E6]">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                      <a href={`tel:${member.phone}`} className="text-gray-700 hover:text-[#4BB4E6]">
                        {member.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                      <a
                        href={`https://${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#4BB4E6]"
                      >
                        {member.linkedin}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.languages.map((language, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Schedule a Meeting</h3>
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-3">
                    Request Consultation
                  </Button>
                  <p className="text-gray-500 text-sm text-center">
                    Get expert legal advice from {member.name.split(" ")[0]} on matters related to {member.expertise}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Team Members */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Meet Other Team Members</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(teamMembersData)
              .filter(([key]) => key !== memberSlug)
              .map(([key, otherMember]) => (
                <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={otherMember.image || "/placeholder.svg"}
                      alt={otherMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#1a3c61]">{otherMember.name}</h3>
                    <p className="text-[#4BB4E6] font-medium">{otherMember.position}</p>
                    <p className="text-gray-600 mt-2 mb-4">{otherMember.bio}</p>
                    <Link href={`/firm-profile/team/${key}`}>
                      <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white w-full">View Profile</Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/firm-profile/team">
              <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-6">View All Team Members</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
