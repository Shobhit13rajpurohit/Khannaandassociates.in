import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, BookOpen, Users, Briefcase, Scale, Globe } from "lucide-react"

export default function FirmProfilePage() {
  const teamMembers = [
    {
      name: "Rajiv Khanna",
      position: "Senior Partner",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
      expertise: "Corporate Law",
      education: "Harvard Law School, LL.M.",
      experience: "35+ years",
      achievements: [
        "Listed in Chambers Global for Corporate/M&A (2015-2023)",
        "Recognized by Legal 500 as a Leading Individual in Corporate Law",
        "Former President of the Bar Association of Delhi",
      ],
      bio: "Rajiv leads our corporate practice with unparalleled expertise and dedication. With over 35 years of experience, he has advised on some of the most significant corporate transactions in India.",
    },
    {
      name: "Priya Sharma",
      position: "Managing Partner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
      expertise: "Intellectual Property",
      education: "Stanford Law School, J.D.",
      experience: "28+ years",
      achievements: [
        "Named 'IP Lawyer of the Year' by Legal Era (2020)",
        "Board Member of the Intellectual Property Association of India",
        "Published author on IP rights in the digital age",
      ],
      bio: "Priya specializes in intellectual property law and has successfully represented numerous international clients in complex IP disputes. Her strategic approach has helped clients protect their valuable intellectual assets.",
    },
    {
      name: "Vikram Mehta",
      position: "Partner, Banking & Finance",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      expertise: "Banking and Finance",
      education: "London School of Economics, LL.M.",
      experience: "20+ years",
      achievements: [
        "Advisor to the Reserve Bank of India on banking regulations",
        "Led legal teams on 50+ major financing transactions",
        "Recognized by IFLR1000 as a 'Market Leader'",
      ],
      bio: "Vikram brings 20 years of experience in banking and finance law, advising major financial institutions and corporations. His expertise spans structured finance, project finance, and regulatory compliance.",
    },
    {
      name: "Ananya Patel",
      position: "Partner, Litigation",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974",
      expertise: "Civil and Commercial Litigation",
      education: "National Law School of India University, B.A., LL.B.",
      experience: "18+ years",
      achievements: [
        "Successfully argued 15+ cases before the Supreme Court of India",
        "Recipient of 'Woman Lawyer of the Year' award (2019)",
        "Guest faculty at National Law University, Delhi",
      ],
      bio: "Ananya is a seasoned litigator with expertise in civil and commercial disputes, known for her strategic approach to complex cases. She has represented clients before various High Courts and the Supreme Court of India.",
    },
    {
      name: "Arjun Singh",
      position: "Partner, Real Estate",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
      expertise: "Real Estate",
      education: "Delhi University, LL.B.",
      experience: "22+ years",
      achievements: [
        "Advised on real estate transactions worth over $2 billion",
        "Expert committee member for Real Estate Regulatory Authority",
        "Contributing editor to 'Property Law Review'",
      ],
      bio: "Arjun leads our real estate practice, specializing in property transactions, land acquisition, and development projects. His deep understanding of the sector has made him a trusted advisor to developers and investors.",
    },
    {
      name: "Neha Kapoor",
      position: "Partner, International Law",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071",
      expertise: "International Law",
      education: "Yale Law School, J.D.",
      experience: "15+ years",
      achievements: [
        "Member of the International Bar Association",
        "Led legal teams on cross-border transactions in 20+ countries",
        "Recognized expert in international arbitration",
      ],
      bio: "Neha specializes in international law and cross-border transactions, with extensive experience in global trade and investment. She has represented clients in international arbitration proceedings and complex multi-jurisdictional matters.",
    },
  ]

  const milestones = [
    {
      year: "1948",
      title: "Founding of the Firm",
      description: "Established by Late Amarnath Singh Khanna in New Delhi, focusing initially on criminal law.",
    },
    {
      year: "1965",
      title: "Expansion of Practice Areas",
      description:
        "Expanded to include corporate law, civil litigation, and property law under the leadership of the second generation.",
    },
    {
      year: "1985",
      title: "Mumbai Office",
      description: "Opened our first branch office in Mumbai to serve clients in India's financial capital.",
    },
    {
      year: "2000",
      title: "Bangalore Office",
      description: "Established presence in Bangalore to focus on technology law and intellectual property.",
    },
    {
      year: "2012",
      title: "International Expansion",
      description: "Opened our first international office in New York to serve global clients.",
    },
    {
      year: "2015",
      title: "London Office",
      description: "Expanded our international presence with an office in London.",
    },
    {
      year: "2023",
      title: "75th Anniversary",
      description: "Celebrated 75 years of legal excellence and service to clients worldwide.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Firm Profile</h1>
            <p className="text-xl mb-8">
              A legacy of legal excellence since 1948, serving clients with integrity and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Firm Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070"
                alt="Khanna and Associates Office"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Khanna and Associates</h2>
              <p className="text-gray-700 mb-4">
                KHANNA & ASSOCIATES was initially founded in 1948 by Late Amarnath Singh Khanna, a highly successful
                lawyer in private practice, specializing in criminal law, dedicated to the cause of the society, an
                unforgettable legend in the field.
              </p>
              <p className="text-gray-700 mb-4">
                Today, the Firm has grown more under the sincere leadership with professionals specializing in their own
                fields, serving the clients and the community through professionalism, public service and charitable
                works.
              </p>
              <p className="text-gray-700 mb-6">
                With offices across India and international locations in New York and London, we provide comprehensive
                legal services to clients worldwide. Our team of over 150 attorneys brings expertise across various
                practice areas, ensuring that our clients receive the highest quality legal counsel.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-[#4BB4E6]" />
                  </div>
                  <h3 className="font-semibold text-[#1a3c61]">77</h3>
                  <p className="text-gray-600 text-sm">Years of Excellence</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-3">
                    <Users className="h-8 w-8 text-[#4BB4E6]" />
                  </div>
                  <h3 className="font-semibold text-[#1a3c61]">150+</h3>
                  <p className="text-gray-600 text-sm">Legal Professionals</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-3">
                    <Globe className="h-8 w-8 text-[#4BB4E6]" />
                  </div>
                  <h3 className="font-semibold text-[#1a3c61]">8</h3>
                  <p className="text-gray-600 text-sm">Global Offices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-6">
                <Scale className="h-8 w-8 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Integrity</h3>
              <p className="text-gray-700">
                We uphold the highest ethical standards in all our dealings. Our commitment to integrity forms the
                foundation of our practice and the trust our clients place in us.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Excellence</h3>
              <p className="text-gray-700">
                We strive for excellence in every aspect of our work. Our attorneys are committed to delivering the
                highest quality legal services and achieving the best possible outcomes for our clients.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#4BB4E6]/10 flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-[#4BB4E6]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Innovation</h3>
              <p className="text-gray-700">
                We embrace innovation and creative thinking to address complex legal challenges. Our forward-thinking
                approach allows us to develop tailored solutions that meet our clients' evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Firm History Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Our Journey</h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#4BB4E6]"></div>

            {/* Timeline Items */}
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                  <h3 className="text-xl font-semibold text-[#1a3c61]">{milestone.title}</h3>
                  <p className="text-gray-700 mt-2">{milestone.description}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#4BB4E6] flex items-center justify-center z-10 mx-4">
                  <span className="text-white font-bold">{milestone.year}</span>
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Our Leadership Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#1a3c61]">{member.name}</h3>
                  <p className="text-[#4BB4E6] font-medium">{member.position}</p>
                  <p className="text-gray-600 mt-2 mb-4">{member.bio}</p>
                  <Link href={`/firm-profile/team/${member.name.toLowerCase().replace(/\s+/g, "-")}`}>
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

      {/* Recognition & Awards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Recognition & Awards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974"
                alt="Chambers Global Award"
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-[#1a3c61]">Chambers Global</h3>
              <p className="text-gray-600 text-sm">Top Ranked Firm for Corporate/M&A</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071"
                alt="Legal 500 Award"
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-[#1a3c61]">Legal 500</h3>
              <p className="text-gray-600 text-sm">Tier 1 Firm for Multiple Practice Areas</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1974"
                alt="IFLR1000 Award"
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-[#1a3c61]">IFLR1000</h3>
              <p className="text-gray-600 text-sm">Leading Firm for Banking & Finance</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Image
                src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1970"
                alt="Asian Legal Business Award"
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-[#1a3c61]">Asian Legal Business</h3>
              <p className="text-gray-600 text-sm">Law Firm of the Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="max-w-2xl mx-auto mb-8">
            We're always looking for talented legal professionals to join our team. Explore career opportunities at
            Khanna and Associates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
              View Career Opportunities
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
    </div>
  )
}
