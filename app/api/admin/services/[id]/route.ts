import { NextRequest, NextResponse } from "next/server"
import { getServiceById, updateService, deleteService } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

// GET - Fetch service by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    const service = await getServiceById(id)

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// PATCH - Update service
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    const existingService = await getServiceById(id)
    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    const updatedService = await updateService(id, body)
    if (!updatedService) {
      return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/services"]
      if (existingService.slug) {
        pathsToRevalidate.push(`/services/${existingService.slug}`)
      }
      if (updatedService.slug && updatedService.slug !== existingService.slug) {
        pathsToRevalidate.push(`/services/${updatedService.slug}`)
      }
      // Use a Set to avoid duplicate revalidation requests
      await Promise.all([...new Set(pathsToRevalidate)].map(path => revalidate(path)))
      console.log("Revalidation triggered for:", [...new Set(pathsToRevalidate)])
    } catch (revalError) {
      console.error(
        `Revalidation failed for service (id: ${id}), but the service was updated successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json(updatedService)
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE - Delete service
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    const existingService = await getServiceById(id)
    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    const success = await deleteService(id)
    if (!success) {
      return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/services"]
      if (existingService.slug) {
        pathsToRevalidate.push(`/services/${existingService.slug}`)
      }
      await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
      console.log("Revalidation triggered for:", pathsToRevalidate)
    } catch (revalError) {
      console.error(
        `Revalidation failed for service (id: ${id}), but the service was deleted successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}