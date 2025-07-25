'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { TeamMember } from "../../../lib/db"
import { Button } from "../../../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import Image from "next/image"

export default function TeamListPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch("/api/admin/team")
        if (!res.ok) {
          throw new Error("Failed to fetch team members")
        }
        const data = await res.json()
        setTeamMembers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTeamMembers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map(member => (
            <TableRow key={member.id}>
              <TableCell>
                <Image
                  src={member.image || "/placeholder-user.jpg"}
                  alt={member.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.position}</TableCell>
              <TableCell>{member.status}</TableCell>
              <TableCell>
                <Button asChild variant="outline">
                  <Link href={`/admin/team/edit/${member.id}`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
