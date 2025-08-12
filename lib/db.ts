import { adminDb } from "./firebase-admin"
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
  featured_image_alt?: string
  category: string
  tags: string[]
  status: "published" | "draft"
  author_id: string
  meta_title?: string
  meta_description?: string
  focus_keyword?: string
  canonical_url?: string
  og_title?: string
  og_description?: string
  twitter_title?: string
  twitter_description?: string
  seo_score?: number
  created_at: Timestamp
  updated_at: Timestamp
  author?: {
    name: string
    email: string
  }
}

export interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  expertise: string
  slug: string
  bio: string
  education: string[]
  contact: {
    email: string
    phone: string
  }
  office?: string
  status: "active" | "inactive"
  created_at: Timestamp
  updated_at: Timestamp
}

export interface Location {
  id: string
  name: string
  slug: string
  address: string
  city: string
  country: string
  contact_info: {
    phone: string
    email: string
  } | string
  imageUrl?: string
  about_office?: string
  established?: string
  practice_areas?: string[]
  office_hours?: {
    weekdays: string
    saturday?: string
    sunday?: string
  }
  map_image?: string
  map_link?: string
  created_at: Timestamp
  updated_at: Timestamp
  parent_id?: string
  sub_offices?: Location[]
}

// Enhanced caching system
const blogCache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const serviceCache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const authorCache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const teamCache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const locationCache = new Map<string, { data: any; timestamp: number; ttl: number }>();

const DEFAULT_CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const AUTHOR_CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const LONG_CACHE_TTL = 30 * 60 * 1000; // 30 minutes for rarely changing data

// Helper functions
function getCacheKey(operation: string, params?: string): string {
  return params ? `${operation}:${params}` : operation
}

function setCache(cache: Map<string, any>, key: string, data: any, ttl: number = DEFAULT_CACHE_TTL): void {
  cache.set(key, { data, timestamp: Date.now(), ttl })
}

function getCache(cache: Map<string, any>, key: string): any | null {
  const cached = cache.get(key)
  if (!cached) return null
  
  const now = Date.now()
  if (now - cached.timestamp > cached.ttl) {
    cache.delete(key)
    return null
  }
  
  return cached.data
}

function clearBlogCache(): void {
  blogCache.clear()
  console.log('🗑️ Cleared blog cache')
}

function clearServiceCache(): void {
  serviceCache.clear()
  console.log('🗑️ Cleared service cache')
}

function clearTeamCache(): void {
  teamCache.clear()
  console.log('🗑️ Cleared team cache')
}

function clearLocationCache(slug?: string): void {
  if (slug) {
    locationCache.delete(getCacheKey('location-by-slug', slug))
    console.log(`🗑️ Cleared cache for location: ${slug}`)
  }
  locationCache.clear()
  console.log('🗑️ Cleared locations cache')
}

// Batch author fetching to reduce database calls
async function fetchAuthorsInBatch(authorIds: string[]): Promise<Map<string, { name: string; email: string }>> {
  const uniqueAuthorIds = [...new Set(authorIds)]
  const authorMap = new Map<string, { name: string; email: string }>()
  
  // Check cache first
  const uncachedAuthorIds = uniqueAuthorIds.filter(id => {
    const cached = getCache(authorCache, id)
    if (cached) {
      authorMap.set(id, cached)
      return false
    }
    return true
  })
  
  if (uncachedAuthorIds.length === 0) {
    return authorMap
  }
  
  try {
    // Batch fetch uncached authors
    const authorsCol = adminDb.collection("admin_users")
    const authorPromises = uncachedAuthorIds.map(id => authorsCol.doc(id).get())
    const authorDocs = await Promise.all(authorPromises)
    
    authorDocs.forEach((doc, index) => {
      if (doc.exists) {
        const data = doc.data()!
        const author = { name: data.name, email: data.email }
        const authorId = uncachedAuthorIds[index]
        
        authorMap.set(authorId, author)
        setCache(authorCache, authorId, author, AUTHOR_CACHE_TTL)
      }
    })
  } catch (error) {
    console.error("Error fetching authors in batch:", error)
  }
  
  return authorMap
}

// =============================================================================
// BLOG POST FUNCTIONS
// =============================================================================

export async function getBlogPosts(): Promise<BlogPost[]> {
  const cacheKey = getCacheKey('all-blog-posts')
  const cached = getCache(blogCache, cacheKey)
  
  if (cached) {
    console.log('🚀 Returning cached all blog posts')
    return cached
  }

  try {
    console.log('📡 Fetching all blog posts from Firestore')
    const blogPostsCol = adminDb.collection("blog_posts")
    const blogPostsSnapshot = await blogPostsCol.orderBy("created_at", "desc").get()
    
    const posts = blogPostsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost))
    
    // Batch fetch all authors
    const authorIds = posts.map(post => post.author_id).filter(Boolean)
    const authorsMap = await fetchAuthorsInBatch(authorIds)
    
    // Attach author info to posts
    posts.forEach(post => {
      if (post.author_id && authorsMap.has(post.author_id)) {
        post.author = authorsMap.get(post.author_id)
      }
    })
    
    setCache(blogCache, cacheKey, posts, DEFAULT_CACHE_TTL)
    console.log(`✅ Cached ${posts.length} blog posts`)
    
    return posts
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error)
    return []
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const cacheKey = getCacheKey('published-blog-posts')
  const cached = getCache(blogCache, cacheKey)
  
  if (cached) {
    console.log('🚀 Returning cached published blog posts')
    return cached
  }

  try {
    console.log('📡 Fetching published blog posts from Firestore')
    const blogPostsCol = adminDb.collection("blog_posts")
    
    // Use composite index: status (asc) + created_at (desc)
    const blogPostsSnapshot = await blogPostsCol
      .where("status", "==", "published")
      .orderBy("created_at", "desc")
      .get()
    
    const posts = blogPostsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost))
    
    // Batch fetch all authors
    const authorIds = posts.map(post => post.author_id).filter(Boolean)
    const authorsMap = await fetchAuthorsInBatch(authorIds)
    
    // Attach author info to posts
    posts.forEach(post => {
      if (post.author_id && authorsMap.has(post.author_id)) {
        post.author = authorsMap.get(post.author_id)
      }
    })
    
    setCache(blogCache, cacheKey, posts, DEFAULT_CACHE_TTL)
    console.log(`✅ Cached ${posts.length} published blog posts`)
    
    return posts
  } catch (error) {
    console.error("❌ Error fetching published blog posts:", error)
    return []
  }
}

// Optimized function for blog listing (reduced data transfer)
export async function getBlogPostsForListing(): Promise<Partial<BlogPost>[]> {
  const cacheKey = getCacheKey('blog-posts-listing')
  const cached = getCache(blogCache, cacheKey)
  
  if (cached) {
    console.log('🚀 Returning cached blog posts listing')
    return cached
  }

  try {
    console.log('📡 Fetching blog posts listing from Firestore')
    const blogPostsCol = adminDb.collection("blog_posts")
    
    // Only select needed fields for listing
    const blogPostsSnapshot = await blogPostsCol
      .where("status", "==", "published")
      .orderBy("created_at", "desc")
      .get()
    
    const posts = blogPostsSnapshot.docs.map(doc => {
      const data = doc.data()
      // Return only fields needed for listing page
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        featured_image: data.featured_image,
        category: data.category,
        tags: data.tags,
        author_id: data.author_id,
        created_at: data.created_at
      }
    }) as Partial<BlogPost>[]
    
    // Batch fetch authors
    const authorIds = posts.map(post => post.author_id!).filter(Boolean)
    const authorsMap = await fetchAuthorsInBatch(authorIds)
    
    // Attach author info
    posts.forEach(post => {
      if (post.author_id && authorsMap.has(post.author_id)) {
        post.author = authorsMap.get(post.author_id)
      }
    })
    
    setCache(blogCache, cacheKey, posts, DEFAULT_CACHE_TTL)
    console.log(`✅ Cached ${posts.length} blog posts for listing`)
    
    return posts
  } catch (error) {
    console.error("❌ Error fetching blog posts for listing:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const cacheKey = getCacheKey('blog-post-by-slug', slug)
  const cached = getCache(blogCache, cacheKey)
  
  if (cached) {
    console.log(`🚀 Returning cached blog post for slug: ${slug}`)
    return cached
  }

  try {
    console.log(`📡 Fetching blog post by slug: ${slug}`)
    const blogPostsCol = adminDb.collection("blog_posts")
    
    // Use index on slug field
    const blogPostsSnapshot = await blogPostsCol
      .where("slug", "==", slug)
      .limit(1)
      .get()
    
    if (blogPostsSnapshot.empty) {
      console.log(`❌ No blog post found for slug: ${slug}`)
      setCache(blogCache, cacheKey, null, 5 * 60 * 1000) // Cache null for 5 minutes
      return null
    }
    
    const blogPostDoc = blogPostsSnapshot.docs[0]
    const post = { id: blogPostDoc.id, ...blogPostDoc.data() } as BlogPost
    
    // Fetch author info if available
    if (post.author_id) {
      const authorsMap = await fetchAuthorsInBatch([post.author_id])
      if (authorsMap.has(post.author_id)) {
        post.author = authorsMap.get(post.author_id)
      }
    }
    
    setCache(blogCache, cacheKey, post, DEFAULT_CACHE_TTL)
    console.log(`✅ Cached blog post: ${post.title}`)
    
    return post
  } catch (error) {
    console.error(`❌ Error in getBlogPost for ${slug}:`, error)
    return null
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const cacheKey = getCacheKey('blog-post-by-id', id)
  const cached = getCache(blogCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const blogPostDocRef = adminDb.collection("blog_posts").doc(id)
    const blogPostDoc = await blogPostDocRef.get()
    
    if (!blogPostDoc.exists) {
      setCache(blogCache, cacheKey, null, 5 * 60 * 1000)
      return null
    }
    
    const post = { id: blogPostDoc.id, ...blogPostDoc.data() } as BlogPost
    
    if (post.author_id) {
      const authorsMap = await fetchAuthorsInBatch([post.author_id])
      if (authorsMap.has(post.author_id)) {
        post.author = authorsMap.get(post.author_id)
      }
    }
    
    setCache(blogCache, cacheKey, post, DEFAULT_CACHE_TTL)
    return post
  } catch (error) {
    console.error("Error in getBlogPostById:", error)
    return null
  }
}

export async function createBlogPost(
  post: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost | null> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts")
    const newPost = {
      ...post,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    const docRef = await blogPostsCol.add(newPost)
    clearBlogCache()
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
    clearBlogCache()
    return { id: blogPostDoc.id, ...blogPostDoc.data() } as BlogPost
  } catch (error) {
    console.error("Error in updateBlogPost:", error)
    return null
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const blogPostDocRef = adminDb.collection("blog_posts").doc(id)
    await blogPostDocRef.delete()
    clearBlogCache()
    return true
  } catch (error) {
    console.error("Error in deleteBlogPost:", error)
    return false
  }
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts")
    const blogPostsSnapshot = await blogPostsCol.get()
    const blogPostsList = blogPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))

    const lowerCaseQuery = query.toLowerCase()

    const results = blogPostsList.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery)
      const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery)
      return titleMatch || contentMatch
    })

    return results
  } catch (error) {
    console.error("Error searching blog posts:", error)
    return []
  }
}

export async function getRelatedBlogPosts(
  category: string,
  currentPostId: string,
): Promise<BlogPost[]> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts")
    const blogPostsSnapshot = await blogPostsCol
      .where("status", "==", "published")
      .where("category", "==", category)
      .limit(4)
      .get()
    const blogPostsList = blogPostsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
      .filter(post => post.id !== currentPostId)
      .slice(0, 3)
    return blogPostsList
  } catch (error) {
    console.error("Error fetching related blog posts:", error)
    return []
  }
}

// =============================================================================
// SERVICE FUNCTIONS
// =============================================================================

export async function getServices(): Promise<Service[]> {
  const cacheKey = getCacheKey('all-services')
  const cached = getCache(serviceCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const servicesCol = adminDb.collection("services")
    const servicesSnapshot = await servicesCol
      .orderBy("created_at", "desc")
      .get()
    
    const servicesList = servicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Service))
    
    setCache(serviceCache, cacheKey, servicesList, DEFAULT_CACHE_TTL)
    return servicesList
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getPublishedServices(): Promise<Service[]> {
  const cacheKey = getCacheKey('published-services')
  const cached = getCache(serviceCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const servicesCol = adminDb.collection("services")
    const servicesSnapshot = await servicesCol
      .where("status", "==", "published")
      .orderBy("created_at", "desc")
      .get()
    
    const servicesList = servicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Service))
    
    setCache(serviceCache, cacheKey, servicesList, DEFAULT_CACHE_TTL)
    return servicesList
  } catch (error) {
    console.error("Error fetching published services:", error)
    return []
  }
}

export async function getPublishedServicesLimited(limit: number = 6): Promise<Service[]> {
  const cacheKey = getCacheKey('published-services-limited', limit.toString())
  const cached = getCache(serviceCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const servicesCol = adminDb.collection("services")
    const servicesSnapshot = await servicesCol
      .where("status", "==", "published")
      .get()
    
    const servicesList = servicesSnapshot.docs.map(doc => {
      const data = doc.data() as Service
      // Remove large content field for homepage to reduce size
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        featured_image: data.featured_image,
        key_points: data.key_points?.slice(0, 3) || [], // Limit key points
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at
      } as Partial<Service>
    })
    
    // Sort alphabetically by title and limit to specified number
    const result = (servicesList as Service[])
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, limit)
      
    setCache(serviceCache, cacheKey, result, DEFAULT_CACHE_TTL)
    return result
  } catch (error) {
    console.error("Error fetching limited published services:", error)
    return []
  }
}

export async function getService(slug: string): Promise<Service | null> {
  const cacheKey = getCacheKey('service-by-slug', slug)
  const cached = getCache(serviceCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const servicesCol = adminDb.collection("services")
    const servicesSnapshot = await servicesCol
      .where("slug", "==", slug)
      .limit(1)
      .get()
    
    if (servicesSnapshot.empty) {
      setCache(serviceCache, cacheKey, null, 5 * 60 * 1000)
      return null
    }
    
    const serviceDoc = servicesSnapshot.docs[0]
    const service = { id: serviceDoc.id, ...serviceDoc.data() } as Service
    
    setCache(serviceCache, cacheKey, service, DEFAULT_CACHE_TTL)
    return service
  } catch (error) {
    console.error("Error in getService:", error)
    return null
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  const cacheKey = getCacheKey('service-by-id', id)
  const cached = getCache(serviceCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const serviceDocRef = adminDb.collection("services").doc(id)
    const serviceDoc = await serviceDocRef.get()
    
    if (!serviceDoc.exists) {
      setCache(serviceCache, cacheKey, null, 5 * 60 * 1000)
      return null
    }
    
    const service = { id: serviceDoc.id, ...serviceDoc.data() } as Service
    setCache(serviceCache, cacheKey, service, DEFAULT_CACHE_TTL)
    return service
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
    clearServiceCache()
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
    clearServiceCache()
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
    clearServiceCache()
    return true
  } catch (error) {
    console.error("Error in deleteService:", error)
    return false
  }
}

// =============================================================================
// TEAM MEMBER FUNCTIONS
// =============================================================================


// Clear all team-related cache entries
 
  // Clear all cache entries that start with team-related keys
  const keysToDelete = [];
  
  // If using Map-based cache
  if (teamCache instanceof Map) {
    for (const key of teamCache.keys()) {
      if (key.includes('team-member') || key.includes('active-team-members') || key.includes('all-team-members')) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => teamCache.delete(key));
  }
  
  // If using object-based cache
  else if (typeof teamCache === 'object') {
    Object.keys(teamCache).forEach(key => {
      if (key.includes('team-member') || key.includes('active-team-members') || key.includes('all-team-members')) {
        delete teamCache[key];
      }
    });
  }
  
  console.log('Team cache cleared:', keysToDelete.length, 'entries removed');


export async function getTeamMembers(): Promise<TeamMember[]> {
  const cacheKey = getCacheKey('all-team-members')
  const cached = getCache(teamCache, cacheKey)
  
  if (cached) {
    console.log('Returning cached team members:', cached.length)
    return cached
  }

  try {
    const teamCol = adminDb.collection("team_members")
    const teamSnapshot = await teamCol.orderBy("created_at", "desc").get()
    const teamList = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember))
    
    console.log('Fetched team members from DB:', teamList.length)
    setCache(teamCache, cacheKey, teamList, LONG_CACHE_TTL)
    return teamList
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  const cacheKey = getCacheKey('active-team-members')
  const cached = getCache(teamCache, cacheKey)
  
  if (cached) {
    console.log('Returning cached active team members:', cached.length)
    return cached
  }

  try {
    const teamCol = adminDb.collection("team_members")
    const teamSnapshot = await teamCol
      .where("status", "==", "active")
      .orderBy("created_at", "desc")
      .get()
    const teamList = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember))
    
    console.log('Fetched active team members from DB:', teamList.length)
    setCache(teamCache, cacheKey, teamList, LONG_CACHE_TTL)
    return teamList
  } catch (error) {
    console.error("Error fetching active team members:", error)
    return []
  }
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const cacheKey = getCacheKey('team-member-by-slug', slug)
  const cached = getCache(teamCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const teamCol = adminDb.collection("team_members")
    const teamSnapshot = await teamCol.where("slug", "==", slug).limit(1).get()
    
    if (teamSnapshot.empty) {
      console.log('Team member not found by slug:', slug)
      setCache(teamCache, cacheKey, null, 5 * 60 * 1000)
      return null
    }
    
    const teamDoc = teamSnapshot.docs[0]
    const member = { id: teamDoc.id, ...teamDoc.data() } as TeamMember
    
    console.log('Found team member by slug:', slug, member.name)
    setCache(teamCache, cacheKey, member, LONG_CACHE_TTL)
    return member
  } catch (error) {
    console.error("Error in getTeamMember:", error)
    return null
  }
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const cacheKey = getCacheKey('team-member-by-id', id)
  const cached = getCache(teamCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const teamDocRef = adminDb.collection("team_members").doc(id)
    const teamDoc = await teamDocRef.get()
    
    if (!teamDoc.exists) {
      console.log('Team member not found by ID:', id)
      setCache(teamCache, cacheKey, null, 5 * 60 * 1000)
      return null
    }
    
    const member = { id: teamDoc.id, ...teamDoc.data() } as TeamMember
    console.log('Found team member by ID:', id, member.name)
    setCache(teamCache, cacheKey, member, LONG_CACHE_TTL)
    return member
  } catch (error) {
    console.error("Error in getTeamMemberById:", error)
    return null
  }
}

export async function createTeamMember(
  member: Omit<TeamMember, "id" | "created_at" | "updated_at">
): Promise<TeamMember | null> {
  try {
    console.log('Creating new team member:', member.name)
    
    const teamCol = adminDb.collection("team_members")
    const newMember = {
      ...member,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    
    const docRef = await teamCol.add(newMember)
    const createdMember = { id: docRef.id, ...newMember }
    
    // Clear cache immediately after creating
    clearTeamCache()
    console.log('Team member created successfully:', createdMember.name, 'ID:', createdMember.id)
    
    return createdMember
  } catch (error) {
    console.error("Error in createTeamMember:", error)
    return null
  }
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember | null> {
  try {
    console.log('Updating team member:', id)
    
    const teamDocRef = adminDb.collection("team_members").doc(id)
    const updatedData = {
      ...member,
      updated_at: Timestamp.now(),
    }
    
    await teamDocRef.update(updatedData)
    
    // Clear cache immediately after updating
    clearTeamCache()
    
    const teamDoc = await teamDocRef.get()
    const updatedMember = { id: teamDoc.id, ...teamDoc.data() } as TeamMember
    
    console.log('Team member updated successfully:', updatedMember.name)
    return updatedMember
  } catch (error) {
    console.error("Error in updateTeamMember:", error)
    return null
  }
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  try {
    console.log('Deleting team member:', id)
    
    const teamDocRef = adminDb.collection("team_members").doc(id)
    await teamDocRef.delete()
    
    // Clear cache immediately after deleting
    clearTeamCache()
    console.log('Team member deleted successfully:', id)
    
    return true
  } catch (error) {
    console.error("Error in deleteTeamMember:", error)
    return false
  }
}

// Optional: Add a function to force refresh team data
export async function refreshTeamData(): Promise<void> {
  try {
    console.log('Force refreshing team data...')
    clearTeamCache()
    
    // Pre-load fresh data
    await Promise.all([
      getTeamMembers(),
      getActiveTeamMembers()
    ])
    
    console.log('Team data refreshed successfully')
  } catch (error) {
    console.error('Error refreshing team data:', error)
  }
}

// =============================================================================
// LOCATION FUNCTIONS
// =============================================================================

export async function getLocations(): Promise<Location[]> {
  const cacheKey = getCacheKey('locations')
  const cached = getCache(locationCache, cacheKey)
  
  if (cached) {
    console.log('🚀 Returning cached locations')
    return cached
  }

  try {
    console.log('📡 Fetching locations from Firestore')
    const locationsCol = adminDb.collection("locations")
    const locationsSnapshot = await locationsCol
      .orderBy("created_at", "desc")
      .get()
    
    const locationsList = locationsSnapshot.docs.map(doc => {
      const data = doc.data()
      return { 
        id: doc.id, 
        ...data,
        contact_info: typeof data.contact_info === 'string' 
          ? JSON.parse(data.contact_info) 
          : data.contact_info
      } as Location
    })
    
    setCache(locationCache, cacheKey, locationsList, LONG_CACHE_TTL)
    console.log(`✅ Cached ${locationsList.length} locations`)
    
    return locationsList
  } catch (error) {
    console.error("❌ Error fetching locations:", error)
    return []
  }
}

export async function getLocationsLimited(limit: number = 4): Promise<Location[]> {
  const cacheKey = getCacheKey('locations-limited', limit.toString())
  const cached = getCache(locationCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const locationsCol = adminDb.collection("locations")
    const locationsSnapshot = await locationsCol
      .orderBy("created_at", "desc")
      .limit(limit)
      .get()
    
    const locationsList = locationsSnapshot.docs.map(doc => {
      const data = doc.data() as Location
      // Only return essential fields for homepage
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        city: data.city,
        country: data.country,
        imageUrl: data.imageUrl,
        created_at: data.created_at,
        updated_at: data.updated_at
      } as Partial<Location>
    })
    
    setCache(locationCache, cacheKey, locationsList as Location[], LONG_CACHE_TTL)
    return locationsList as Location[]
  } catch (error) {
    console.error("Error fetching limited locations:", error)
    return []
  }
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  const cacheKey = getCacheKey('location-by-slug', slug)
  const cached = getCache(locationCache, cacheKey)
  
  if (cached) {
    console.log(`🚀 Returning cached location for slug: ${slug}`)
    return cached
  }

  try {
    console.log(`📡 Fetching location by slug: ${slug}`)
    const locationsCol = adminDb.collection("locations")
    const locationsSnapshot = await locationsCol
      .where("slug", "==", slug)
      .limit(1)
      .get()
    
    if (locationsSnapshot.empty) {
      console.log(`❌ No location found for slug: ${slug}`)
      setCache(locationCache, cacheKey, null, 2 * 60 * 1000) // Cache null result for 2 minutes
      return null
    }
    
    const locationDoc = locationsSnapshot.docs[0]
    const data = locationDoc.data()
    const location = { 
      id: locationDoc.id, 
      ...data,
      contact_info: typeof data.contact_info === 'string' 
        ? JSON.parse(data.contact_info) 
        : data.contact_info
    } as Location

    const subOfficesSnapshot = await locationsCol
      .where("parent_id", "==", location.id)
      .get()
    
    if (!subOfficesSnapshot.empty) {
      location.sub_offices = subOfficesSnapshot.docs.map(doc => {
        const subOfficeData = doc.data()
        return {
          id: doc.id,
          ...subOfficeData,
          contact_info: typeof subOfficeData.contact_info === 'string'
            ? JSON.parse(subOfficeData.contact_info)
            : subOfficeData.contact_info
        } as Location
      })
    }
    
    setCache(locationCache, cacheKey, location, LONG_CACHE_TTL)
    console.log(`✅ Cached location: ${location.name}`)
    
    return location
  } catch (error) {
    console.error(`❌ Error in getLocationBySlug for ${slug}:`, error)
    return null
  }
}

export async function getLocationById(id: string): Promise<Location | null> {
  const cacheKey = getCacheKey('location-by-id', id)
  const cached = getCache(locationCache, cacheKey)
  
  if (cached) {
    return cached
  }

  try {
    const locationDocRef = adminDb.collection("locations").doc(id)
    const locationDoc = await locationDocRef.get()
    
    if (!locationDoc.exists) {
      setCache(locationCache, cacheKey, null, 5 * 60 * 1000)
      return null
    }
    
    const data = locationDoc.data()
    const location = { 
      id: locationDoc.id, 
      ...data,
      contact_info: typeof data?.contact_info === 'string' 
        ? JSON.parse(data.contact_info) 
        : data?.contact_info
    } as Location
    
    setCache(locationCache, cacheKey, location, LONG_CACHE_TTL)
    return location
  } catch (error) {
    console.error("Error in getLocationById:", error)
    return null
  }
}

export async function createLocation(
  location: Omit<Location, "id" | "created_at" | "updated_at" | "slug">
): Promise<Location | null> {
  try {
    const locationsCol = adminDb.collection("locations")
    const slug = location.name.toLowerCase().replace(/\s+/g, "-")
    const newLocation = {
      ...location,
      slug,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    const docRef = await locationsCol.add(newLocation)
    clearLocationCache()
    return { id: docRef.id, ...newLocation }
  } catch (error) {
    console.error("Error in createLocation:", error)
    return null
  }
}

export async function updateLocation(
  id: string,
  location: Partial<Location>
): Promise<Location | null> {
  try {
    const locationDocRef = adminDb.collection("locations").doc(id)
    const updatedLocation: Partial<Location> & { updated_at: Timestamp } = {
      ...location,
      updated_at: Timestamp.now(),
    }

    if (location.name) {
      updatedLocation.slug = location.name.toLowerCase().replace(/\s+/g, "-")
    }

    await locationDocRef.update(updatedLocation)
    const locationDoc = await locationDocRef.get()
    const result = { id: locationDoc.id, ...locationDoc.data() } as Location
    
    clearLocationCache(result.slug)
    return result
  } catch (error) {
    console.error("Error in updateLocation:", error)
    return null
  }
}

export async function deleteLocation(id: string): Promise<boolean> {
  try {
    const locationDocRef = adminDb.collection("locations").doc(id)
    await locationDocRef.delete()
    clearLocationCache()
    return true
  } catch (error) {
    console.error("Error in deleteLocation:", error)
    return false
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Cache management functions
export function clearAllCaches(): void {
  blogCache.clear()
  serviceCache.clear()
  authorCache.clear()
  teamCache.clear()
  locationCache.clear()
  console.log('🗑️ Cleared all caches')
}

export function getCacheStats(): Record<string, number> {
  return {
    blogCache: blogCache.size,
    serviceCache: serviceCache.size,
    authorCache: authorCache.size,
    teamCache: teamCache.size,
    locationCache: locationCache.size,
  }
}

// Health check function
export async function healthCheck(): Promise<{
  status: 'healthy' | 'unhealthy'
  checks: Record<string, boolean>
  timestamp: string
}> {
  const checks: Record<string, boolean> = {}
  
  try {
    // Test basic database connection
    await adminDb.collection('_health_check').limit(1).get()
    checks.database = true
  } catch (error) {
    console.error('Database health check failed:', error)
    checks.database = false
  }
  
  try {
    // Test blog posts collection
    await adminDb.collection('blog_posts').limit(1).get()
    checks.blogPosts = true
  } catch (error) {
    console.error('Blog posts health check failed:', error)
    checks.blogPosts = false
  }
  
  try {
    // Test services collection
    await adminDb.collection('services').limit(1).get()
    checks.services = true
  } catch (error) {
    console.error('Services health check failed:', error)
    checks.services = false
  }
  
  const allHealthy = Object.values(checks).every(check => check === true)
  
  return {
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString()
  }
}

// Batch operations utility
export class FirestoreBatch {
  private batch = adminDb.batch()
  private operationCount = 0
  private readonly MAX_BATCH_SIZE = 500

  set(docRef: FirebaseFirestore.DocumentReference, data: any) {
    if (this.operationCount >= this.MAX_BATCH_SIZE) {
      throw new Error(`Batch size cannot exceed ${this.MAX_BATCH_SIZE} operations`)
    }
    this.batch.set(docRef, data)
    this.operationCount++
    return this
  }

  update(docRef: FirebaseFirestore.DocumentReference, data: any) {
    if (this.operationCount >= this.MAX_BATCH_SIZE) {
      throw new Error(`Batch size cannot exceed ${this.MAX_BATCH_SIZE} operations`)
    }
    this.batch.update(docRef, data)
    this.operationCount++
    return this
  }

  delete(docRef: FirebaseFirestore.DocumentReference) {
    if (this.operationCount >= this.MAX_BATCH_SIZE) {
      throw new Error(`Batch size cannot exceed ${this.MAX_BATCH_SIZE} operations`)
    }
    this.batch.delete(docRef)
    this.operationCount++
    return this
  }

  async commit() {
    if (this.operationCount === 0) {
      console.warn('No operations to commit in batch')
      return
    }
    
    try {
      await this.batch.commit()
      console.log(`✅ Batch committed with ${this.operationCount} operations`)
    } catch (error) {
      console.error('❌ Batch commit failed:', error)
      throw error
    }
  }

  getOperationCount() {
    return this.operationCount
  }
}

// Performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  // Log cache performance every 5 minutes
  setInterval(() => {
    const stats = getCacheStats()
    console.log('📊 Cache Statistics:', stats)
    
    const totalCacheSize = Object.values(stats).reduce((sum, size) => sum + size, 0)
    if (totalCacheSize > 1000) {
      console.warn('⚠️ Large cache size detected. Consider clearing some caches.')
    }
  }, 5 * 60 * 1000)

  // Memory usage monitoring
  let memoryCheckCount = 0
  setInterval(() => {
    const used = process.memoryUsage()
    const memoryStats = {
      rss: Math.round(used.rss / 1024 / 1024 * 100) / 100,
      heapTotal: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100,
      heapUsed: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100,
      external: Math.round(used.external / 1024 / 1024 * 100) / 100,
    }
    
    // Only log every 10 checks to avoid spam
    memoryCheckCount++
    if (memoryCheckCount % 10 === 0) {
      console.log('🧠 Memory usage (MB):', memoryStats)
    }
    
    // Alert if memory usage is high
    if (memoryStats.heapUsed > 512) {
      console.warn('⚠️ High memory usage detected:', memoryStats.heapUsed, 'MB')
    }
  }, 30000) // Every 30 seconds
}

// Export cache clearing functions for API routes
export {
  clearBlogCache,
  clearServiceCache,
  clearTeamCache,
  clearLocationCache,
}