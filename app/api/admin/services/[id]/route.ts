import { NextResponse } from "next/server"
import { getServiceById, updateService, deleteService } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const service = await getServiceById(id)

    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 })
    }
    return NextResponse.json(service)
  } catch (error) {
    console.error("API Error fetching service by ID:", error)
    return NextResponse.json({ message: "Error fetching service" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const serviceData = await request.json()
    const updatedService = await updateService(id, serviceData)

    if (!updatedService) {
      return NextResponse.json({ message: "Service not found or failed to update" }, { status: 404 })
    }
    return NextResponse.json(updatedService)
  } catch (error) {
    console.error("API Error updating service:", error)
    return NextResponse.json({ message: "Error updating service" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const success = await deleteService(id)

    if (!success) {
      return NextResponse.json({ message: "Service not found or failed to delete" }, { status: 404 })
    }
    return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("API Error deleting service:", error)
    return NextResponse.json({ message: "Error deleting service" }, { status: 500 })
  }
}
