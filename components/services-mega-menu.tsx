"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { getPublishedServices, type Service } from "@/lib/db"
import { useEffect, useState } from "react"

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export default function ServicesMegaMenu() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices = await getPublishedServices()
      setServices(fetchedServices)
    }
    fetchServices()
  }, [])

  const serviceCategories = React.useMemo(() => {
    const categories: { [key: string]: Service[] } = {
      "Corporate & Business": [],
      "Dispute Resolution": [],
      "Intellectual Property & Technology": [],
      "Real Estate & Infrastructure": [],
      "Regulatory & Compliance": [],
      "Other Practice Areas": [],
    }

    services.forEach((service) => {
      if (
        [
          "Corporate and Commercial",
          "Banking and Finance & Insurance",
          "Capital Markets",
          "Funds",
          "Financial Services & Fintech",
        ].includes(service.title)
      ) {
        categories["Corporate & Business"].push(service)
      } else if (
        ["Arbitration and Reconciliation", "Criminal & Civil", "Bankruptcy and Insolvency"].includes(service.title)
      ) {
        categories["Dispute Resolution"].push(service)
      } else if (
        ["Information Technology", "Intellectual Property", "Technology Media and Telecom"].includes(service.title)
      ) {
        categories["Intellectual Property & Technology"].push(service)
      } else if (["Real Estate", "Energy and Natural Resources"].includes(service.title)) {
        categories["Real Estate & Infrastructure"].push(service)
      } else if (["Competition/Antitrust", "Taxation (Direct and Indirect Taxation)"].includes(service.title)) {
        categories["Regulatory & Compliance"].push(service)
      } else {
        categories["Other Practice Areas"].push(service)
      }
    })

    return categories
  }, [services])

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/services"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">All Practice Areas</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Explore our comprehensive legal services.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {Object.entries(serviceCategories).map(
                ([category, items]) =>
                  items.length > 0 && (
                    <React.Fragment key={category}>
                      <li className="col-span-2 text-sm font-semibold text-gray-700 mt-2 mb-1">{category}</li>
                      {items.map((service) => (
                        <ListItem key={service.id} href={`/services/${service.slug}`} title={service.title}>
                          {service.description}
                        </ListItem>
                      ))}
                    </React.Fragment>
                  ),
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
