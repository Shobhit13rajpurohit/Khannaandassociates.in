import TeamMember from "@/components/team-member"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPage } from "@/lib/db"

export default async function TeamPage() {
  const page = await getPage("/team")

  if (!page) {
    return <div>Page not found</div>
  }

  const renderSection = (section: any) => {
    switch (section.type) {
      case "hero":
        return (
          <section className="bg-[#1a3c61] text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{section.title}</h1>
              <p className="text-xl max-w-2xl mx-auto">{section.subtitle}</p>
            </div>
          </section>
        )
      case "team":
        return (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.members.map((member: any, index: number) => (
                  <TeamMember key={index} {...member} />
                ))}
              </div>
            </div>
          </section>
        )
      case "cta":
        return (
          <section className="py-16 bg-[#4BB4E6] text-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              <p className="text-lg mb-8">{section.subtitle}</p>
              <Link href={section.ctaLink}>
                <Button variant="outline" className="bg-white text-[#4BB4E6] hover:bg-[#1a3c61] hover:text-white">
                  {section.ctaText}
                </Button>
              </Link>
            </div>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {page.sections.map((section: any) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  )
}
