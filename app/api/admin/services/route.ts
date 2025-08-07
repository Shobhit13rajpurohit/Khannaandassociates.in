export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server"
import { getServices, createService } from "@/lib/db"

export async function GET() {
  try {
    const servicesData = await getServices()
    // Sort services alphabetically by title
    const services = servicesData.sort((a, b) => a.title.localeCompare(b.title))
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
    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error("API Error creating service:", error)
    return NextResponse.json({ message: "Error creating service" }, { status: 500 })
  }
}
