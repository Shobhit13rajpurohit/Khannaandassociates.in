import { NextResponse } from "next/server"
import { updateBlogPost, deleteBlogPost } from "@/lib/db"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const postData = await request.json()
    const updatedPost = await updateBlogPost(params.id, postData)
    if (!updatedPost) {
      throw new Error("Failed to update blog post")
    }
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("API Error updating blog post:", error)
    return NextResponse.json({ message: "Error updating blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteBlogPost(params.id)
    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("API Error deleting blog post:", error)
    return NextResponse.json({ message: "Error deleting blog post" }, { status: 500 })
  }
}
