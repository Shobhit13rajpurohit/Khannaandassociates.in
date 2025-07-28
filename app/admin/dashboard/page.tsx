"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, MapPin, Edit3, ImageIcon, Globe } from "lucide-react"
import Link from "next/link"

interface Stats {
  pages: number
  services: number
  teamMembers: number
  locations: number
  blogPosts: number
  
}

interface Activity {
  action: string
  item: string
  time: string
  user: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pages: 0,
    services: 0,
    teamMembers: 0,
    locations: 0,
    blogPosts: 0,
    
  })

  const [recentActivity] = useState<Activity[]>([
    { action: "Updated", item: "Home Page", time: "2 hours ago", user: "Admin" },
    { action: "Added", item: "New Team Member", time: "Yesterday", user: "Admin" },
    { action: "Edited", item: "Services Page", time: "3 days ago", user: "Admin" },
    { action: "Published", item: "Blog Post", time: "1 week ago", user: "Admin" },
  ])

  useEffect(() => {
    // Simulate API call - replace with actual API call
    const fetchStats = async () => {
      try {
        // In a real application, you would fetch this data from your API
        setStats({
          pages: 12,
          services: 23,
          teamMembers: 8,
          locations: 8,
          blogPosts: 15,
          
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
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
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </Card>
    </Link>
  )

  const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => {
    const getBarColor = (percent: number) => {
      if (percent >= 90) return "bg-green-500"
      if (percent >= 75) return "bg-yellow-500"
      return "bg-red-500"
    }

    return (
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${getBarColor(percentage)} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a3c61]">Dashboard</h1>
        <p className="text-gray-600">Welcome to your website management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          href="/admin/pages"
          icon={FileText}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
          label="Pages"
          value={stats.pages}
        />

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
          <Link href="/admin/pages/edit?id=home">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Edit Home Page</Button>
          </Link>
          <Link href="/blog/admin/new">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Create Blog Post</Button>
          </Link>
          <Link href="/admin/services/new">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Add Service</Button>
          </Link>
          <Link href="/admin/team/new">
            <Button className="bg-[#1a3c61] hover:bg-[#132e4a]">Add Team Member</Button>
          </Link>
        
        </div>
      </div>

     
      {/* Site Health */}
      <div>
        <h2 className="text-xl font-semibold text-[#1a3c61] mb-4">Site Health</h2>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Overall Health</h3>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Good</span>
          </div>

          <div className="space-y-4">
            <ProgressBar label="SEO Score" percentage={85} />
            <ProgressBar label="Performance" percentage={92} />
            <ProgressBar label="Content Freshness" percentage={78} />
          </div>

          <div className="mt-6">
            <Link href="/admin/settings/site-health">
              <Button variant="outline">View Detailed Report</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}