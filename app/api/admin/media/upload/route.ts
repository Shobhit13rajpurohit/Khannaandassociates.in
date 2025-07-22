import { NextResponse } from "next/server"
import { uploadMedia } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 })
    }

    const mediaItem = await uploadMedia(file)

    if (!mediaItem) {
      throw new Error("Failed to upload media")
    }

    return NextResponse.json(mediaItem, { status: 201 })
  } catch (error) {
    console.error("API Error uploading media:", error)
    return NextResponse.json({ message: "Error uploading media" }, { status: 500 })
  }
}
