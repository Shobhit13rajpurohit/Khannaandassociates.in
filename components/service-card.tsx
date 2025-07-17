import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface ServiceCardProps {
  title: string
  standalone?: boolean
}

const serviceImages: Record<string, string> = {
  "Aviation & Defence": "/placeholder.svg?height=800&width=1200&text=Aviation+and+Defence",
  "Arbitration and Reconciliation": "/placeholder.svg?height=800&width=1200&text=Arbitration+and+Reconciliation",
  "Banking and Finance & Insurance": "/placeholder.svg?height=800&width=1200&text=Banking+and+Finance",
  "Bankruptcy and Insolvency": "/placeholder.svg?height=800&width=1200&text=Bankruptcy+and+Insolvency",
  "Capital Markets": "/placeholder.svg?height=800&width=1200&text=Capital+Markets",
  "Competition/Antitrust": "/placeholder.svg?height=800&width=1200&text=Competition+and+Antitrust",
  "Criminal & Civil": "/placeholder.svg?height=800&width=1200&text=Criminal+and+Civil",
  "Corporate and Commercial": "/placeholder.svg?height=800&width=1200&text=Corporate+and+Commercial",
  "Energy and Natural Resources": "/placeholder.svg?height=800&width=1200&text=Energy+and+Natural+Resources",
  "Financial Services & Fintech": "/placeholder.svg?height=800&width=1200&text=Financial+Services",
  Funds: "/placeholder.svg?height=800&width=1200&text=Funds",
  "Healthcare and Life Sciences": "/placeholder.svg?height=800&width=1200&text=Healthcare",
  Immigration: "/placeholder.svg?height=800&width=1200&text=Immigration",
  "Information Technology": "/placeholder.svg?height=800&width=1200&text=Information+Technology",
  "Intellectual Property": "/placeholder.svg?height=800&width=1200&text=Intellectual+Property",
  "International Domain": "/placeholder.svg?height=800&width=1200&text=International+Domain",
  "Legal Outsourcing Work(LPO)": "/placeholder.svg?height=800&width=1200&text=Legal+Outsourcing",
  "Media and Entertainment": "/placeholder.svg?height=800&width=1200&text=Media+and+Entertainment",
  Matrimonial: "/placeholder.svg?height=800&width=1200&text=Matrimonial",
  "Private Client practice": "/placeholder.svg?height=800&width=1200&text=Private+Client+Practice",
  "Real Estate": "/placeholder.svg?height=800&width=1200&text=Real+Estate",
  "Taxation (Direct and Indirect Taxation)": "/placeholder.svg?height=800&width=1200&text=Taxation",
  "Technology Media and Telecom": "/placeholder.svg?height=800&width=1200&text=Technology+Media+Telecom",
}

export default function ServiceCard({ title, standalone = true }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full">
      <div className="relative h-40 w-full">
        <Image
          src={serviceImages[title] || `/placeholder.svg?height=800&width=1200&text=${title.replace(/&/g, "and")}`}
          alt={title}
          fill
          className="object-cover"
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
      {standalone && (
        <CardFooter className="pt-0">
          <a
            href="#"
            className="text-[#4BB4E6] font-medium flex items-center hover:text-[#3a9fd1] bg-white/80 px-3 py-1 rounded-md shadow-sm"
          >
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </CardFooter>
      )}
      {!standalone && (
        <CardFooter className="pt-0">
          <div className="text-[#4BB4E6] font-medium flex items-center hover:text-[#3a9fd1] bg-white/80 px-3 py-1 rounded-md shadow-sm">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
