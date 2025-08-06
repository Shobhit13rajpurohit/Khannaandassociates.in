export const dynamic = 'force-dynamic';

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Search Results | Khanna and Associates",
  description: "Search results from Khanna and Associates website",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""

  // Mock search results - in a real implementation, this would come from a search API
  const searchResults = [
    {
      title: "Corporate and Commercial Law Services",
      url: "/services/corporate-and-commercial",
      type: "Service",
      excerpt:
        "Our Corporate and Commercial practice provides strategic legal advice to businesses of all sizes, from startups to multinational corporations.",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073",
    },
    {
      title: "Lawyers in Delhi",
      url: "/lawyers-in-delhi",
      type: "Location",
      excerpt: "Find the best legal representation across all areas of Delhi with our experienced team of attorneys.",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
    },
    {
      title: "Understanding the New Real Estate Regulations in Delhi",
      url: "/blog/understanding-new-real-estate-regulations-delhi",
      type: "Blog Post",
      excerpt:
        "An in-depth analysis of the recent changes in real estate regulations in Delhi and how they impact property owners and buyers.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073",
    },
    {
      title: "About Khanna and Associates",
      url: "/firm-profile",
      type: "Page",
      excerpt: "Learn about our firm's history, values, and commitment to legal excellence since 1948.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1a3c61] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Search Results</h1>
          <div className="max-w-2xl mx-auto">
            <form className="flex">
              <input
                type="text"
                defaultValue={query}
                name="q"
                placeholder="Search..."
                className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4BB4E6] text-gray-800"
              />
              <Button
                type="submit"
                className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white rounded-r-md rounded-l-none px-6"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1a3c61]">{query ? `Results for "${query}"` : "All Results"}</h2>
            <p className="text-gray-600">{searchResults.length} results found</p>
          </div>

          <div className="space-y-8">
            {searchResults.map((result, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/4 relative h-48 md:h-auto">
                  <Image src={result.image || "/placeholder.svg"} alt={result.title} fill className="object-cover" />
                </div>
                <div className="p-6 md:w-3/4">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {result.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3c61] mb-2">
                    <Link href={result.url} className="hover:text-[#4BB4E6]">
                      {result.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{result.excerpt}</p>
                  <Link href={result.url}>
                    <Button
                      variant="outline"
                      className="text-[#1a3c61] border-[#1a3c61] hover:bg-[#1a3c61] hover:text-white"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
