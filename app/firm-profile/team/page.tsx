export const dynamic = 'force-dynamic'
export const revalidate = 0
import { getActiveTeamMembers, TeamMember } from "../../../lib/db"
import TeamMemberCard from "../../../components/team-member"
import { Metadata } from "next"
import { Users, RefreshCw } from "lucide-react"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Our Team | Law Firm",
  description: "Meet the experienced and dedicated team of legal professionals at our law firm.",
}

// Separate component for team content to enable better loading states
async function TeamContent() {
  console.log('TeamPage: Fetching active team members...')
  const teamMembers = await getActiveTeamMembers()
  console.log('TeamPage: Found', teamMembers.length, 'active team members')

  return (
    <div className="container mx-auto px-4 py-16">
      {teamMembers.length > 0 ? (
        <>
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#4BB4E6]/10 text-[#1a3c61] rounded-full text-sm font-medium mb-4">
              {teamMembers.length} Team Member{teamMembers.length !== 1 ? 's' : ''}
            </div>
            <p className="text-gray-600 text-sm">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={`${member.id}-${member.updated_at}`} // Use composite key to force re-render on updates
                name={member.name}
                position={member.position}
                image={member.image}
                slug={member.slug}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Team Members Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            We're currently updating our team information. Please check back soon.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a3c61] text-white rounded-lg hover:bg-[#132e4a] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Page
          </button>
        </div>
      )}
    </div>
  )
}

// Loading component
function TeamLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-2 bg-gray-200 animate-pulse rounded-full text-sm font-medium mb-4 w-32 h-8">
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1a3c61] to-[#2d5a87] text-white py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Team
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Meet the experienced and dedicated professionals who bring expertise, 
              integrity, and innovation to every case we handle.
            </p>
          </div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  fill="white" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Team Grid Section with Suspense */}
      <Suspense fallback={<TeamLoading />}>
        <TeamContent />
      </Suspense>
    </div>
  )
}