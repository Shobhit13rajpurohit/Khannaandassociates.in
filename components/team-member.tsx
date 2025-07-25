import Image from "next/image"
import Link from "next/link"

interface TeamMemberProps {
  name: string
  position: string
  image: string
  slug: string
}

export default function TeamMember({ name, position, image, slug }: TeamMemberProps) {
  return (
    <Link href={`/firm-profile/team/${slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
           <div className="relative h-60 w-full">
           <Image src={image || "/placeholder.svg"} alt={name || "Team member photo"} fill className="object-cover object-top" />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold text-[#1a3c61]">{name}</h3>
          <p className="text-gray-600 text-sm">{position}</p>
        </div>
      </div>
    </Link>
  )
}
