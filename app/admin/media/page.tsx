"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, Grid, List, Trash2, Edit2, Eye, MoreHorizontal, ImageIcon } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MediaLibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock media data
  const mediaItems = [
    {
      id: 1,
      name: "hero-background.jpg",
      type: "image",
      size: "1.2 MB",
      dimensions: "1920x1080",
      url: "/placeholder.svg?height=1200&width=2000&text=Hero+Background",
      date: "2023-03-15",
    },
    {
      id: 2,
      name: "about-image.jpg",
      type: "image",
      size: "850 KB",
      dimensions: "800x600",
      url: "/placeholder.svg?height=600&width=800&text=About+Image",
      date: "2023-03-10",
    },
    {
      id: 3,
      name: "team-member-1.jpg",
      type: "image",
      size: "720 KB",
      dimensions: "400x400",
      url: "/placeholder.svg?height=400&width=400&text=Team+Member",
      date: "2023-03-05",
    },
    {
      id: 4,
      name: "logo.png",
      type: "image",
      size: "120 KB",
      dimensions: "200x60",
      url: "/placeholder.svg?height=60&width=200&text=Logo",
      date: "2023-02-28",
    },
    {
      id: 5,
      name: "brochure.pdf",
      type: "document",
      size: "2.5 MB",
      dimensions: "-",
      url: "/placeholder.svg?height=400&width=300&text=PDF",
      date: "2023-02-20",
    },
    {
      id: 6,
      name: "service-1.jpg",
      type: "image",
      size: "950 KB",
      dimensions: "800x600",
      url: "/placeholder.svg?height=600&width=800&text=Service+1",
      date: "2023-02-15",
    },
    {
      id: 7,
      name: "service-2.jpg",
      type: "image",
      size: "880 KB",
      dimensions: "800x600",
      url: "/placeholder.svg?height=600&width=800&text=Service+2",
      date: "2023-02-15",
    },
    {
      id: 8,
      name: "service-3.jpg",
      type: "image",
      size: "910 KB",
      dimensions: "800x600",
      url: "/placeholder.svg?height=600&width=800&text=Service+3",
      date: "2023-02-15",
    },
    {
      id: 9,
      name: "location-delhi.jpg",
      type: "image",
      size: "1.1 MB",
      dimensions: "1200x800",
      url: "/placeholder.svg?height=800&width=1200&text=Delhi",
      date: "2023-02-10",
    },
    {
      id: 10,
      name: "location-mumbai.jpg",
      type: "image",
      size: "1.0 MB",
      dimensions: "1200x800",
      url: "/placeholder.svg?height=800&width=1200&text=Mumbai",
      date: "2023-02-10",
    },
    {
      id: 11,
      name: "testimonial-video.mp4",
      type: "video",
      size: "15.8 MB",
      dimensions: "1920x1080",
      url: "/placeholder.svg?height=400&width=600&text=Video",
      date: "2023-02-05",
    },
    {
      id: 12,
      name: "annual-report.pdf",
      type: "document",
      size: "4.2 MB",
      dimensions: "-",
      url: "/placeholder.svg?height=400&width=300&text=PDF",
      date: "2023-01-28",
    },
  ]

  // Filter media items based on search term and filter
  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || item.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const toggleMediaSelection = (id: number) => {
    const idStr = id.toString()
    if (selectedMedia.includes(idStr)) {
      setSelectedMedia(selectedMedia.filter((item) => item !== idStr))
    } else {
      setSelectedMedia([...selectedMedia, idStr])
    }
  }

  const handleBulkDelete = () => {
    // In a real application, you would send a request to delete the selected media
    alert(`Deleting ${selectedMedia.length} items`)
    setSelectedMedia([])
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c61]">Media Library</h1>
          <p className="text-gray-600">Manage your images, videos, and documents</p>
        </div>
        <Button className="bg-[#1a3c61]">
          <Upload className="h-4 w-4 mr-2" /> Upload Media
        </Button>
      </div>

      <Tabs defaultValue="library">
        <TabsList className="mb-6">
          <TabsTrigger value="library">Media Library</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>

        <TabsContent value="library">
          <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BB4E6]"
                >
                  <option value="all">All Media</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="document">Documents</option>
                </select>
                <Button
                  variant="outline"
                  className={view === "grid" ? "border-[#4BB4E6] text-[#4BB4E6]" : ""}
                  onClick={() => setView("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className={view === "list" ? "border-[#4BB4E6] text-[#4BB4E6]" : ""}
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {selectedMedia.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-md mb-4 flex justify-between items-center">
              <span>{selectedMedia.length} items selected</span>
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
              </Button>
            </div>
          )}

          {filteredMedia.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
              <p className="text-gray-500 mb-4">No media items found</p>
              <Button className="bg-[#1a3c61]">
                <Upload className="h-4 w-4 mr-2" /> Upload Media
              </Button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={`relative border rounded-md overflow-hidden group ${
                    selectedMedia.includes(item.id.toString()) ? "ring-2 ring-[#4BB4E6]" : ""
                  }`}
                  onClick={() => toggleMediaSelection(item.id)}
                >
                  <div className="relative h-32 bg-gray-100">
                    {item.type === "image" ? (
                      <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    ) : item.type === "video" ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size}</p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#4BB4E6] focus:ring-[#4BB4E6]"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMedia(filteredMedia.map((item) => item.id.toString()))
                            } else {
                              setSelectedMedia([])
                            }
                          }}
                          checked={selectedMedia.length === filteredMedia.length && filteredMedia.length > 0}
                        />
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dimensions
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMedia.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-[#4BB4E6] focus:ring-[#4BB4E6]"
                            checked={selectedMedia.includes(item.id.toString())}
                            onChange={() => toggleMediaSelection(item.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              {item.type === "image" ? (
                                <Image
                                  src={item.url || "/placeholder.svg"}
                                  alt={item.name}
                                  width={40}
                                  height={40}
                                  className="object-cover rounded"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                  <ImageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dimensions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Upload New Media</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-700 mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-gray-500 text-sm mb-4">Supports images, videos, documents, and audio files</p>
                    <Button className="bg-[#1a3c61]">Browse Files</Button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium mb-4">Upload Options</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file-name" className="text-sm">
                      File Name
                    </Label>
                    <Input id="file-name" placeholder="Original filename will be used if left blank" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="alt-text" className="text-sm">
                      Alt Text (for images)
                    </Label>
                    <Input id="alt-text" placeholder="Describe the image for accessibility" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="caption" className="text-sm">
                      Caption
                    </Label>
                    <Input id="caption" placeholder="Optional caption" className="mt-1" />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="optimize-images"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#4BB4E6] focus:ring-[#4BB4E6]"
                      defaultChecked={true}
                    />
                    <label htmlFor="optimize-images" className="ml-2 block text-sm text-gray-700">
                      Automatically optimize images
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
