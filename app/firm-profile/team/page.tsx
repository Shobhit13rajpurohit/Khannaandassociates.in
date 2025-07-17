import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Rajiv Khanna",
      position: "Senior Partner",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
      expertise: "Corporate Law",
      slug: "rajiv-khanna",
      bio: "Rajiv leads our corporate practice with unparalleled expertise and dedication. With over 35 years of experience, he has advised on some of the most significant corporate transactions in India.",
    },
    {
      name: "Priya Sharma",
      position: "Managing Partner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
      expertise: "Intellectual Property",
      slug: "priya-sharma",
      bio: "Priya specializes in intellectual property law and has successfully represented numerous international clients in complex IP disputes. Her strategic approach has helped clients protect their valuable intellectual assets.",
    },
    {
      name: "Vikram Mehta",
      position: "Partner, Banking & Finance",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      expertise: "Banking and Finance",
      slug: "vikram-mehta",
      bio: "Vikram brings 20 years of experience in banking and finance law, advising major financial institutions and corporations. His expertise spans structured finance, project finance, and regulatory compliance.",
    },
    {
      name: "Ananya Patel",
      position: "Partner, Litigation",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974",
      expertise: "Civil and Commercial Litigation",
      slug: "ananya-patel",
      bio: "Ananya is a seasoned litigator with expertise in civil and commercial disputes, known for her strategic approach to complex cases. She has represented clients before various High Courts and the Supreme Court of India.",
    },
    {
      name: "Arjun Singh",
      position: "Partner, Real Estate",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
      expertise: "Real Estate",
      slug: "arjun-singh",
      bio: "Arjun leads our real estate practice, specializing in property transactions, land acquisition, and development projects. His deep understanding of the sector has made him a trusted advisor to developers and investors.",
    },
    {
      name: "Neha Kapoor",
      position: "Partner, International Law",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071",
      expertise: "International Law",
      slug: "neha-kapoor",
      bio: "Neha specializes in international law and cross-border transactions, with extensive experience in global trade and investment. She has represented clients in international arbitration proceedings and complex multi-jurisdictional matters.",
    },
    {
      name: "Anil Kapoor",
      position: "Senior Partner, Mumbai",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
      expertise: "Corporate Law",
      slug: "anil-kapoor",
      bio: "Anil leads our Mumbai office and specializes in corporate law with a focus on mergers and acquisitions. With over 30 years of experience, he has advised on some of India's largest corporate transactions.",
    },
    {
      name: "Kiran Kumar",
      position: "Senior Partner, Bangalore",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
      expertise: "Technology Law",
      slug: "kiran-kumar",
      bio: "Kiran leads our Bangalore office and specializes in technology law and intellectual property. His expertise in the tech sector has made him a trusted advisor to startups and established technology companies alike.",
    },
    {
      name: "Meera Patel",
      position: "Partner, Corporate Law",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
      expertise: "Corporate Law",
      slug: "meera-patel",
      bio: "Meera specializes in corporate law with a focus on private equity and venture capital. She has advised numerous startups and investors on funding rounds, acquisitions, and corporate governance matters.",
    },
    {
      name: "David Cohen",
      position: "Senior Partner, New York",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974",
      expertise: "International Business",
      slug: "david-cohen",
      bio: "David leads our New York office and specializes in international business transactions and cross-border litigation. His global perspective and deep understanding of US law make him a valuable asset to clients with international interests.",
    },
    {
      name: "James Wilson",
      position: "Senior Partner, London",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      expertise: "EU Law",
      slug: "james-wilson",
      bio: "James heads our London office and specializes in EU law and international arbitration. His expertise in navigating complex regulatory frameworks has made him a sought-after advisor for clients with interests in Europe and the UK.",
    },
  ]

  const practiceAreas = [
    "All",
    "Corporate Law",
    "Intellectual Property",
    "Banking and Finance",
    "Litigation",
    "Real Estate",
    "International Law",
    "Technology Law",
  ]

  const offices = ["All Offices", "Delhi", "Mumbai", "Bangalore", "New York", "London"]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-xl mb-8">
              Meet the experienced professionals behind Khanna and Associates' legacy of excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or expertise"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <select className="border border-gray-300 rounded-md px-4 py-2 bg-white w-full md:w-auto">
                {practiceAreas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <select className="border border-gray-300 rounded-md px-4 py-2 bg-white w-full md:w-auto">
                {offices.map((office, index) => (
                  <option key={index} value={office}>
                    {office}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#1a3c61]">{member.name}</h3>
                  <p className="text-[#4BB4E6] font-medium">{member.position}</p>
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm inline-block mt-2 mb-3">
                    {member.expertise}
                  </div>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <Link href={`/firm-profile/team/${member.slug}`}>
                    <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white w-full">View Profile</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Join Our Team</h2>
              <p className="text-gray-700 mb-4">
                We're always looking for talented legal professionals to join our team. At Khanna and Associates, we
                foster a collaborative environment where you can grow your career while working on challenging and
                rewarding cases.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're an experienced attorney or a recent law graduate, we offer opportunities to work with
                industry-leading professionals on diverse and complex legal matters.
              </p>
              <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">View Open Positions</Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070"
                alt="Join Our Team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
