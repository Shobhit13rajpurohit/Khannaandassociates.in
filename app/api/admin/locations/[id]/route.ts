import { NextResponse } from "next/server"
import { getLocationById, updateLocation, deleteLocation } from "@/lib/db"

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
    const locationData = await request.json()
    const updatedLocation = await updateLocation(params.id, locationData)
    if (!updatedLocation) {
      return NextResponse.json({ message: "Location not found" }, { status: 404 })
    }
    return NextResponse.json(updatedLocation)
  } catch (error) {
    console.error(`API Error updating location ${params.id}:`, error)
    return NextResponse.json({ message: "Error updating location" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id:string } }) {
  try {
    const success = await deleteLocation(params.id)
    if (!success) {
      return NextResponse.json({ message: "Location not found" }, { status: 404 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(`API Error deleting location ${params.id}:`, error)
    return NextResponse.json({ message: "Error deleting location" }, { status: 500 })
  }
}
