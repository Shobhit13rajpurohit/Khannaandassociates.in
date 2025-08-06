"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, MapPin, Edit3, ImageIcon, Globe, Server, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Stats {
  services: number
  teamMembers: number
  locations: number
  blogPosts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    teamMembers: 0,
    locations: 0,
    blogPosts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const [servicesRes, teamRes, locationsRes, blogRes] = await Promise.all([
          fetch("/api/admin/services", { cache: 'no-store' }),
          fetch("/api/admin/team", { cache: 'no-store' }),
          fetch("/api/admin/locations", { cache: 'no-store' }),
          fetch("/api/admin/blog", { cache: 'no-store' }),
        ])

        const services = await servicesRes.json()
        const team = await teamRes.json()
        const locations = await locationsRes.json()
        const blog = await blogRes.json()

        setStats({
          services: services.length,
          teamMembers: team.length,
          locations: locations.length,
          blogPosts: blog.length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({ 
    href, 
    icon: Icon, 
    bgColor, 
    iconColor, 
    label, 
    value 
  }: {
    href: string
    icon: React.ComponentType<{ className?: string }>
    bgColor: string
    iconColor: string
    label: string
    value: number
  }) => (
    <Link href={href}>
      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${bgColor} mr-4`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold">{loading ? "..." : value}</p>
          </div>
        </div>
      </Card>
    </Link>
  )

  const SiteHealthCard = ({ title, status, lastChecked }: { title: string, status: "Active" | "Inactive", lastChecked: string }) => (
    <Card className="p-4 flex items-center justify-between">
      <div className="flex items-center">
        {status === "Active" ? <CheckCircle className="text-green-500 mr-3" /> : <AlertCircle className="text-red-500 mr-3" />}
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">Last checked: {lastChecked}</p>
        </div>
      </div>
      <span className={`px-2 py-1 text-xs rounded ${status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {status}
      </span>
    </Card>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a3c61]">Dashboard</h1>
        <p className="text-gray-600">Welcome to your website management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          href="/admin/services"
          icon={Globe}
          bgColor="bg-green-100"
          iconColor="text-green-600"
          label="Services"
          value={stats.services}
        />
        <StatCard
          href="/admin/team"
          icon={Users}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
          label="Team Members"
          value={stats.teamMembers}
        />
        <StatCard
          href="/admin/locations"
          icon={MapPin}
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          label="Locations"
          value={stats.locations}
        />
        <StatCard
          href="/admin/blog"
          icon={Edit3}
          bgColor="bg-red-100"
          iconColor="text-red-600"
          label="Blog Posts"
          value={stats.blogPosts}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1a3c61] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/services/new">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Add Service</Button>
          </Link>
          <Link href="/admin/team/new">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Add Team Member</Button>
          </Link>
          <Link href="/admin/locations/new">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Add Location</Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Create Blog Post</Button>
          </Link>
        </div>
      </div>

      {/* Site Health */}
      <div>
        <h2 className="text-xl font-semibold text-[#1a3c61] mb-4">Site Health</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SiteHealthCard title="Services Status" status="Active" lastChecked="Just now" />
            <SiteHealthCard title="Locations" status="Active" lastChecked="Just now" />
            <SiteHealthCard title="Team Members" status="Active" lastChecked="2 minutes ago" />
           
          </div>
        </Card>
      </div>
    </div>
  )
}