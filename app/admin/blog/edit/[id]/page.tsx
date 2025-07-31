"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ImageIcon,
  Tag,
  LinkIcon,
  Save,
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Search,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/ImageUpload";

interface SEOAnalysis {
  score: number;
  issues: string[];
  suggestions: string[];
}

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params?.id && params.id !== "new";
  const postId = isEditing ? (params.id as string) : null;
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Basic post data
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // SEO fields
  const [focusKeyword, setFocusKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [openGraphTitle, setOpenGraphTitle] = useState("");
  const [openGraphDescription, setOpenGraphDescription] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");

  // Content editor state
  const [selectedText, setSelectedText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  // SEO Analysis
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis>({
    score: 0,
    issues: [],
    suggestions: []
  });

  useEffect(() => {
    if (isEditing && postId) {
      fetchPost(postId);
    }
  }, [isEditing, postId]);

  useEffect(() => {
    analyzeSEO();
  }, [title, content, metaDescription, focusKeyword, tags]);

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
          setMetaTitle(post.meta_title || post.title);
          setFocusKeyword(post.focus_keyword || "");
          setCanonicalUrl(post.canonical_url || "");
          setOpenGraphTitle(post.og_title || post.title);
          setOpenGraphDescription(post.og_description || post.meta_description || "");
          setTwitterTitle(post.twitter_title || post.title);
          setTwitterDescription(post.twitter_description || post.meta_description || "");
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing) {
      setSlug(generateSlug(newTitle));
    }
    if (!metaTitle) {
      setMetaTitle(newTitle);
    }
    if (!openGraphTitle) {
      setOpenGraphTitle(newTitle);
    }
    if (!twitterTitle) {
      setTwitterTitle(newTitle);
    }
  };

  // Rich text editor functions
  const insertAtCursor = (textToInsert: string) => {
    if (contentRef.current) {
      const start = contentRef.current.selectionStart;
      const end = contentRef.current.selectionEnd;
      const newContent = content.substring(0, start) + textToInsert + content.substring(end);
      setContent(newContent);
      
      // Set cursor position after inserted text
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.focus();
          contentRef.current.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
        }
      }, 0);
    }
  };

  const wrapSelectedText = (prefix: string, suffix: string = "") => {
    if (contentRef.current) {
      const start = contentRef.current.selectionStart;
      const end = contentRef.current.selectionEnd;
      const selectedText = content.substring(start, end);
      
      if (selectedText) {
        const wrappedText = prefix + selectedText + (suffix || prefix);
        const newContent = content.substring(0, start) + wrappedText + content.substring(end);
        setContent(newContent);
        
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.focus();
            contentRef.current.setSelectionRange(start, start + wrappedText.length);
          }
        }, 0);
      } else {
        insertAtCursor(prefix + "text" + (suffix || prefix));
      }
    }
  };

  // Formatting functions
  const formatBold = () => wrapSelectedText("**");
  const formatItalic = () => wrapSelectedText("*");
  const formatUnderline = () => wrapSelectedText("<u>", "</u>");
  const formatHeading1 = () => insertAtCursor("\n# ");
  const formatHeading2 = () => insertAtCursor("\n## ");
  const formatHeading3 = () => insertAtCursor("\n### ");
  const formatUnorderedList = () => insertAtCursor("\n- ");
  const formatOrderedList = () => insertAtCursor("\n1. ");
  const formatQuote = () => insertAtCursor("\n> ");
  const formatCode = () => wrapSelectedText("`");
  const formatCodeBlock = () => insertAtCursor("\n```\ncode here\n```\n");

  const insertLink = () => {
    const linkText = prompt("Enter link text:");
    const linkUrl = prompt("Enter URL:");
    if (linkText && linkUrl) {
      insertAtCursor(`[${linkText}](${linkUrl})`);
    }
  };

  const insertImage = () => {
    const imageUrl = prompt("Enter image URL:");
    const altText = prompt("Enter alt text (important for SEO):");
    if (imageUrl && altText) {
      insertAtCursor(`\n![${altText}](${imageUrl})\n`);
    }
  };

  // SEO Analysis Function
  const analyzeSEO = () => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Title analysis
    if (!title) {
      issues.push("Missing title");
      score -= 20;
    } else {
      if (title.length < 30) {
        suggestions.push("Consider making your title longer (30-60 characters)");
        score -= 5;
      }
      if (title.length > 60) {
        issues.push("Title is too long (over 60 characters)");
        score -= 10;
      }
      if (focusKeyword && !title.toLowerCase().includes(focusKeyword.toLowerCase())) {
        suggestions.push("Include your focus keyword in the title");
        score -= 10;
      }
    }

    // Meta description analysis
    if (!metaDescription) {
      issues.push("Missing meta description");
      score -= 15;
    } else {
      if (metaDescription.length < 120) {
        suggestions.push("Meta description could be longer (120-160 characters)");
        score -= 5;
      }
      if (metaDescription.length > 160) {
        issues.push("Meta description is too long (over 160 characters)");
        score -= 10;
      }
      if (focusKeyword && !metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())) {
        suggestions.push("Include your focus keyword in the meta description");
        score -= 5;
      }
    }

    // Content analysis
    if (!content) {
      issues.push("Missing content");
      score -= 25;
    } else {
      const wordCount = content.split(/\s+/).length;
      if (wordCount < 300) {
        suggestions.push("Consider adding more content (aim for 300+ words)");
        score -= 10;
      }
      
      if (focusKeyword) {
        const keywordCount = (content.toLowerCase().match(new RegExp(focusKeyword.toLowerCase(), 'g')) || []).length;
        const keywordDensity = (keywordCount / wordCount) * 100;
        
        if (keywordCount === 0) {
          issues.push("Focus keyword not found in content");
          score -= 15;
        } else if (keywordDensity < 1) {
          suggestions.push("Consider using your focus keyword more often (1-3% density)");
          score -= 5;
        } else if (keywordDensity > 3) {
          issues.push("Focus keyword used too often (over 3% density)");
          score -= 10;
        }
      }

      // Check for headings
      if (!content.includes('#')) {
        suggestions.push("Add headings (H2, H3) to structure your content");
        score -= 5;
      }

      // Check for images
      if (!content.includes('![')) {
        suggestions.push("Add images to make your content more engaging");
        score -= 3;
      }
    }

    // Focus keyword analysis
    if (!focusKeyword) {
      suggestions.push("Set a focus keyword for better SEO optimization");
      score -= 5;
    }

    // Tags analysis
    if (!tags) {
      suggestions.push("Add relevant tags to improve discoverability");
      score -= 3;
    }

    // Featured image analysis
    if (!featuredImage) {
      suggestions.push("Add a featured image to improve social sharing");
      score -= 5;
    }

    setSeoAnalysis({
      score: Math.max(0, score),
      issues,
      suggestions
    });
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSEOScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
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
        excerpt: content.replace(/[#*`[\]()]/g, '').substring(0, 150),
        category,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        status,
        meta_title: metaTitle || title,
        meta_description: metaDescription,
        featured_image: featuredImage,
        featured_image_alt: featuredImageAlt,
        author_id: "admin",
        focus_keyword: focusKeyword,
        canonical_url: canonicalUrl,
        og_title: openGraphTitle,
        og_description: openGraphDescription,
        twitter_title: twitterTitle,
        twitter_description: twitterDescription,
        seo_score: seoAnalysis.score
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
        router.push("/admin/blog");
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
            <Link href="/admin/blog">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              <Tabs defaultValue="content">
                <TabsList className="mb-6">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
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
                        placeholder="Enter an engaging title"
                        className="mt-1"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {title.length} characters (Recommended: 30-60 characters)
                      </p>
                    </div>

                    {/* Slug */}
                    <div>
                      <Label htmlFor="slug" className="text-lg font-medium">
                        URL Slug *
                      </Label>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="post-url-slug"
                        className="mt-1"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Preview: /blog/{slug || "post-slug"}
                      </p>
                    </div>

                    {/* Featured Image */}
                    <div>
                      <Label htmlFor="featuredImage" className="text-lg font-medium">
                        Featured Image
                      </Label>
                      <ImageUpload
                        value={featuredImage}
                        onChange={setFeaturedImage}
                        className="mt-1"
                      />
                      <div className="mt-2">
                        <Label htmlFor="featuredImageAlt" className="text-sm font-medium">
                          Alt Text (SEO Important)
                        </Label>
                        <Input
                          id="featuredImageAlt"
                          value={featuredImageAlt}
                          onChange={(e) => setFeaturedImageAlt(e.target.value)}
                          placeholder="Describe the image for accessibility and SEO"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Category & Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <option value="intellectual-property">Intellectual Property</option>
                          <option value="family-law">Family Law</option>
                          <option value="labour-law">Labour Law</option>
                          <option value="cyber-law">Cyber Law</option>
                          <option value="criminal-law">Criminal Law</option>
                          <option value="tax-law">Tax Law</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="tags" className="text-lg font-medium">
                          Tags (comma-separated)
                        </Label>
                        <Input
                          id="tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="legal advice, corporate law, business"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                      <Label htmlFor="content" className="text-lg font-medium">
                        Content *
                      </Label>
                      <div className="mt-1 border border-gray-300 rounded-lg overflow-hidden">
                        {/* Toolbar */}
                        <div className="bg-gray-50 p-3 border-b border-gray-300">
                          <div className="flex flex-wrap gap-1">
                            <Button type="button" variant="outline" size="sm" onClick={formatBold}>
                              <Bold className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={formatItalic}>
                              <Italic className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={formatUnderline}>
                              <Underline className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="mx-1 h-6" />
                            <Button type="button" variant="outline" size="sm" onClick={formatHeading1}>
                              <Heading1 className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={formatHeading2}>
                              <Heading2 className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={formatHeading3}>
                              <Heading3 className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="mx-1 h-6" />
                            <Button type="button" variant="outline" size="sm" onClick={formatUnorderedList}>
                              <List className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={formatOrderedList}>
                              <ListOrdered className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={formatQuote}>
                              <Quote className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={formatCode}>
                              <Code className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="mx-1 h-6" />
                            <Button type="button" variant="outline" size="sm" onClick={insertLink}>
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={insertImage}>
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          ref={contentRef}
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Write your engaging blog post content here... Use the toolbar above to format text."
                          className="min-h-[500px] border-0 rounded-none focus-visible:ring-0 font-mono"
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {content.split(/\s+/).length} words | Supports Markdown formatting
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seo">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="focusKeyword" className="text-lg font-medium">
                        Focus Keyword
                      </Label>
                      <Input
                        id="focusKeyword"
                        value={focusKeyword}
                        onChange={(e) => setFocusKeyword(e.target.value)}
                        placeholder="e.g., corporate lawyer in Delhi"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        The main keyword you want to rank for
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="metaTitle" className="text-lg font-medium">
                        Meta Title
                      </Label>
                      <Input
                        id="metaTitle"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="SEO optimized title"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {metaTitle.length} characters (Recommended: 50-60 characters)
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
                        placeholder="Write a compelling description that includes your focus keyword"
                        className="mt-1"
                        rows={3}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {metaDescription.length} characters (Recommended: 120-160 characters)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="canonicalUrl" className="text-lg font-medium">
                        Canonical URL (Optional)
                      </Label>
                      <Input
                        id="canonicalUrl"
                        value={canonicalUrl}
                        onChange={(e) => setCanonicalUrl(e.target.value)}
                        placeholder="https://www.khannaandassociates.com/blog/post-slug"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Helps prevent duplicate content issues
                      </p>
                    </div>

                    {/* Google Search Preview */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-3 flex items-center">
                        <Search className="h-5 w-5 mr-2" />
                        Google Search Preview
                      </h3>
                      <div className="bg-white p-4 rounded border border-gray-300">
                        <p className="text-[#1a0dab] text-xl truncate hover:underline cursor-pointer">
                          {metaTitle || title || "Your Blog Post Title"}
                        </p>
                        <p className="text-green-700 text-sm">
                          https://www.khannaandassociates.com/blog/{slug || "post-slug"}
                        </p>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {metaDescription || "Your meta description will appear here. Make it compelling!"}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="social">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Open Graph (Facebook) */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Facebook / Open Graph</CardTitle>
                          <CardDescription>How your post appears when shared on Facebook</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="ogTitle">OG Title</Label>
                            <Input
                              id="ogTitle"
                              value={openGraphTitle}
                              onChange={(e) => setOpenGraphTitle(e.target.value)}
                              placeholder={title || "Post title"}
                            />
                          </div>
                          <div>
                            <Label htmlFor="ogDescription">OG Description</Label>
                            <Textarea
                              id="ogDescription"
                              value={openGraphDescription}
                              onChange={(e) => setOpenGraphDescription(e.target.value)}
                              placeholder={metaDescription || "Post description"}
                              rows={2}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Twitter */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Twitter</CardTitle>
                          <CardDescription>How your post appears when shared on Twitter</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="twitterTitle">Twitter Title</Label>
                            <Input
                              id="twitterTitle"
                              value={twitterTitle}
                              onChange={(e) => setTwitterTitle(e.target.value)}
                              placeholder={title || "Post title"}
                            />
                          </div>
                          <div>
                            <Label htmlFor="twitterDescription">Twitter Description</Label>
                            <Textarea
                              id="twitterDescription"
                              value={twitterDescription}
                              onChange={(e) => setTwitterDescription(e.target.value)}
                              placeholder={metaDescription || "Post description"}
                              rows={2}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Social Preview */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Social Media Previews</h3>
                      
                      {/* Facebook Preview */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Facebook Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                                                      <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                              {featuredImage && (
                                <img src={featuredImage} alt="Preview" className="w-full h-40 object-cover" />
                              )}
                              <div className="p-3">
                                <p className="font-medium text-sm text-gray-900 line-clamp-2">
                                  {openGraphTitle || title || "Your Blog Post Title"}
                                </p>
                                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                  {openGraphDescription || metaDescription || "Your description here"}
                                </p>
                                <p className="text-gray-400 text-xs mt-1 uppercase">
                                  khannaandassociates.com
                                </p>
                              </div>
                            </div>
                        </CardContent>
                      </Card>

                      {/* Twitter Preview */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Twitter Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                            {featuredImage && (
                              <img src={featuredImage} alt="Preview" className="w-full h-40 object-cover" />
                            )}
                            <div className="p-3">
                              <p className="font-medium text-sm text-gray-900 line-clamp-2">
                                {twitterTitle || title || "Your Blog Post Title"}
                              </p>
                              <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                {twitterDescription || metaDescription || "Your description here"}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                khannaandassociates.com
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="border border-gray-300 rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-[#1a3c61] mb-4">
                      {title || "Your Blog Post Title"}
                    </h1>

                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">
                        {new Date().toLocaleDateString()}
                      </span>
                      <Tag className="h-4 w-4 mr-1" />
                      <span>{category || "Category"}</span>
                    </div>

                    {featuredImage && (
                      <div className="mb-6">
                        <img
                          src={featuredImage}
                          alt={featuredImageAlt || "Featured image"}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )}

                    <div className="prose max-w-none">
                      {content ? (
                        <div dangerouslySetInnerHTML={{ 
                          __html: content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1</code>')
                            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
                            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
                            .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
                            .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
                            .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600">$1</blockquote>')
                            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full" />')
                            .replace(/\n/g, '<br>')
                        }} />
                      ) : (
                        <p className="text-gray-500">Your blog post content will appear here as you type...</p>
                      )}
                    </div>

                    {tags && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 text-[#4BB4E6] mr-2" />
                          <div className="flex flex-wrap gap-2">
                            {tags.split(",").map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag.trim()}
                              </Badge>
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

          {/* SEO Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  SEO Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* SEO Score */}
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getSEOScoreColor(seoAnalysis.score)}`}>
                    {seoAnalysis.score}/100
                  </div>
                  <Badge className={getSEOScoreBadgeColor(seoAnalysis.score)}>
                    {seoAnalysis.score >= 80 ? 'Excellent' : 
                     seoAnalysis.score >= 60 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>

                {/* Issues */}
                {seoAnalysis.issues.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-600 flex items-center mb-2">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Issues ({seoAnalysis.issues.length})
                    </h4>
                    <ul className="space-y-1">
                      {seoAnalysis.issues.map((issue, index) => (
                        <li key={index} className="text-sm text-red-600 flex items-start">
                          <span className="text-red-400 mr-1">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {seoAnalysis.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-yellow-600 flex items-center mb-2">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      Suggestions ({seoAnalysis.suggestions.length})
                    </h4>
                    <ul className="space-y-1">
                      {seoAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-yellow-600 flex items-start">
                          <span className="text-yellow-400 mr-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Word Count:</span>
                      <span className="font-medium">{content.split(/\s+/).filter(word => word.length > 0).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reading Time:</span>
                      <span className="font-medium">
                        {Math.ceil(content.split(/\s+/).filter(word => word.length > 0).length / 200)} min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Characters:</span>
                      <span className="font-medium">{content.length}</span>
                    </div>
                    {focusKeyword && (
                      <div className="flex justify-between">
                        <span>Keyword Density:</span>
                        <span className="font-medium">
                          {((content.toLowerCase().match(new RegExp(focusKeyword.toLowerCase(), 'g')) || []).length / 
                            content.split(/\s+/).filter(word => word.length > 0).length * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SEO Checklist */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">SEO Checklist</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      {title && title.length >= 30 && title.length <= 60 ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> :
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      }
                      <span>Optimized title length</span>
                    </div>
                    <div className="flex items-center">
                      {metaDescription && metaDescription.length >= 120 && metaDescription.length <= 160 ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> :
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      }
                      <span>Meta description length</span>
                    </div>
                    <div className="flex items-center">
                      {focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase()) ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> :
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      }
                      <span>Keyword in title</span>
                    </div>
                    <div className="flex items-center">
                      {content.includes('#') ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> :
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      }
                      <span>Uses headings</span>
                    </div>
                    <div className="flex items-center">
                      {content.includes('![') ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> :
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      }
                      <span>Contains images</span>
                    </div>
                    <div className="flex items-center">
                      {content.split(/\s+/).filter(word => word.length > 0).length >= 300 ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> :
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      }
                      <span>Adequate word count</span>
                    </div>
                    <div className="flex items-center">
                      {featuredImage ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> :
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      }
                      <span>Featured image set</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}