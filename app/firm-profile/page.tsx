export const revalidate = 0

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getActiveTeamMembers } from "@/lib/db"
import { ArrowRight } from "lucide-react"

export default async function FirmProfilePage() {
  // Fetch team members for the preview section
  const teamMembers = await getActiveTeamMembers()
  const featuredMembers = teamMembers.slice(0, 3) // Show only first 3 members

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
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?q=80&w=2005"
                alt="Khanna and Associates History"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Our Legacy: Since 1948</h2>
              <p className="text-gray-700 mb-4">
                KHANNA & ASSOCIATES was initially founded in 1948 by Late Amarnath Singh Khanna, a highly successful
                lawyer in private practice, specializing in criminal law, dedicated to the cause of the society, an
                unforgettable legend in the field. His vision was to create a legal practice built on integrity,
                excellence, and a deep commitment to justice.
              </p>
              <p className="text-gray-700 mb-4">
                Over the decades, the firm has evolved, adapting to the changing legal landscape while upholding its
                founding principles. We have grown from a specialized practice to a full-service law firm, expanding our
                expertise across various domains of law.
              </p>
              <p className="text-gray-700 mb-6">
                Today, the Firm continues to thrive under the sincere leadership of professionals specializing in their
                own fields, serving clients and the community through professionalism, public service, and charitable
                works. Our rich history is a testament to our enduring commitment to our clients and the legal
                profession.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-16">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069"
                alt="Our Vision"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Our Vision and Values</h2>
              <p className="text-gray-700 mb-4">
                Our vision is to be the most trusted and respected law firm, recognized for our unwavering commitment to
                client success, ethical practice, and innovative legal solutions. We aim to set new benchmarks in legal
                service delivery, fostering a culture of continuous learning and excellence.
              </p>
              <p className="text-gray-700 mb-4">
                Integrity: Upholding the highest ethical standards in all our dealings.
              </p>
              <p className="text-gray-700 mb-4">
                Excellence:Delivering superior legal services through deep expertise and meticulous attention to
                detail.
              </p>
              <p className="text-gray-700 mb-4">
                Client-Centricity:Prioritizing our clients' needs and achieving the best possible outcomes for
                them.
              </p>
              <p className="text-gray-700 mb-4">
                Innovation:Embracing new technologies and approaches to provide efficient and effective legal
                solutions.
              </p>
              <p className="text-gray-700 mb-6">
                Social Responsibility: Contributing positively to society through pro bono work and community
                engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our strength lies in our people. Get to know some of the experienced legal professionals who make up Khanna
              and Associates.
            </p>
          </div>

          {/* Team Member Cards */}
          {featuredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredMembers.map((member) => (
                <Link
                  key={member.id}
                  href={`/firm-profile/team/${member.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#4BB4E6]/20 transition-all duration-300 transform hover:-translate-y-2">
                    {/* Member Image */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={member.image || "/placeholder-user.jpg"}
                        alt={`${member.name} - ${member.position}`}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover indicator */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-5 h-5 text-[#1a3c61]" />
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#1a3c61] mb-2 group-hover:text-[#4BB4E6] transition-colors duration-200">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm font-medium mb-4">
                        {member.position}
                      </p>
                      
                      {/* Brief excerpt from bio */}
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        {member.bio.substring(0, 120)}...
                      </p>
                      
                      {/* Bottom accent line */}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-[#4BB4E6] to-[#1a3c61] mt-4 group-hover:w-full transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <p className="text-gray-500">Team member information will be available soon.</p>
            </div>
          )}

          {/* View All Team Button */}
          <div className="text-center">
            <Link href="/firm-profile/team">
              <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2">
                View Full Team Directory
                <ArrowRight className="w-5 h-5" />
              </Button>
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
              className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}