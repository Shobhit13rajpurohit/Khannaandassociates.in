import Image from "next/image"
import TeamMember from "@/components/team-member"
import { Button } from "@/components/ui/button"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Rajiv Khanna",
      position: "Senior Partner",
      image: "/placeholder.svg?height=400&width=300&text=Rajiv+Khanna",
      bio: "With over 35 years of experience in corporate law, Rajiv leads our corporate practice with unparalleled expertise and dedication.",
      linkedIn: "https://linkedin.com/in/rajivkhanna",
    },
    {
      name: "Priya Sharma",
      position: "Managing Partner",
      image: "/placeholder.svg?height=400&width=300&text=Priya+Sharma",
      bio: "Priya specializes in intellectual property law and has successfully represented numerous international clients in complex IP disputes.",
      linkedIn: "https://linkedin.com/in/priyasharma",
    },
    {
      name: "Vikram Mehta",
      position: "Partner, Banking & Finance",
      image: "/placeholder.svg?height=400&width=300&text=Vikram+Mehta",
      bio: "Vikram brings 20 years of experience in banking and finance law, advising major financial institutions and corporations.",
      linkedIn: "https://linkedin.com/in/vikrammehta",
    },
    {
      name: "Ananya Patel",
      position: "Partner, Litigation",
      image: "/placeholder.svg?height=400&width=300&text=Ananya+Patel",
      bio: "Ananya is a seasoned litigator with expertise in civil and commercial disputes, known for her strategic approach to complex cases.",
      linkedIn: "https://linkedin.com/in/ananyapatel",
    },
    {
      name: "Arjun Singh",
      position: "Partner, Real Estate",
      image: "/placeholder.svg?height=400&width=300&text=Arjun+Singh",
      bio: "Arjun leads our real estate practice, specializing in property transactions, land acquisition, and development projects.",
      linkedIn: "https://linkedin.com/in/arjunsingh",
    },
    {
      name: "Neha Kapoor",
      position: "Partner, International Law",
      image: "/placeholder.svg?height=400&width=300&text=Neha+Kapoor",
      bio: "Neha specializes in international law and cross-border transactions, with extensive experience in global trade and investment.",
      linkedIn: "https://linkedin.com/in/nehakapoor",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1600&text=Our+Team')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Legal Team</h1>
            <p className="text-xl mb-8">
              Meet the experienced professionals behind Khanna and Associates' legacy of excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Meet Our Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of dedicated legal professionals brings decades of combined experience across various practice
              areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                position={member.position}
                image={member.image}
                bio={member.bio}
                linkedIn={member.linkedIn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 bg-gray-50">
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
              <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white">View Open Positions</Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Join+Our+Team"
                alt="Join Our Team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
