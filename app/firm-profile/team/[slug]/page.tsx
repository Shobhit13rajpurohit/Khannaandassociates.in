import { getTeamMember } from "../../../../lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../../../components/ui/breadcrumb"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"

interface MemberProfilePageProps {
  params: { slug: string }
}

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const member = await getTeamMember(params.slug)

  if (!member) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/firm-profile/team">Team</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{member.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative w-full h-96">
            <Image src={member.image || "/placeholder-user.jpg"} alt={member.name} layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-[#1a3c61]">{member.name}</h2>
            <p className="text-lg text-[#4BB4E6]">{member.position}</p>
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-[#1a3c61]">Contact Information</h3>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <a href={`mailto:${member.contact.email}`} className="text-gray-700 hover:text-[#4BB4E6]">{member.contact.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{member.contact.phone}</span>
            </div>
            {member.office && (
              <div>
                <h3 className="text-xl font-semibold text-[#1a3c61] mt-6">Office</h3>
                <p className="text-gray-700">{member.office}</p>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <div>
            <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Biography</h3>
            <p className="text-gray-700 leading-relaxed">{member.bio}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Education</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {member.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[#1a3c61] mb-4">Expertise</h3>
            <p className="text-gray-700">{member.expertise}</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Link href="/firm-profile/team" className="text-[#4BB4E6] hover:underline">
          &larr; Back to Team
        </Link>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: MemberProfilePageProps) {
  const member = await getTeamMember(params.slug)
  if (!member) {
    return {
      title: "Team Member Not Found"
    }
  }
  return {
    title: `${member.name} | ${member.position}`,
    description: member.bio.substring(0, 160),
  }
}
