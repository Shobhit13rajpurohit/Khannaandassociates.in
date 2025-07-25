"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TeamMember } from "../../../../lib/db"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Textarea } from "../../../../components/ui/textarea"
import { ImageUpload } from '@/components/ui/image-upload';

export default function NewTeamMemberPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [image, setImage] = useState("")
  const [expertise, setExpertise] = useState("")
  const [slug, setSlug] = useState("")
  const [bio, setBio] = useState("")
  const [education, setEducation] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [office, setOffice] = useState("")
  const [status, setStatus] = useState<"active" | "inactive">("active")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newMember: Omit<TeamMember, "id" | "created_at" | "updated_at"> = {
      name,
      position,
      image,
      expertise,
      slug,
      bio,
      education: education.split(",").map(item => item.trim()),
      contact: {
        email,
        phone,
      },
      office,
      status,
    }

    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    })

    if (res.ok) {
      router.push("/admin/team")
    } else {
      alert("Failed to create team member")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Team Member</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input id="position" value={position} onChange={e => setPosition(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <ImageUpload value={image} onChange={url => setImage(url)} />
        </div>
        <div>
          <Label htmlFor="expertise">Expertise</Label>
          <Input id="expertise" value={expertise} onChange={e => setExpertise(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="education">Education (comma-separated)</Label>
          <Input id="education" value={education} onChange={e => setEducation(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="office">Office</Label>
          <Input id="office" value={office} onChange={e => setOffice(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value: "active" | "inactive") => setStatus(value)} defaultValue={status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Create Member</Button>
      </form>
    </div>
  )
}
