"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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

  // Services list (alphabetically sorted)
  const services = [
    "Arbitration and Reconciliation",
    "Aviation & Defence",
    "Banking and Finance & Insurance",
    "Bankruptcy and Insolvency",
    "Capital Markets",
    "Competition/Antitrust",
    "Corporate and Commercial",
    "Criminal & Civil",
    "Energy and Natural Resources",
    "Financial Services & Fintech",
    "Funds",
    "Healthcare and Life Sciences",
    "Immigration",
    "Information Technology",
    "Intellectual Property",
    "International Domain",
    "Legal Outsourcing Work(LPO)",
    "Matrimonial",
    "Media and Entertainment",
    "Private Client practice",
    "Real Estate",
    "Taxation (Direct and Indirect Taxation)",
    "Technology Media and Telecom"
  ].sort()

  // Locations list (alphabetically sorted)
  const locations = [
    "Ahmedabad",
    "Bangalore",
    "Bhopal",
    "Chandigarh",
    "Chennai",
    "Dehradun",
    "Delhi",
    "Goa",
    "Guwahati",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kochi",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Nagpur",
    "Patna",
    "Pune",
    "Surat",
    "Vadodara"
  ].sort()

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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
              alt="Khanna and Associates Logo"
              width={200}
              height={60}
              className="mr-2"
            />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base">
            Home
          </Link>
          
          {/* Services Mega Menu */}
          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link 
              href="/services" 
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base flex items-center"
            >
              Services
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            
            {activeDropdown === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50">
                <div className="grid grid-cols-3 gap-4 px-4">
                  {services.map((service) => (
                    <Link
                      key={service}
                      href={`/services/${generateSlug(service)}`}
                      className="block px-4 py-2 text-sm text-[#1a3c61] hover:bg-gray-50 hover:text-[#4BB4E6] transition-colors"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Locations Mega Menu */}
          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('locations')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link 
              href="/locations" 
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base flex items-center"
            >
              Locations
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            
            {activeDropdown === 'locations' && (
              <div className="absolute top-full left-0 mt-2 w-[400px] bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50">
                <div className="grid grid-cols-3 gap-4 px-4">
                  {locations.map((location) => (
                    <Link
                      key={location}
                      href={`/locations/${generateSlug(location)}`}
                      className="block px-3 py-2 text-sm text-[#1a3c61] hover:bg-gray-50 hover:text-[#4BB4E6] transition-colors"
                    >
                      {location}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/firm-profile" className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base">
            Firm Profile
          </Link>
          <Link href="/blog" className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base">
            Blog
          </Link>
          <Link href="/#contact" className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-base">
            Contact
          </Link>

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-[#1a3c61] hover:text-[#4BB4E6]"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link href="/admin">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white rounded-md px-6">Login</Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-[#1a3c61] hover:text-[#4BB4E6] mr-4"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#1a3c61]" /> : <Menu className="h-6 w-6 text-[#1a3c61]" />}
          </Button>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 z-50">
          <form onSubmit={handleSearch} className="flex">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4BB4E6]"
            />
            <Button type="submit" className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white rounded-r-md rounded-l-none">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Services with Expandable Menu */}
            <div>
              <button
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 flex items-center justify-between w-full"
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
              >
                Services
                <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'services' && (
                <div className="pl-4 mt-2 grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <Link
                      key={service}
                      href={`/services/${generateSlug(service)}`}
                      className="block text-sm text-[#1a3c61] hover:text-[#4BB4E6] py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Locations with Expandable Menu */}
            <div>
              <button
                className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2 flex items-center justify-between w-full"
                onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
              >
                Locations
                <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'locations' && (
                <div className="pl-4 mt-2 grid grid-cols-2 gap-2">
                  {locations.map((location) => (
                    <Link
                      key={location}
                      href={`/locations/${generateSlug(location)}`}
                      className="block text-sm text-[#1a3c61] hover:text-[#4BB4E6] py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {location}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/firm-profile"
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Firm Profile
            </Link>
            <Link
              href="/blog"
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/#contact"
              className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Anniversary Badge - Mobile */}
            <div className="flex justify-center py-2">
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
                className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}