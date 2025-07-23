import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPage } from "@/lib/db"

export default async function FirmProfilePage() {
  const page = await getPage("/firm-profile")

  if (!page) {
    return <div>Page not found</div>
  }

  const renderSection = (section: any) => {
    switch (section.type) {
      case "hero":
        return (
          <section
            className="relative bg-[#1a3c61] text-white"
            style={{
              backgroundImage: `url('${section.backgroundImage}')`,
              filter: "brightness(0.4)",
            }}
          >
            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{section.title}</h1>
                <p className="text-xl mb-8">{section.subtitle}</p>
              </div>
            </div>
          </section>
        )
      case "content":
        return (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                <div className="md:w-1/2">
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">{section.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              </div>
            </div>
          </section>
        )
      case "team":
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">{section.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.members.map((member: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-64">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#1a3c61]">{member.name}</h3>
                      <p className="text-[#4BB4E6] font-medium">{member.position}</p>
                      <p className="text-gray-600 mt-2 mb-4">{member.bio}</p>
                      <Link href={`/firm-profile/team/${member.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white w-full">View Profile</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href={section.ctaLink}>
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-6">{section.ctaText}</Button>
                </Link>
              </div>
            </div>
          </section>
        )
      case "awards":
        return (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">{section.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.awards.map((award: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={150}
                      height={150}
                      className="mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-[#1a3c61]">{award.title}</h3>
                    <p className="text-gray-600 text-sm">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      case "cta":
        return (
          <section className="py-16 bg-[#1a3c61] text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
              <p className="max-w-2xl mx-auto mb-8">{section.subtitle}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
                  {section.ctaText}
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg bg-transparent"
                >
                  {section.secondaryCtaText}
                </Button>
              </div>
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
