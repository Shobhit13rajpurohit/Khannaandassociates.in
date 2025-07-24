"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TeamMember } from "../../../../../lib/db"
import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select"
import { Textarea } from "../../../../../components/ui/textarea"

async function getTeamMember(id: string): Promise<TeamMember | null> {
  const res = await fetch(`/api/admin/team/${id}`)
  if (!res.ok) {
    return null
  }
  return res.json()
}

export default function EditTeamMemberPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [member, setMember] = useState<TeamMember | null>(null)
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

  useEffect(() => {
    getTeamMember(params.id).then(data => {
      if (data) {
        setMember(data)
        setName(data.name)
        setPosition(data.position)
        setImage(data.image)
        setExpertise(data.expertise)
        setSlug(data.slug)
        setBio(data.bio)
        setEducation(data.education.join(", "))
        setEmail(data.contact.email)
        setPhone(data.contact.phone)
        setOffice(data.office || "")
        setStatus(data.status)
      }
    })
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedMember: Partial<TeamMember> = {
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

    const res = await fetch(`/api/admin/team/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMember),
    })

    if (res.ok) {
      router.push("/admin/team")
    } else {
      alert("Failed to update team member")
    }
  }

  if (!member) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Team Member</h1>
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
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" value={image} onChange={e => setImage(e.target.value)} />
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
          <Select onValueChange={(value: "active" | "inactive") => setStatus(value)} value={status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Update Member</Button>
      </form>
    </div>
  )
}

