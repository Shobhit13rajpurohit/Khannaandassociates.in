import type React from "react"
import "./globals.css"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import ConditionalLayout from "@/components/conditional-layout"

const inter = Inter({ subsets: ["latin"] })

// Define the JSON-LD Schema data in a separate variable for cleanliness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Khanna and Associates",
  image: "https://www.khannaandassociates.com/logo.png",
  url: "https://www.khannaandassociates.com",
  telephone: "+91946162007",
  description:
    "Top law firm in Delhi, Jaipur and Dehradun providing expert legal services since 1948.",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "123 Legal Avenue",
      addressLocality: "New Delhi",
      postalCode: "110001",
      addressCountry: "IN",
      addressRegion: "Delhi",
      name: "Khanna and Associates - Delhi Office",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "101 Pink City Road",
      addressLocality: "Jaipur",
      postalCode: "302001",
      addressCountry: "IN",
      addressRegion: "Rajasthan",
      name: "Khanna and Associates - Jaipur Office",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "202 Rajpur Road",
      addressLocality: "Dehradun",
      postalCode: "248001",
      addressCountry: "IN",
      addressRegion: "Uttarakhand",
      name: "Khanna and Associates - Dehradun Office",
    },
  ],
  geo: { "@type": "GeoCoordinates", latitude: 28.6139, longitude: 77.209 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/khannaandassociates",
    "https://www.linkedin.com/company/khanna-and-associates",
    "https://twitter.com/khannaassociates",
  ],
  priceRange: "$",
  foundingDate: "1948",
  areaServed: [
    "Delhi",
    "Jaipur",
    "Dehradun",
    "Mumbai",
    "Bangalore",
    "Gurgaon",
    "New York",
    "London",
  ],
  serviceType: [
    "Corporate Law",
    "Intellectual Property",
    "Banking and Finance",
    "Litigation",
    "Real Estate",
  ],
  award: "Top Rated Law Firm in Jaipur, Delhi and Dehradun",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate and Commercial Law Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intellectual Property Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Litigation and Dispute Resolution",
        },
      },
    ],
  },
}

export const metadata: Metadata = {
  title: "Khanna and Associates - Legal Services",
  description:
    "Providing expert legal counsel across multiple practice areas with a commitment to integrity and client success.",
  keywords:
    "law firm in Jaipur, law firm in Delhi, law firm in Dehradun, best law firm in Jaipur, top law firm in Jaipur, legal services, attorneys, lawyers, Khanna and Associates, corporate law, intellectual property, banking and finance, litigation",
  openGraph: {
    title: "Khanna and Associates - Top Law Firm in Delhi, Jaipur & Dehradun",
    description:
      "Premier legal services across India with offices in Delhi, Jaipur, Dehradun and more. Trusted legal excellence since 1948.",
    url: "https://www.khannaandassociates.com",
    siteName: "Khanna and Associates",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khanna and Associates - Top Law Firm in Delhi, Jaipur & Dehradun",
    description:
      "Premier legal services across India with offices in Delhi, Jaipur, Dehradun and more. Trusted legal excellence since 1948.",
  },
  alternates: {
    canonical: "https://www.khannaandassociates.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "",
  // You can place your favicon here, or simply add an icon.ico/svg file in the /app directory
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif?",
  },
  // Add the JSON-LD script here
  other: {
    "application/ld+json": JSON.stringify(jsonLd),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>
            <ConditionalLayout>{children}</ConditionalLayout>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}