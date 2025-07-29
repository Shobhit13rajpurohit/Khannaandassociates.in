import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface TeamMemberProps {
  name: string
  position: string
  image: string
  slug: string
}

export default function TeamMember({ name, position, image, slug }: TeamMemberProps) {
  return (
    <Link href={`/firm-profile/team/${slug}`} className="group block">
      <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#4BB4E6]/20 transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container with Overlay */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image 
            src={image || "/placeholder.svg"} 
            alt={`${name} - ${position}`} 
            fill 
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover arrow indicator */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ArrowRight className="w-4 h-4 text-[#1a3c61]" />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#1a3c61] mb-2 group-hover:text-[#4BB4E6] transition-colors duration-200">
            {name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            {position}
          </p>
          
          {/* Bottom accent line */}
          <div className="w-0 h-0.5 bg-gradient-to-r from-[#4BB4E6] to-[#1a3c61] mt-4 group-hover:w-full transition-all duration-300" />
        </div>
      </div>
    </Link>
  )
}