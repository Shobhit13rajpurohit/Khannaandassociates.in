"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Services list with SEO-friendly descriptions
  const services = [
    { name: "Arbitration and Reconciliation", description: "Expert dispute resolution and mediation services" },
    { name: "Aviation & Defence", description: "Legal solutions for aviation and defense sectors" },
    { name: "Banking and Finance & Insurance", description: "Comprehensive banking, finance and insurance law" },
    { name: "Bankruptcy and Insolvency", description: "Insolvency proceedings and bankruptcy law expertise" },
    { name: "Capital Markets", description: "Securities law and capital market regulations" },
    { name: "Competition/Antitrust", description: "Competition law and antitrust compliance" },
    { name: "Corporate and Commercial", description: "Corporate law and commercial transaction services" },
    { name: "Criminal & Civil", description: "Criminal defense and civil litigation services" },
    { name: "Energy and Natural Resources", description: "Energy law and natural resources regulation" },
    { name: "Financial Services & Fintech", description: "Fintech regulation and financial services law" },
    { name: "Funds", description: "Investment funds and asset management law" },
    { name: "Healthcare and Life Sciences", description: "Healthcare regulation and life sciences law" },
    { name: "Immigration", description: "Immigration law and visa services" },
    { name: "Information Technology", description: "IT law and technology legal services" },
    { name: "Intellectual Property", description: "IP protection and intellectual property law" },
    { name: "International Domain", description: "International law and cross-border transactions" },
    { name: "Legal Outsourcing Work(LPO)", description: "Legal process outsourcing services" },
    { name: "Matrimonial", description: "Family law and matrimonial legal services" },
    { name: "Media and Entertainment", description: "Entertainment law and media legal services" },
    { name: "Private Client practice", description: "Private client and wealth management law" },
    { name: "Real Estate", description: "Property law and real estate transactions" },
    { name: "Taxation (Direct and Indirect Taxation)", description: "Tax law and taxation advisory services" },
    { name: "Technology Media and Telecom", description: "TMT law and telecommunications regulation" }
  ].sort((a, b) => a.name.localeCompare(b.name))

  // Locations list with additional context
  const locations = [
    { name: "Ahmedabad", region: "Gujarat" },
    { name: "Bangalore", region: "Karnataka" },
    { name: "Bhopal", region: "Madhya Pradesh" },
    { name: "Chandigarh", region: "Punjab/Haryana" },
    { name: "Chennai", region: "Tamil Nadu" },
    { name: "Dehradun", region: "Uttarakhand" },
    { name: "Delhi", region: "National Capital Territory" },
    { name: "Goa", region: "Goa" },
    { name: "Guwahati", region: "Assam" },
    { name: "Hyderabad", region: "Telangana" },
    { name: "Indore", region: "Madhya Pradesh" },
    { name: "Jaipur", region: "Rajasthan" },
    { name: "Kochi", region: "Kerala" },
    { name: "Kolkata", region: "West Bengal" },
    { name: "Lucknow", region: "Uttar Pradesh" },
    { name: "Mumbai", region: "Maharashtra" },
    { name: "Nagpur", region: "Maharashtra" },
    { name: "Patna", region: "Bihar" },
    { name: "Pune", region: "Maharashtra" },
    { name: "Surat", region: "Gujarat" },
    { name: "Vadodara", region: "Gujarat" }
  ].sort((a, b) => a.name.localeCompare(b.name))

  // Improved hover delay for better UX
  const handleMouseEnter = useCallback((dropdown: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current)
    }
    setActiveDropdown(dropdown)
  }, [])

  const handleMouseLeave = useCallback(() => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150) // Small delay to prevent flickering
  }, [])

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearch(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current)
      }
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveDropdown(null)
      setShowSearch(false)
      setMobileMenuOpen(false)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  const generateSlug = (text: string) => {
    return text.toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[()]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md" onKeyDown={handleKeyDown}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" aria-label="Khanna and Associates - Home">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
                alt="Khanna and Associates - Leading Law Firm"
                width={200}
                height={60}
                className="mr-2"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center" role="navigation" aria-label="Main navigation">
            <Link 
              href="/" 
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base transition-colors duration-200"
              aria-label="Home page"
            >
              Home
            </Link>
            
            {/* Services Mega Menu */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/services" 
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base flex items-center transition-colors duration-60"
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
                aria-label="Legal services - view all practice areas"
              >
                Services
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-60 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* Locations Mega Menu */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/locations" 
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base flex items-center transition-colors duration-60"
                aria-expanded={activeDropdown === 'locations'}
                aria-haspopup="true"
                aria-label="Our office locations across India"
              >
                Locations
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-60 ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <Link 
              href="/firm-profile" 
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base transition-colors duration-200"
              aria-label="Learn about our law firm"
            >
              Firm Profile
            </Link>
            <Link 
              href="/blog" 
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base transition-colors duration-200"
              aria-label="Read our legal blog and insights"
            >
              Blog
            </Link>
            <Link 
              href="/#contact" 
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base transition-colors duration-200"
              aria-label="Contact our law firm"
            >
              Contact
            </Link>

            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-[#1a3c61] hover:text-[#4BB4E6] transition-colors duration-200"
              aria-label={showSearch ? "Close search" : "Open search"}
              aria-expanded={showSearch}
            >
              <Search className="h-5 w-5" />
            </button>

            <Link href="/admin" aria-label="Admin login">
              <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white rounded-md px-6 transition-colors duration-200">
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-[#1a3c61] hover:text-[#4BB4E6] mr-4 transition-colors duration-200"
              aria-label={showSearch ? "Close search" : "Open search"}
            >
              <Search className="h-5 w-5" />
            </button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-[#1a3c61]" /> : <Menu className="h-6 w-6 text-[#1a3c61]" />}
            </Button>
          </div>
        </div>

        {/* Search Overlay */}
        {showSearch && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto" role="search">
              <label htmlFor="search-input" className="sr-only">Search legal services and content</label>
              <input
                id="search-input"
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal services, blog posts, locations..."
                className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4BB4E6] focus:border-[#4BB4E6] transition-all duration-200"
                autoComplete="off"
              />
              <Button 
                type="submit" 
                className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white rounded-r-md rounded-l-none px-6 transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press ESC to close search
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-4" role="navigation" aria-label="Mobile navigation">
              <Link
                href="/"
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Services with Expandable Menu */}
              <div>
                <button
                  className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 flex items-center justify-between w-full transition-colors duration-200"
                  onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                  aria-expanded={activeDropdown === 'services'}
                  aria-controls="mobile-services-menu"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'services' && (
                  <div id="mobile-services-menu" className="pl-4 mt-2 grid grid-cols-1 gap-1 max-h-60 overflow-y-auto">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={`/services/${generateSlug(service.name)}`}
                        className="block text-sm text-[#1a3c61] hover:text-[#4BB4E6] py-2 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                        title={service.description}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Locations with Expandable Menu */}
              <div>
                <button
                  className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 flex items-center justify-between w-full transition-colors duration-200"
                  onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
                  aria-expanded={activeDropdown === 'locations'}
                  aria-controls="mobile-locations-menu"
                >
                  Locations
                  <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'locations' && (
                  <div id="mobile-locations-menu" className="pl-4 mt-2 grid grid-cols-2 gap-1 max-h-60 overflow-y-auto">
                    {locations.map((location) => (
                      <Link
                        key={location.name}
                        href={`/locations/${generateSlug(location.name)}`}
                        className="block text-sm text-[#1a3c61] hover:text-[#4BB4E6] py-2 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                        title={`${location.name} - ${location.region}`}
                      >
                        {location.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/firm-profile"
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Firm Profile
              </Link>
              <Link
                href="/blog"
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/#contact"
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Anniversary Badge - Mobile */}
              <div className="flex justify-center py-4">
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c8a45e] to-[#f0d78c] shadow-lg"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c8a45e] to-[#f0d78c] blur-md opacity-70 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center">
                    <span className="text-[#c8a45e] font-bold text-3xl">77</span>
                    <span className="text-[#1a3c61] text-xs font-semibold">YEARS OF</span>
                    <span className="text-[#1a3c61] text-xs font-semibold">TRUST</span>
                  </div>
                </div>
              </div>

              <Link href="/admin">
                <Button
                  className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Backdrop Overlay */}
      {activeDropdown && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setActiveDropdown(null)} />
      )}

      {/* Services Mega Menu */}
      {activeDropdown === 'services' && (
        <div 
          className="fixed left-0 right-0 top-[68px] bg-white/65 backdrop-blur-md shadow-2xl border-t border-gray-200 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200"
          style={{ 
            maxHeight: 'calc(100vh - 68px)',
            overflowY: 'auto'
          }}
          onMouseEnter={() => handleMouseEnter('services')}
          onMouseLeave={handleMouseLeave}
          role="menu"
          aria-label="Services menu"
        >
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-[#1a3c61] mb-2">Our Practice Areas</h3>
              <p className="text-gray-600">Comprehensive legal services across all domains with {services.length} specialized practice areas</p>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={`/services/${generateSlug(service.name)}`}
                  className="group block p-4 text-sm text-[#1a3c61] hover:bg-white/80 hover:text-[#4BB4E6] transition-all duration-200 rounded-lg border border-gray-100 hover:border-[#4BB4E6] hover:shadow-lg backdrop-blur-sm"
                  role="menuitem"
                  title={service.description}
                >
                  <div className="font-semibold group-hover:font-bold transition-all duration-200 mb-2 text-xs leading-tight">{service.name}</div>
                  <div className="text-xs text-gray-500 group-hover:text-[#4BB4E6] leading-relaxed line-clamp-3">{service.description}</div>
                </Link>
              ))}
            </div>
            <div className="border-t mt-8 pt-6 text-center">
              <Link 
                href="/services" 
                className="inline-flex items-center text-lg font-semibold text-[#4BB4E6] hover:text-[#1a3c61] transition-colors duration-200 bg-blue-50/80 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-blue-100/80"
              >
                View All Services →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Locations Mega Menu */}
      {activeDropdown === 'locations' && (
        <div 
          className="fixed left-0 right-0 top-[68px] bg-white/65 backdrop-blur-md shadow-2xl border-t border-gray-200 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200"
          style={{ 
            maxHeight: 'calc(100vh - 68px)',
            overflowY: 'auto'
          }}
          onMouseEnter={() => handleMouseEnter('locations')}
          onMouseLeave={handleMouseLeave}
          role="menu"
          aria-label="Locations menu"
        >
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-[#1a3c61] mb-2">Our Offices Across India</h3>
              <p className="text-gray-600">Serving clients across {locations.length} major cities with local expertise and national reach</p>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3">
              {locations.map((location) => (
                <Link
                  key={location.name}
                  href={`/locations/${generateSlug(location.name)}`}
                  className="group block p-4 text-sm text-[#1a3c61] hover:bg-white/80 hover:text-[#4BB4E6] transition-all duration-200 rounded-lg border border-gray-100 hover:border-[#4BB4E6] hover:shadow-lg text-center backdrop-blur-sm"
                  role="menuitem"
                  title={`${location.name} office - ${location.region}`}
                >
                  <div className="font-semibold group-hover:font-bold transition-all duration-200 mb-2 text-sm">{location.name}</div>
                  <div className="text-xs text-gray-500 group-hover:text-[#4BB4E6]">{location.region}</div>
                </Link>
              ))}
            </div>
            <div className="border-t mt-8 pt-6 text-center">
              <Link 
                href="/locations" 
                className="inline-flex items-center text-lg font-semibold text-[#4BB4E6] hover:text-[#1a3c61] transition-colors duration-200 bg-blue-50/80 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-blue-100/80"
              >
                View All Locations →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}