"use client"

import Link from "next/link"
import { Briefcase, Scale, FileText, Building, Landmark } from "lucide-react"

export default function ServicesMegaMenu() {
  const serviceCategories = [
    {
      title: "Business & Corporate",
      icon: <Briefcase className="h-5 w-5 text-[#4BB4E6]" />,
      services: [
        { name: "Corporate and Commercial", path: "/services/corporate-and-commercial" },
        { name: "Banking and Finance", path: "/services/banking-and-finance-and-insurance" },
        { name: "Capital Markets", path: "/services/capital-markets" },
        { name: "Competition/Antitrust", path: "/services/competition-antitrust" },
        { name: "Bankruptcy and Insolvency", path: "/services/bankruptcy-and-insolvency" },
      ],
    },
    {
      title: "Litigation & Dispute Resolution",
      icon: <Scale className="h-5 w-5 text-[#4BB4E6]" />,
      services: [
        { name: "Criminal & Civil", path: "/services/criminal-and-civil" },
        { name: "Arbitration and Reconciliation", path: "/services/arbitration-and-reconciliation" },
        { name: "International Domain", path: "/services/international-domain" },
      ],
    },
    {
      title: "Intellectual Property",
      icon: <FileText className="h-5 w-5 text-[#4BB4E6]" />,
      services: [
        { name: "Intellectual Property", path: "/services/intellectual-property" },
        { name: "Technology Media and Telecom", path: "/services/technology-media-and-telecom" },
        { name: "Media and Entertainment", path: "/services/media-and-entertainment" },
      ],
    },
    {
      title: "Real Estate & Infrastructure",
      icon: <Building className="h-5 w-5 text-[#4BB4E6]" />,
      services: [
        { name: "Real Estate", path: "/services/real-estate" },
        { name: "Energy and Natural Resources", path: "/services/energy-and-natural-resources" },
      ],
    },
    {
      title: "Specialized Practices",
      icon: <Landmark className="h-5 w-5 text-[#4BB4E6]" />,
      services: [
        { name: "Aviation & Defence", path: "/services/aviation-and-defence" },
        { name: "Healthcare and Life Sciences", path: "/services/healthcare-and-life-sciences" },
        { name: "Immigration", path: "/services/immigration" },
        { name: "Matrimonial", path: "/services/matrimonial" },
        { name: "Taxation", path: "/services/taxation-direct-and-indirect-taxation" },
      ],
    },
  ]

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap">
          {serviceCategories.map((category, index) => (
            <div key={index} className="w-1/5 px-4 mb-6">
              <div className="flex items-center mb-3">
                <span className="mr-2">{category.icon}</span>
                <h3 className="font-semibold text-[#1a3c61]">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.services.map((service, serviceIndex) => (
                  <li key={serviceIndex}>
                    <Link href={service.path} className="text-gray-600 hover:text-[#4BB4E6] block text-sm">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Explore our comprehensive range of legal services tailored to your needs.
          </p>
        </div>
      </div>
    </div>
  )
}
