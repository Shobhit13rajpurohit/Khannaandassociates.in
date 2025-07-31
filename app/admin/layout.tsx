"use client"

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MenuItem {
  name: string
  path: string
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/admin/dashboard" },
    // { name: "Pages", path: "/admin/pages" },
    { name: "Services", path: "/admin/services" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Team Members", path: "/admin/team" },
    { name: "Locations", path: "/admin/locations" },
  ]

  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)

  const isActiveLink = (path: string) => pathname === path

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        // Clear any client-side state if needed
        router.push('/admin')
        router.refresh()
      } else {
        console.error('Logout failed')
        // Still redirect to login page even if logout API fails
        router.push('/admin')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Still redirect to login page even if there's an error
      router.push('/admin')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const NavLink = ({ 
    item, 
    isMobile = false, 
    onClick 
  }: { 
    item: MenuItem
    isMobile?: boolean
    onClick?: () => void
  }) => (
    <Link
      href={item.path}
      className={`${
        isActiveLink(item.path)
          ? "bg-[#4BB4E6] text-white"
          : "text-white/70 hover:bg-[#132e4a] hover:text-white"
      } group flex items-center px-2 py-2 ${
        isMobile ? 'text-base' : 'text-sm'
      } font-medium rounded-md transition-colors duration-200`}
      onClick={onClick}
    >
      {item.name}
    </Link>
  )

  const LogoutButton = ({ isMobile = false }: { isMobile?: boolean }) => (
    <Button
      onClick={handleLogout}
      disabled={isLoggingOut}
      variant="ghost"
      className={`${
        isMobile ? 'w-full justify-start text-base' : 'text-sm'
      } text-white/70 hover:bg-red-600 hover:text-white transition-colors duration-200 px-2 py-2 font-medium rounded-md`}
    >
      <LogOut className={`${isMobile ? 'mr-2' : 'mr-1'} h-4 w-4`} />
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  )

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
            priority
          />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {menuItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>
          {/* Logout button at bottom of sidebar */}
          <div className="px-2 pb-4">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-[#1a3c61] text-white w-full fixed top-0 z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openSidebar} 
              className="text-white mr-2 hover:bg-[#132e4a]"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
              alt="Khanna and Associates Logo"
              width={120}
              height={30}
              className="bg-white p-1 rounded"
              priority
            />
          </div>
          {/* Mobile logout button */}
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-red-600"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 flex z-40">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
            onClick={closeSidebar}
            aria-hidden="true"
          />
          
          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#1a3c61] text-white">
            {/* Close button */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeSidebar}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-white hover:bg-gray-600"
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center justify-center px-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
                  alt="Khanna and Associates Logo"
                  width={150}
                  height={40}
                  className="bg-white p-1 rounded"
                  priority
                />
              </div>

              {/* Navigation */}
              <nav className="mt-5 px-2 space-y-1">
                {menuItems.map((item) => (
                  <NavLink 
                    key={item.name} 
                    item={item} 
                    isMobile={true}
                    onClick={closeSidebar}
                  />
                ))}
              </nav>
            </div>
            
            {/* Mobile logout button at bottom */}
            <div className="px-2 pb-4">
              <LogoutButton isMobile={true} />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 md:py-12 px-4 sm:px-6 md:px-8 mt-16 md:mt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}