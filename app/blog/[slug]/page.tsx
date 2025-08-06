export const dynamic = 'force-dynamic';

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, Search } from "lucide-react"
import type { Metadata } from "next"
import { getBlogPost, getPublishedBlogPosts } from "@/lib/db"
import { format } from "date-fns"

interface BlogPostParams {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogPosts()
    return posts.map(post => ({
      slug: post.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Khanna and Associates Legal Blog`,
    description: post.meta_description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      type: "article",
      publishedTime: post.created_at.toDate().toISOString(),
      authors: [post.author?.name],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Related posts (would typically be fetched based on tags or category)
  const allPosts = await getPublishedBlogPosts()
  const relatedPosts = allPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${post.featured_image}')`,
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-200 mb-3">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{format(post.created_at.toDate(), "MMMM dd, yyyy")}</span>
              <User className="h-4 w-4 mr-1" />
              <span>{post.author?.name || "Khanna and Associates"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <article className="bg-white rounded-lg shadow-md p-8">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center mb-4 lg:mb-0">
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

                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Share:</span>
                      <div className="flex space-x-2">
                        <a href="#" className="text-[#1877F2] hover:opacity-80">
                          <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-[#1DA1F2] hover:opacity-80">
                          <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-[#0A66C2] hover:opacity-80">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Author Bio */}
              <div className="bg-white rounded-lg shadow-md p-8 mt-8">
                <div className="flex items-start">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={"/placeholder-user.jpg"}
                      alt={post.author?.name || "author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-[#1a3c61]">{post.author?.name}</h3>
                    <p className="text-[#4BB4E6] mb-2">{post.author?.email}</p>
                    <p className="text-gray-600">
                      Expert in the field of law, providing insights and analysis on various legal topics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-[#1a3c61]">Related Articles</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-40">
                        <Image
                          src={relatedPost.featured_image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-gray-500 text-xs mb-2">
                          {format(relatedPost.created_at.toDate(), "MMMM dd, yyyy")}
                        </p>
                        <h4 className="font-semibold text-[#1a3c61] mb-2 line-clamp-2">
                          <Link href={`/blog/${relatedPost.slug}`} className="hover:text-[#4BB4E6]">
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <Button variant="link" className="text-[#4BB4E6] p-0 h-auto">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
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
                  {["All Categories", "Corporate Law", "Real Estate Law", "Intellectual Property", "Family Law"].map(
                    (category, index) => (
                      <li key={index}>
                        <Link
                          href={index === 0 ? "/blog" : `/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-gray-600 hover:text-[#4BB4E6] flex items-center"
                        >
                          <span className="mr-2">&gt;</span>
                          {category}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#1a3c61]">Recent Posts</h3>
                <ul className="space-y-4">
                  {allPosts.slice(0, 3).map(post => (
                    <li key={post.id} className="flex items-start">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={post.featured_image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-[#1a3c61] hover:text-[#4BB4E6] font-medium text-sm"
                        >
                          {post.title}
                        </Link>
                        <p className="text-gray-500 text-xs mt-1">
                          {format(post.created_at.toDate(), "MMMM dd, yyyy")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="bg-[#1a3c61] rounded-lg shadow-md p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Need Legal Assistance?</h3>
                <p className="mb-4">
                  Contact our team of expert lawyers for personalized legal advice on real estate matters.
                </p>
                <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full">Schedule a Consultation</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
