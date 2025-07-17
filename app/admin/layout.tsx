"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin") {
      setIsLoading(false)
      return
    }

    // Check if user is authenticated
    const token = localStorage.getItem("adminAuthToken")
    if (!token) {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken")
    localStorage.removeItem("adminUserEmail")
    router.push("/admin")
  }

  // Skip layout for login page
  if (pathname === "/admin") {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a3c61]"></div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== "/admin") {
    return null // Will redirect in useEffect
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Pages", path: "/admin/pages" },
    { name: "Services", path: "/admin/services" },
    { name: "Team Members", path: "/admin/team" },
    { name: "Locations", path: "/admin/locations" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Media Library", path: "/admin/media" },
    { name: "Settings", path: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-[#1a3c61] text-white">
        <div className="flex items-center justify-center h-16 border-b border-white/10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
            alt="Khanna and Associates Logo"
            width={150}
            height={40}
            className="bg-white p-1 rounded"
          />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "bg-[#4BB4E6] text-white"
                    : "text-white/70 hover:bg-[#132e4a] hover:text-white"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-white/10 p-4">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-white">{localStorage.getItem("adminUserEmail") || "Admin User"}</p>
              <p className="text-xs text-white/70">Administrator</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="ml-auto text-white/70 hover:text-white hover:bg-[#132e4a]"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-[#1a3c61] text-white w-full fixed top-0 z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(true)} className="text-white mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
              alt="Khanna and Associates Logo"
              width={120}
              height={30}
              className="bg-white p-1 rounded"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#1a3c61] text-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center justify-center px-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
                  alt="Khanna and Associates Logo"
                  width={150}
                  height={40}
                  className="bg-white p-1 rounded"
                />
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`${
                      pathname === item.path
                        ? "bg-[#4BB4E6] text-white"
                        : "text-white/70 hover:bg-[#132e4a] hover:text-white"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-white/10 p-4">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-white">
                    {localStorage.getItem("adminUserEmail") || "Admin User"}
                  </p>
                  <p className="text-xs text-white/70">Administrator</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="ml-auto text-white/70 hover:text-white hover:bg-[#132e4a]"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 md:py-12 px-4 sm:px-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
