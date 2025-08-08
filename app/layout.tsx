import type React from "react"
import "./globals.css"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import ConditionalLayout from "@/components/conditional-layout"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
})

// Enhanced JSON-LD Schema with more comprehensive legal service data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "ProfessionalService", "LocalBusiness"],
  name: "Khanna and Associates",
  alternateName: "Khanna & Associates Law Firm",
  legalName: "Khanna and Associates Legal Services",
  image: [
    "https://www.khannaandassociates.com/logo.png",
    "https://www.khannaandassociates.com/office-exterior.jpg",
    "https://www.khannaandassociates.com/team-photo.jpg"
  ],
  logo: {
    "@type": "ImageObject",
    url: "https://www.khannaandassociates.com/logo.png",
    width: 300,
    height: 100
  },
  url: "https://www.khannaandassociates.com/",
  sameAs: [
    "https://www.facebook.com/khannaandassociates",
    "https://www.linkedin.com/company/khanna-and-associates",
    "https://twitter.com/khannaassociates",
    "https://www.youtube.com/channel/khannaassociates",
    "https://www.instagram.com/khannaassociates"
  ],
  telephone: ["+91946162007", "+91-11-4567-8900", "+91-141-2345-678"],
  email: "info@khannaandassociates.com",
  description: "Premier law firm in Delhi, Jaipur and Dehradun providing comprehensive legal services since 1948. Specializing in corporate law, intellectual property, banking & finance, litigation, and real estate law.",
  slogan: "Excellence in Legal Services Since 1948",
  foundingDate: "1948-01-01",
  founder: {
    "@type": "Person",
    name: "Late Amarnath Singh Khanna",
    description: "Highly successful lawyer specializing in criminal law, founder of Khanna & Associates in 1948"
  },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "123 Legal Avenue, Connaught Place",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
      name: "Khanna and Associates - Delhi Head Office",
      telephone: "+91-11-4567-8900"
    },
    {
      "@type": "PostalAddress",
      streetAddress: "101 Pink City Road, Civil Lines",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan", 
      postalCode: "302001",
      addressCountry: "IN",
      name: "Khanna and Associates - Jaipur Branch",
      telephone: "+91-141-2345-678"
    },
    {
      "@type": "PostalAddress",
      streetAddress: "202 Rajpur Road, Race Course",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      postalCode: "248001", 
      addressCountry: "IN",
      name: "Khanna and Associates - Dehradun Branch",
      telephone: "+91-135-2345-789"
    }
  ],
  geo: [
    {
      "@type": "GeoCoordinates",
      latitude: 28.6139,
      longitude: 77.209,
      name: "Delhi Office Location"
    },
    {
      "@type": "GeoCoordinates", 
      latitude: 26.9124,
      longitude: 75.7873,
      name: "Jaipur Office Location"
    },
    {
      "@type": "GeoCoordinates",
      latitude: 30.3165,
      longitude: 78.0322,
      name: "Dehradun Office Location"
    }
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
      validFrom: "2024-01-01",
      validThrough: "2025-12-31"
    },
    {
      "@type": "OpeningHoursSpecification", 
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
      validFrom: "2024-01-01",
      validThrough: "2025-12-31"
    }
  ],
  priceRange: "$$",
  currenciesAccepted: "INR, USD, EUR",
  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "Check"],
  areaServed: [
    {
      "@type": "City",
      name: "Delhi",
      "@id": "https://en.wikipedia.org/wiki/Delhi"
    },
    {
      "@type": "City", 
      name: "Jaipur",
      "@id": "https://en.wikipedia.org/wiki/Jaipur"
    },
    {
      "@type": "City",
      name: "Dehradun", 
      "@id": "https://en.wikipedia.org/wiki/Dehradun"
    },
    {
      "@type": "City",
      name: "Mumbai"
    },
    {
      "@type": "City",
      name: "Bangalore"
    },
    {
      "@type": "City",
      name: "Gurgaon"
    },
    {
      "@type": "City",
      name: "New York"
    },
    {
      "@type": "City", 
      name: "London"
    }
  ],
  serviceType: [
    "Corporate and Commercial Law",
    "Intellectual Property Rights",
    "Banking and Finance Law",
    "Civil and Criminal Litigation", 
    "Real Estate and Property Law",
    "Labor and Employment Law",
    "Arbitration and Mediation",
    "Mergers and Acquisitions",
    "Regulatory Compliance",
    "Tax Law"
  ],
  award: [
    "Top Rated Law Firm in Jaipur, Delhi and Dehradun",
    "Best Corporate Law Firm - India Legal Awards 2023",
    "Excellence in Legal Services - Legal Era Awards 2024"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1"
  },
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "Amit Sharma"
      },
      reviewBody: "Khanna and Associates provided exceptional counsel during our company's merger. Their expertise in corporate law was invaluable.",
      datePublished: "2024-11-15"
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating", 
        ratingValue: "5",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "Priya Patel"
      },
      reviewBody: "The team's knowledge of banking and finance law helped us navigate complex regulatory challenges with confidence.",
      datePublished: "2024-10-22"
    }
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services Portfolio",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate and Commercial Law Services",
          description: "Comprehensive corporate legal services including company formation, compliance, M&A, and commercial contracts",
          provider: {
            "@type": "LegalService",
            name: "Khanna and Associates"
          }
        },
        category: "Corporate Law"
      },
      {
        "@type": "Offer", 
        itemOffered: {
          "@type": "Service",
          name: "Intellectual Property Services",
          description: "Complete IP protection including trademarks, patents, copyrights, and IP litigation",
          provider: {
            "@type": "LegalService",
            name: "Khanna and Associates" 
          }
        },
        category: "Intellectual Property"
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Litigation and Dispute Resolution",
          description: "Expert litigation services in civil, criminal, and commercial disputes across all courts and tribunals",
          provider: {
            "@type": "LegalService",
            name: "Khanna and Associates"
          }
        },
        category: "Litigation"
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service", 
          name: "Banking and Finance Law",
          description: "Specialized legal services for banking, finance, securities, and regulatory compliance matters",
          provider: {
            "@type": "LegalService",
            name: "Khanna and Associates"
          }
        },
        category: "Banking & Finance"
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Real Estate and Property Law", 
          description: "Complete real estate legal services including property transactions, disputes, and regulatory matters",
          provider: {
            "@type": "LegalService",
            name: "Khanna and Associates"
          }
        },
        category: "Real Estate"
      }
    ]
  },
  knowsAbout: [
    "Indian Corporate Law",
    "Intellectual Property Rights",
    "Banking Regulations",
    "Civil Procedure Code", 
    "Criminal Procedure Code",
    "Real Estate Law",
    "Labor Law",
    "Tax Law",
    "International Commercial Law",
    "Arbitration",
    "SEBI Regulations",
    "RBI Guidelines",
    "Competition Law",
    "Environmental Law",
    "Foreign Investment Law"
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Free Legal Consultation",
      description: "Complimentary 30-minute legal consultation for new clients"
    },
    price: "0",
    priceCurrency: "INR",
    validThrough: "2025-12-31"
  },
  employee: [
    {
      "@type": "Person",
      name: "Senior Partner",
      jobTitle: "Managing Partner",
      workLocation: "Delhi"
    },
    {
      "@type": "Person", 
      name: "Associate Partner",
      jobTitle: "Corporate Law Partner",
      workLocation: "Jaipur"
    }
  ],
  memberOf: [
    {
      "@type": "Organization",
      name: "Bar Council of India"
    },
    {
      "@type": "Organization", 
      name: "Delhi High Court Bar Association"
    },
    {
      "@type": "Organization",
      name: "Rajasthan High Court Bar Association"
    }
  ]
}

export const metadata: Metadata = {
  // Enhanced title with location targeting
  title: {
    template: '%s | Khanna and Associates - Top Law Firm in Delhi, Jaipur & Dehradun',
    default: 'Khanna and Associates - Best Law Firm in Delhi, Jaipur & Dehradun | Legal Services Since 1948'
  },
  // Enhanced description with local SEO focus
  description: "Premier law firm in Delhi, Jaipur & Dehradun since 1948. Expert legal services in corporate law, IP, litigation, banking & finance. Top-rated attorneys with 75+ years of excellence. Free consultation available.",
  // Comprehensive keywords including long-tail and local
  keywords: [
    // Primary location + service keywords
    "law firm in Delhi", "law firm in Jaipur", "law firm in Dehradun",
    "best law firm in Delhi", "top law firm in Jaipur", "leading law firm in Dehradun",
    "lawyers in Delhi", "attorneys in Jaipur", "legal services in Dehradun",
    
    // Service-specific keywords
    "corporate law firm Delhi", "IP lawyers Jaipur", "litigation attorneys Dehradun",
    "banking law firm India", "commercial lawyers Delhi", "real estate lawyers Jaipur",
    
    // Long-tail keywords
    "best corporate law firm in Delhi NCR", "top intellectual property lawyers in Jaipur",
    "experienced litigation attorneys in Dehradun", "banking and finance lawyers in India",
    
    // Brand and reputation keywords
    "Khanna and Associates", "Khanna Associates law firm", "established law firm since 1948",
    "trusted legal services India", "award winning law firm Delhi",
    
    // Practice area specific
    "M&A lawyers India", "trademark registration Delhi", "civil litigation Jaipur",
    "criminal lawyers Dehradun", "property dispute lawyers", "employment law firm India",
    
    // Local business keywords  
    "law office Delhi", "legal consultation Jaipur", "attorney services Dehradun",
    "legal advice India", "court representation Delhi", "legal documentation services"
  ].join(", "),
  
  // Enhanced OpenGraph with multiple images and rich data
  openGraph: {
    title: "Khanna and Associates - Premier Law Firm in Delhi, Jaipur & Dehradun Since 1948",
    description: "India's trusted legal excellence for 75+ years. Expert services in corporate law, IP, litigation & more. Free consultation. Offices in Delhi, Jaipur, Dehradun.",
    url: "https://www.khannaandassociates.com/",
    siteName: "Khanna and Associates Law Firm",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.khannaandassociates.com/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "Khanna and Associates - Premier Law Firm in Delhi, Jaipur & Dehradun"
      },
      {
        url: "https://www.khannaandassociates.com/og-image-office.jpg", 
        width: 1200,
        height: 630,
        alt: "Khanna and Associates Law Firm Office"
      },
      {
        url: "https://www.khannaandassociates.com/og-image-team.jpg",
        width: 1200, 
        height: 630,
        alt: "Khanna and Associates Legal Team"
      }
    ],
    // Additional OpenGraph properties
    emails: ["info@khannaandassociates.com", "contact@khannaandassociates.com"],
    phoneNumbers: ["+91946162007", "+91-11-4567-8900", "+91-141-2345-678"],
    faxNumbers: ["+91-11-4567-8901"],
    countryName: "India"
  },
  
  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@khannaassociates",
    creator: "@khannaassociates", 
    title: "Khanna and Associates - Top Law Firm in Delhi, Jaipur & Dehradun",
    description: "75+ years of legal excellence in India. Expert corporate law, IP, litigation services. Free consultation available. Trusted by 1000+ clients.",
    images: ["https://www.khannaandassociates.com/twitter-card-image.jpg"]
  },
  
  // Canonical and alternate URLs
  alternates: {
    canonical: "https://www.khannaandassociates.com/",
    languages: {
      'en-IN': 'https://www.khannaandassociates.com/',
      'hi-IN': 'https://www.khannaandassociates.com/hi/',
    }
  },
  
  // Enhanced robots with specific directives
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    notranslate: false,
    indexifembedded: true,
    'max-video-preview': -1,
    'max-image-preview': 'large', 
    'max-snippet': -1,
    googleBot: {
      index: true,
      follow: true,
      noarchive: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Additional metadata
  generator: "Next.js",
  applicationName: "Khanna and Associates Law Firm",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Khanna and Associates", url: "https://www.khannaandassociates.com" }],
  creator: "Khanna and Associates",
  publisher: "Khanna and Associates",
  category: "Legal Services",
  classification: "Business",
  
  // Verification tags for search consoles
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code", 
    yahoo: "your-yahoo-verification-code",
    other: {
      "bing-site-verification": "your-bing-verification-code",
      "facebook-domain-verification": "your-facebook-verification-code"
    }
  },
  
  // App-specific metadata
  appleWebApp: {
    capable: true,
    title: "Khanna & Associates",
    statusBarStyle: "black-translucent"
  },
  
  // Favicons and icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#1a3c61"
      }
    ]
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Additional metadata for better SEO
  other: {
    "application/ld+json": JSON.stringify(jsonLd),
    "geo.region": "IN-DL,IN-RJ,IN-UT",
    "geo.placename": "Delhi, Jaipur, Dehradun", 
    "geo.position": "28.6139;77.209",
    "ICBM": "28.6139, 77.209",
    "DC.title": "Khanna and Associates - Top Law Firm",
    "DC.subject": "Legal Services, Corporate Law, Intellectual Property",
    "DC.creator": "Khanna and Associates",
    "DC.publisher": "Khanna and Associates",
    "DC.description": "Premier law firm providing expert legal services since 1948",
    "DC.language": "en-IN",
    "DC.coverage": "India",
    "rating": "General",
    "distribution": "Global",
    "revisit-after": "7 days",
    "expires": "never"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
          as="image"
        />
        <link
          rel="preload"
          href={inter.className}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1a3c61" />
        <meta name="msapplication-TileColor" content="#1a3c61" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        
        {/* Additional mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Prevent automatic phone number detection */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Referrer policy */}
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Additional SEO meta tags */}
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Hreflang for international SEO */}
        <link rel="alternate" hrefLang="en-in" href="https://www.khannaandassociates.com/" />
        <link rel="alternate" hrefLang="hi-in" href="https://www.khannaandassociates.com/hi/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.khannaandassociates.com/" />
      </head>
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