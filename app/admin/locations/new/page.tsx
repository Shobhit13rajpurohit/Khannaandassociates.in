"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ImageUpload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Location {
  id: string
  name: string
}

export default function NewLocationPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [mapLink, setMapLink] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [aboutOffice, setAboutOffice] = useState("")
  const [established, setEstablished] = useState("")
  const [practiceAreas, setPracticeAreas] = useState("")
  const [weekdayHours, setWeekdayHours] = useState("")
  const [parentId, setParentId] = useState<string | undefined>(undefined)
  const [locations, setLocations] = useState<Location[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("/api/admin/locations", { cache: 'no-store' })
        if (!response.ok) {
          throw new Error("Failed to fetch locations")
        }
        const data = await response.json()
        setLocations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      }
    }
    fetchLocations()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const practiceAreasArray = practiceAreas.split(',').map(area => area.trim()).filter(area => area)
      
      const response = await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          city,
          country,
          contact_info: {
            phone,
            email
          },
          map_link: mapLink,
          imageUrl,
          about_office: aboutOffice,
          established,
          practice_areas: practiceAreasArray,
          office_hours: {
            weekdays: weekdayHours
          },
          parent_id: parentId === "none" ? undefined : parentId
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
          <div className="grid gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Office Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g., Mumbai Office"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="established">Established</Label>
                  <Input
                    id="established"
                    value={established}
                    onChange={e => setEstablished(e.target.value)}
                    placeholder="e.g., 2010"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent-office">Parent Office</Label>
                <Select onValueChange={setParentId} value={parentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent office (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Main Office)</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Street address"
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
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
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="office@example.com"
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
                    value={aboutOffice}
                    onChange={e => setAboutOffice(e.target.value)}
                    placeholder="Describe the office, its specialties, and what makes it unique..."
                    rows={4}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="practiceAreas">Practice Areas</Label>
                  <Textarea
                    id="practiceAreas"
                    value={practiceAreas}
                    onChange={e => setPracticeAreas(e.target.value)}
                    placeholder="Enter practice areas separated by commas (e.g., Corporate Law, Litigation, IP Law)"
                    rows={3}
                    required
                  />
                  <p className="text-sm text-gray-500">Separate multiple areas with commas</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weekdayHours">Office Hours (Weekdays)</Label>
                  <Input
                    id="weekdayHours"
                    value={weekdayHours}
                    onChange={e => setWeekdayHours(e.target.value)}
                    placeholder="e.g., 9:00 AM - 6:00 PM"
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
                    value={mapLink}
                    onChange={e => setMapLink(e.target.value)}
                    placeholder="Google Maps URL"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Office Image</Label>
                  <ImageUpload
                    value={imageUrl}
                    onChange={setImageUrl}
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding..." : "Add Location"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
