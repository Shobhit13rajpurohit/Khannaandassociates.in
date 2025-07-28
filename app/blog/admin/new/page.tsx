"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  ImageIcon,
  Tag,
  LinkIcon,
  Save,
  Upload,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/ImageUpload";

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params?.id && params.id !== "new";
  const postId = isEditing ? (params.id as string) : null;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImagePreview, setFeaturedImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing && postId) {
      fetchPost(postId);
    }
  }, [isEditing, postId]);

  const fetchPost = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blog`);
      if (response.ok) {
        const posts = await response.json();
        const post = posts.find((p: any) => p.id === id);
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setContent(post.content);
          setCategory(post.category);
          setTags(post.tags.join(", "));
          setMetaDescription(post.meta_description || "");
          setFeaturedImage(post.featured_image || "");
          setFeaturedImagePreview(post.featured_image || "");
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };
  const insertImage = () => {
    // Create a temporary ImageUpload for content images
    const imageUrl = prompt("Enter image URL or drag and drop an image:");
    const altText = prompt("Enter alt text:");

    if (imageUrl && altText) {
      const imageHtml = `<img src="${imageUrl}" alt="${altText}" class="rounded-lg my-4 max-w-full" />`;
      setContent(content + imageHtml);
    }
  };
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFeaturedImage(url);
    setFeaturedImagePreview(url);
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!title || !content) {
      alert("Please fill in title and content");
      return;
    }

    setSaving(true);
    try {
      const postData = {
        title,
        slug,
        content,
        excerpt: content.replace(/<[^>]*>/g, "").substring(0, 150),
        category,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        status,
        meta_title: title,
        meta_description: metaDescription,
        featured_image: featuredImage,
        author_id: "admin",
      };

      const url = isEditing ? `/api/admin/blog/${postId}` : "/api/admin/blog";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert(`Blog post ${isEditing ? "updated" : "created"} successfully!`);
        router.push("/blog/admin");
      } else {
        const error = await response.json();
        alert(
          `Failed to ${isEditing ? "update" : "create"} blog post: ${
            error.message
          }`
        );
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert(`Failed to ${isEditing ? "update" : "create"} blog post`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = () => handleSave("draft");
  const handlePublish = () => handleSave("published");

  const insertLink = () => {
    const linkText = prompt("Enter link text:");
    const linkUrl = prompt("Enter URL:");

    if (linkText && linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      setContent(content + linkHtml);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a3c61]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/blog/admin">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-[#1a3c61]">
              {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={saving}
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              className="bg-[#4BB4E6] hover:bg-[#3a9fd1]"
              onClick={handlePublish}
              disabled={saving}
            >
              {saving ? "Publishing..." : "Publish"}
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
                    Post Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter post title"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <Label htmlFor="slug" className="text-lg font-medium">
                    Slug *
                  </Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Featured Image URL */}
                <div>
                  <Label
                    htmlFor="featuredImage"
                    className="text-lg font-medium"
                  >
                    Featured Image
                  </Label>
                  <ImageUpload
                    value={featuredImage}
                    onChange={setFeaturedImage}
                    className="mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-lg font-medium">
                    Category *
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="corporate-law">Corporate Law</option>
                    <option value="real-estate-law">Real Estate Law</option>
                    <option value="intellectual-property">
                      Intellectual Property
                    </option>
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
                    Content *
                  </Label>
                  <div className="mt-1 border border-gray-300 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-2 border-b border-gray-300 flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={insertLink}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={insertImage}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your blog post content here..."
                      className="min-h-[400px] border-0 rounded-none focus-visible:ring-0"
                      required
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
                  <Label
                    htmlFor="metaDescription"
                    className="text-lg font-medium"
                  >
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
                    {metaDescription.length} characters (Recommended: 150-160
                    characters)
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-lg mb-2">
                    Google Search Preview
                  </h3>
                  <div className="bg-white p-4 rounded border border-gray-300">
                    <p className="text-[#1a0dab] text-xl truncate">
                      {title || "Post Title"}
                    </p>
                    <p className="text-green-700 text-sm">
                      https://www.khannaandassociates.com/blog/
                      {slug || "post-slug"}
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
                <h1 className="text-3xl font-bold text-[#1a3c61] mb-4">
                  {title || "Post Title"}
                </h1>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">
                    {new Date().toLocaleDateString()}
                  </span>
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{category || "Category"}</span>
                </div>

                {featuredImagePreview && (
                  <div className="mb-6">
                    <img
                      src={featuredImagePreview}
                      alt="Featured image"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html:
                      content ||
                      "<p>Your blog post content will appear here.</p>",
                  }}
                ></div>

                {tags && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-[#4BB4E6] mr-2" />
                      <div className="flex flex-wrap gap-2">
                        {tags.split(",").map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
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
  );
}
``;
