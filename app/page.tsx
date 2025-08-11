export const revalidate = 3600;
import Image from "next/image"
import ServiceCard from "@/components/service-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPublishedServicesLimited, getLocationsLimited } from "@/lib/db"
import dynamic from "next/dynamic"
import type { Metadata } from "next"

// Dynamically import heavy components to reduce initial bundle size
const ContactForm = dynamic(() => import("@/components/contact-form"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" aria-label="Loading contact form"></div>
})

// Page-specific metadata
export const metadata: Metadata = {
  title: "Best Law Firm in Delhi, Jaipur & Dehradun | Khanna and Associates - Legal Excellence Since 1948",
  description: "Premier law firm in Delhi, Jaipur & Dehradun with 75+ years of legal excellence. Expert corporate law, IP, litigation, banking & finance services. Top-rated attorneys. Free consultation. Call +91946162007",
  keywords: "law firm in Delhi, law firm in Jaipur, law firm in Dehradun, best lawyers Delhi, top attorneys Jaipur, corporate law firm, IP lawyers, litigation attorneys, banking law, legal services India, Khanna and Associates",
  openGraph: {
    title: "Best Law Firm in Delhi, Jaipur & Dehradun | Khanna and Associates",
    description: "75+ years of legal excellence. Expert legal services across India. Corporate law, IP, litigation specialists. Free consultation available.",
    url: "https://www.khannaandassociates.in/",
    type: "website",
    images: [
      {
        url: "https://www.khannaandassociates.in/images/homepage-og.jpg",
        width: 1200,
        height: 630,
        alt: "Khanna and Associates - Premier Law Firm"
      }
    ]
  }
}

export default async function Home() {
  // Use limited versions to reduce page size and improve performance
  const [servicesData, locations] = await Promise.all([
    getPublishedServicesLimited(6), // Only show 6 services max for homepage
    getLocationsLimited(4)          // Only show 4 locations max for homepage
  ])
  
  const services = servicesData.sort((a, b) => a.title.localeCompare(b.title))

  // Structured data for the homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home - Khanna and Associates Law Firm",
    description: "Premier law firm in Delhi, Jaipur & Dehradun providing expert legal services since 1948",
    url: "https://www.khannaandassociates.in/",
    mainEntity: {
      "@type": "LegalService",
      name: "Khanna and Associates",
      url: "https://www.khannaandassociates.in/"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.khannaandassociates.in/"
        }
      ]
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".hero-description"]
    }
  }

  return (
    <>
      {/* Page-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />
      
      <div className="min-h-screen">
        {/* Enhanced Hero Section with better SEO */}
        <section 
          id="home" 
          className="relative bg-[#1a3c61] text-white"
          role="banner"
          aria-label="Main hero section"
        >
          {/* Background image with proper optimization */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop')",
              filter: "brightness(0.4)",
            }}
            role="img"
            aria-label="Law office background"
          ></div>
          
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-4xl">
              {/* Main H1 with location and service keywords */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-description">
                <span className="block">Premier Law Firm in Delhi, Jaipur & Dehradun</span>
                <span className="block text-3xl md:text-4xl mt-2 text-[#4BB4E6]">
                  Legal Excellence Since 1948
                </span>
              </h1>
              
              {/* Enhanced description with key services and benefits */}
              <p className="text-xl mb-6 hero-description leading-relaxed">
                Expert legal counsel in <strong>Corporate Law</strong>, <strong>Intellectual Property</strong>, 
                <strong>Banking & Finance</strong>, and <strong>Litigation</strong>. Trusted by 1000+ clients 
                across India with 75+ years of proven excellence.
              </p>
              
              {/* Key benefits for SEO and user confidence */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></span>
                  <span>Free Consultation Available</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></span>
                  <span>75+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></span>
                  <span>Award-Winning Legal Team</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact" aria-label="Schedule a free legal consultation">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg font-semibold">
                    Get Free Consultation
                  </Button> 
                </Link>
                <Link href="/services" aria-label="Learn more about our legal services">
                  <Button
                    variant="outline"
                    className="bg-white text-[#1a3c61] hover:bg-[#4BB4E6] hover:text-white hover:border-[#4BB4E6] px-8 py-6 text-lg font-semibold"
                  >
                    Our Legal Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced About Section with better semantic HTML */}
        <section 
          id="about" 
          className="py-20 bg-gray-50"
          role="main"
          aria-labelledby="about-heading"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?q=80&w=800&auto=format&fit=crop"
                    alt="Khanna and Associates law office interior showing professional legal environment"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-[#4BB4E6] p-4 rounded-lg shadow-lg hidden md:block">
                    <p className="text-white font-bold text-xl" role="img" aria-label="Established in 1948">
                      Est. 1948
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 id="about-heading" className="text-3xl font-bold mb-6 text-[#1a3c61]">
                  About Khanna and Associates Law Firm
                </h2>
                
                {/* Enhanced content with location and service keywords */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>KHANNA & ASSOCIATES</strong> was founded in <strong>1948</strong> by Late Amarnath Singh Khanna, 
                  a distinguished criminal lawyer in Delhi. Starting as a boutique criminal law practice, we have evolved 
                  into one of <strong>Delhi, Jaipur, and Dehradun's premier full-service law firms</strong>.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Today, our firm operates across <strong>multiple cities in India</strong> with specialized legal 
                  professionals serving clients through expert knowledge in <strong>Corporate Law</strong>, 
                  <strong>Intellectual Property Rights</strong>, <strong>Banking & Finance</strong>, 
                  <strong>Litigation</strong>, and <strong>Real Estate Law</strong>.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  As a <strong>full-service law firm</strong>, KHANNA & ASSOCIATES handles all legal matters including 
                  Civil, Criminal, Business, Commercial, Corporate, Arbitration, and Labor & Service law across 
                  all courts and tribunals in India.
                </p>
                
                {/* Key statistics for credibility */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-[#1a3c61]">75+</div>
                    <div className="text-sm text-gray-600">Years of Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-[#1a3c61]">1000+</div>
                    <div className="text-sm text-gray-600">Satisfied Clients</div>
                  </div>
                </div>
                
                <Link href="/firm-profile" aria-label="Learn more about our law firm's history and legacy">
                  <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white font-semibold">
                    Discover Our Legacy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Services Section with structured data */}
        <section 
          className="py-20"
          role="main"
          aria-labelledby="services-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="services-heading" className="text-3xl font-bold mb-4 text-[#1a3c61]">
                Our Legal Practice Areas
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our experienced attorneys provide <strong>expert legal counsel</strong> across a comprehensive 
                range of practice areas, ensuring complete legal support for individuals, businesses, and 
                corporations throughout <strong>Delhi, Jaipur, Dehradun, and across India</strong>.
              </p>
            </div>

            {services.length > 0 ? (
              <>
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  role="list"
                  aria-label="Legal practice areas"
                >
                  {services.map((service, index) => (
                    <div key={service.id} role="listitem">
                      <Link 
                        href={`/services/${service.slug}`}
                        aria-label={`Learn more about ${service.title} legal services`}
                      >
                        <ServiceCard 
                          title={service.title} 
                          imageUrl={service.featured_image} 
                          standalone={true}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
                
                {/* Show "View All" if we have exactly 6 services */}
                {services.length === 6 && (
                  <div className="text-center mt-12">
                    <Link 
                      href="/services"
                      aria-label="View all legal services offered by our law firm"
                    >
                      <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-8 py-3 font-semibold">
                        View All Legal Services
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-4">
                  Legal Services Information Loading
                </h3>
                <p className="text-gray-500">
                  Please contact us directly for information about our comprehensive legal services.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Global Presence Section */}
        <section 
          className="py-16 bg-gray-50"
          role="main"
          aria-labelledby="locations-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="locations-heading" className="text-3xl font-bold mb-4 text-[#1a3c61]">
                Our Office Locations Across India
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                With <strong>strategically located offices</strong> across major Indian cities and 
                international presence, we provide seamless legal services to clients worldwide. 
                Our <strong>local expertise combined with global reach</strong> ensures comprehensive legal support.
              </p>
            </div>

            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              role="list"
              aria-label="Office locations"
            >
              {locations.slice(0, 4).map((location, index) => (
                <div key={location.id} role="listitem">
                  <Link 
                    href={`/locations/${location.slug}`} 
                    className="group"
                    aria-label={`Visit our ${location.name} office page`}
                  >
                    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={location.imageUrl || "/placeholder.svg"}
                          alt={`Khanna and Associates ${location.name} office location`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-xl font-semibold text-white">
                            {location.name}
                          </h3>
                          <p className="text-sm text-gray-200">Law Office</p>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/locations"
                aria-label="View all office locations of Khanna and Associates"
              >
                <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-8 py-3 font-semibold">
                  View All Office Locations
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section with structured data */}
        <section 
          className="py-20 bg-[#1a3c61] text-white"
          role="main"
          aria-labelledby="testimonials-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="testimonials-heading" className="text-3xl font-bold mb-4">
                Client Reviews & Testimonials
              </h2>
              <p className="max-w-3xl mx-auto leading-relaxed">
                Our <strong>client success stories</strong> reflect our commitment to delivering 
                <strong>exceptional legal services</strong>. Read what our satisfied clients say about 
                working with Delhi, Jaipur, and Dehradun's trusted law firm.
              </p>
            </div>

            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              role="list"
              aria-label="Client testimonials"
            >
              {/* Enhanced testimonial structure with schema markup */}
              <article 
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                itemScope 
                itemType="https://schema.org/Review"
                role="listitem"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop&crop=face"
                      alt="Amit Sharma, CEO of Tech Innovations - client testimonial"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold" itemProp="author">Amit Sharma</h4>
                    <p className="text-sm opacity-75">CEO, Tech Innovations</p>
                    <div className="flex text-yellow-400 text-sm mt-1" aria-label="5 star rating">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <blockquote className="italic" itemProp="reviewBody">
                  "Khanna and Associates provided <strong>exceptional corporate law counsel</strong> during 
                  our company's merger. Their expertise in <strong>corporate law</strong> and attention to 
                  detail was invaluable for our business success."
                </blockquote>
                <meta itemProp="ratingValue" content="5" />
                <meta itemProp="bestRating" content="5" />
              </article>

              <article 
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                itemScope 
                itemType="https://schema.org/Review"
                role="listitem"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop&crop=face"
                      alt="Priya Patel, CFO of Global Finance - client testimonial"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold" itemProp="author">Priya Patel</h4>
                    <p className="text-sm opacity-75">CFO, Global Finance</p>
                    <div className="flex text-yellow-400 text-sm mt-1" aria-label="5 star rating">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <blockquote className="italic" itemProp="reviewBody">
                  "The team's deep knowledge of <strong>banking and finance law</strong> helped us navigate 
                  complex regulatory challenges with complete confidence. Highly recommend their 
                  <strong>financial legal services</strong>."
                </blockquote>
                <meta itemProp="ratingValue" content="5" />
                <meta itemProp="bestRating" content="5" />
              </article>

              <article 
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                itemScope 
                itemType="https://schema.org/Review"
                role="listitem"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop&crop=face"
                      alt="Rajiv Mehta, Director of Aerospace Ltd - client testimonial"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold" itemProp="author">Rajiv Mehta</h4>
                    <p className="text-sm opacity-75">Director, Aerospace Ltd.</p>
                    <div className="flex text-yellow-400 text-sm mt-1" aria-label="5 star rating">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <blockquote className="italic" itemProp="reviewBody">
                  "Their expertise in <strong>aviation and commercial law</strong> is unmatched in India. 
                  Khanna and Associates has been our <strong>trusted legal partner</strong> for over a decade 
                  with consistent excellent results."
                </blockquote>
                <meta itemProp="ratingValue" content="5" />
                <meta itemProp="bestRating" content="5" />
              </article>
            </div>

            {/* Trust indicators */}
            <div className="text-center mt-12">
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-[#4BB4E6]">4.9/5</div>
                  <div className="ml-2 text-sm">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <div>Client Satisfaction</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-[#4BB4E6]">1000+</div>
                  <div className="ml-2 text-sm">Happy Clients</div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-[#4BB4E6]">75+</div>
                  <div className="ml-2 text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section with local SEO focus */}
        <section 
          id="contact" 
          className="py-20 bg-gray-50"
          role="main"
          aria-labelledby="contact-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="contact-heading" className="text-3xl font-bold mb-4 text-[#1a3c61]">
                Contact Our Legal Experts
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Schedule your <strong>free legal consultation</strong> with Delhi, Jaipur, and Dehradun's 
                premier law firm. Our experienced attorneys are ready to provide expert legal advice 
                for your specific needs. <strong>Call +91946162007</strong> or fill out our contact form.
              </p>
              
              {/* Contact information for local SEO */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-[#1a3c61] mb-2">Delhi Office</h3>
                  <p>123 Legal Avenue, Connaught Place</p>
                  <p>New Delhi - 110001</p>
                  <p className="font-semibold mt-2">+91946162007</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-[#1a3c61] mb-2">Jaipur Office</h3>
                  <p>47 SMS Colony, Shipra Path, Mansarovar
302020 Jaipur, Rajasthan</p>
                  
                  <p className="font-semibold mt-2">+91946162007</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-[#1a3c61] mb-2">Dehradun Office</h3>
                  <p>202 Rajpur Road, Race Course</p>
                  <p>Dehradun, Uttarakhand - 248001</p>
                  <p className="font-semibold mt-2">+91946162007</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              {/* Image Column with better alt text */}
              <div className="hidden lg:flex justify-center items-center">
                <Image 
                  src="/nipun.jpg" 
                  alt="Senior partner at Khanna and Associates law firm ready to provide legal consultation" 
                  width={320}
                  height={384}
                  className="rounded-lg shadow-xl object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Enhanced Form Column */}
              <div className="flex">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-2 text-[#1a3c61]">
                    Get Your Free Legal Consultation
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discuss your legal matters with our experienced attorneys. 
                    All consultations are <strong>completely confidential</strong>.
                  </p>
                  <ContactForm />
                  
                  {/* Additional contact options */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-3 text-[#1a3c61]">Prefer to Call?</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Main Office:</strong> 
                        <a href="tel:+91946162007" className="text-[#4BB4E6] hover:underline ml-1">
                          +91946162007
                        </a>
                      </p>
                      <p>
                        <strong>Email:</strong> 
                        <a href="mailto:info@khannaandassociates.in" className="text-[#4BB4E6] hover:underline ml-1">
                          info@khannaandassociates.in
                        </a>
                      </p>
                      <p className="text-gray-500 mt-2">
                        <strong>Business Hours:</strong> Mon-Fri 9AM-6PM, Sat 10AM-2PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  )
}