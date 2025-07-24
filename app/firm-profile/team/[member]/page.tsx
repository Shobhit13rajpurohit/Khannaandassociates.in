import { getTeamMember, getActiveTeamMembers } from "../../../../lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Metadata } from "next"

type Props = {
  params: { member: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await getTeamMember(params.member)

  if (!member) {
    return {
      title: "Team Member Not Found",
    }
  }

  return {
    title: `${member.name} - ${member.position} | Law Firm`,
    description: member.bio.substring(0, 160),
  }
}

export async function generateStaticParams() {
  const members = await getActiveTeamMembers()
  return members.map(member => ({
    member: member.slug,
  }))
}

export default async function TeamMemberPage({ params }: Props) {
  const member = await getTeamMember(params.member)

  if (!member) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={member.image || "/placeholder-user.jpg"}
            alt={member.name}
            width={300}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold">{member.name}</h1>
          <p className="text-xl text-gray-600 mt-2">{member.position}</p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Biography</h2>
            <p className="mt-2 text-gray-700">{member.bio}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Expertise</h2>
            <p className="mt-2 text-gray-700">{member.expertise}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Education</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {member.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-2 text-gray-700">Email: {member.contact.email}</p>
            <p className="mt-1 text-gray-700">Phone: {member.contact.phone}</p>
          </div>
          {member.office && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Office</h2>
              <p className="mt-2 text-gray-700">{member.office}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
