export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getService, getPublishedServices } from "@/lib/db"
import type { Metadata } from "next"

interface ServicePageProps {
  params: {
    service: string
  }
}

export async function generateStaticParams() {
  try {
    const services = await getPublishedServices()
    return services.map((service) => ({
      service: service.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  try {
    const service = await getService(params.service)

    if (!service || service.status !== "published") {
      return {
        title: "Service Not Found",
        description: "The requested service could not be found.",
      }
    }

    return {
      title: service.meta_title || `${service.title} - Legal Services | Khanna and Associates`,
      description: service.meta_description || service.description,
      openGraph: {
        title: service.meta_title || service.title,
        description: service.meta_description || service.description,
        type: "article",
        images: service.featured_image ? [service.featured_image] : [],
      },
    }
  } catch {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    }
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  let service

  try {
    service = await getService(params.service)

    if (!service || service.status !== "published") {
      notFound()
    }
  } catch {
    notFound()
  }

  // Get related services and sort alphabetically
  const allServicesData = await getPublishedServices()
  const allServicesSorted = allServicesData.sort((a, b) => a.title.localeCompare(b.title))
  const relatedServices = allServicesSorted.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: service.featured_image
              ? `url('${service.featured_image}')`
              : "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
                Schedule a Consultation
              </Button>
              <Button
                variant="outline"
                className="bg-white text-[#1a3c61] hover:bg-[#4BB4E6] hover:text-white hover:border-[#4BB4E6] px-8 py-6 text-lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="prose max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: service.content }} />
              </div>

              {service.key_points && service.key_points.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[#1a3c61]">How We Can Help</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.key_points.map((point, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6 text-[#1a3c61]">Related Services</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedServices.map((relatedService) => (
                      <Link key={relatedService.id} href={`/services/${relatedService.slug}`}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative h-48">
                            <Image
                              src={relatedService.featured_image || "/placeholder.svg?height=400&width=600"}
                              alt={relatedService.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <h3 className="text-xl font-semibold text-white">{relatedService.title}</h3>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-gray-600 mb-4">{relatedService.description}</p>
                            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">Learn More</Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Contact Us</h3>
                  <p className="text-gray-600 mb-6">
                    Speak with our {service.title} specialists today to discuss your legal needs and how we can assist
                    you.
                  </p>
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-4">
                    Schedule a Consultation
                  </Button>
                  <div className="text-center text-gray-500 text-sm">
                    Or call us at{" "}
                    <a href="tel:+911123456789" className="text-[#4BB4E6] font-semibold">
                      +91 11 2345 6789
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your {service.title} Legal Needs?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experienced attorneys is ready to help you navigate your legal challenges. Contact us today for
            a consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
              Schedule a Consultation
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
