"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ExternalLink } from 'lucide-react'

interface MapComponentProps {
  locationName: string
  address: string
  mapLink?: string
  mapImage?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export default function MapComponent({ 
  locationName, 
  address, 
  mapLink, 
  mapImage,
  coordinates 
}: MapComponentProps) {
  const [imageError, setImageError] = useState(false)
  
  // Generate map image path based on location name
  const getMapImagePath = () => {
    if (mapImage) return mapImage
    
    // Convert location name to lowercase and remove spaces for filename
    const locationSlug = locationName.toLowerCase().replace(/\s+/g, '-')
    return `/images/maps/${locationSlug}-map.jpg`
  }
  
  // Generate Google Maps link without API key
  const generateMapLink = () => {
    if (mapLink) return mapLink
    
    const query = coordinates 
      ? `${coordinates.lat},${coordinates.lng}`
      : encodeURIComponent(`${address}, ${locationName}`)
    
    return `https://www.google.com/maps/search/?api=1&query=${query}`
  }
  
  const imageUrl = getMapImagePath()
  const fallbackImage = '/images/default-map.jpg'
  
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-[400px] bg-gray-200">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={`Map showing location of ${locationName} office at ${address}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <Image
            src={fallbackImage}
            alt={`Default map for ${locationName} office location`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
            loading="lazy"
            onError={() => {
              // If even fallback fails, show placeholder
            }}
          />
        )}
        
        {/* Overlay with map link */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Link 
            href={generateMapLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white hover:bg-gray-100 text-[#1a3c61] px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg flex items-center"
          >
            <MapPin className="h-5 w-5 mr-2" />
            View on Google Maps
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </div>
        
        {/* Fallback content if no image loads */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500 p-6">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Office Location</p>
              <p className="text-sm mb-4">{address}</p>
              <Link 
                href={generateMapLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#4BB4E6] hover:text-[#1a3c61] transition-colors"
              >
                <MapPin className="h-4 w-4 mr-1" />
                View on Google Maps
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Alternative simplified map component for cases where you just need the link
export function SimpleMapLink({ 
  locationName, 
  address, 
  mapLink, 
  coordinates,
  className = "" 
}: MapComponentProps & { className?: string }) {
  const generateMapLink = () => {
    if (mapLink) return mapLink
    
    const query = coordinates 
      ? `${coordinates.lat},${coordinates.lng}`
      : encodeURIComponent(`${address}, ${locationName}`)
    
    return `https://www.google.com/maps/search/?api=1&query=${query}`
  }
  
  return (
    <Link 
      href={generateMapLink()} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-flex items-center text-[#4BB4E6] hover:text-[#1a3c61] transition-colors ${className}`}
    >
      <MapPin className="h-4 w-4 mr-1" />
      View {locationName} on Map
      <ExternalLink className="h-3 w-3 ml-1" />
    </Link>
  )
}