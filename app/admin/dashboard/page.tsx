"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, MapPin, Edit3, ImageIcon, Globe } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    teamMembers: 0,
    locations: 0,
    blogPosts: 0,
    mediaItems: 0,
  })

  const [recentActivity, setRecentActivity] = useState([
    { action: "Updated", item: "Home Page", time: "2 hours ago", user: "Admin" },
    { action: "Added", item: "New Team Member", time: "Yesterday", user: "Admin" },
    { action: "Edited", item: "Services Page", time: "3 days ago", user: "Admin" },
    { action: "Published", item: "Blog Post", time: "1 week ago", user: "Admin" },
  ])

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setStats({
      pages: 12,
      services: 23,
      teamMembers: 8,
      locations: 8,
      blogPosts: 15,
      mediaItems: 42,
    })
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a3c61]">Dashboard</h1>
        <p className="text-gray-600">Welcome to your website management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/pages">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pages</p>
                <p className="text-2xl font-bold">{stats.pages}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/services">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Services</p>
                <p className="text-2xl font-bold">{stats.services}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/team">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Team Members</p>
                <p className="text-2xl font-bold">{stats.teamMembers}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/locations">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <MapPin className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Locations</p>
                <p className="text-2xl font-bold">{stats.locations}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/blog">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <Edit3 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Blog Posts</p>
                <p className="text-2xl font-bold">{stats.blogPosts}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/media">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 mr-4">
                <ImageIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Media Items</p>
                <p className="text-2xl font-bold">{stats.mediaItems}</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1a3c61] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/pages/edit?id=home">
            <Button className="bg-[#1a3c61]">Edit Home Page</Button>
          </Link>
          <Link href="/blog/admin">
            <Button className="bg-[#1a3c61]">Create Blog Post</Button>
          </Link>
          <Link href="/admin/services/new">
            <Button className="bg-[#1a3c61]">Add Service</Button>
          </Link>
          <Link href="/admin/team/new">
            <Button className="bg-[#1a3c61]">Add Team Member</Button>
          </Link>
          <Link href="/admin/media/upload">
            <Button className="bg-[#1a3c61]">Upload Media</Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1a3c61] mb-4">Recent Activity</h2>
        <Card>
          <div className="divide-y">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {activity.action} <span className="text-[#4BB4E6]">{activity.item}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.time} by {activity.user}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </Card>
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
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">SEO Score</span>
                <span className="text-sm text-gray-500">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Performance</span>
                <span className="text-sm text-gray-500">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Content Freshness</span>
                <span className="text-sm text-gray-500">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
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
