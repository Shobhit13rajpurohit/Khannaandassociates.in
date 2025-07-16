import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Calendar, User, Tag } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Blog | Khanna and Associates - Legal Insights and Updates",
  description:
    "Stay updated with the latest legal news, insights, and analysis from Khanna and Associates. Our blog covers various legal topics and developments.",
  keywords:
    "legal blog, law blog, legal insights, legal news, Khanna and Associates blog, legal updates, law firm blog",
}

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Understanding the New Real Estate Regulations in Delhi",
    slug: "understanding-new-real-estate-regulations-delhi",
    excerpt:
      "An in-depth analysis of the recent changes in real estate regulations in Delhi and how they impact property owners and buyers.",
    date: "March 15, 2023",
    author: "Rajiv Khanna",
    category: "Real Estate Law",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073",
    tags: ["Real Estate", "Delhi", "Regulations"],
  },
  {
    id: 2,
    title: "The Impact of Recent Supreme Court Judgments on Corporate Governance",
    slug: "impact-supreme-court-judgments-corporate-governance",
    excerpt:
      "A detailed look at how recent Supreme Court decisions are reshaping corporate governance practices in India.",
    date: "February 28, 2023",
    author: "Priya Sharma",
    category: "Corporate Law",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    tags: ["Corporate Law", "Supreme Court", "Governance"],
  },
  {
    id: 3,
    title: "Navigating Intellectual Property Rights in the Digital Age",
    slug: "navigating-intellectual-property-rights-digital-age",
    excerpt: "How businesses can protect their intellectual property in an increasingly digital marketplace.",
    date: "January 20, 2023",
    author: "Vikram Mehta",
    category: "Intellectual Property",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
    tags: ["Intellectual Property", "Digital", "Copyright"],
  },
  {
    id: 4,
    title: "Family Law Amendments: What You Need to Know",
    slug: "family-law-amendments-what-you-need-to-know",
    excerpt:
      "A comprehensive guide to recent amendments in family law and their implications for matrimonial disputes.",
    date: "December 10, 2022",
    author: "Ananya Patel",
    category: "Family Law",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070",
    tags: ["Family Law", "Matrimonial", "Legal Updates"],
  },
  {
    id: 5,
    title: "Legal Implications of the New Labour Codes",
    slug: "legal-implications-new-labour-codes",
    excerpt: "An analysis of the four new labour codes and how they will impact employers and employees.",
    date: "November 5, 2022",
    author: "Arjun Singh",
    category: "Labour Law",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2069",
    tags: ["Labour Law", "Employment", "Legal Compliance"],
  },
  {
    id: 6,
    title: "Cybersecurity Laws in India: Current Framework and Future Directions",
    slug: "cybersecurity-laws-india-framework-future",
    excerpt: "A detailed overview of the current cybersecurity legal framework in India and anticipated developments.",
    date: "October 18, 2022",
    author: "Neha Kapoor",
    category: "Cyber Law",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
    tags: ["Cyber Law", "Cybersecurity", "Data Protection"],
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Corporate Law",
  "Real Estate Law",
  "Intellectual Property",
  "Family Law",
  "Labour Law",
  "Cyber Law",
  "Criminal Law",
  "Tax Law",
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1423592707957-3b212afa6733?q=80&w=2069')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Insights & Updates</h1>
            <p className="text-xl mb-8">
              Stay informed with the latest legal news, analysis, and expert opinions from our attorneys
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">Latest Articles</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-4">{post.date}</span>
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-[#1a3c61]">
                          <Link href={`/blog/${post.slug}`} className="hover:text-[#4BB4E6]">
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-4">{post.excerpt}</p>

                        <div className="flex items-center mb-4">
                          <Tag className="h-4 w-4 text-[#4BB4E6] mr-2" />
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <Link
                                key={index}
                                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-[#4BB4E6] hover:text-white"
                              >
                                {tag}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <Link href={`/blog/${post.slug}`}>
                          <Button
                            variant="outline"
                            className="text-[#1a3c61] border-[#1a3c61] hover:bg-[#1a3c61] hover:text-white"
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="text-[#1a3c61] border-[#1a3c61] hover:bg-[#1a3c61] hover:text-white"
                >
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#1a3c61]">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#1a3c61]">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={index === 0 ? "/blog" : `/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-600 hover:text-[#4BB4E6] flex items-center"
                      >
                        <span className="mr-2">&gt;</span>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#1a3c61]">Recent Posts</h3>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 4).map((post) => (
                    <li key={post.id} className="flex items-start">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="ml-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-sm"
                        >
                          {post.title}
                        </Link>
                        <p className="text-gray-500 text-xs mt-1">{post.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags Cloud */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-[#1a3c61]">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap((post) => post.tags))).map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-[#4BB4E6] hover:text-white"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
