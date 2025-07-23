import Link from "next/link"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"
import { getPublishedServices, getPage } from "@/lib/db"

export default async function ServicesPage() {
  const services = await getPublishedServices()
  const page = await getPage("/services")

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
      case "services":
        return (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">{section.title}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>
              </div>

              {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service) => (
                    <Link href={`/services/${service.slug}`} key={service.id}>
                      <ServiceCard title={service.title} standalone={true} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600 mb-4">No services available</h3>
                  <p className="text-gray-500">Please check back later for our legal services.</p>
                </div>
              )}
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
