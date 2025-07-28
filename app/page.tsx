import Image from "next/image"
import ServiceCard from "@/components/service-card"
import ContactForm from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPublishedServices } from "@/lib/db"

export default async function Home() {
  const services = await getPublishedServices()

  const alert = () => {
    console.log("booked")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Excellence in Legal Services Since 1948</h1>
            <p className="text-xl mb-8">
              Providing expert legal counsel across multiple practice areas with a commitment to integrity and client
              success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg">
                Schedule a Consultation
              </Button>
              <Button
                variant="outline"
                className="bg-white text-[#1a3c61] hover:bg-[#4BB4E6] hover:text-white hover:border-[#4BB4E6] px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?q=80&w=2005"
                  alt="Khanna and Associates Office"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#4BB4E6] p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="text-white font-bold text-xl">Est. 1948</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Khanna and Associates</h2>
              <p className="text-gray-700 mb-4">
                KHANNA & ASSOCIATES was initially founded in 1948 by Late Amarnath Singh Khanna, a highly successful
                lawyer in private practice, specializing in criminal law, dedicated to the cause of the society, an
                unforgettable legend in the field.
              </p>
              <p className="text-gray-700 mb-4">
                Today, the Firm has grown more under the sincere leadership with professionals specializing in their own
                fields, serving the clients and the community through professionalism, public service and charitable
                works.
              </p>
              <p className="text-gray-700 mb-6">
                KHANNA & ASSOCIATES is a full service Law Firm handling all legal matters on Civil, Criminal, Business,
                Commercial, Corporate, Arbitration, Labor & Service subjects in law, in all courts as well as Tribunals.
              </p>
              <Link href="/firm-profile">
                <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white">Our Legacy</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Global Presence */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Our Global Presence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With offices across India and international locations, we provide seamless legal services worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/locations/delhi" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <Image
                    src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070"
                    alt="Delhi Office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Delhi</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/locations/mumbai" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <Image
                    src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070"
                    alt="Mumbai Office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Mumbai</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/locations/bangalore" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <Image
                    src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2148"
                    alt="Bangalore Office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">Bangalore</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/locations/new-york" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <Image
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070"
                    alt="New York Office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-semibold text-white">New York</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link href="/locations">
              <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-6">View All Locations</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#1a3c61] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="max-w-2xl mx-auto">
              Our clients' success is our success. Here's what they have to say about working with Khanna and
              Associates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974"
                    alt="Amit Sharma"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Amit Sharma</h4>
                  <p className="text-sm opacity-75">CEO, Tech Innovations</p>
                </div>
              </div>
              <p className="italic">
                "Khanna and Associates provided exceptional counsel during our company's merger. Their expertise in
                corporate law was invaluable."
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976"
                    alt="Priya Patel"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-sm opacity-75">CFO, Global Finance</p>
                </div>
              </div>
              <p className="italic">
                "The team's knowledge of banking and finance law helped us navigate complex regulatory challenges with
                confidence."
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070"
                    alt="Rajiv Mehta"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rajiv Mehta</h4>
                  <p className="text-sm opacity-75">Director, Aerospace Ltd.</p>
                </div>
              </div>
              <p className="italic">
                "Their expertise in aviation law is unmatched. Khanna and Associates has been our trusted legal partner
                for over a decade."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3c61]">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reach out to our team of legal experts for a consultation. We're here to help with your legal needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">Get in Touch</h3>
              <ContactForm />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[#1a3c61]">Our Office</h3>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-[#1a3c61] mb-2">Address</h4>
                  <p className="text-gray-700">123 Legal Avenue, New Delhi, India, 110001</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-[#1a3c61] mb-2">Email</h4>
                  <p className="text-gray-700">info@khannaandassociates.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a3c61] mb-2">Phone</h4>
                  <p className="text-gray-700">+91 11 2345 6789</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-[#1a3c61] mb-4">Office Hours</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-700">Monday - Friday</div>
                  <div className="text-gray-700">9:00 AM - 6:00 PM</div>
                  <div className="text-gray-700">Saturday</div>
                  <div className="text-gray-700">10:00 AM - 2:00 PM</div>
                  <div className="text-gray-700">Sunday</div>
                  <div className="text-gray-700">Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
