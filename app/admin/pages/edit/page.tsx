"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  Eye,
  Trash2,
  ImageIcon,
  Plus,
  Copy,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Layout,
  Palette,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function EditPagePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [metaKeywords, setMetaKeywords] = useState("")
  const [status, setStatus] = useState("Published")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [activeSection, setActiveSection] = useState<number | null>(null)

  // Page sections
  const [sections, setSections] = useState<any[]>([])

  // Mock data for a page
  const pageData = {
    id: "home",
    title: "Home",
    slug: "/",
    metaDescription:
      "Khanna and Associates is a premier law firm providing expert legal services in Delhi, Jaipur, Dehradun and across India.",
    metaKeywords: "law firm, legal services, attorneys, lawyers, Khanna and Associates",
    status: "Published",
    sections: [
      {
        id: 1,
        type: "hero",
        title: "Excellence in Legal Services Since 1948",
        subtitle:
          "Providing expert legal counsel across multiple practice areas with a commitment to integrity and client success.",
        backgroundImage: "/placeholder.svg?height=1200&width=2000&text=Hero+Background",
        ctaText: "Schedule a Consultation",
        ctaLink: "#contact",
        secondaryCtaText: "Learn More",
        secondaryCtaLink: "#about",
        settings: {
          textColor: "#ffffff",
          overlayOpacity: 60,
          height: "tall",
          alignment: "left",
        },
      },
      {
        id: 2,
        type: "content",
        title: "About Khanna and Associates",
        content:
          "KHANNA & ASSOCIATES was initially founded in 1948 by Late Amarnath Singh Khanna, a highly successful lawyer in private practice, specializing in criminal law, dedicated to the cause of the society, an unforgettable legend in the field.\n\nToday, the Firm has grown more under the sincere leadership with professionals specializing in their own fields, serving the clients and the community through professionalism, public service and charitable works.\n\nKHANNA & ASSOCIATES is a full service Law Firm handling all legal matters on Civil, Criminal, Business, Commercial, Corporate, Arbitration, Labor & Service subjects in law, in all courts as well as Tribunals.",
        image: "/placeholder.svg?height=600&width=800&text=About+Image",
        ctaText: "Our Legacy",
        ctaLink: "/firm-profile",
        settings: {
          layout: "image-left",
          backgroundColor: "#f9fafb",
          textColor: "#1a3c61",
          padding: "medium",
        },
      },
      {
        id: 3,
        type: "services",
        title: "Our Practice Areas",
        subtitle:
          "Khanna and Associates offers comprehensive legal services across multiple practice areas, providing expert counsel to individuals and businesses alike.",
        services: [
          "Aviation & Defence",
          "Arbitration and Reconciliation",
          "Banking and Finance & Insurance",
          "Bankruptcy and Insolvency",
          "Capital Markets",
          "Competition/Antitrust",
        ],
        ctaText: "View All Practice Areas",
        ctaLink: "/services",
        settings: {
          columns: 3,
          backgroundColor: "#ffffff",
          textColor: "#1a3c61",
          cardStyle: "shadow",
        },
      },
      {
        id: 4,
        type: "locations",
        title: "Our Global Presence",
        subtitle:
          "With offices across India and international locations, we provide seamless legal services worldwide.",
        locations: [
          { name: "Delhi", image: "/placeholder.svg?height=400&width=600&text=Delhi" },
          { name: "Mumbai", image: "/placeholder.svg?height=400&width=600&text=Mumbai" },
          { name: "Bangalore", image: "/placeholder.svg?height=400&width=600&text=Bangalore" },
          { name: "New York", image: "/placeholder.svg?height=400&width=600&text=New+York" },
        ],
        ctaText: "View All Locations",
        ctaLink: "/locations",
        settings: {
          columns: 4,
          backgroundColor: "#f9fafb",
          textColor: "#1a3c61",
        },
      },
    ],
  }

  useEffect(() => {
    // In a real application, you would fetch the page data based on the ID
    if (id) {
      // Simulate loading data
      setTitle(pageData.title)
      setSlug(pageData.slug)
      setMetaDescription(pageData.metaDescription)
      setMetaKeywords(pageData.metaKeywords)
      setStatus(pageData.status)
      setSections(pageData.sections)
    }
  }, [id])

  const handleSave = async () => {
    setIsLoading(true)

    // In a real application, you would send this data to your API
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Revalidate the page
    await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}&path=${slug}`)

    setIsLoading(false)
    setIsSaved(true)

    // Reset the saved message after 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const handleGenerateSlug = () => {
    if (title === "Home") {
      setSlug("/")
      return
    }

    const newSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    setSlug(`/${newSlug}`)
  }

  const addSection = (type: string) => {
    const newSection = {
      id: Date.now(),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      settings: {},
    }

    switch (type) {
      case "hero":
        newSection.subtitle = "Add a subtitle here"
        newSection.backgroundImage = "/placeholder.svg?height=1200&width=2000&text=Hero+Background"
        newSection.ctaText = "Call to Action"
        newSection.ctaLink = "#"
        newSection.settings = {
          textColor: "#ffffff",
          overlayOpacity: 60,
          height: "medium",
          alignment: "left",
        }
        break

      case "content":
        newSection.content = "Add your content here..."
        newSection.image = "/placeholder.svg?height=600&width=800&text=Content+Image"
        newSection.settings = {
          layout: "image-right",
          backgroundColor: "#ffffff",
          textColor: "#1a3c61",
          padding: "medium",
        }
        break

      case "services":
        newSection.subtitle = "Showcase your services here"
        newSection.services = ["Service 1", "Service 2", "Service 3"]
        newSection.settings = {
          columns: 3,
          backgroundColor: "#f9fafb",
          textColor: "#1a3c61",
          cardStyle: "shadow",
        }
        break

      case "testimonials":
        newSection.subtitle = "What our clients say"
        newSection.testimonials = [{ name: "Client Name", position: "Company", quote: "Add a testimonial here..." }]
        newSection.settings = {
          backgroundColor: "#1a3c61",
          textColor: "#ffffff",
          style: "cards",
        }
        break

      case "cta":
        newSection.subtitle = "Ready to get started?"
        newSection.ctaText = "Contact Us"
        newSection.ctaLink = "/contact"
        newSection.settings = {
          backgroundColor: "#4BB4E6",
          textColor: "#ffffff",
          style: "centered",
        }
        break

      case "team":
        newSection.subtitle = "Meet our expert attorneys"
        newSection.members = [
          {
            name: "Team Member",
            position: "Position",
            image: "/placeholder.svg?height=400&width=300&text=Team+Member",
          },
        ]
        newSection.settings = {
          columns: 3,
          backgroundColor: "#ffffff",
          textColor: "#1a3c61",
          cardStyle: "shadow",
        }
        break
    }

    setSections([...sections, newSection])
    setActiveSection(sections.length)
  }

  const updateSection = (index: number, data: any) => {
    const updatedSections = [...sections]
    updatedSections[index] = { ...updatedSections[index], ...data }
    setSections(updatedSections)
  }

  const updateSectionSettings = (index: number, settings: any) => {
    const updatedSections = [...sections]
    updatedSections[index].settings = { ...updatedSections[index].settings, ...settings }
    setSections(updatedSections)
  }

  const removeSection = (index: number) => {
    const updatedSections = [...sections]
    updatedSections.splice(index, 1)
    setSections(updatedSections)
    setActiveSection(null)
  }

  const moveSection = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === sections.length - 1)) {
      return
    }

    const updatedSections = [...sections]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap sections
    ;[updatedSections[index], updatedSections[newIndex]] = [updatedSections[newIndex], updatedSections[index]]

    setSections(updatedSections)
    setActiveSection(newIndex)
  }

  const duplicateSection = (index: number) => {
    const sectionToDuplicate = { ...sections[index], id: Date.now() }
    const updatedSections = [...sections]
    updatedSections.splice(index + 1, 0, sectionToDuplicate)
    setSections(updatedSections)
    setActiveSection(index + 1)
  }

  const renderSectionEditor = (section: any, index: number) => {
    switch (section.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`section-${index}-title`}>Heading</Label>
              <Input
                id={`section-${index}-title`}
                value={section.title || ""}
                onChange={(e) => updateSection(index, { title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`section-${index}-subtitle`}>Subheading</Label>
              <Textarea
                id={`section-${index}-subtitle`}
                value={section.subtitle || ""}
                onChange={(e) => updateSection(index, { subtitle: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`section-${index}-background`}>Background Image</Label>
              <div className="flex items-center mt-1">
                <div className="relative w-32 h-20 border border-gray-300 rounded-md overflow-hidden mr-4">
                  {section.backgroundImage ? (
                    <img
                      src={section.backgroundImage || "/placeholder.svg"}
                      alt="Background"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button type="button" className="bg-[#1a3c61]">
                  Select Image
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`section-${index}-cta-text`}>CTA Button Text</Label>
                <Input
                  id={`section-${index}-cta-text`}
                  value={section.ctaText || ""}
                  onChange={(e) => updateSection(index, { ctaText: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`section-${index}-cta-link`}>CTA Button Link</Label>
                <Input
                  id={`section-${index}-cta-link`}
                  value={section.ctaLink || ""}
                  onChange={(e) => updateSection(index, { ctaLink: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`section-${index}-secondary-cta-text`}>Secondary CTA Text</Label>
                <Input
                  id={`section-${index}-secondary-cta-text`}
                  value={section.secondaryCtaText || ""}
                  onChange={(e) => updateSection(index, { secondaryCtaText: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`section-${index}-secondary-cta-link`}>Secondary CTA Link</Label>
                <Input
                  id={`section-${index}-secondary-cta-link`}
                  value={section.secondaryCtaLink || ""}
                  onChange={(e) => updateSection(index, { secondaryCtaLink: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3">Section Settings</h4>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`section-${index}-text-color`}>Text Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: section.settings?.textColor || "#ffffff" }}
                    ></div>
                    <Input
                      id={`section-${index}-text-color`}
                      type="text"
                      value={section.settings?.textColor || "#ffffff"}
                      onChange={(e) => updateSectionSettings(index, { textColor: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-overlay-opacity`}>
                    Overlay Opacity: {section.settings?.overlayOpacity || 60}%
                  </Label>
                  <Slider
                    id={`section-${index}-overlay-opacity`}
                    defaultValue={[section.settings?.overlayOpacity || 60]}
                    max={100}
                    step={5}
                    onValueChange={(value) => updateSectionSettings(index, { overlayOpacity: value[0] })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`section-${index}-height`}>Height</Label>
                  <select
                    id={`section-${index}-height`}
                    value={section.settings?.height || "medium"}
                    onChange={(e) => updateSectionSettings(index, { height: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="tall">Tall</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-alignment`}>Content Alignment</Label>
                  <select
                    id={`section-${index}-alignment`}
                    value={section.settings?.alignment || "left"}
                    onChange={(e) => updateSectionSettings(index, { alignment: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case "content":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`section-${index}-title`}>Section Title</Label>
              <Input
                id={`section-${index}-title`}
                value={section.title || ""}
                onChange={(e) => updateSection(index, { title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`section-${index}-content`}>Content</Label>
              <Textarea
                id={`section-${index}-content`}
                value={section.content || ""}
                onChange={(e) => updateSection(index, { content: e.target.value })}
                className="mt-1 min-h-[200px]"
              />
            </div>

            <div>
              <Label htmlFor={`section-${index}-image`}>Image</Label>
              <div className="flex items-center mt-1">
                <div className="relative w-32 h-20 border border-gray-300 rounded-md overflow-hidden mr-4">
                  {section.image ? (
                    <img
                      src={section.image || "/placeholder.svg"}
                      alt="Section"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button type="button" className="bg-[#1a3c61]">
                  Select Image
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`section-${index}-cta-text`}>CTA Button Text</Label>
                <Input
                  id={`section-${index}-cta-text`}
                  value={section.ctaText || ""}
                  onChange={(e) => updateSection(index, { ctaText: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`section-${index}-cta-link`}>CTA Button Link</Label>
                <Input
                  id={`section-${index}-cta-link`}
                  value={section.ctaLink || ""}
                  onChange={(e) => updateSection(index, { ctaLink: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3">Section Settings</h4>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`section-${index}-layout`}>Layout</Label>
                  <select
                    id={`section-${index}-layout`}
                    value={section.settings?.layout || "image-right"}
                    onChange={(e) => updateSectionSettings(index, { layout: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="image-left">Image Left</option>
                    <option value="image-right">Image Right</option>
                    <option value="image-top">Image Top</option>
                    <option value="image-bottom">Image Bottom</option>
                    <option value="text-only">Text Only</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-bg-color`}>Background Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: section.settings?.backgroundColor || "#ffffff" }}
                    ></div>
                    <Input
                      id={`section-${index}-bg-color`}
                      type="text"
                      value={section.settings?.backgroundColor || "#ffffff"}
                      onChange={(e) => updateSectionSettings(index, { backgroundColor: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-text-color`}>Text Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: section.settings?.textColor || "#1a3c61" }}
                    ></div>
                    <Input
                      id={`section-${index}-text-color`}
                      type="text"
                      value={section.settings?.textColor || "#1a3c61"}
                      onChange={(e) => updateSectionSettings(index, { textColor: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-padding`}>Padding</Label>
                  <select
                    id={`section-${index}-padding`}
                    value={section.settings?.padding || "medium"}
                    onChange={(e) => updateSectionSettings(index, { padding: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case "services":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`section-${index}-title`}>Section Title</Label>
              <Input
                id={`section-${index}-title`}
                value={section.title || ""}
                onChange={(e) => updateSection(index, { title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`section-${index}-subtitle`}>Subtitle</Label>
              <Textarea
                id={`section-${index}-subtitle`}
                value={section.subtitle || ""}
                onChange={(e) => updateSection(index, { subtitle: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Services</Label>
              <div className="mt-1 border border-gray-300 rounded-md">
                {section.services?.map((service: string, serviceIndex: number) => (
                  <div key={serviceIndex} className="flex items-center p-2 border-b border-gray-200 last:border-b-0">
                    <Input
                      value={service}
                      onChange={(e) => {
                        const updatedServices = [...(section.services || [])]
                        updatedServices[serviceIndex] = e.target.value
                        updateSection(index, { services: updatedServices })
                      }}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-red-500"
                      onClick={() => {
                        const updatedServices = [...(section.services || [])]
                        updatedServices.splice(serviceIndex, 1)
                        updateSection(index, { services: updatedServices })
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="p-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const updatedServices = [...(section.services || []), "New Service"]
                      updateSection(index, { services: updatedServices })
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Service
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`section-${index}-cta-text`}>CTA Button Text</Label>
                <Input
                  id={`section-${index}-cta-text`}
                  value={section.ctaText || ""}
                  onChange={(e) => updateSection(index, { ctaText: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`section-${index}-cta-link`}>CTA Button Link</Label>
                <Input
                  id={`section-${index}-cta-link`}
                  value={section.ctaLink || ""}
                  onChange={(e) => updateSection(index, { ctaLink: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3">Section Settings</h4>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`section-${index}-columns`}>Columns</Label>
                  <select
                    id={`section-${index}-columns`}
                    value={section.settings?.columns || 3}
                    onChange={(e) => updateSectionSettings(index, { columns: Number.parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={1}>1 Column</option>
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                    <option value={4}>4 Columns</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-bg-color`}>Background Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: section.settings?.backgroundColor || "#ffffff" }}
                    ></div>
                    <Input
                      id={`section-${index}-bg-color`}
                      type="text"
                      value={section.settings?.backgroundColor || "#ffffff"}
                      onChange={(e) => updateSectionSettings(index, { backgroundColor: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-text-color`}>Text Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: section.settings?.textColor || "#1a3c61" }}
                    ></div>
                    <Input
                      id={`section-${index}-text-color`}
                      type="text"
                      value={section.settings?.textColor || "#1a3c61"}
                      onChange={(e) => updateSectionSettings(index, { textColor: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-card-style`}>Card Style</Label>
                  <select
                    id={`section-${index}-card-style`}
                    value={section.settings?.cardStyle || "shadow"}
                    onChange={(e) => updateSectionSettings(index, { cardStyle: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="shadow">Shadow</option>
                    <option value="border">Border</option>
                    <option value="flat">Flat</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case "locations":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`section-${index}-title`}>Section Title</Label>
              <Input
                id={`section-${index}-title`}
                value={section.title || ""}
                onChange={(e) => updateSection(index, { title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor={`section-${index}-subtitle`}>Subtitle</Label>
              <Textarea
                id={`section-${index}-subtitle`}
                value={section.subtitle || ""}
                onChange={(e) => updateSection(index, { subtitle: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Locations</Label>
              <div className="mt-1 border border-gray-300 rounded-md">
                {section.locations?.map((location: any, locationIndex: number) => (
                  <div key={locationIndex} className="p-2 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <Input
                        value={location.name}
                        onChange={(e) => {
                          const updatedLocations = [...(section.locations || [])]
                          updatedLocations[locationIndex] = { ...location, name: e.target.value }
                          updateSection(index, { locations: updatedLocations })
                        }}
                        placeholder="Location name"
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-red-500"
                        onClick={() => {
                          const updatedLocations = [...(section.locations || [])]
                          updatedLocations.splice(locationIndex, 1)
                          updateSection(index, { locations: updatedLocations })
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <div className="relative w-16 h-16 border border-gray-300 rounded-md overflow-hidden mr-2">
                        {location.image ? (
                          <img
                            src={location.image || "/placeholder.svg"}
                            alt={location.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <ImageIcon className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        Select Image
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="p-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const updatedLocations = [
                        ...(section.locations || []),
                        {
                          name: "New Location",
                          image: "/placeholder.svg?height=400&width=600&text=New+Location",
                        },
                      ]
                      updateSection(index, { locations: updatedLocations })
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Location
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`section-${index}-cta-text`}>CTA Button Text</Label>
                <Input
                  id={`section-${index}-cta-text`}
                  value={section.ctaText || ""}
                  onChange={(e) => updateSection(index, { ctaText: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`section-${index}-cta-link`}>CTA Button Link</Label>
                <Input
                  id={`section-${index}-cta-link`}
                  value={section.ctaLink || ""}
                  onChange={(e) => updateSection(index, { ctaLink: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3">Section Settings</h4>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`section-${index}-columns`}>Columns</Label>
                  <select
                    id={`section-${index}-columns`}
                    value={section.settings?.columns || 4}
                    onChange={(e) => updateSectionSettings(index, { columns: Number.parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                    <option value={4}>4 Columns</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-bg-color`}>Background Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: section.settings?.backgroundColor || "#f9fafb" }}
                    ></div>
                    <Input
                      id={`section-${index}-bg-color`}
                      type="text"
                      value={section.settings?.backgroundColor || "#f9fafb"}
                      onChange={(e) => updateSectionSettings(index, { backgroundColor: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`section-${index}-text-color`}>Text Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: section.settings?.textColor || "#1a3c61" }}
                    ></div>
                    <Input
                      id={`section-${index}-text-color`}
                      type="text"
                      value={section.settings?.textColor || "#1a3c61"}
                      onChange={(e) => updateSectionSettings(index, { textColor: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-4 bg-gray-50 rounded-md text-center">
            <p>Editor not available for this section type.</p>
          </div>
        )
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c61]">{id ? `Edit Page: ${title}` : "Add New Page"}</h1>
          <p className="text-gray-600">{id ? "Update page content and settings" : "Create a new page"}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
          <Button className="bg-[#1a3c61]" onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {isSaved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Page saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="content">
            <TabsList className="mb-6">
              <TabsTrigger value="content">
                <Layout className="h-4 w-4 mr-2" /> Page Builder
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" /> Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <Card className="p-6 mb-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-base">
                      Page Title
                    </Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="slug" className="text-base">
                      URL Slug
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button type="button" onClick={handleGenerateSlug} className="rounded-l-none bg-[#1a3c61]">
                        Generate
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Full URL: https://yourdomain.com{slug === "/" ? "" : slug}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Section Builder */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-[#1a3c61]">Page Sections</h2>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="bg-[#1a3c61]">
                        <Plus className="h-4 w-4 mr-2" /> Add Section
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                      <div className="space-y-2">
                        <h3 className="font-medium mb-2">Choose Section Type</h3>
                        <Button variant="outline" className="w-full justify-start" onClick={() => addSection("hero")}>
                          Hero Section
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => addSection("content")}
                        >
                          Content Section
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => addSection("services")}
                        >
                          Services Grid
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => addSection("testimonials")}
                        >
                          Testimonials
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => addSection("team")}>
                          Team Members
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => addSection("locations")}
                        >
                          Locations Grid
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => addSection("cta")}>
                          Call to Action
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {sections.length === 0 ? (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
                    <p className="text-gray-500 mb-4">No sections added yet</p>
                    <Button variant="outline" onClick={() => addSection("hero")}>
                      <Plus className="h-4 w-4 mr-2" /> Add Your First Section
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sections.map((section, index) => (
                      <Card
                        key={section.id}
                        className={`overflow-hidden ${activeSection === index ? "ring-2 ring-[#4BB4E6]" : ""}`}
                      >
                        <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mr-2"
                              onClick={() => setActiveSection(activeSection === index ? null : index)}
                            >
                              {activeSection === index ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <span className="font-medium capitalize">{section.type} Section</span>
                            {section.title && <span className="ml-2 text-gray-500 text-sm">- {section.title}</span>}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(index, "up")}
                              disabled={index === 0}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(index, "down")}
                              disabled={index === sections.length - 1}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => duplicateSection(index)}>
                                  <Copy className="h-4 w-4 mr-2" /> Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => removeSection(index)}>
                                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {activeSection === index && <div className="p-4">{renderSectionEditor(section, index)}</div>}
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="meta-title" className="text-base">
                      Meta Title
                    </Label>
                    <Input id="meta-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" />
                    <p className="text-sm text-gray-500 mt-1">{title.length} characters (Recommended: 50-60)</p>
                  </div>

                  <div>
                    <Label htmlFor="meta-description" className="text-base">
                      Meta Description
                    </Label>
                    <Textarea
                      id="meta-description"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {metaDescription.length} characters (Recommended: 150-160)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="meta-keywords" className="text-base">
                      Meta Keywords
                    </Label>
                    <Input
                      id="meta-keywords"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      className="mt-1"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Page Settings</h3>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="status" className="text-base">
                          Status
                        </Label>
                        <select
                          id="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-in-navigation" className="text-base">
                          Show in Navigation
                        </Label>
                        <Switch id="show-in-navigation" defaultChecked={true} />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-in-footer" className="text-base">
                          Show in Footer
                        </Label>
                        <Switch id="show-in-footer" defaultChecked={false} />
                      </div>

                      <div>
                        <Label htmlFor="parent-page" className="text-base">
                          Parent Page
                        </Label>
                        <select
                          id="parent-page"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">None (Top Level)</option>
                          <option value="about">About Us</option>
                          <option value="services">Services</option>
                          <option value="locations">Locations</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card className="p-6">
                <div className="bg-gray-100 border border-gray-300 rounded-md p-4 text-center">
                  <p className="text-gray-500 mb-4">Preview will be available here</p>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" /> Open Preview in New Tab
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4">Page Options</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="status-sidebar" className="text-sm">
                  Status
                </Label>
                <select
                  id="status-sidebar"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-[#1a3c61] mb-2" onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save Page"}
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" /> Preview
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-3">Page Theme</h4>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="primary-color" className="text-sm">
                    Primary Color
                  </Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: "#1a3c61" }}
                    ></div>
                    <Input id="primary-color" type="text" value="#1a3c61" className="rounded-l-none" readOnly />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondary-color" className="text-sm">
                    Secondary Color
                  </Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                      style={{ backgroundColor: "#4BB4E6" }}
                    ></div>
                    <Input id="secondary-color" type="text" value="#4BB4E6" className="rounded-l-none" readOnly />
                  </div>
                </div>

                <div>
                  <Label htmlFor="font-family" className="text-sm">
                    Font Family
                  </Label>
                  <select
                    id="font-family"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="inter">Inter (Default)</option>
                    <option value="roboto">Roboto</option>
                    <option value="open-sans">Open Sans</option>
                    <option value="montserrat">Montserrat</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-3">Quick Actions</h4>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Palette className="h-4 w-4 mr-2" /> Customize Theme
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" /> Manage Media
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Settings className="h-4 w-4 mr-2" /> Advanced Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
