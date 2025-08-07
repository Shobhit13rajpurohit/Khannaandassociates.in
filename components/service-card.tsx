{/* components/ServiceCard.jsx */}

import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface ServiceCardProps {
  title: string
  imageUrl?: string 
  standalone?: boolean
}

export default function ServiceCard({ title, imageUrl, standalone = true }: ServiceCardProps) {
  // Use a dynamic placeholder if no imageUrl is provided
  const placeholderSrc = `/placeholder.svg?height=800&width=1200&text=${encodeURIComponent(title)}`

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full">
      <div className="relative h-40 w-full">
        <Image
          // Use the passed imageUrl or fall back to the placeholder
          src={imageUrl || placeholderSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="pt-6">
        <p className="text-gray-600">
          Our experienced attorneys provide comprehensive legal services in {title.toLowerCase()}, helping clients
          navigate complex legal challenges with confidence.
        </p>
      </CardContent>
      {/* This logic can be simplified */}
      <CardFooter className="pt-0">
        <div
          className="text-[#4BB4E6] font-medium flex items-center hover:text-[#3a9fd1] bg-white/80 px-3 py-1 rounded-md shadow-sm"
        >
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}