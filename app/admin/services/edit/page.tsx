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
  const [status, setStatus] = useState("Published")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Mock data for a service
  const serviceData = {
    id: 1,
    title: "Aviation & Defence",
    slug: "aviation-and-defence",
    description:
      "Expert legal counsel for aviation and defence sectors, handling regulatory compliance, contracts, and dispute resolution.",
    content: `Our Aviation & Defence practice provides comprehensive legal services to airlines, airports, aircraft manufacturers, and defence contractors.

We handle matters related to regulatory compliance, aircraft financing and leasing, aviation accidents and liability, airport development, and defence procurement.

Our team has extensive experience in navigating the complex regulatory frameworks governing the aviation and defence industries, both domestically and internationally.

We work closely with industry stakeholders to provide strategic advice on business operations, risk management, and dispute resolution.`,
    keyPoints: `Regulatory compliance and licensing
Aircraft financing and leasing
Aviation accidents and liability
Airport development and operations
Defence procurement and contracts
Dispute resolution and litigation`,
    featuredImage: "/placeholder.svg?height=800&width=1200&text=Aviation+and+Defence",
    relatedServices: "Corporate and Commercial, International Domain, Arbitration and Reconciliation",
    status: "Published",
  }

  useEffect(() => {
    // In a real application, you would fetch the service data based on the ID
    if (id) {
      // Simulate loading data
      setTitle(serviceData.title)
      setSlug(serviceData.slug)
      setDescription(serviceData.description)
      setContent(serviceData.content)
      setKeyPoints(serviceData.keyPoints)
      setFeaturedImage(serviceData.featuredImage)
      setRelatedServices(serviceData.relatedServices)
      setStatus(serviceData.status)
    }
  }, [id])

  const handleSave = () => {
    setIsLoading(true)

    // In a real application, you would send this data to your API
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)

      // Reset the saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1000)
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
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
          <Button className="bg-[#1a3c61]" onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {isSaved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Service saved successfully!
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
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" />
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
                      Featured Image
                    </Label>
                    <div className="mt-1 flex items-center">
                      <div className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden mr-4">
                        {featuredImage ? (
                          <img
                            src={featuredImage || "/placeholder.svg"}
                            alt="Featured image"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <Button type="button" className="bg-[#1a3c61] mb-2">
                          Select Image
                        </Button>
                        <p className="text-sm text-gray-500">Recommended size: 1200x800px</p>
                      </div>
                    </div>
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
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
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
                      keyPoints.split("\n").map((point, index) => <li key={index}>{point}</li>)
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
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <Label className="text-sm">Visibility</Label>
                <div className="mt-1 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="visibility-public"
                      name="visibility"
                      type="radio"
                      checked={true}
                      className="h-4 w-4 border-gray-300 text-[#4BB4E6] focus:ring-[#4BB4E6]"
                    />
                    <label htmlFor="visibility-public" className="ml-2 block text-sm text-gray-700">
                      Public
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="visibility-private"
                      name="visibility"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-[#4BB4E6] focus:ring-[#4BB4E6]"
                    />
                    <label htmlFor="visibility-private" className="ml-2 block text-sm text-gray-700">
                      Private
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-[#1a3c61] mb-2" onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save Service"}
                </Button>
                <Button variant="outline" className="w-full">
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

              <div>
                <Label htmlFor="meta-keywords" className="text-sm">
                  Meta Keywords
                </Label>
                <Input id="meta-keywords" placeholder="keyword1, keyword2, keyword3" className="mt-1" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
