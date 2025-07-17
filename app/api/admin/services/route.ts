import { NextResponse } from "next/server"
import { getServices, createService } from "@/lib/db"
import { getAdminUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getAdminUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const services = await getServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("API Error fetching services:", error)
    return NextResponse.json({ message: "Error fetching services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAdminUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

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
