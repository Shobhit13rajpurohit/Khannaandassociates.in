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
  featured_image_alt?: string  // NEW
  category: string
  tags: string[]
  status: "published" | "draft"
  author_id: string
  meta_title?: string
  meta_description?: string
  focus_keyword?: string       // NEW
  canonical_url?: string       // NEW
  og_title?: string           // NEW
  og_description?: string     // NEW
  twitter_title?: string      // NEW
  twitter_description?: string // NEW
  seo_score?: number          // NEW
  created_at: Timestamp
  updated_at: Timestamp
  author?: {
    name: string
    email: string
  }
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

export async function getPublishedServices(): Promise<Partial<Service>[]> {
  try {
    const servicesCol = adminDb.collection("services");
    const servicesSnapshot = await servicesCol
      .where("status", "==", "published")
      .orderBy("created_at", "desc")
      .select(
        "title",
        "slug",
        "description",
        "featured_image"
      )
      .get();
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return servicesList;
  } catch (error) {
    console.error("Error fetching published services:", error);
    return [];
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

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  try {
    const blogPostsCol = adminDb.collection("blog_posts");
    const blogPostsSnapshot = await blogPostsCol.get();
    const blogPostsList = blogPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));

    const lowerCaseQuery = query.toLowerCase();

    const results = blogPostsList.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
      return titleMatch || contentMatch;
    });

    return results;
  } catch (error) {
    console.error("Error searching blog posts:", error);
    return [];
  }
}
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const blogPostDocRef = adminDb.collection("blog_posts").doc(id)
    const blogPostDoc = await blogPostDocRef.get()
    
    if (!blogPostDoc.exists) {
      return null
    }
    
    const post = { id: blogPostDoc.id, ...blogPostDoc.data() } as BlogPost
    
    // Fetch author information if available
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
    console.error("Error in getBlogPostById:", error)
    return null
  }
}
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const blogPostDocRef = adminDb.collection("blog_posts").doc(id)
    await blogPostDocRef.delete()
    return true
  } catch (error) {
    console.error("Error in deleteBlogPost:", error)
    return false
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

// Add these interfaces and functions to your existing db.ts file

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

// Team operations
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const teamCol = adminDb.collection("team_members")
    const teamSnapshot = await teamCol.orderBy("created_at", "desc").get()
    const teamList = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember))
    return teamList
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  try {
    const teamCol = adminDb.collection("team_members")
    const teamSnapshot = await teamCol.where("status", "==", "active").orderBy("created_at", "desc").get()
    const teamList = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember))
    return teamList
  } catch (error) {
    console.error("Error fetching active team members:", error)
    return []
  }
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  try {
    const teamCol = adminDb.collection("team_members")
    const teamSnapshot = await teamCol.where("slug", "==", slug).get()
    if (teamSnapshot.empty) {
      return null
    }
    const teamDoc = teamSnapshot.docs[0]
    return { id: teamDoc.id, ...teamDoc.data() } as TeamMember
  } catch (error) {
    console.error("Error in getTeamMember:", error)
    return null
  }
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  try {
    const teamDocRef = adminDb.collection("team_members").doc(id)
    const teamDoc = await teamDocRef.get()
    if (!teamDoc.exists) {
      return null
    }
    return { id: teamDoc.id, ...teamDoc.data() } as TeamMember
  } catch (error) {
    console.error("Error in getTeamMemberById:", error)
    return null
  }
}

export async function createTeamMember(
  member: Omit<TeamMember, "id" | "created_at" | "updated_at">
): Promise<TeamMember | null> {
  try {
    const teamCol = adminDb.collection("team_members")
    const newMember = {
      ...member,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
    const docRef = await teamCol.add(newMember)
    return { id: docRef.id, ...newMember }
  } catch (error) {
    console.error("Error in createTeamMember:", error)
    return null
  }
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember | null> {
  try {
    const teamDocRef = adminDb.collection("team_members").doc(id)
    const updatedMember = {
      ...member,
      updated_at: Timestamp.now(),
    }
    await teamDocRef.update(updatedMember)
    const teamDoc = await teamDocRef.get()
    return { id: teamDoc.id, ...teamDoc.data() } as TeamMember
  } catch (error) {
    console.error("Error in updateTeamMember:", error)
    return null
  }
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  try {
    const teamDocRef = adminDb.collection("team_members").doc(id)
    await teamDocRef.delete()
    return true
  } catch (error) {
    console.error("Error in deleteTeamMember:", error)
    return false
  }
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
  }
  created_at: Timestamp
  updated_at: Timestamp
}

// Location operations
export async function getLocations(): Promise<Partial<Location>[]> {
  try {
    const locationsCol = adminDb.collection("locations");
    const locationsSnapshot = await locationsCol
      .orderBy("created_at", "desc")
      .select(
        "name",
        "slug",
        "address",
        "city",
        "country",
        "imageUrl"
      )
      .get();
    const locationsList = locationsSnapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() })
    );
    return locationsList;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

export async function getLocationById(id: string): Promise<Location | null> {
  try {
    const locationDocRef = adminDb.collection("locations").doc(id)
    const locationDoc = await locationDocRef.get()
    if (!locationDoc.exists) {
      return null
    }
    return { id: locationDoc.id, ...locationDoc.data() } as Location
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
    return { id: locationDoc.id, ...locationDoc.data() } as Location
  } catch (error) {
    console.error("Error in updateLocation:", error)
    return null
  }
}

export async function deleteLocation(id: string): Promise<boolean> {
  try {
    const locationDocRef = adminDb.collection("locations").doc(id)
    await locationDocRef.delete()
    return true
  } catch (error) {
    console.error("Error in deleteLocation:", error)
    return false
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
export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const locationsCol = adminDb.collection("locations")
    const locationsSnapshot = await locationsCol.where("slug", "==", slug).get()
    if (locationsSnapshot.empty) {
      return null
    }
    const locationDoc = locationsSnapshot.docs[0]
    return { id: locationDoc.id, ...locationDoc.data() } as Location
  } catch (error) {
    console.error("Error in getLocationBySlug:", error)
    return null
  }
}
// Add these optimized functions to your db.ts file

export async function getPublishedServicesLimited(limit: number = 6): Promise<Partial<Service>[]> {
  try {
    const servicesCol = adminDb.collection("services");
    const servicesSnapshot = await servicesCol
      .where("status", "==", "published")
<<<<<<< HEAD
      .orderBy("title", "asc") // Sort by title alphabetically
      .limit(limit)
      .select(
        "title",
        "slug",
        "description",
        "featured_image",
        "key_points"
      )
      .get();

=======
      .get() // Get all first, then sort and limit client-side
    
>>>>>>> 06d33224a108331a59457c0a49883e7e6a6ca867
    const servicesList = servicesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        featured_image: data.featured_image,
        key_points: data.key_points?.slice(0, 3) || [], // Limit key points
<<<<<<< HEAD
      };
    });

    return servicesList;
=======
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at
      } as Partial<Service>
    })
    
    // Sort alphabetically by title and limit to specified number
    return (servicesList as Service[])
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, limit)
      
>>>>>>> 06d33224a108331a59457c0a49883e7e6a6ca867
  } catch (error) {
    console.error("Error fetching limited published services:", error);
    // Note: If you get an error about needing an index, you must create it in the Firebase console.
    // The error message will provide a direct link to create the index.
    return [];
  }
}

export async function getLocationsLimited(limit: number = 4): Promise<Location[]> {
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
    return locationsList as Location[]
  } catch (error) {
    console.error("Error fetching limited locations:", error)
    return []
  }
}
