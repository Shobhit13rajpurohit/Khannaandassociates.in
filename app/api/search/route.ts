import { NextResponse } from "next/server"
import { searchBlogPosts } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const posts = await searchBlogPosts(query)
    return NextResponse.json(posts)
  } catch (error) {
    console.error("API Error searching blog posts:", error)
    return NextResponse.json(
      {
        error: "Failed to search blog posts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
