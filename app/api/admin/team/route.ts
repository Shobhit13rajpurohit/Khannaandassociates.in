import { NextResponse } from "next/server"
import {
  createTeamMember,
  getTeamMembers,
  TeamMember,
} from "../../../../lib/db"

export async function GET() {
  try {
    const teamMembers = await getTeamMembers()
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newTeamMember = await createTeamMember(
      data as Omit<TeamMember, "id" | "created_at" | "updated_at">
    )
    return NextResponse.json(newTeamMember)
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    )
  }
}
