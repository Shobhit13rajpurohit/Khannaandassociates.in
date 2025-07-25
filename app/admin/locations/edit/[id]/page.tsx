"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ImageUpload"

interface Location {
  name: string
  address: string
  city: string
  country: string
  contact_info: string
  map_link: string
  imageUrl: string
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
          const response = await fetch(`/api/admin/locations/${id}`)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (location) {
      setLocation({ ...location, [id]: value })
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={location.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={location.address} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={location.city} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={location.country} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_info">Contact Info</Label>
              <Input
                id="contact_info"
                value={location.contact_info}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="map_link">Map Link</Label>
              <Input id="map_link" value={location.map_link} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <ImageUpload
                value={location.imageUrl}
                onChange={handleImageChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Location"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
