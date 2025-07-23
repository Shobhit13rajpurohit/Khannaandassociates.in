import { NextResponse } from "next/server"
import { adminStorage } from "@/lib/firebase"
import { getDownloadURL } from "firebase-admin/storage"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file found" }, { status: 400 })
    }

    const bucket = adminStorage().bucket()
    const fileName = `${Date.now()}-${file.name}`
    const fileRef = bucket.file(fileName)

    const fileBuffer = await file.arrayBuffer()
    await fileRef.save(Buffer.from(fileBuffer), {
      metadata: {
        contentType: file.type,
      },
    })

    const downloadURL = await getDownloadURL(fileRef)

    return NextResponse.json({ url: downloadURL })
  } catch (error) {
    console.error("API Error uploading file:", error)
    return NextResponse.json({ message: "Error uploading file" }, { status: 500 })
  }
}
