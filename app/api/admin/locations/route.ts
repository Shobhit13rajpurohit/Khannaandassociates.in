import { NextResponse } from "next/server"
import { getLocations, createLocation } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function GET() {
  try {
    const locations = await getLocations()
    return NextResponse.json(locations)
  } catch (error) {
    console.error("API Error fetching locations:", error)
    return NextResponse.json({ message: "Error fetching locations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const locationData = await request.json()
    const newLocation = await createLocation(locationData)
    if (!newLocation) {
      throw new Error("Failed to create location")
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/locations"]
      if (newLocation.slug) {
        pathsToRevalidate.push(`/locations/${newLocation.slug}`)
      }
      await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
      console.log("Revalidation triggered for:", pathsToRevalidate)
    } catch (revalError) {
      console.error(
        `Revalidation failed for location (slug: ${newLocation.slug}), but the location was created successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json(newLocation, { status: 201 })
  } catch (error) {
    console.error("API Error creating location:", error)
    return NextResponse.json({ message: "Error creating location" }, { status: 500 })
  }
}
