import Image from "next/image"
import ServiceCard from "@/components/service-card"
import ContactForm from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPublishedServices, getPage } from "@/lib/db"

export default async function Home() {
  const services = await getPublishedServices()
  const page = await getPage("/")

  if (!page) {
    return <div>Page not found</div>
  }

  const renderSection = (section: any) => {
    switch (section.type) {
      case "hero":
        return (
          <section
            id="home"
            className="relative bg-[#1a3c61] text-white"
            style={{
              backgroundImage: `url('${section.backgroundImage}')`,
              filter: "brightness(0.4)",
            }}
          >
            <div className="container mx-auto px-4 py-24 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{section.title}</h1>
                <p className="text-xl mb-8">{section.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
                    {section.ctaText}
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white text-[#1a3c61] hover:bg-[#4BB4E6] hover:text-white hover:border-[#4BB4E6] px-8 py-6 text-lg"
                  >
                    {section.secondaryCtaText}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )
      case "content":
        return (
          <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <div className="relative">
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">{section.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  <Link href={section.ctaLink}>
                    <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white">{section.ctaText}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      case "services":
        return (
          <section id="services" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">{section.title}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.slice(0, 6).map((service, index) => (
                  <Link href={`/services/${service.slug}`} key={service.id}>
                    <ServiceCard title={service.title} standalone={false} />
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href={section.ctaLink}>
                  <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-6">{section.ctaText}</Button>
                </Link>
              </div>
            </div>
          </section>
        )
      case "locations":
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">{section.title}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {section.locations.map((location: any) => (
                  <Link href={`/locations/${location.name.toLowerCase()}`} className="group" key={location.name}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={location.image}
                          alt={location.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-xl font-semibold text-white">{location.name}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href={section.ctaLink}>
                  <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-6">{section.ctaText}</Button>
                </Link>
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
