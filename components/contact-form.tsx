"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User, Mail, MessageSquare, Send, CheckCircle2, XCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  // Read the Access Key from the environment variable
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!accessKey) {
      setStatus("error");
      setError("Configuration error: Access Key is missing.");
      return;
    }

    setStatus("sending")
    setError("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "Your Website Name",
          subject: "New Contact Form Submission",
          ...formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" }) // Reset form
      } else {
        setStatus("error")
        setError(result.message || "An error occurred.")
      }
    } catch (err) {
      setStatus("error")
      setError("An error occurred while submitting the form.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name Input */}
        <div className="relative">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
          <User className="absolute left-3 top-[2.4rem] h-5 w-5 text-gray-400" />
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="pl-10"
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
          <Mail className="absolute left-3 top-[2.4rem] h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="pl-10"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="relative">
        <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
        <MessageSquare className="absolute left-3 top-[2.4rem] h-5 w-5 text-gray-400" />
        <Textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          required
          rows={5}
          className="pl-10"
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-[#1a3c61] hover:bg-[#132e4a] flex items-center gap-2" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <span className="animate-spin h-5 w-5 border-t-2 border-r-2 border-white rounded-full"></span>
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </Button>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 rounded-md bg-green-100 p-3 text-center text-green-700">
          <CheckCircle2 className="h-5 w-5" />
          <p>Message sent successfully! We'll get back to you soon.</p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-md bg-red-100 p-3 text-center text-red-700">
          <XCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}
    </form>
  )
}