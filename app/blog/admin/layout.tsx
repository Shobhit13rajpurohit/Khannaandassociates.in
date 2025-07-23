import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileText, Plus } from "lucide-react"

export default function BlogAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1a3c61] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Blog Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link href="/blog/admin">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/blog/admin/posts">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <FileText className="h-4 w-4 mr-2" />
                All Posts
              </Button>
            </Link>
            <Link href="/blog/admin/new">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                View Blog
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}