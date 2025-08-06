export const dynamic = 'force-dynamic';

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag } from "lucide-react"
import { getPublishedBlogPosts } from "@/lib/db"
import { format } from "date-fns"

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogPosts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Insights & Updates</h1>
            <p className="text-xl mb-8">
              Stay informed with the latest legal developments, insights, and expert analysis from our team of
              experienced attorneys.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.featured_image || "/placeholder.svg?height=400&width=600"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{format(post.created_at.toDate(), "MMMM dd, yyyy")}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author?.name || "Admin"}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#1a3c61] mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[#4BB4E6]">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-[#4BB4E6] mr-1" />
                        <span className="text-sm text-gray-500">{post.category}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="link" className="text-[#4BB4E6] p-0 h-auto">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">No blog posts available</h3>
              <p className="text-gray-500">Please check back later for legal insights and updates.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}