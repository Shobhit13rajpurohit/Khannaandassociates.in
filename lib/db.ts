import { adminDb } from "./firebase"
import { Timestamp } from "firebase-admin/firestore"

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
  created_at: Timestamp
  updated_at: Timestamp
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
  created_at: Timestamp
  updated_at: Timestamp
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
  created_at: Timestamp
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  created_at: Timestamp
}

// Service operations
export async function getServices(): Promise<Service[]> {
  try {
    const servicesCol = adminDb.collection("services")
    const servicesSnapshot = await servicesCol.orderBy("created_at", "desc").get()
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service))
    return servicesList
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getPublishedServices(): Promise<Service[]> {
  try {
    const servicesCol = adminDb.collection("services")
    const servicesSnapshot = await servicesCol.where("status", "==", "published").orderBy("created_at", "desc").get()
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service))
    return servicesList
  } catch (error) {
    console.error("Error fetching published services:", error)
    return []
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const servicesCol = adminDb.collection("services")
    const servicesSnapshot = await servicesCol.where("slug", "==", slug).get()
    if (servicesSnapshot.empty) {
      return null
    }
    const serviceDoc = servicesSnapshot.docs[0]
    return { id: serviceDoc.id, ...serviceDoc.data() } as Service
  } catch (error) {
    console.error("Error in getService:", error)
    return null
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const serviceDocRef = adminDb.collection("services").doc(id)
    const serviceDoc = await serviceDocRef.get()
    if (!serviceDoc.exists) {
      return null
    }
    return { id: serviceDoc.id, ...serviceDoc.data() } as Service
  } catch (error) {
    console.error("Error in getServiceById:", error)
    return null
  }
}

export async function createService(
  service: Omit<Service, "id" | "created_at" | "updated_at">,
): Promise<Service | null> {
  try {
    const servicesCol = adminDb.collection("services")
    const newService = {
      ...service,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    const docRef = await servicesCol.add(newService)
    return { id: docRef.id, ...newService }
  } catch (error) {
    console.error("Error in createService:", error)
    return null
  }
}

export async function updateService(id: string, service: Partial<Service>): Promise<Service | null> {
  try {
    const serviceDocRef = adminDb.collection("services").doc(id)
    const updatedService = {
      ...service,
      updated_at: Timestamp.now(),
    }
    await serviceDocRef.update(updatedService)
    const serviceDoc = await serviceDocRef.get()
    return { id: serviceDoc.id, ...serviceDoc.data() } as Service
  } catch (error) {
    console.error("Error in updateService:", error)
    return null
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const serviceDocRef = adminDb.collection("services").doc(id)
    await serviceDocRef.delete()
    return true
  } catch (error) {
    console.error("Error in deleteService:", error)
    return false
  }
}

// Blog operations
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts")
    const blogPostsSnapshot = await blogPostsCol.orderBy("created_at", "desc").get()
    const blogPostsList = blogPostsSnapshot.docs.map(async doc => {
      const post = { id: doc.id, ...doc.data() } as BlogPost
      if (post.author_id) {
        const userDocRef = adminDb.collection("admin_users").doc(post.author_id)
        const userDoc = await userDocRef.get()
        if (userDoc.exists) {
          post.author = {
            name: userDoc.data()!.name,
            email: userDoc.data()!.email,
          }
        }
      }
      return post
    })
    return Promise.all(blogPostsList)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts")
    const blogPostsSnapshot = await blogPostsCol
      .where("status", "==", "published")
      .orderBy("created_at", "desc")
      .get()
    const blogPostsList = blogPostsSnapshot.docs.map(async doc => {
      const post = { id: doc.id, ...doc.data() } as BlogPost
      if (post.author_id) {
        const userDocRef = adminDb.collection("admin_users").doc(post.author_id)
        const userDoc = await userDocRef.get()
        if (userDoc.exists) {
          post.author = {
            name: userDoc.data()!.name,
            email: userDoc.data()!.email,
          }
        }
      }
      return post
    })
    return Promise.all(blogPostsList)
  } catch (error) {
    console.error("Error fetching published blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts")
    const blogPostsSnapshot = await blogPostsCol.where("slug", "==", slug).get()
    if (blogPostsSnapshot.empty) {
      return null
    }
    const blogPostDoc = blogPostsSnapshot.docs[0]
    const post = { id: blogPostDoc.id, ...blogPostDoc.data() } as BlogPost
    if (post.author_id) {
      const userDocRef = adminDb.collection("admin_users").doc(post.author_id)
      const userDoc = await userDocRef.get()
      if (userDoc.exists) {
        post.author = {
          name: userDoc.data()!.name,
          email: userDoc.data()!.email,
        }
      }
    }
    return post
  } catch (error) {
    console.error("Error in getBlogPost:", error)
    return null
  }
}

export async function createBlogPost(
  post: Omit<BlogPost, "id" | "created_at" | "updated_at">,
): Promise<BlogPost | null> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts")
    const newPost = {
      ...post,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    const docRef = await blogPostsCol.add(newPost)
    return { id: docRef.id, ...newPost }
  } catch (error) {
    console.error("Error in createBlogPost:", error)
    return null
  }
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const blogPostDocRef = adminDb.collection("blog_posts").doc(id)
    const updatedPost = {
      ...post,
      updated_at: Timestamp.now(),
    }
    await blogPostDocRef.update(updatedPost)
    const blogPostDoc = await blogPostDocRef.get()
    return { id: blogPostDoc.id, ...blogPostDoc.data() } as BlogPost
  } catch (error) {
    console.error("Error in updateBlogPost:", error)
    return null
  }
}

// Media operations
export async function uploadMedia(file: File): Promise<MediaItem | null> {
  // This function will need to be updated to use Firebase Storage instead of Supabase Storage.
  // For now, it will return null.
  return null
}

export async function getMedia(): Promise<MediaItem[]> {
  try {
    const mediaCol = adminDb.collection("media")
    const mediaSnapshot = await mediaCol.orderBy("created_at", "desc").get()
    const mediaList = mediaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MediaItem))
    return mediaList
  } catch (error) {
    console.error("Error in getMedia:", error)
    return []
  }
}
