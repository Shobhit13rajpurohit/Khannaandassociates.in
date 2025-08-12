"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ImageUpload"

interface Location {
  name: string
  address: string
  city: string
  country: string
  contact_info?: {
    phone: string
    email: string
  }
  map_link: string
  imageUrl: string
  about_office?: string
  established?: string
  practice_areas?: string[]
  office_hours?: {
    weekdays: string
  }
}

export default function EditLocationPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      async function fetchLocation() {
        setLoading(true)
        try {
          const response = await fetch(`/api/admin/locations/${id}`, { cache: 'no-store' })
          if (!response.ok) {
            throw new Error("Failed to fetch location")
          }
          const data = await response.json()
          setLocation(data)
        } catch (err) {
          setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
          setLoading(false)
        }
      }
      fetchLocation()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!location) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/locations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      })

      if (!response.ok) {
        throw new Error("Failed to update location")
      }

      router.push("/admin/locations")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleBasicChange = (field: string, value: string) => {
    if (location) {
      setLocation({ ...location, [field]: value })
    }
  }

  const handleContactChange = (field: 'phone' | 'email', value: string) => {
    if (location) {
      setLocation({
        ...location,
        contact_info: { 
          ...location.contact_info, 
          [field]: value 
        }
      })
    }
  }

  const handleOfficeHoursChange = (value: string) => {
    if (location) {
      setLocation({
        ...location,
        office_hours: { weekdays: value }
      })
    }
  }

  const handlePracticeAreasChange = (value: string) => {
    if (location) {
      const practiceAreasArray = value.split(',').map(area => area.trim()).filter(area => area)
      setLocation({ ...location, practice_areas: practiceAreasArray })
    }
  }

  const handleImageChange = (url: string) => {
    if (location) {
      setLocation({ ...location, imageUrl: url })
    }
  }

  if (loading && !location) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  
  if (!location) {
    return <div>Location not found.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Location</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Office Name</Label>
                  <Input
                    id="name"
                    value={location.name}
                    onChange={e => handleBasicChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="established">Established</Label>
                  <Input
                    id="established"
                    value={location.established || ''}
                    onChange={e => handleBasicChange('established', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={location.address}
                    onChange={e => handleBasicChange('address', e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={location.city}
                      onChange={e => handleBasicChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={location.country}
                      onChange={e => handleBasicChange('country', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={location.contact_info?.phone || ''}
                    onChange={e => handleContactChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={location.contact_info?.email || ''}
                    onChange={e => handleContactChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Office Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Office Details</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="aboutOffice">About Our Office</Label>
                  <Textarea
                    id="aboutOffice"
                    value={location.about_office || ''}
                    onChange={e => handleBasicChange('about_office', e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="practiceAreas">Practice Areas</Label>
                  <Textarea
                    id="practiceAreas"
                    value={location.practice_areas?.join(', ') || ''}
                    onChange={e => handlePracticeAreasChange(e.target.value)}
                    rows={3}
                    required
                  />
                  <p className="text-sm text-gray-500">Separate multiple areas with commas</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weekdayHours">Office Hours (Weekdays)</Label>
                  <Input
                    id="weekdayHours"
                    value={location.office_hours?.weekdays || ''}
                    onChange={e => handleOfficeHoursChange(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Media & Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Media & Links</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="mapLink">Map Link</Label>
                  <Input
                    id="mapLink"
                    value={location.map_link}
                    onChange={e => handleBasicChange('map_link', e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Office Image</Label>
                  <ImageUpload
                    value={location.imageUrl}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Location"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}