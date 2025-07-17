"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Building, Globe } from "lucide-react"

export default function IndiaPresence() {
  const [activeTab, setActiveTab] = useState<string>("all")

  const metroOffices = [
    { city: "Delhi", type: "metro", path: "/locations/delhi" },
    { city: "Mumbai", type: "metro", path: "/locations/mumbai" },
    { city: "Bangalore", type: "metro", path: "/locations/bangalore" },
    { city: "Chennai", type: "metro", path: "/locations/chennai" },
    { city: "Kolkata", type: "metro", path: "/locations/kolkata" },
  ]

  const serviceOffices = [
    { city: "Jaipur", type: "service", path: "/locations/jaipur" },
    { city: "Pune", type: "service", path: "/locations/pune" },
    { city: "Hyderabad", type: "service", path: "/locations/hyderabad" },
    { city: "Ahmedabad", type: "service", path: "/locations/ahmedabad" },
  ]

  const assistanceCities = [
    { city: "Chandigarh", type: "assistance", path: "/lawyers-in-chandigarh" },
    { city: "Lucknow", type: "assistance", path: "/lawyers-in-lucknow" },
    { city: "Goa", type: "assistance", path: "/lawyers-in-goa" },
    { city: "Dehradun", type: "assistance", path: "/locations/dehradun" },
    { city: "Indore", type: "assistance", path: "/lawyers-in-indore" },
    { city: "Bhopal", type: "assistance", path: "/lawyers-in-bhopal" },
    { city: "Patna", type: "assistance", path: "/lawyers-in-patna" },
    { city: "Guwahati", type: "assistance", path: "/lawyers-in-guwahati" },
    { city: "Kochi", type: "assistance", path: "/lawyers-in-kochi" },
    { city: "Nagpur", type: "assistance", path: "/lawyers-in-nagpur" },
    { city: "Surat", type: "assistance", path: "/lawyers-in-surat" },
    { city: "Vadodara", type: "assistance", path: "/lawyers-in-vadodara" },
  ]

  const allCities = [...metroOffices, ...serviceOffices, ...assistanceCities]

  const displayCities =
    activeTab === "all"
      ? allCities
      : activeTab === "metro"
        ? metroOffices
        : activeTab === "service"
          ? serviceOffices
          : assistanceCities

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-[#1a3c61]">PAN INDIA PRESENCE</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          After establishing our headquarters in Delhi, Khanna and Associates expanded operations to Mumbai, Bangalore,
          Chennai, and other major cities. We now have team members working across 9 destinations, serving clients
          throughout India.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-col space-y-8">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full bg-[#f8f8f8] border-2 border-[#4BB4E6] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#1a3c61]">5</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-[#1a3c61]">Offices in 5 Metro Cities</h3>
                  <p className="text-gray-600">
                    Headquartered in Delhi, Khanna and Associates has offices in Mumbai, Bangalore, Chennai & Kolkata
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full bg-[#f8f8f8] border-2 border-[#4BB4E6] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#1a3c61]">4</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-[#1a3c61]">Service Offices in 4 Cities</h3>
                  <p className="text-gray-600">We have service offices in Jaipur, Pune, Hyderabad & Ahmedabad</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full bg-[#f8f8f8] border-2 border-[#4BB4E6] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#1a3c61]">70+</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-[#1a3c61]">Assistance in 70+ Cities</h3>
                  <p className="text-gray-600">
                    We have 100+ experienced associates spread across the country which enable us to provide services in
                    more than 70 cities
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex space-x-2 mb-4">
                <Button
                  variant={activeTab === "all" ? "default" : "outline"}
                  className={activeTab === "all" ? "bg-[#1a3c61]" : ""}
                  onClick={() => setActiveTab("all")}
                >
                  All Cities
                </Button>
                <Button
                  variant={activeTab === "metro" ? "default" : "outline"}
                  className={activeTab === "metro" ? "bg-[#1a3c61]" : ""}
                  onClick={() => setActiveTab("metro")}
                >
                  <MapPin className="w-4 h-4 mr-2" /> Metro Offices
                </Button>
                <Button
                  variant={activeTab === "service" ? "default" : "outline"}
                  className={activeTab === "service" ? "bg-[#1a3c61]" : ""}
                  onClick={() => setActiveTab("service")}
                >
                  <Building className="w-4 h-4 mr-2" /> Service Offices
                </Button>
                <Button
                  variant={activeTab === "assistance" ? "default" : "outline"}
                  className={activeTab === "assistance" ? "bg-[#1a3c61]" : ""}
                  onClick={() => setActiveTab("assistance")}
                >
                  <Globe className="w-4 h-4 mr-2" /> Assistance
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {displayCities.map((city, index) => (
                  <Link
                    key={index}
                    href={city.path}
                    className={`px-3 py-2 rounded-md text-center transition-colors ${
                      city.type === "metro"
                        ? "bg-[#1a3c61] text-white hover:bg-[#4BB4E6]"
                        : city.type === "service"
                          ? "bg-[#4BB4E6] text-white hover:bg-[#1a3c61]"
                          : "bg-gray-200 text-[#1a3c61] hover:bg-gray-300"
                    }`}
                  >
                    {city.city}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/india-map.png"
              alt="Khanna and Associates India Presence"
              width={800}
              height={800}
              className="w-full h-auto"
            />

            {/* Map pins could be added here with absolute positioning */}
          </div>
        </div>
      </div>
    </section>
  )
}
