import { NextResponse } from "next/server"
import { getBlogPosts, createBlogPost } from "@/lib/db"
import { getAdminUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getAdminUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const posts = await getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("API Error fetching blog posts:", error)
    return NextResponse.json({ message: "Error fetching blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAdminUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const postData = await request.json()
    // Ensure author_id is set from the authenticated user
    const newPost = await createBlogPost({ ...postData, author_id: user.id })
    if (!newPost) {
      throw new Error("Failed to create blog post")
    }
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("API Error creating blog post:", error)
    return NextResponse.json({ message: "Error creating blog post" }, { status: 500 })
  }
}
