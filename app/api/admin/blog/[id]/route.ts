// app/api/admin/blog/[id]/route.ts
import { NextResponse } from "next/server"
import { updateBlogPost, deleteBlogPost } from "@/lib/db"

export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json({ 
        error: "Missing blog post ID" 
      }, { status: 400 })
    }

    const body = await request.json()
    
    // Validate required fields for update
    if (!body.title && !body.content && !body.status) {
      return NextResponse.json({ 
        error: "No valid fields to update" 
      }, { status: 400 })
    }

    // Prepare update data (only include fields that are provided)
    const updateData: any = {}
    
    if (body.title) updateData.title = body.title
    if (body.slug) updateData.slug = body.slug
    if (body.content) updateData.content = body.content
    if (body.excerpt) updateData.excerpt = body.excerpt
    if (body.category !== undefined) updateData.category = body.category
    if (body.tags) updateData.tags = Array.isArray(body.tags) ? body.tags : []
    if (body.status) updateData.status = body.status
    if (body.meta_title) updateData.meta_title = body.meta_title
    if (body.meta_description !== undefined) updateData.meta_description = body.meta_description
    if (body.featured_image !== undefined) updateData.featured_image = body.featured_image

    const updatedPost = await updateBlogPost(id, updateData)
    
    if (!updatedPost) {
      return NextResponse.json({ 
        error: "Blog post not found or update failed" 
      }, { status: 404 })
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("API Error updating blog post:", error)
    return NextResponse.json({ 
      error: "Failed to update blog post",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json({ 
        error: "Missing blog post ID" 
      }, { status: 400 })
    }

    const success = await deleteBlogPost(id)
    
    if (!success) {
      return NextResponse.json({ 
        error: "Blog post not found or deletion failed" 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      message: "Blog post deleted successfully" 
    })
  } catch (error) {
    console.error("API Error deleting blog post:", error)
    return NextResponse.json({ 
      error: "Failed to delete blog post",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}