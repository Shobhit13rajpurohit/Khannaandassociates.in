export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server"
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json({ error: "Missing blog post ID" }, { status: 400 })
    }

    const existingPost = await getBlogPostById(id)
    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    const body = await request.json()
    const updatedPost = await updateBlogPost(id, body)

    if (!updatedPost) {
      return NextResponse.json({ error: "Blog post not found or update failed" }, { status: 404 })
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/blog"]
      // Revalidate old path if it exists
      if (existingPost.slug) {
        pathsToRevalidate.push(`/blog/${existingPost.slug}`)
      }
      // Revalidate new path if it's different and the post is published
      if (updatedPost.status === "published" && updatedPost.slug) {
        pathsToRevalidate.push(`/blog/${updatedPost.slug}`)
      }

      await Promise.all([...new Set(pathsToRevalidate)].map(path => revalidate(path)))
      console.log("Revalidation triggered for:", [...new Set(pathsToRevalidate)])
    } catch (revalError) {
      console.error(
        `Revalidation failed for blog post (id: ${id}), but the post was updated successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("API Error updating blog post:", error)
    return NextResponse.json(
      {
        error: "Failed to update blog post",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json({ error: "Missing blog post ID" }, { status: 400 })
    }

    const existingPost = await getBlogPostById(id)
    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    const success = await deleteBlogPost(id)
    if (!success) {
      return NextResponse.json({ error: "Blog post not found or deletion failed" }, { status: 404 })
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/blog"]
      if (existingPost.slug) {
        pathsToRevalidate.push(`/blog/${existingPost.slug}`)
      }
      await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
      console.log("Revalidation triggered for:", pathsToRevalidate)
    } catch (revalError) {
      console.error(
        `Revalidation failed for blog post (id: ${id}), but the post was deleted successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("API Error deleting blog post:", error)
    return NextResponse.json(
      {
        error: "Failed to delete blog post",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}