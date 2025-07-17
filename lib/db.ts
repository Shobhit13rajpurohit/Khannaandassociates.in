import { supabase } from "./supabase-server"

// Database types
export interface Service {
  id: string
  title: string
  slug: string
  description: string
  content: string
  key_points: string[]
  featured_image?: string
  related_services: string[]
  status: "published" | "draft"
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  category: string
  tags: string[]
  status: "published" | "draft"
  author_id: string
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  author?: {
    name: string
    email: string
  }
}

export interface MediaItem {
  id: string
  filename: string
  original_name: string
  file_type: string
  file_size: number
  url: string
  alt_text?: string
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  created_at: string
}

// Service operations
export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching services:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getServices:", error)
    return []
  }
}

export async function getPublishedServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching published services:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getPublishedServices:", error)
    return []
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const { data, error } = await supabase.from("services").select("*").eq("slug", slug).single()

    if (error) {
      console.error("Error fetching service:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getService:", error)
    return null
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const { data, error } = await supabase.from("services").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching service by ID:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getServiceById:", error)
    return null
  }
}

export async function createService(
  service: Omit<Service, "id" | "created_at" | "updated_at">,
): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from("services")
      .insert([{ ...service, updated_at: new Date().toISOString() }])
      .select()
      .single()

    if (error) {
      console.error("Error creating service:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createService:", error)
    return null
  }
}

export async function updateService(id: string, service: Partial<Service>): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from("services")
      .update({ ...service, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating service:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in updateService:", error)
    return null
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) {
      console.error("Error deleting service:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteService:", error)
    return false
  }
}

// Blog operations
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:admin_users(name, email)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getBlogPosts:", error)
    return []
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:admin_users(name, email)
      `)
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching published blog posts:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getPublishedBlogPosts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:admin_users(name, email)
      `)
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("Error fetching blog post:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getBlogPost:", error)
    return null
  }
}

export async function createBlogPost(
  post: Omit<BlogPost, "id" | "created_at" | "updated_at">,
): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([{ ...post, updated_at: new Date().toISOString() }])
      .select()
      .single()

    if (error) {
      console.error("Error creating blog post:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createBlogPost:", error)
    return null
  }
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .update({ ...post, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating blog post:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in updateBlogPost:", error)
    return null
  }
}

// Media operations
export async function uploadMedia(file: File): Promise<MediaItem | null> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("media").upload(fileName, file)

    if (uploadError) {
      console.error("Error uploading file:", uploadError)
      return null
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(fileName)

    // Save to database
    const { data, error } = await supabase
      .from("media")
      .insert([
        {
          filename: fileName,
          original_name: file.name,
          file_type: file.type,
          file_size: file.size,
          url: publicUrl,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error saving media to database:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in uploadMedia:", error)
    return null
  }
}

export async function getMedia(): Promise<MediaItem[]> {
  try {
    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching media:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getMedia:", error)
    return []
  }
}
