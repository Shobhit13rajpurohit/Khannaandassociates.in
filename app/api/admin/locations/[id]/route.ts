export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server"
import { getLocationById, updateLocation, deleteLocation } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const location = await getLocationById(params.id)
    if (!location) {
      return NextResponse.json({ message: "Location not found" }, { status: 404 })
    }
    return NextResponse.json(location)
  } catch (error) {
    console.error(`API Error fetching location ${params.id}:`, error)
    return NextResponse.json({ message: "Error fetching location" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const existingLocation = await getLocationById(params.id)
    if (!existingLocation) {
      return NextResponse.json({ message: "Location not found" }, { status: 404 })
    }

    const locationData = await request.json()
    const updatedLocation = await updateLocation(params.id, locationData)
    if (!updatedLocation) {
      return NextResponse.json({ message: "Location not found or update failed" }, { status: 404 })
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/locations"]
      if (existingLocation.slug) {
        pathsToRevalidate.push(`/locations/${existingLocation.slug}`)
      }
      if (updatedLocation.slug && updatedLocation.slug !== existingLocation.slug) {
        pathsToRevalidate.push(`/locations/${updatedLocation.slug}`)
      }
      await Promise.all([...new Set(pathsToRevalidate)].map(path => revalidate(path)))
      console.log("Revalidation triggered for:", [...new Set(pathsToRevalidate)])
    } catch (revalError) {
      console.error(
        `Revalidation failed for location (id: ${params.id}), but it was updated successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json(updatedLocation)
  } catch (error) {
    console.error(`API Error updating location ${params.id}:`, error)
    return NextResponse.json({ message: "Error updating location" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const existingLocation = await getLocationById(params.id)
    if (!existingLocation) {
      return NextResponse.json({ message: "Location not found" }, { status: 404 })
    }

    const success = await deleteLocation(params.id)
    if (!success) {
      return NextResponse.json({ message: "Location not found or deletion failed" }, { status: 404 })
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/locations"]
      if (existingLocation.slug) {
        pathsToRevalidate.push(`/locations/${existingLocation.slug}`)
      }
      await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
      console.log("Revalidation triggered for:", pathsToRevalidate)
    } catch (revalError) {
      console.error(
        `Revalidation failed for location (id: ${params.id}), but it was deleted successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(`API Error deleting location ${params.id}:`, error)
    return NextResponse.json({ message: "Error deleting location" }, { status: 500 })
  }
}
