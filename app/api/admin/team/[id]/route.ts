export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server"
import { getTeamMemberById, updateTeamMember, deleteTeamMember, TeamMember } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const teamMember = await getTeamMemberById(params.id)
    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }
    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error fetching team member:", error)
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const existingTeamMember = await getTeamMemberById(params.id)
    if (!existingTeamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    const data = await request.json()
    const updatedTeamMember = await updateTeamMember(params.id, data as Partial<TeamMember>)
    if (!updatedTeamMember) {
        throw new Error("Failed to update team member")
    }

    // Revalidation logic
    try {
      const pathsToRevalidate = ["/firm-profile/team", "/team"]
      if (existingTeamMember.slug) {
        pathsToRevalidate.push(`/firm-profile/team/${existingTeamMember.slug}`)
      }
      if (updatedTeamMember.slug && updatedTeamMember.slug !== existingTeamMember.slug) {
        pathsToRevalidate.push(`/firm-profile/team/${updatedTeamMember.slug}`)
      }

      // Revalidate based on status
      if (updatedTeamMember.status === 'active' || existingTeamMember.status === 'active') {
        await Promise.all([...new Set(pathsToRevalidate)].map(path => revalidate(path)))
        console.log("Revalidation triggered for:", [...new Set(pathsToRevalidate)])
      }
    } catch (revalError) {
      console.error(
        `Revalidation failed for team member (id: ${params.id}), but the member was updated successfully. Please revalidate manually.`,
        revalError,
      )
    }

    return NextResponse.json(updatedTeamMember)
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const existingTeamMember = await getTeamMemberById(params.id)
    if (!existingTeamMember) {
      // If it doesn't exist, it's already "deleted"
      return NextResponse.json({ message: "Team member not found, presumed deleted." })
    }

    await deleteTeamMember(params.id)

    // Revalidation logic
    if (existingTeamMember.status === 'active') {
        try {
          const pathsToRevalidate = ["/firm-profile/team", "/team"]
          if (existingTeamMember.slug) {
            pathsToRevalidate.push(`/firm-profile/team/${existingTeamMember.slug}`)
          }
          await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
          console.log("Revalidation triggered for:", pathsToRevalidate)
        } catch (revalError) {
          console.error(
            `Revalidation failed for team member (id: ${params.id}), but the member was deleted successfully. Please revalidate manually.`,
            revalError,
          )
        }
    }

    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
