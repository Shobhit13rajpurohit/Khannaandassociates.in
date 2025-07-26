"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ImageUpload"

export default function NewLocationPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [mapLink, setMapLink] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          city,
          country,
          contact_info: contactInfo,
          map_link: mapLink,
          imageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create location")
      }

      router.push("/admin/locations")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Location</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactInfo">Contact Info</Label>
              <Input
                id="contactInfo"
                value={contactInfo}
                onChange={e => setContactInfo(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mapLink">Map Link</Label>
              <Input
                id="mapLink"
                value={mapLink}
                onChange={e => setMapLink(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Location"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}