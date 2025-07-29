import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  // Practice areas organized by category
  const practiceAreasByCategory = {
    "Business & Corporate": [
      { name: "Corporate and Commercial", path: "/services/corporate-and-commercial" },
      { name: "Banking and Finance", path: "/services/banking-and-finance-and-insurance" },
      { name: "Capital Markets", path: "/services/capital-markets" },
    ],
    "Litigation & Dispute Resolution": [
      { name: "Criminal & Civil", path: "/services/criminal-and-civil" },
      { name: "Arbitration", path: "/services/arbitration-and-reconciliation" },
      { name: "International Domain", path: "/services/international-domain" },
    ],
    "Intellectual Property": [
      { name: "Intellectual Property", path: "/services/intellectual-property" },
      { name: "Technology Media", path: "/services/technology-media-and-telecom" },
      { name: "Media and Entertainment", path: "/services/media-and-entertainment" },
    ],
    "Specialized Practices": [
      { name: "Aviation & Defence", path: "/services/aviation-and-defence" },
      { name: "Real Estate", path: "/services/real-estate" },
      { name: "Matrimonial", path: "/services/matrimonial" },
    ],
  }

  // Locations by region
  const locationsByRegion = {
    "North India": [
      { name: "Delhi", path: "/locations/delhi" },
      { name: "Lawyers in Delhi", path: "/lawyers-in-delhi" },
      { name: "South Delhi", path: "/lawyers-in-delhi/south-delhi" },
      { name: "Dehradun", path: "/locations/dehradun" },
      { name: "Jaipur", path: "/locations/jaipur" },
      { name: "Lawyers in Jaipur", path: "/lawyers-in-jaipur" },
    ],
    "West & South India": [
      { name: "Mumbai", path: "/locations/mumbai" },
      { name: "Bangalore", path: "/locations/bangalore" },
      { name: "Chennai", path: "/locations/chennai" },
      { name: "Hyderabad", path: "/locations/hyderabad" },
    ],
  }

  return (
    <footer className="bg-[#1a3c61] text-white">
      {/* India Presence Section */}
      {/* <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-[#1a3c61]">OUR PRESENCE</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            With offices across India and a network of experienced associates, we provide seamless legal services
            nationwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#f8f8f8] border-2 border-[#4BB4E6] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1a3c61]">5</span>
              </div>
              <h3 className="text-xl font-bold text-[#1a3c61] mb-2">Metro Offices</h3>
              <p className="text-gray-600 mb-4">Delhi, Mumbai, Bangalore, Chennai, Kolkata</p>
              <Link href="/locations" className="text-[#4BB4E6] hover:underline">
                View Metro Offices →
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#f8f8f8] border-2 border-[#4BB4E6] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1a3c61]">4</span>
              </div>
              <h3 className="text-xl font-bold text-[#1a3c61] mb-2">Service Offices</h3>
              <p className="text-gray-600 mb-4">Jaipur, Pune, Hyderabad, Ahmedabad</p>
              <Link href="/locations" className="text-[#4BB4E6] hover:underline">
                View Service Offices →
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#f8f8f8] border-2 border-[#4BB4E6] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1a3c61]">70+</span>
              </div>
              <h3 className="text-xl font-bold text-[#1a3c61] mb-2">Cities Served</h3>
              <p className="text-gray-600 mb-4">Legal assistance across 70+ cities in India</p>
              <Link href="/locations" className="text-[#4BB4E6] hover:underline">
                View All Locations →
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
                alt="Khanna and Associates Logo"
                width={200}
                height={60}
                className="mb-4 bg-white p-2 rounded"
              />
              <p className="text-sm opacity-75 mb-4">
                Providing exceptional legal services since 1948. Your trusted partner for all legal matters.
              </p>

              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 mr-2 text-[#4BB4E6]" />
                <p className="text-sm">123 Legal Avenue, New Delhi, India, 110001</p>
              </div>
              <div className="flex items-center mb-3">
                <Phone className="w-5 h-5 mr-2 text-[#4BB4E6]" />
                <p className="text-sm">+91 11 2345 6789</p>
              </div>
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 mr-2 text-[#4BB4E6]" />
                <p className="text-sm">info@khannaandassociates.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Practice Areas</h4>
              {Object.entries(practiceAreasByCategory).map(([category, areas]) => (
                <div key={category} className="mb-4">
                  <h5 className="text-[#4BB4E6] text-sm font-medium mb-2">{category}</h5>
                  <ul className="space-y-1">
                    {areas.map((area, index) => (
                      <li key={index}>
                        <Link href={area.path} className="text-sm opacity-75 hover:opacity-100 hover:text-[#4BB4E6]">
                          {area.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/services" className="text-[#4BB4E6] text-sm hover:underline">
                View All Practice Areas →
              </Link>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Our Locations</h4>
              {Object.entries(locationsByRegion).map(([region, locations]) => (
                <div key={region} className="mb-4">
                  <h5 className="text-[#4BB4E6] text-sm font-medium mb-2">{region}</h5>
                  <ul className="space-y-1">
                    {locations.map((location, index) => (
                      <li key={index}>
                        <Link
                          href={location.path}
                          className="text-sm opacity-75 hover:opacity-100 hover:text-[#4BB4E6]"
                        >
                          {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/locations" className="text-[#4BB4E6] text-sm hover:underline">
                View All Locations →
              </Link>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4BB4E6] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4BB4E6] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4BB4E6] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/firm-profile" className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm">
                    Firm Profile
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm">
                    Legal Blog
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="opacity-75 hover:opacity-100 hover:text-[#4BB4E6] text-sm">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* SEO Footer Content */}
          <div className="mt-8 pt-8 border-t border-white/20 text-xs opacity-75 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h5 className="font-semibold mb-2">Best Law Firm in Delhi</h5>
              <p>
                Khanna and Associates is recognized as the best law firm in Delhi, providing exceptional legal services
                across all practice areas. Our Delhi office serves as the headquarters with a team of 50+ experienced
                attorneys dedicated to client success.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Best Law Firm in Jaipur</h5>
              <p>
                As the best law firm in Jaipur, Khanna and Associates specializes in real estate law, heritage property
                matters, and tourism law. Our Jaipur office has established itself as a leading legal service provider
                in the Pink City with expertise in local regulations.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Best Law Firm in Dehradun</h5>
              <p>
                Khanna and Associates is the best law firm in Dehradun for environmental law, forest rights, and land
                acquisition matters. Our Dehradun team brings specialized knowledge of Uttarakhand's legal landscape to
                provide tailored solutions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Best Law Firm in India</h5>
              <p>
                With 77 years of legal excellence, Khanna and Associates has established itself as one of the best law
                firms in India. Our nationwide presence with offices in Delhi, Mumbai, Bangalore, Jaipur, Dehradun,
                Gurgaon, and international locations enables us to serve clients across India and globally.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-75 mb-4 md:mb-0">
              © {new Date().getFullYear()} Khanna and Associates. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm opacity-75">
              <a href="#" className="hover:text-[#4BB4E6]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#4BB4E6]">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#4BB4E6]">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
