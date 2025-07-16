import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, Search } from "lucide-react"
import type { Metadata } from "next"

interface BlogPostParams {
  params: {
    slug: string
  }
}

// This would typically come from a CMS or database
const getBlogPost = (slug: string) => {
  // Mock blog post data
  const blogPost = {
    title: "Understanding the New Real Estate Regulations in Delhi",
    slug: "understanding-new-real-estate-regulations-delhi",
    content: `
      <p>The real estate sector in Delhi has witnessed significant regulatory changes in recent years, aimed at enhancing transparency, accountability, and consumer protection. These changes have profound implications for property owners, buyers, and real estate developers operating in the National Capital Region.</p>
      
      <h2>Key Regulatory Changes</h2>
      
      <p>The Real Estate (Regulation and Development) Act, 2016 (RERA) has been a game-changer for the real estate sector in Delhi. The Act mandates that all real estate projects with an area of 500 square meters or more, or those comprising eight or more apartments, must be registered with the Delhi Real Estate Regulatory Authority.</p>
      
      <p>Some of the key provisions of RERA include:</p>
      
      <ul>
        <li>Mandatory registration of real estate projects and real estate agents</li>
        <li>Disclosure of all project details, including layout plans, government approvals, and land status</li>
        <li>Deposit of 70% of the funds collected from buyers in a separate account to ensure project completion</li>
        <li>Adherence to specified timelines for project completion</li>
        <li>Structural defect liability for five years</li>
      </ul>
      
      <h2>Impact on Property Buyers</h2>
      
      <p>For property buyers in Delhi, these regulatory changes offer several benefits:</p>
      
      <ol>
        <li><strong>Enhanced Transparency:</strong> Buyers now have access to comprehensive information about real estate projects, enabling informed decision-making.</li>
        <li><strong>Financial Security:</strong> The requirement to deposit 70% of funds in a separate account ensures that developers cannot divert funds from one project to another, reducing the risk of project delays or abandonment.</li>
        <li><strong>Timely Delivery:</strong> Developers are now legally bound to deliver projects within the specified timeframe, failing which they are liable to pay penalties.</li>
        <li><strong>Quality Assurance:</strong> The five-year structural defect liability ensures that developers maintain high construction standards.</li>
      </ol>
      
      <h2>Challenges and Considerations</h2>
      
      <p>Despite these positive changes, there are several challenges and considerations that property buyers and investors should be aware of:</p>
      
      <p>The implementation of RERA in Delhi has been gradual, and not all projects may be fully compliant yet. Buyers should verify the RERA registration status of projects before making any investment decisions.</p>
      
      <p>The real estate market in Delhi is also influenced by other factors such as the Master Plan of Delhi 2021, which outlines the development strategy for the city, and the Land Pooling Policy, which aims to meet the growing housing demand.</p>
      
      <h2>Legal Assistance for Real Estate Matters</h2>
      
      <p>Given the complexity of real estate regulations in Delhi, it is advisable to seek legal assistance when buying, selling, or investing in property. A qualified real estate lawyer can help you navigate the regulatory landscape, conduct due diligence, review property documents, and ensure compliance with all legal requirements.</p>
      
      <p>At Khanna and Associates, our team of experienced real estate lawyers in Delhi provides comprehensive legal services for all property-related matters. From conducting title searches and drafting sale deeds to resolving property disputes and ensuring RERA compliance, we offer end-to-end legal support to protect your real estate investments.</p>
      
      <h2>Conclusion</h2>
      
      <p>The new real estate regulations in Delhi represent a significant step towards creating a more transparent, accountable, and consumer-friendly real estate sector. By understanding these regulations and seeking appropriate legal guidance, property buyers and investors can make informed decisions and protect their interests in the dynamic Delhi real estate market.</p>
      
      <p>For personalized legal advice on real estate matters in Delhi, contact our team of expert lawyers at Khanna and Associates.</p>
    `,
    date: "March 15, 2023",
    author: "Rajiv Khanna",
    authorTitle: "Senior Partner, Real Estate Law",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
    category: "Real Estate Law",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073",
    tags: ["Real Estate", "Delhi", "Regulations", "RERA", "Property Law"],
    metaDescription:
      "An in-depth analysis of the recent changes in real estate regulations in Delhi and how they impact property owners and buyers.",
    metaKeywords:
      "real estate regulations Delhi, RERA Delhi, property laws Delhi, real estate legal updates, Delhi property regulations",
  }

  return blogPost
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  return {
    title: `${post.title} | Khanna and Associates Legal Blog`,
    description: post.metaDescription,
    keywords: post.metaKeywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const post = getBlogPost(params.slug)

  // Related posts (would typically be fetched based on tags or category)
  const relatedPosts = [
    {
      id: 2,
      title: "The Impact of Recent Supreme Court Judgments on Corporate Governance",
      slug: "impact-supreme-court-judgments-corporate-governance",
      date: "February 28, 2023",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    },
    {
      id: 5,
      title: "Legal Implications of the New Labour Codes",
      slug: "legal-implications-new-labour-codes",
      date: "November 5, 2022",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2069",
    },
    {
      id: 6,
      title: "Cybersecurity Laws in India: Current Framework and Future Directions",
      slug: "cybersecurity-laws-india-framework-future",
      date: "October 18, 2022",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${post.image}')`,
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-200 mb-3">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{post.date}</span>
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
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
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-[#1a3c61]">{post.author}</h3>
                    <p className="text-[#4BB4E6] mb-2">{post.authorTitle}</p>
                    <p className="text-gray-600">
                      Rajiv Khanna is a Senior Partner at Khanna and Associates with over 35 years of experience in real
                      estate law. He has advised on some of the most significant property transactions in Delhi and is a
                      recognized expert in RERA compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-[#1a3c61]">Related Articles</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-40">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-gray-500 text-xs mb-2">{relatedPost.date}</p>
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
                  {relatedPosts.map((post) => (
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
