"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Eye, Trash2, ImageIcon, List, FileText, LinkIcon } from "lucide-react"

export default function EditServicePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [relatedServices, setRelatedServices] = useState("")
  const [status, setStatus] = useState("published")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (id) {
      fetchService()
    }
  }, [id])

  const fetchService = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken")
      const response = await fetch(`/api/admin/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const { service } = await response.json()
        setTitle(service.title)
        setSlug(service.slug)
        setDescription(service.description)
        setContent(service.content)
        setKeyPoints(service.key_points?.join("\n") || "")
        setFeaturedImage(service.featured_image || "")
        setRelatedServices(service.related_services?.join(", ") || "")
        setStatus(service.status)
      } else {
        setError("Failed to load service")
      }
    } catch (err) {
      setError("Error loading service")
      console.error(err)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("adminAuthToken")
      const serviceData = {
        title,
        slug,
        description,
        content,
        keyPoints,
        featuredImage,
        relatedServices,
        status,
      }

      const url = id ? `/api/admin/services/${id}` : "/api/admin/services"
      const method = id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      })

      if (response.ok) {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 3000)

        // If creating new service, redirect to edit page
        if (!id) {
          const { service } = await response.json()
          router.push(`/admin/services/edit?id=${service.id}`)
        }
      } else {
        const { error } = await response.json()
        setError(error || "Failed to save service")
      }
    } catch (err) {
      setError("Error saving service")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !confirm("Are you sure you want to delete this service?")) {
      return
    }

    try {
      const token = localStorage.getItem("adminAuthToken")
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        router.push("/admin/services")
      } else {
        setError("Failed to delete service")
      }
    } catch (err) {
      setError("Error deleting service")
      console.error(err)
    }
  }

  const handleGenerateSlug = () => {
    const newSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    setSlug(newSlug)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c61]">{id ? `Edit Service: ${title}` : "Add New Service"}</h1>
          <p className="text-gray-600">{id ? "Update service details and content" : "Create a new service page"}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {id && (
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          )}
          <Button className="bg-[#1a3c61]" onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      {isSaved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Service saved successfully! The changes are now live on your website.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="content">
            <TabsList className="mb-6">
              <TabsTrigger value="content">
                <FileText className="h-4 w-4 mr-2" /> Content
              </TabsTrigger>
              <TabsTrigger value="details">
                <List className="h-4 w-4 mr-2" /> Details
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" /> Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-base">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                      placeholder="Enter service title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug" className="text-base">
                      Slug
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="rounded-r-none"
                        placeholder="service-url-slug"
                      />
                      <Button type="button" onClick={handleGenerateSlug} className="rounded-l-none bg-[#1a3c61]">
                        Generate
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">URL: /services/{slug}</p>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base">
                      Short Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 h-20"
                      placeholder="Brief description of the service"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-base">
                      Main Content
                    </Label>
                    <div className="mt-1 border border-gray-300 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-2 border-b border-gray-300 flex space-x-2">
                        <Button type="button" variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="outline" size="sm">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[300px] border-0 rounded-none focus-visible:ring-0"
                        placeholder="Detailed service content..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="keyPoints" className="text-base">
                      Key Points
                    </Label>
                    <p className="text-sm text-gray-500 mb-1">Enter each point on a new line</p>
                    <Textarea
                      id="keyPoints"
                      value={keyPoints}
                      onChange={(e) => setKeyPoints(e.target.value)}
                      className="mt-1 h-32"
                      placeholder="Key service points (one per line)"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="featuredImage" className="text-base">
                      Featured Image URL
                    </Label>
                    <Input
                      id="featuredImage"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      className="mt-1"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="relatedServices" className="text-base">
                      Related Services
                    </Label>
                    <p className="text-sm text-gray-500 mb-1">Enter service names separated by commas</p>
                    <Textarea
                      id="relatedServices"
                      value={relatedServices}
                      onChange={(e) => setRelatedServices(e.target.value)}
                      className="mt-1 h-20"
                      placeholder="Corporate Law, Real Estate, Intellectual Property"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-base">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card className="p-6">
                <div className="prose max-w-none">
                  <h1>{title || "Service Title"}</h1>
                  <p className="lead">{description || "Service description will appear here."}</p>

                  {content ? (
                    content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
                  ) : (
                    <p>Service content will appear here.</p>
                  )}

                  <h2>How We Can Help</h2>
                  <ul>
                    {keyPoints ? (
                      keyPoints
                        .split("\n")
                        .filter((point) => point.trim())
                        .map((point, index) => <li key={index}>{point}</li>)
                    ) : (
                      <li>Key points will appear here.</li>
                    )}
                  </ul>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Publishing Options</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="status-sidebar" className="text-sm">
                  Status
                </Label>
                <select
                  id="status-sidebar"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-[#1a3c61] mb-2" onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save Service"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Eye className="h-4 w-4 mr-2" /> Preview
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-medium mb-4">SEO Settings</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="meta-title" className="text-sm">
                  Meta Title
                </Label>
                <Input id="meta-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">{title.length} characters (Recommended: 50-60)</p>
              </div>

              <div>
                <Label htmlFor="meta-description" className="text-sm">
                  Meta Description
                </Label>
                <Textarea
                  id="meta-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 h-20"
                />
                <p className="text-xs text-gray-500 mt-1">{description.length} characters (Recommended: 150-160)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
