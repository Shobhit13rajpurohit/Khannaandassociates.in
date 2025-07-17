"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", formData)
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" type="text" value={formData.subject} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" value={formData.message} onChange={handleChange} required rows={5} />
      </div>
      <Button type="submit" className="w-full bg-[#1a3c61] hover:bg-[#132e4a]" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
      {status === "success" && <p className="text-green-600 text-center mt-2">Message sent successfully!</p>}
      {status === "error" && <p className="text-red-600 text-center mt-2">Failed to send message. Please try again.</p>}
    </form>
  )
}
