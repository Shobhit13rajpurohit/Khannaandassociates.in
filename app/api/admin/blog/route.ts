
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server"
import { getBlogPosts, createBlogPost } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function GET() {
  try {
    const posts = await getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("API Error fetching blog posts:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Title and content are required",
        },
        { status: 400 },
      )
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
    }

    // Set default values
    const postData = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 150),
      category: body.category || "",
      tags: Array.isArray(body.tags) ? body.tags : [],
      status: body.status || "draft",
      author_id: body.author_id || "admin",
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || "",
      featured_image: body.featured_image || "",
    }

    const newPost = await createBlogPost(postData)

    if (!newPost) {
      throw new Error("Failed to create blog post in database")
    }

    // Revalidation logic
    if (newPost.status === "published") {
      try {
        const pathsToRevalidate = ["/blog"]
        if (newPost.slug) {
          pathsToRevalidate.push(`/blog/${newPost.slug}`)
        }
        await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
        console.log("Revalidation triggered for:", pathsToRevalidate)
      } catch (revalError) {
        console.error(
          `Revalidation failed for blog post (slug: ${newPost.slug}), but the post was created successfully. Please revalidate manually.`,
          revalError,
        )
      }
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("API Error creating blog post:", error)
    return NextResponse.json(
      {
        error: "Failed to create blog post",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}