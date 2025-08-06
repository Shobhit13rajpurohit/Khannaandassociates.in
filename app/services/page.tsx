export const dynamic = 'force-dynamic';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"
import { getPublishedServices } from "@/lib/db"

export default async function ServicesPage() {
  const services = await getPublishedServices()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Legal Services</h1>
            <p className="text-xl mb-8">
              Comprehensive legal expertise across multiple practice areas to serve your diverse legal needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
     <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Practice Areas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our experienced attorneys provide expert legal counsel across a wide range of practice areas, ensuring
            comprehensive support for all your legal needs.
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} key={service.id}>
                {/* Pass the featured_image from your service object as the imageUrl prop.
                */}
                <ServiceCard 
                  title={service.title} 
                  imageUrl={service.featured_image} 
                  standalone={true} 
                />
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

      {/* CTA Section */}
      <section className="py-16 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance?</h2>
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
