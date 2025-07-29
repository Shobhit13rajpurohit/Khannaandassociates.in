"use client"

import { useEffect, useState } from "react"

interface TocEntry {
  level: number
  text: string
  id: string
}

interface TableOfContentsProps {
  htmlContent: string
}

export function TableOfContents({ htmlContent }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocEntry[]>([])

  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, "text/html")
    const headings = doc.querySelectorAll("h1, h2, h3, h4")
    const newToc: TocEntry[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1), 10)
      const text = heading.textContent || ""
      const id = `heading-${index}`
      heading.id = id
      newToc.push({ level, text, id })
    })

    setToc(newToc)
  }, [htmlContent])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (toc.length === 0) {
    return null
  }

  return (
    <div className="border rounded-md p-4 bg-muted/50">
      <h3 className="text-lg font-semibold mb-2">Table of Contents</h3>
      <ul>
        {toc.map((entry) => (
          <li
            key={entry.id}
            className={`ml-${(entry.level - 1) * 4} my-1`}
          >
            <button
              onClick={() => scrollToHeading(entry.id)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {entry.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
