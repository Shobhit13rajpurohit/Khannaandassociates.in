"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { ImageUpload } from '@/components/ImageUpload';

export default function EditServicePage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    key_points: [] as string[],
    featured_image: '',
    related_services: [] as string[],
    status: 'draft' as 'draft' | 'published',
    meta_title: '',
    meta_description: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [newKeyPoint, setNewKeyPoint] = useState("");
  const [newRelatedService, setNewRelatedService] = useState("");
  
  const router = useRouter();

  // Fetch service data on component mount
  useEffect(() => {
    const fetchService = async () => {
      try {
        setFetchLoading(true);
        const token = localStorage.getItem("admin_token");
        const response = await fetch(`/api/admin/services/${params.id}`, {
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            description: data.description || '',
            content: data.content || '',
            key_points: data.key_points || [],
            featured_image: data.featured_image || '',
            related_services: data.related_services || [],
            status: data.status || 'draft',
            meta_title: data.meta_title || '',
            meta_description: data.meta_description || '',
          });
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch service data.');
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('An unexpected error occurred while fetching service data.');
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchService();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/services/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/services');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update service.');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: generateSlug(value),
    })
  }

  const addKeyPoint = () => {
    if (newKeyPoint.trim()) {
      setFormData({
        ...formData,
        key_points: [...formData.key_points, newKeyPoint.trim()],
      })
      setNewKeyPoint("")
    }
  }

  const removeKeyPoint = (index: number) => {
    setFormData({
      ...formData,
      key_points: formData.key_points.filter((_, i) => i !== index),
    })
  }

  const addRelatedService = () => {
    if (newRelatedService.trim()) {
      setFormData({
        ...formData,
        related_services: [...formData.related_services, newRelatedService.trim()],
      })
      setNewRelatedService("")
    }
  }

  const removeRelatedService = (index: number) => {
    setFormData({
      ...formData,
      related_services: formData.related_services.filter((_, i) => i !== index),
    })
  }

  if (fetchLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Edit Service</h1>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Service</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      {error && (
        <Card>
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Service title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="service-slug"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the service"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Detailed service content (HTML supported)"
                    rows={10}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newKeyPoint}
                    onChange={(e) => setNewKeyPoint(e.target.value)}
                    placeholder="Add a key point"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyPoint())}
                  />
                  <Button type="button" onClick={addKeyPoint}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.key_points.map((point, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {point}
                      <button type="button" onClick={() => removeKeyPoint(index)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newRelatedService}
                    onChange={(e) => setNewRelatedService(e.target.value)}
                    placeholder="Add a related service"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRelatedService())}
                  />
                  <Button type="button" onClick={addRelatedService}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.related_services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {service}
                      <button
                        type="button"
                        onClick={() => removeRelatedService(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Updating..." : "Update Service"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
  value={formData.featured_image}
  onChange={(url) => setFormData({ ...formData, featured_image: url })}
/>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder="SEO title"
                  />
                </div>

                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder="SEO description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}