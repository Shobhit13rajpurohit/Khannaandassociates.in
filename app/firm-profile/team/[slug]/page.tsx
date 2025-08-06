export const dynamic = 'force-dynamic';

import { getTeamMember } from "../../../../lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../../../components/ui/breadcrumb"
import Link from "next/link"
import { Mail, Phone, MapPin, ArrowLeft, Award, GraduationCap, Briefcase } from "lucide-react"

interface MemberProfilePageProps {
  params: { slug: string }
}

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const member = await getTeamMember(params.slug)

  if (!member) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1a3c61] to-[#2d5a87] text-white py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="text-white/80">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/firm-profile/team" className="hover:text-white transition-colors">Team</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">{member.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
              {/* Profile Image */}
              <div className="relative h-80 w-full">
                <Image 
                  src={member.image || "/placeholder-user.jpg"} 
                  alt={member.name} 
                  fill
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Profile Info */}
              <div className="p-6">
                <h1 className="text-2xl font-bold text-[#1a3c61] mb-2">{member.name}</h1>
                <p className="text-lg text-[#4BB4E6] font-medium mb-6">{member.position}</p>
                
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#1a3c61] flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact
                  </h3>
                  
                  <div className="space-y-3">
                    <a 
                      href={`mailto:${member.contact.email}`} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#4BB4E6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4BB4E6]/20 transition-colors">
                        <Mail className="w-5 h-5 text-[#4BB4E6]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900 font-medium">{member.contact.email}</p>
                      </div>
                    </a>
                    
                    <div className="flex items-center gap-3 p-3">
                      <div className="w-10 h-10 bg-[#1a3c61]/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#1a3c61]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-900 font-medium">{member.contact.phone}</p>
                      </div>
                    </div>
                    
                    {member.office && (
                      <div className="flex items-center gap-3 p-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Office</p>
                          <p className="text-gray-900 font-medium">{member.office}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Biography Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1a3c61]/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#1a3c61]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1a3c61]">Biography</h2>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{member.bio}</p>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#4BB4E6]/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#4BB4E6]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1a3c61]">Education</h2>
              </div>
              <div className="space-y-4">
                {member.education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mt-3 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{edu}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#1a3c61]">Areas of Expertise</h2>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{member.expertise}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Team Button */}
        <div className="mt-12 text-center">
          <Link 
            href="/firm-profile/team" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4BB4E6] text-white rounded-lg hover:bg-[#3da3d1] transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Team Directory
          </Link>
        </div>
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