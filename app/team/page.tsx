export const revalidate = 0

import TeamMember from "@/components/team-member"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getActiveTeamMembers } from "@/lib/db"

export default async function TeamPage() {
  const teamMembers = await getActiveTeamMembers()

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
