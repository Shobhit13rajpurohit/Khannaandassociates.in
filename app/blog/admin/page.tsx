"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ImageIcon, Tag, LinkIcon, Save, Upload } from "lucide-react"

export default function BlogAdminPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [metaKeywords, setMetaKeywords] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState("")
  const [previewMode, setPreviewMode] = useState(false)

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFeaturedImage(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setFeaturedImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveDraft = () => {
    console.log("Saving draft...")
    // Implementation would save to database
  }

  const handlePublish = () => {
    console.log("Publishing post...")
    // Implementation would publish to database and make live
  }

  const insertLink = () => {
    const linkText = prompt("Enter link text:")
    const linkUrl = prompt("Enter URL:")

    if (linkText && linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
      setContent(content + linkHtml)
    }
  }

  const insertImage = () => {
    const imageUrl = prompt("Enter image URL:")
    const altText = prompt("Enter alt text:")

    if (imageUrl && altText) {
      const imageHtml = `<img src="${imageUrl}" alt="${altText}" class="rounded-lg my-4 max-w-full" />`
      setContent(content + imageHtml)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a3c61]">Blog Post Editor</h1>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" /> Save Draft
            </Button>
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1]" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs defaultValue="content">
            <TabsList className="mb-6">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-lg font-medium">
                    Post Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter post title"
                    className="mt-1"
                  />
                </div>

                {/* Slug */}
                <div>
                  <Label htmlFor="slug" className="text-lg font-medium">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                    className="mt-1"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <Label htmlFor="featuredImage" className="text-lg font-medium">
                    Featured Image
                  </Label>
                  <div className="mt-1 flex items-center">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                      </div>
                      <input
                        id="featuredImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>

                    {featuredImagePreview && (
                      <div className="ml-4 relative w-32 h-32">
                        <img
                          src={featuredImagePreview || "/placeholder.svg"}
                          alt="Featured image preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-lg font-medium">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  >
                    <option value="">Select a category</option>
                    <option value="corporate-law">Corporate Law</option>
                    <option value="real-estate-law">Real Estate Law</option>
                    <option value="intellectual-property">Intellectual Property</option>
                    <option value="family-law">Family Law</option>
                    <option value="labour-law">Labour Law</option>
                    <option value="cyber-law">Cyber Law</option>
                    <option value="criminal-law">Criminal Law</option>
                    <option value="tax-law">Tax Law</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <Label htmlFor="tags" className="text-lg font-medium">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="mt-1"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <Label htmlFor="content" className="text-lg font-medium">
                    Content
                  </Label>
                  <div className="mt-1 border border-gray-300 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-2 border-b border-gray-300 flex space-x-2">
                      <Button type="button" variant="outline" size="sm" onClick={insertLink}>
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={insertImage}>
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your blog post content here..."
                      className="min-h-[400px] border-0 rounded-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="metaTitle" className="text-lg font-medium">
                    Meta Title
                  </Label>
                  <Input
                    id="metaTitle"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter meta title"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {title.length} characters (Recommended: 50-60 characters)
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaDescription" className="text-lg font-medium">
                    Meta Description
                  </Label>
                  <Textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Enter meta description"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {metaDescription.length} characters (Recommended: 150-160 characters)
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaKeywords" className="text-lg font-medium">
                    Meta Keywords
                  </Label>
                  <Input
                    id="metaKeywords"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    placeholder="Enter meta keywords separated by commas"
                    className="mt-1"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Google Search Preview</h3>
                  <div className="bg-white p-4 rounded border border-gray-300">
                    <p className="text-[#1a0dab] text-xl truncate">{title || "Post Title"}</p>
                    <p className="text-green-700 text-sm">
                      https://www.khannaandassociates.com/blog/{slug || "post-slug"}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {metaDescription ||
                        "Meta description will appear here. Make sure to write a compelling description that summarizes your content and includes relevant keywords."}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview">
              <div className="border border-gray-300 rounded-lg p-6">
                <h1 className="text-3xl font-bold text-[#1a3c61] mb-4">{title || "Post Title"}</h1>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{new Date().toLocaleDateString()}</span>
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{category || "Category"}</span>
                </div>

                {featuredImagePreview && (
                  <div className="mb-6">
                    <img
                      src={featuredImagePreview || "/placeholder.svg"}
                      alt="Featured image"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: content || "<p>Your blog post content will appear here.</p>" }}
                ></div>

                {tags && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-[#4BB4E6] mr-2" />
                      <div className="flex flex-wrap gap-2">
                        {tags.split(",").map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
