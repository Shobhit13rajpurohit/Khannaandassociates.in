"use client"

import { useState, useEffect, useMemo, Fragment } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ChevronRight, ChevronDown } from "lucide-react"

interface Location {
  id: string
  name: string
  address: string
  city: string
  country: string
  parent_id?: string
  sub_offices?: Location[]
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("/api/admin/locations", { cache: 'no-store' })
        if (!response.ok) {
          throw new Error("Failed to fetch locations")
        }
        const data = await response.json()
        setLocations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchLocations()
  }, [])

  const hierarchicalLocations = useMemo(() => {
    const locationMap = new Map<string, Location>()
    const topLevelLocations: Location[] = []

    locations.forEach(location => {
      location.sub_offices = []
      locationMap.set(location.id, location)
    })

    locations.forEach(location => {
      if (location.parent_id && locationMap.has(location.parent_id)) {
        locationMap.get(location.parent_id)!.sub_offices!.push(location)
      } else {
        topLevelLocations.push(location)
      }
    })

    return topLevelLocations
  }, [locations])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this location? This will also delete all its sub-offices.")) {
      try {
        const response = await fetch(`/api/admin/locations/${id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete location")
        }
        setLocations(locations.filter(location => location.id !== id && location.parent_id !== id))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      }
    }
  }

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const renderLocationRow = (location: Location, level = 0) => {
    const isExpanded = expandedRows.has(location.id)
    return (
      <Fragment key={location.id}>
        <TableRow>
          <TableCell style={{ paddingLeft: `${level * 20}px` }}>
            {location.sub_offices && location.sub_offices.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => toggleRow(location.id)}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </Button>
            )}
            {location.name}
          </TableCell>
          <TableCell>{location.address}</TableCell>
          <TableCell>{location.city}</TableCell>
          <TableCell>{location.country}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/admin/locations/edit/${location.id}`} passHref>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDelete(location.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        {isExpanded && location.sub_offices && location.sub_offices.map(subOffice => renderLocationRow(subOffice, level + 1))}
      </Fragment>
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Locations</CardTitle>
          <Link href="/admin/locations/new">
            <Button>Add New Location</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hierarchicalLocations.map(location => renderLocationRow(location))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
