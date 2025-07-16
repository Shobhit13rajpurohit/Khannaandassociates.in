import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"

interface TeamMemberProps {
  name: string
  position: string
  image: string
  bio: string
  linkedIn?: string
}

export default function TeamMember({ name, position, image, bio, linkedIn }: TeamMemberProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-72 w-full">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-[#1a3c61]">{name}</h3>
            <p className="text-[#c8a45e] font-medium">{position}</p>
          </div>
          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077b5] hover:text-[#00669c]"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
        <p className="text-gray-600 mt-4">{bio}</p>
      </CardContent>
    </Card>
  )
}
