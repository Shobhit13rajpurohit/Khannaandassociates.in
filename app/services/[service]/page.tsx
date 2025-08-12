import { Suspense } from 'react';
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getService, getPublishedServices } from "@/lib/db"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic';

interface ServicePageProps {
  params: Promise<{
    service: string
  }>
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
    const resolvedParams = await params;
    const service = await getService(resolvedParams.service)

    if (!service || service.status !== "published") {
      return {
        title: "Legal Service Not Found | Khanna and Associates",
        description: "The requested legal service could not be found. Explore our comprehensive range of legal services.",
        robots: { index: false, follow: true }
      }
    }

    const title = service.meta_title || `${service.title} Lawyers in India | Expert Legal Services | Khanna and Associates`;
    const description = service.meta_description || 
      `Expert ${service.title.toLowerCase()} legal services in India. Experienced attorneys, proven results, competitive rates. Contact us for consultation.`;

    return {
      title,
      description,
      keywords: [
        `${service.title.toLowerCase()} lawyers India`,
        `${service.title.toLowerCase()} legal services`,
        `best ${service.title.toLowerCase()} attorney`,
        `${service.title.toLowerCase()} law firm`,
        'legal consultation India',
        'expert lawyers',
        service.title.toLowerCase()
      ].join(', '),
      authors: [{ name: 'Khanna and Associates Legal Team' }],
      creator: 'Khanna and Associates',
      publisher: 'Khanna and Associates',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title: title,
        description: description,
        type: "article",
        locale: 'en_IN',
        siteName: 'Khanna and Associates',
        images: service.featured_image ? [
          {
            url: service.featured_image,
            width: 1200,
            height: 630,
            alt: `${service.title} Legal Services - Khanna and Associates`,
          }
        ] : [
          {
            url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070',
            width: 2070,
            height: 1380,
            alt: `${service.title} Legal Services - Khanna and Associates`,
          }
        ],
        publishedTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: service.featured_image ? [service.featured_image] : ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070'],
      },
      alternates: {
        canonical: `https://khannaassociates.in/services/${service.slug}`,
      },
    }
  } catch {
    return {
      title: "Legal Service Not Found | Khanna and Associates",
      description: "The requested legal service could not be found. Explore our comprehensive range of legal services.",
      robots: { index: false, follow: true }
    }
  }
}

// Enhanced JSON-LD Schema for individual service
function generateServiceSchema(service: any) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `${service.title} Legal Services`,
    "description": service.description,
    "provider": {
      "@type": "LegalService",
      "name": "Khanna and Associates",
      "url": "https://khannaassociates.in",
      "logo": "https://khannaassociates.in/logo.png",
      "telephone": "+919461620007",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Street Address",
        "addressLocality": "New Delhi", 
        "addressRegion": "Delhi",
        "postalCode": "110001",
        "addressCountry": "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": service.title,
    "url": `https://khannaassociates.in/services/${service.slug}`,
    "image": service.featured_image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://khannaassociates.in"
      },
      {
        "@type": "ListItem",
        "position": 2, 
        "name": "Legal Services",
        "item": "https://khannaassociates.in/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://khannaassociates.in/services/${service.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${service.title} Legal Services in India`,
    "description": service.description,
    "image": service.featured_image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    "author": {
      "@type": "Organization",
      "name": "Khanna and Associates"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Khanna and Associates",
      "logo": {
        "@type": "ImageObject",
        "url": "https://khannaassociates.in/logo.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://khannaassociates.in/services/${service.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([serviceSchema, breadcrumbSchema, articleSchema])
      }}
    />
  );
}

// Loading component for related services
function RelatedServicesSkeleton() {
  return (
    <aside className="mt-12" aria-label="Related services loading">
      <h2 className="text-2xl font-bold mb-6 text-[#1a3c61]">Related Legal Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64" aria-hidden="true" />
        ))}
      </div>
    </aside>
  );
}

// Enhanced Related Services Component
async function RelatedServices({ currentServiceId, currentServiceTitle }: { 
  currentServiceId: string, 
  currentServiceTitle: string 
}) {
  const allServicesData = await getPublishedServices();
  const allServicesSorted = allServicesData.sort((a, b) => a.title.localeCompare(b.title));
  const relatedServices = allServicesSorted.filter((s) => s.id !== currentServiceId).slice(0, 3);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <aside className="mt-12" aria-labelledby="related-services-heading">
      <h2 id="related-services-heading" className="text-2xl font-bold mb-6 text-[#1a3c61]">
        Related Legal Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" itemScope itemType="https://schema.org/ItemList">
        {relatedServices.map((relatedService, index) => (
          <article 
            key={relatedService.id} 
            itemScope 
            itemType="https://schema.org/Service"
            itemProp="itemListElement"
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <meta itemProp="position" content={(index + 1).toString()} />
            <Link 
              href={`/services/${relatedService.slug}`} 
              prefetch={false}
              title={`Learn about ${relatedService.title} legal services`}
              className="block"
            >
              <div className="relative h-48">
                <Image
                  src={relatedService.featured_image || "/placeholder.svg?height=400&width=600"}
                  alt={`${relatedService.title} legal services`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 itemProp="name" className="text-xl font-semibold text-white line-clamp-2">
                    {relatedService.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p itemProp="description" className="text-gray-600 mb-4 line-clamp-3">
                  {relatedService.description}
                </p>
                <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full transition-colors duration-300">
                  Learn More
                </Button>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  let service;
  const resolvedParams = await params;

  try {
    service = await getService(resolvedParams.service);

    if (!service || service.status !== "published") {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <>
      {generateServiceSchema(service)}
      <div className="min-h-screen">
        {/* Enhanced Hero Section with better SEO structure */}
        <header className="relative bg-[#1a3c61] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: service.featured_image
                ? `url('${service.featured_image}')`
                : "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
              filter: "brightness(0.4)",
            }}
            role="img"
            aria-label={`${service.title} legal services background`}
          />
          <div className="container mx-auto px-4 py-20 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/60">/</li>
                <li>
                  <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                    Legal Services
                  </Link>
                </li>
                <li className="text-white/60">/</li>
                <li className="text-white font-medium" aria-current="page">
                  {service.title}
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Expert {service.title} Lawyers in India
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                {service.description}
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-[#4BB4E6] px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ Expert Legal Team
                </span>
                <span className="bg-[#4BB4E6] px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ 98% Success Rate
                </span>
                <span className="bg-[#4BB4E6] px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ Free Consultation
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Get Free Consultation
                  </Button> 
                </Link>
                <Link href="tel:+919461620007">
                  <Button
                    variant="outline"
                    className="bg-white text-[#1a3c61] hover:bg-[#4BB4E6] hover:text-white hover:border-[#4BB4E6] px-8 py-6 text-lg font-semibold transition-all duration-300"
                  >
                    Call +91 9461620007
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Primary Content */}
              <article className="lg:w-2/3">
                {/* Service Content */}
                <section className="prose max-w-none mb-12" itemScope itemType="https://schema.org/Article">
                  <div 
                    itemProp="articleBody"
                    className="text-gray-700 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: service.content }} 
                  />
                </section>

                {/* Key Points Section */}
                {service.key_points && service.key_points.length > 0 && (
                  <section className="mb-12" aria-labelledby="how-we-help">
                    <h2 id="how-we-help" className="text-3xl font-bold mb-8 text-[#1a3c61]">
                      How Our {service.title} Experts Can Help You
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.key_points.map((point, index) => (
                        <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                          <div className="w-3 h-3 bg-[#4BB4E6] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <span className="text-gray-700 text-lg">{point}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Process Section */}
                <section className="mb-12" aria-labelledby="our-process">
                  <h2 id="our-process" className="text-3xl font-bold mb-8 text-[#1a3c61]">
                    Our {service.title} Process
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                      <div className="w-16 h-16 bg-[#4BB4E6] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-[#1a3c61]">Consultation</h3>
                      <p className="text-gray-600">
                        Initial consultation to understand your specific legal needs and objectives.
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                      <div className="w-16 h-16 bg-[#4BB4E6] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-[#1a3c61]">Strategy</h3>
                      <p className="text-gray-600">
                        Develop a customized legal strategy tailored to your unique situation.
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                      <div className="w-16 h-16 bg-[#4BB4E6] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-[#1a3c61]">Execution</h3>
                      <p className="text-gray-600">
                        Expert execution of legal strategies with regular updates and communication.
                      </p>
                    </div>
                  </div>
                </section>

                {/* FAQ Section for Better SEO */}
                <section className="mb-12" aria-labelledby="faq" itemScope itemType="https://schema.org/FAQPage">
                  <h2 id="faq" className="text-3xl font-bold mb-8 text-[#1a3c61]">
                    Frequently Asked Questions - {service.title}
                  </h2>
                  <div className="space-y-6">
                    <div itemScope itemType="https://schema.org/Question" className="bg-gray-50 p-6 rounded-lg">
                      <h3 itemProp="name" className="text-xl font-semibold mb-3 text-[#1a3c61]">
                        What makes your {service.title.toLowerCase()} services different?
                      </h3>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p itemProp="text" className="text-gray-700">
                          Our {service.title.toLowerCase()} team combines deep expertise with personalized service. 
                          We have handled over 100+ cases in this area with a 98% success rate, ensuring you get 
                          the best possible outcome for your legal matter.
                        </p>
                      </div>
                    </div>
                    <div itemScope itemType="https://schema.org/Question" className="bg-gray-50 p-6 rounded-lg">
                      <h3 itemProp="name" className="text-xl font-semibold mb-3 text-[#1a3c61]">
                        How much do {service.title.toLowerCase()} legal services cost?
                      </h3>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p itemProp="text" className="text-gray-700">
                          Our fees are competitive and transparent. We offer free initial consultations to discuss 
                          your case and provide upfront cost estimates. Payment plans and contingency options may 
                          be available depending on your case.
                        </p>
                      </div>
                    </div>
                    <div itemScope itemType="https://schema.org/Question" className="bg-gray-50 p-6 rounded-lg">
                      <h3 itemProp="name" className="text-xl font-semibold mb-3 text-[#1a3c61]">
                        How long does a {service.title.toLowerCase()} case typically take?
                      </h3>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p itemProp="text" className="text-gray-700">
                          The timeline varies depending on case complexity. Simple matters may resolve in weeks, 
                          while complex cases can take months. We'll provide a realistic timeline during your 
                          consultation and keep you updated throughout the process.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Related Services with Suspense */}
                <Suspense fallback={<RelatedServicesSkeleton />}>
                  <RelatedServices currentServiceId={service.id} currentServiceTitle={service.title} />
                </Suspense>
              </article>

              {/* Sidebar */}
              <aside className="lg:w-1/4">
                {/* Contact Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24 mb-8">
                  <div className="bg-[#1a3c61] text-white p-6">
                    <h3 className="text-2xl font-bold">Get Expert Legal Help</h3>
                    <p className="mt-2">Free consultation available</p>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4 text-[#1a3c61]">
                      Contact Our {service.title} Specialists
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Speak with our experienced {service.title.toLowerCase()} lawyers today to discuss your 
                      legal needs and learn how we can help you achieve the best possible outcome.
                    </p>
                    <div className="space-y-4">
                      <Link href="/#contact">
                        <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full py-3 font-semibold">
                          Schedule Free Consultation
                        </Button>
                      </Link>
                      <Link href="tel:+919461620007">
                        <Button variant="outline" className="w-full py-3 font-semibold border-[#1a3c61] text-[#1a3c61] hover:bg-[#1a3c61] hover:text-white">
                          Call Now: +919461620007
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Available 24/7 for urgent matters
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Free initial consultation
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        No win, no fee options available
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Locations
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-[#1a3c61]">Our Locations</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Delhi Office</strong><br />
                      123 Legal District, New Delhi 110001<br />
                      <a href="tel:+911123456789" className="text-[#4BB4E6]">+91-11-2345-6789</a>
                    </div>
                    <div>
                      <strong>Mumbai Office</strong><br />
                      456 Business Centre, Mumbai 400001<br />
                      <a href="tel:+912223456789" className="text-[#4BB4E6]">+91-22-2345-6789</a>
                    </div>
                  </div>
                </div> */}
              </aside>
            </div>
          </div>
        </main>

        {/* Enhanced CTA Section */}
        <section className="py-16 bg-[#1a3c61] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Resolve Your {service.title} Legal Matters?
            </h2>
            <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed">
              Don't let legal challenges hold you back. Our experienced {service.title.toLowerCase()} attorneys 
              are ready to provide expert guidance and fight for your rights. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Link href="/#contact">
                <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Get Free Consultation Now
                </Button> 
              </Link>
              <Link href="tel:+919461620007"> 
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1a3c61] px-8 py-6 text-lg font-semibold bg-transparent transition-all duration-300"
                >
                  Call +9194616-20007
                </Button>
              </Link>
            </div>
            <p className="text-sm opacity-90 max-w-2xl mx-auto">
              Join over 500+ satisfied clients who chose Khanna and Associates for their {service.title.toLowerCase()} 
              legal needs. Free consultation • Competitive rates • Proven results.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}