"use client"
import { useState, useEffect } from "react"
import { TeamMember } from "../../../lib/db"
import { Button } from "../../../components/ui/button"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

async function getTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch("/api/admin/team")
  if (!res.ok) {
    throw new Error("Failed to fetch team members")
  }
  return res.json()
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    getTeamMembers().then(setTeamMembers)
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setTeamMembers(teamMembers.filter(member => member.id !== id))
      } else {
        alert("Failed to delete team member")
      }
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Button asChild>
          <Link href="/admin/team/new">Add New Member</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map(member => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.position}</TableCell>
              <TableCell>{member.status}</TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm" className="mr-2">
                  <Link href={`/admin/team/edit/${member.id}`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
