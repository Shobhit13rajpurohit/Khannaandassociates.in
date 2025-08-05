import { NextResponse } from "next/server"
import { createTeamMember, getTeamMembers, TeamMember } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function GET() {
  try {
    const teamMembers = await getTeamMembers()
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newTeamMember = await createTeamMember(data as Omit<TeamMember, "id" | "created_at" | "updated_at">)
    if (!newTeamMember) {
      throw new Error("Failed to create team member")
    }

    // Revalidation logic
    if (newTeamMember.status === "active") {
      try {
        const pathsToRevalidate = ["/firm-profile/team", "/team"]
        if (newTeamMember.slug) {
          pathsToRevalidate.push(`/firm-profile/team/${newTeamMember.slug}`)
        }
        await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
        console.log("Revalidation triggered for:", pathsToRevalidate)
      } catch (revalError) {
        console.error(
          `Revalidation failed for team member (slug: ${newTeamMember.slug}), but the member was created successfully. Please revalidate manually.`,
          revalError,
        )
      }
    }

    return NextResponse.json(newTeamMember)
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
