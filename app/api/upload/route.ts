import { NextResponse } from "next/server"
import { adminStorage } from "@/lib/firebase"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file found" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ message: "File must be an image" }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "File size must be less than 5MB" }, { status: 400 })
    }

    // Use the correct bucket name for new Firebase Storage format
    const bucket = adminStorage().bucket("shobhit-22354.firebasestorage.app")
    const fileName = `services/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const fileRef = bucket.file(fileName)

    const fileBuffer = await file.arrayBuffer()
    await fileRef.save(Buffer.from(fileBuffer), {
      metadata: {
        contentType: file.type,
      },
    })

    // Make the file publicly accessible
    await fileRef.makePublic()

    // For new Firebase Storage, use the correct public URL format
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/shobhit-22354.firebasestorage.app/o/${encodeURIComponent(fileName)}?alt=media`

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("API Error uploading file:", error)
    return NextResponse.json({ message: "Error uploading file" }, { status: 500 })
  }
}