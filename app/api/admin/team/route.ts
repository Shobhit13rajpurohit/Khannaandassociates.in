export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server"
import { createTeamMember, getTeamMembers, TeamMember, refreshTeamData } from "@/lib/db"
import { revalidate } from "@/lib/revalidate"

export async function GET() {
  try {
    console.log('API: Fetching team members...')
    const teamMembers = await getTeamMembers()
    console.log('API: Found', teamMembers.length, 'team members')
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("API: Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log('API: Creating new team member...')
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.position || !data.slug) {
      return NextResponse.json({ 
        error: "Missing required fields: name, position, and slug are required" 
      }, { status: 400 })
    }
    
    const newTeamMember = await createTeamMember(data as Omit<TeamMember, "id" | "created_at" | "updated_at">)
    
    if (!newTeamMember) {
      throw new Error("Failed to create team member")
    }

    console.log('API: Team member created:', newTeamMember.name, 'Status:', newTeamMember.status)

    // Enhanced revalidation logic
    try {
      const pathsToRevalidate = [
        "/firm-profile/team",
        "/team",
        "/firm-profile", // Also revalidate firm profile page that shows team preview
        "/api/team-members" // Revalidate API route itself
      ]
      
      // Add individual team member page if it has a slug
      if (newTeamMember.slug) {
        pathsToRevalidate.push(`/firm-profile/team/${newTeamMember.slug}`)
      }
      
      console.log('API: Starting revalidation for paths:', pathsToRevalidate)
      
      // Revalidate all paths in parallel
      const revalidationResults = await Promise.allSettled(
        pathsToRevalidate.map(path => revalidate(path))
      )
      
      // Log revalidation results
      revalidationResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`API: Revalidation successful for ${pathsToRevalidate[index]}`)
        } else {
          console.error(`API: Revalidation failed for ${pathsToRevalidate[index]}:`, result.reason)
        }
      })
      
      // Also refresh team data in memory
      await refreshTeamData()
      
    } catch (revalError) {
      console.error(
        `API: Revalidation failed for team member (slug: ${newTeamMember.slug}), but the member was created successfully.`,
        revalError,
      )
      
      // Don't fail the request, just log the error
      // The team member was created successfully
    }

    return NextResponse.json({
      ...newTeamMember,
      message: "Team member created successfully"
    })
    
  } catch (error) {
    console.error("API: Error creating team member:", error)
    return NextResponse.json({ 
      error: "Failed to create team member",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

// Add a new endpoint to force refresh team data
export async function PATCH() {
  try {
    console.log('API: Force refreshing team data...')
    await refreshTeamData()
    
    // Also trigger revalidation
    const pathsToRevalidate = [
      "/firm-profile/team",
      "/team",
      "/firm-profile"
    ]
    
    await Promise.all(pathsToRevalidate.map(path => revalidate(path)))
    
    return NextResponse.json({ 
      message: "Team data refreshed successfully",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("API: Error refreshing team data:", error)
    return NextResponse.json({ 
      error: "Failed to refresh team data" 
    }, { status: 500 })
  }
}