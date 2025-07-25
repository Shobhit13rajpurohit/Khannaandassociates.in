import { NextResponse } from "next/server"
import { getLocations, createLocation } from "@/lib/db"

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
    return NextResponse.json(newLocation, { status: 201 })
  } catch (error) {
    console.error("API Error creating location:", error)
    return NextResponse.json({ message: "Error creating location" }, { status: 500 })
  }
}
