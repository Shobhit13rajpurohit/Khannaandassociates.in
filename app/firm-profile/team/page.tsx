import { getActiveTeamMembers, TeamMember } from "../../../lib/db"
import TeamMemberCard from "../../../components/team-member"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Team | Law Firm",
  description: "Meet the experienced and dedicated team of legal professionals at our law firm.",
}

export default async function TeamPage() {
  const teamMembers = await getActiveTeamMembers()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            name={member.name}
            position={member.position}
            image={member.image}
            slug={member.slug}
          />
        ))}
      </div>
    </div>
  )
}
