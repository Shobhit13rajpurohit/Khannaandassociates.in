import TeamMember from "@/components/team-member"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Amarnath Singh Khanna",
      title: "Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
      slug: "amarnath-singh-khanna",
    },
    {
      name: "Priya Sharma",
      title: "Managing Partner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
      slug: "priya-sharma",
    },
    {
      name: "Rajesh Kumar",
      title: "Senior Partner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
      slug: "rajesh-kumar",
    },
    {
      name: "Anjali Singh",
      title: "Partner, Corporate Law",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
      slug: "anjali-singh",
    },
    {
      name: "Vikram Malhotra",
      title: "Partner, Real Estate Law",
      image: "https://images.unsplash.com/photo-1507003211169-e69adba4c2d9?q=80&w=1974",
      slug: "vikram-malhotra",
    },
    {
      name: "Sneha Reddy",
      title: "Associate, Intellectual Property",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976",
      slug: "sneha-reddy",
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="bg-[#1a3c61] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Esteemed Team</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Meet the dedicated legal professionals who drive our firm's success and client satisfaction.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#4BB4E6] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg mb-8">
            Are you a passionate legal professional looking to make an impact? Explore career opportunities with us.
          </p>
          <Link href="/careers">
            <Button variant="outline" className="bg-white text-[#4BB4E6] hover:bg-[#1a3c61] hover:text-white">
              View Openings
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
