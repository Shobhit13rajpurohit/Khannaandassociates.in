import { db } from "./firebase"
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore"

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
    const servicesCol = collection(db, "services")
    const q = query(servicesCol, orderBy("created_at", "desc"))
    const servicesSnapshot = await getDocs(q)
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service))
    return servicesList
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getPublishedServices(): Promise<Service[]> {
  try {
    const servicesCol = collection(db, "services")
    const q = query(servicesCol, where("status", "==", "published"), orderBy("created_at", "desc"))
    const servicesSnapshot = await getDocs(q)
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service))
    return servicesList
  } catch (error) {
    console.error("Error fetching published services:", error)
    return []
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const servicesCol = collection(db, "services")
    const q = query(servicesCol, where("slug", "==", slug))
    const servicesSnapshot = await getDocs(q)
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
    const serviceDocRef = doc(db, "services", id)
    const serviceDoc = await getDoc(serviceDocRef)
    if (!serviceDoc.exists()) {
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
    const servicesCol = collection(db, "services")
    const newService = {
      ...service,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    const docRef = await addDoc(servicesCol, newService)
    return { id: docRef.id, ...newService }
  } catch (error) {
    console.error("Error in createService:", error)
    return null
  }
}

export async function updateService(id: string, service: Partial<Service>): Promise<Service | null> {
  try {
    const serviceDocRef = doc(db, "services", id)
    const updatedService = {
      ...service,
      updated_at: Timestamp.now(),
    }
    await updateDoc(serviceDocRef, updatedService)
    const serviceDoc = await getDoc(serviceDocRef)
    return { id: serviceDoc.id, ...serviceDoc.data() } as Service
  } catch (error) {
    console.error("Error in updateService:", error)
    return null
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const serviceDocRef = doc(db, "services", id)
    await deleteDoc(serviceDocRef)
    return true
  } catch (error) {
    console.error("Error in deleteService:", error)
    return false
  }
}

// Blog operations
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPostsCol = collection(db, "blog_posts")
    const q = query(blogPostsCol, orderBy("created_at", "desc"))
    const blogPostsSnapshot = await getDocs(q)
    const blogPostsList = blogPostsSnapshot.docs.map(async doc => {
      const post = { id: doc.id, ...doc.data() } as BlogPost
      if (post.author_id) {
        const userDocRef = doc(db, "admin_users", post.author_id)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          post.author = {
            name: userDoc.data().name,
            email: userDoc.data().email,
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
    const blogPostsCol = collection(db, "blog_posts")
    const q = query(blogPostsCol, where("status", "==", "published"), orderBy("created_at", "desc"))
    const blogPostsSnapshot = await getDocs(q)
    const blogPostsList = blogPostsSnapshot.docs.map(async doc => {
      const post = { id: doc.id, ...doc.data() } as BlogPost
      if (post.author_id) {
        const userDocRef = doc(db, "admin_users", post.author_id)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          post.author = {
            name: userDoc.data().name,
            email: userDoc.data().email,
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
    const blogPostsCol = collection(db, "blog_posts")
    const q = query(blogPostsCol, where("slug", "==", slug))
    const blogPostsSnapshot = await getDocs(q)
    if (blogPostsSnapshot.empty) {
      return null
    }
    const blogPostDoc = blogPostsSnapshot.docs[0]
    const post = { id: blogPostDoc.id, ...blogPostDoc.data() } as BlogPost
    if (post.author_id) {
      const userDocRef = doc(db, "admin_users", post.author_id)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        post.author = {
          name: userDoc.data().name,
          email: userDoc.data().email,
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
    const blogPostsCol = collection(db, "blog_posts")
    const newPost = {
      ...post,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    const docRef = await addDoc(blogPostsCol, newPost)
    return { id: docRef.id, ...newPost }
  } catch (error) {
    console.error("Error in createBlogPost:", error)
    return null
  }
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const blogPostDocRef = doc(db, "blog_posts", id)
    const updatedPost = {
      ...post,
      updated_at: Timestamp.now(),
    }
    await updateDoc(blogPostDocRef, updatedPost)
    const blogPostDoc = await getDoc(blogPostDocRef)
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
    const mediaCol = collection(db, "media")
    const q = query(mediaCol, orderBy("created_at", "desc"))
    const mediaSnapshot = await getDocs(q)
    const mediaList = mediaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MediaItem))
    return mediaList
  } catch (error) {
    console.error("Error in getMedia:", error)
    return []
  }
}
