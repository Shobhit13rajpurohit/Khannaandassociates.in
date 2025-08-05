import { NextResponse } from "next/server"
import { getServices, createService } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function GET() {
  try {
    const services = await getServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("API Error fetching services:", error)
    return NextResponse.json({ message: "Error fetching services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const serviceData = await request.json()
    const newService = await createService(serviceData)
    if (!newService) {
      throw new Error("Failed to create service")
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/services"]
      if (newService.slug) {
        pathsToRevalidate.push(`/services/${newService.slug}`)
      }
      await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
      console.log("Revalidation triggered for:", pathsToRevalidate)
    } catch (revalError) {
      console.error(
        `Revalidation failed for service (slug: ${newService.slug}), but the service was created successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error("API Error creating service:", error)
    const message = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ message: `Error creating service: ${message}` }, { status: 500 })
  }
}
