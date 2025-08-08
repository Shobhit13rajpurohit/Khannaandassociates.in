import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  // Practice areas organized by category with SEO-optimized names
  const practiceAreasByCategory = {
    "Business & Corporate Law": [
      { name: "Corporate Law Services", path: "/services/corporate-and-commercial", title: "Best Corporate Law Firm in India" },
      { name: "Banking & Finance Law", path: "/services/banking-and-finance-and-insurance", title: "Banking Finance Lawyers India" },
      { name: "Capital Markets Law", path: "/services/capital-markets", title: "Capital Markets Legal Services" },
    ],
    "Litigation & Dispute Resolution": [
      { name: "Criminal & Civil Litigation", path: "/services/criminal-and-civil", title: "Top Criminal Civil Lawyers India" },
      { name: "Arbitration Services", path: "/services/arbitration-and-reconciliation", title: "Best Arbitration Lawyers India" },
      { name: "International Legal Services", path: "/services/international-domain", title: "International Law Firm India" },
    ],
    "Intellectual Property Law": [
      { name: "IP Law Services", path: "/services/intellectual-property", title: "Best IP Lawyers in India" },
      { name: "Technology & Media Law", path: "/services/technology-media-and-telecom", title: "Tech Media Lawyers India" },
      { name: "Entertainment Law", path: "/services/media-and-entertainment", title: "Entertainment Lawyers India" },
    ],
    "Specialized Legal Services": [
      { name: "Aviation & Defence Law", path: "/services/aviation-and-defence", title: "Aviation Defence Lawyers India" },
      { name: "Real Estate Law", path: "/services/real-estate", title: "Best Real Estate Lawyers India" },
      { name: "Matrimonial Law", path: "/services/matrimonial", title: "Top Matrimonial Lawyers India" },
    ],
  }

  // Locations by region with SEO data
  const locationsByRegion = {
    "North India Legal Services": [
      { name: "Top Law Firm Delhi", path: "/locations/delhi", title: "Best Lawyers in Delhi NCR" },
      { name: "Best Lawyers in Delhi", path: "/lawyers-in-delhi", title: "Top Law Firm Delhi India" },
      { name: "South Delhi Lawyers", path: "/lawyers-in-delhi/south-delhi", title: "Best Law Firm South Delhi" },
      { name: "Law Firm Dehradun", path: "/locations/dehradun", title: "Top Lawyers Dehradun Uttarakhand" },
      { name: "Best Law Firm Jaipur", path: "/locations/jaipur", title: "Top Lawyers Jaipur Rajasthan" },
      { name: "Top Lawyers in Jaipur", path: "/lawyers-in-jaipur", title: "Best Law Firm Jaipur Rajasthan" },
    ],
    "West & South India Legal Services": [
      { name: "Law Firm Mumbai", path: "/locations/mumbai", title: "Best Lawyers Mumbai Maharashtra" },
      { name: "Law Firm Bangalore", path: "/locations/bangalore", title: "Top Lawyers Bangalore Karnataka" },
      { name: "Law Firm Chennai", path: "/locations/chennai", title: "Best Lawyers Chennai Tamil Nadu" },
      { name: "Law Firm Hyderabad", path: "/locations/hyderabad", title: "Top Lawyers Hyderabad Telangana" },
    ],
  }

  // Current year for copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a3c61] text-white" role="contentinfo">
      {/* Structured data for organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "Khanna and Associates",
          "description": "Leading law firm in India providing comprehensive legal services since 1948",
          "foundingDate": "1948",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "47 SMS Colony, Shipra Path, Mansarovar",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "postalCode": "302020",
            "addressCountry": "IN"
          },
          "telephone": "+91-94616-20007",
          "email": "info@khannaandassociates.com",
          "url": "https://khannaandassociates.com",
          "sameAs": [
            "https://www.facebook.com/Khannaandassociates/",
            "https://in.linkedin.com/company/khanna-&-associates",
            "https://x.com/Khannaassociate"
          ],
          "areaServed": ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Jaipur", "Dehradun"],
          "serviceType": ["Corporate Law", "Criminal Law", "Civil Litigation", "Intellectual Property", "Real Estate Law"]
        })}
      </script>
      
      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Information */}
            <div itemScope itemType="https://schema.org/LegalService">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
                alt="Khanna and Associates - Best Law Firm in India since 1948"
                width={200}
                height={60}
                className="mb-4 bg-white p-2 rounded"
                priority={false}
              />
              <p className="text-sm opacity-75 mb-4" itemProp="description">
                India's leading law firm since 1948. Providing exceptional legal services across Delhi, Mumbai, Bangalore, Jaipur, and major cities. Your trusted legal partner for corporate, criminal, civil, and IP law matters.
              </p>

              <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 mr-2 text-[#4BB4E6]" />
                  <div className="text-sm">
                    <span itemProp="streetAddress">47 SMS Colony, Shipra Path, Mansarovar</span><br/>
                    <span itemProp="postalCode">302020</span> <span itemProp="addressLocality">Jaipur</span>, <span itemProp="addressRegion">Rajasthan</span><br/>
                    <span itemProp="addressCountry">India</span>
                  </div>
                </div>
              </address>
              
              <div className="flex items-center mb-3">
                <Phone className="w-5 h-5 mr-2 text-[#4BB4E6]" />
                <a href="tel:+919461620007" className="text-sm hover:text-[#4BB4E6]" itemProp="telephone">
                  (+91) 94616-20007
                </a>
              </div>
              
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 mr-2 text-[#4BB4E6]" />
                <a href="mailto:info@khannaandassociates.com" className="text-sm hover:text-[#4BB4E6]" itemProp="email">
                  info@khannaandassociates.com
                </a>
              </div>
            </div>

            {/* Practice Areas */}
            <nav aria-label="Legal Services">
              <h4 className="text-lg font-semibold mb-4">Legal Practice Areas</h4>
              {Object.entries(practiceAreasByCategory).map(([category, areas]) => (
                <div key={category} className="mb-4">
                  <h5 className="text-[#4BB4E6] text-sm font-medium mb-2">{category}</h5>
                  <ul className="space-y-1">
                    {areas.map((area, index) => (
                      <li key={index}>
                        <Link 
                          href={area.path} 
                          className="text-sm opacity-75 hover:opacity-100 hover:text-[#4BB4E6] transition-colors"
                          title={area.title}
                        >
                          {area.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link 
                href="/services" 
                className="text-[#4BB4E6] text-sm hover:underline inline-flex items-center"
                title="View all legal services offered by Khanna and Associates"
              >
                View All Legal Services →
              </Link>
            </nav>

            {/* Locations */}
            <nav aria-label="Office Locations">
              <h4 className="text-lg font-semibold mb-4">Our Office Locations</h4>
              {Object.entries(locationsByRegion).map(([region, locations]) => (
                <div key={region} className="mb-4">
                  <h5 className="text-[#4BB4E6] text-sm font-medium mb-2">{region}</h5>
                  <ul className="space-y-1">
                    {locations.map((location, index) => (
                      <li key={index}>
                        <Link
                          href={location.path}
                          className="text-sm opacity-75 hover:opacity-100 hover:text-[#4BB4E6] transition-colors"
                          title={location.title}
                        >
                          {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link 
                href="/locations" 
                className="text-[#4BB4E6] text-sm hover:underline inline-flex items-center"
                title="View all office locations of Khanna and Associates"
              >
                View All Office Locations →
              </Link>
            </nav>

            {/* Connect and Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With India's Best Law Firm</h4>
              <div className="flex space-x-4 mb-6" role="list">
                <a
                  href="https://www.facebook.com/Khannaandassociates/"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4BB4E6] transition-colors"
                  aria-label="Follow Khanna and Associates on Facebook"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://in.linkedin.com/company/khanna-&-associates"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4BB4E6] transition-colors"
                  aria-label="Connect with Khanna and Associates on LinkedIn"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Khannaassociate"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4BB4E6] transition-colors"
                  aria-label="Follow Khanna and Associates on Twitter"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              <nav aria-label="Quick Links">
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/firm-profile" 
                      className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm transition-colors"
                      title="Learn about Khanna and Associates - Leading Law Firm since 1948"
                    >
                      About Our Law Firm
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm transition-colors"
                      title="Latest Legal News and Updates from India's Top Lawyers"
                    >
                      Legal Insights Blog
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/team" 
                      className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm transition-colors"
                      title="Meet Our Expert Team of Lawyers and Legal Professionals"
                    >
                      Our Expert Legal Team
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/#contact" 
                      className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm transition-colors"
                      title="Contact Khanna and Associates for Legal Consultation"
                    >
                      Get Legal Consultation
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Enhanced SEO Footer Content with Location-Specific Keywords */}
          <section className="mt-8 pt-8 border-t border-white/20 text-xs opacity-75 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Location Specific Legal Services">
            <article>
              <h5 className="font-semibold mb-2 text-[#4BB4E6]">Best Law Firm in Delhi NCR</h5>
              <p>
                Khanna and Associates stands as the premier law firm in Delhi, offering comprehensive legal services across corporate law, criminal defense, civil litigation, and intellectual property. Our Delhi headquarters houses 50+ experienced lawyers specializing in Supreme Court matters, High Court litigation, and complex corporate transactions. Serving clients in New Delhi, Gurgaon, Noida, and entire NCR region.
              </p>
            </article>
            
            <article>
              <h5 className="font-semibold mb-2 text-[#4BB4E6]">Top Law Firm in Jaipur Rajasthan</h5>
              <p>
                As Jaipur's leading law firm, Khanna and Associates specializes in real estate law, heritage property disputes, tourism law, and traditional business matters. Our Jaipur office combines deep understanding of Rajasthan's legal framework with modern legal practices. We handle property registration, land disputes, family law, and commercial litigation across Pink City and entire Rajasthan state.
              </p>
            </article>
            
            <article>
              <h5 className="font-semibold mb-2 text-[#4BB4E6]">Leading Law Firm in Mumbai & Bangalore</h5>
              <p>
                Our Mumbai and Bangalore offices serve as key hubs for corporate law, startup legal services, technology law, and capital markets. We provide comprehensive legal support for IPOs, mergers & acquisitions, banking & finance, and international business transactions. Serving Maharashtra, Karnataka, and South India's growing business ecosystem with expert legal counsel.
              </p>
            </article>
            
            <article>
              <h5 className="font-semibold mb-2 text-[#4BB4E6]">India's Most Trusted Law Firm Since 1948</h5>
              <p>
                With 77 years of legal excellence, Khanna and Associates has established itself as India's most trusted law firm. Our pan-India presence spans Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Jaipur, and Dehradun. We've successfully handled over 10,000+ cases, serving multinational corporations, government entities, and individual clients with unmatched legal expertise and integrity.
              </p>
            </article>
          </section>

          {/* Copyright and Legal Links */}
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-75 mb-4 md:mb-0">
              © {currentYear} Khanna and Associates - India's Leading Law Firm Since 1948. All rights reserved.
            </p>
            <nav className="flex space-x-4 text-sm opacity-75" aria-label="Legal Information">
              <Link href="/privacy-policy" className="hover:text-[#4BB4E6] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-[#4BB4E6] transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal-disclaimer" className="hover:text-[#4BB4E6] transition-colors">
                Legal Disclaimer
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}