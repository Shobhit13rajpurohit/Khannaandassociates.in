"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"
import DisclaimerModal from "@/components/disclaimer-modal"
import { Phone, MessageCircle } from "lucide-react"

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith("/admin")

  const yearsOfTrust = new Date().getFullYear() - 1948;

  return (
    <>
      {children}
      {!isAdminPage && (
        <>
          <Footer />
          <DisclaimerModal />

          {/* Floating Action Buttons */}
          <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
            <a href="tel:+91946162007" className="w-14 h-14 bg-[#1a3c61] rounded-full flex items-center justify-center shadow-lg hover:bg-[#132e4a] transition-colors" aria-label="Call us">
              <Phone className="text-white" />
            </a>
            <a href="https://wa.me/946162007" className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors" aria-label="Chat on WhatsApp">
              <MessageCircle className="text-white" />
            </a>
          </div>

          {/* Anniversary Badge */}
          <div className="fixed top-20 right-6 z-40 hidden md:block">
            <div className="relative w-32 h-32 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c8a45e] to-[#f0d78c] shadow-lg transform transition-all duration-300 group-hover:scale-105"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c8a45e] to-[#f0d78c] blur-md opacity-70 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-[#c8a45e] font-bold text-4xl">{yearsOfTrust}</span>
                <span className="text-[#1a3c61] text-sm font-semibold">YEARS OF</span>
                <span className="text-[#1a3c61] text-sm font-semibold">TRUST</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
