"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Plus, Search, Eye, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminPages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")

  // Mock data for pages
  const pages = [
    { id: 1, title: "Home", slug: "/", lastUpdated: "2023-03-15", status: "Published" },
    { id: 2, title: "About Us", slug: "/about", lastUpdated: "2023-02-28", status: "Published" },
    { id: 3, title: "Services", slug: "/services", lastUpdated: "2023-03-10", status: "Published" },
    { id: 4, title: "Team", slug: "/team", lastUpdated: "2023-03-05", status: "Published" },
    { id: 5, title: "Locations", slug: "/locations", lastUpdated: "2023-03-12", status: "Published" },
    { id: 6, title: "Contact", slug: "/contact", lastUpdated: "2023-03-01", status: "Published" },
    { id: 7, title: "Privacy Policy", slug: "/privacy-policy", lastUpdated: "2023-01-15", status: "Published" },
    { id: 8, title: "Terms of Service", slug: "/terms-of-service", lastUpdated: "2023-01-15", status: "Published" },
    { id: 9, title: "Careers", slug: "/careers", lastUpdated: "2023-02-10", status: "Draft" },
    { id: 10, title: "FAQ", slug: "/faq", lastUpdated: "2023-02-20", status: "Draft" },
  ]

  // Filter pages based on search term
  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort pages
  const sortedPages = [...filteredPages].sort((a, b) => {
    if (sortBy === "title") {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortBy === "lastUpdated") {
      return sortOrder === "asc"
        ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }
    return 0
  })

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c61]">Pages</h1>
          <p className="text-gray-600">Manage your website pages</p>
        </div>
        <Link href="/admin/pages/new">
          <Button className="bg-[#1a3c61]">
            <Plus className="h-4 w-4 mr-2" /> Add New Page
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={sortBy === "title" ? "border-[#4BB4E6] text-[#4BB4E6]" : ""}
              onClick={() => toggleSort("title")}
            >
              Title{" "}
              {sortBy === "title" &&
                (sortOrder === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />)}
            </Button>
            <Button
              variant="outline"
              className={sortBy === "lastUpdated" ? "border-[#4BB4E6] text-[#4BB4E6]" : ""}
              onClick={() => toggleSort("lastUpdated")}
            >
              Last Updated{" "}
              {sortBy === "lastUpdated" &&
                (sortOrder === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />)}
            </Button>
          </div>
        </div>
      </Card>

      {/* Pages List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{page.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(page.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/pages/edit?id=${page.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={page.slug} target="_blank">
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
