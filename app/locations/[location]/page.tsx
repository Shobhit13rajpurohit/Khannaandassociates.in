import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Globe, Users, Building } from "lucide-react"
import Link from "next/link"

// Location data
const locationData: Record<
  string,
  {
    city: string
    country: string
    address: string
    phone: string
    email: string
    image: string
    mapImage: string
    description: string
    teamSize: string
    established: string
    practiceAreas: string[]
    officeHours: {
      weekdays: string
      saturday: string
      sunday: string
    }
    teamMembers: Array<{
      name: string
      position: string
      image: string
    }>
  }
> = {
  delhi: {
    city: "Delhi",
    country: "India",
    address: "123 Legal Avenue, New Delhi, 110001",
    phone: "+91 11 2345 6789",
    email: "delhi@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2031",
    description:
      "Our Delhi office serves as the headquarters of Khanna and Associates, established in 1948. Located in the heart of New Delhi, our team of experienced attorneys provides comprehensive legal services across all practice areas.",
    teamSize: "50+ Attorneys",
    established: "1948",
    practiceAreas: [
      "Corporate and Commercial",
      "Litigation",
      "Intellectual Property",
      "Banking and Finance",
      "Real Estate",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Rajiv Khanna",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974",
      },
      {
        name: "Priya Sharma",
        position: "Managing Partner",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
      },
      {
        name: "Vikram Mehta",
        position: "Partner, Banking & Finance",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      },
    ],
  },
  mumbai: {
    city: "Mumbai",
    country: "India",
    address: "456 Marine Drive, Mumbai, 400001",
    phone: "+91 22 2345 6789",
    email: "mumbai@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2065",
    description:
      "Our Mumbai office specializes in corporate law, banking and finance, and maritime law. Located in the financial capital of India, our team works with major corporations and financial institutions.",
    teamSize: "35+ Attorneys",
    established: "1985",
    practiceAreas: [
      "Corporate and Commercial",
      "Banking and Finance",
      "Maritime Law",
      "Capital Markets",
      "Mergers and Acquisitions",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Anil Kapoor",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
      },
      {
        name: "Meera Patel",
        position: "Partner, Corporate Law",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
      },
      {
        name: "Rahul Singh",
        position: "Partner, Banking & Finance",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
      },
    ],
  },
  bangalore: {
    city: "Bangalore",
    country: "India",
    address: "789 MG Road, Bangalore, 560001",
    phone: "+91 80 2345 6789",
    email: "bangalore@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2148",
    mapImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2148",
    description:
      "Our Bangalore office focuses on technology law, intellectual property, and startup advisory services. Located in India's Silicon Valley, our team works with tech companies and startups.",
    teamSize: "25+ Attorneys",
    established: "2000",
    practiceAreas: ["Technology Law", "Intellectual Property", "Startup Advisory", "Venture Capital", "Data Privacy"],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Kiran Kumar",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
      },
      {
        name: "Divya Reddy",
        position: "Partner, IP Law",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
      },
      {
        name: "Arjun Nair",
        position: "Partner, Technology Law",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974",
      },
    ],
  },
  jaipur: {
    city: "Jaipur",
    country: "India",
    address: "101 Pink City Road, Jaipur, 302001",
    phone: "+91 141 2345 6789",
    email: "jaipur@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070",
    description:
      "Our Jaipur office specializes in real estate law, heritage property matters, and tourism law. Located in the historic Pink City, our team provides expert legal counsel to businesses and individuals.",
    teamSize: "15+ Attorneys",
    established: "2005",
    practiceAreas: [
      "Real Estate",
      "Heritage Property Law",
      "Tourism Law",
      "Commercial Contracts",
      "Dispute Resolution",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Deepak Sharma",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
      },
      {
        name: "Sunita Agarwal",
        position: "Partner, Real Estate",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974",
      },
    ],
  },
  dehradun: {
    city: "Dehradun",
    country: "India",
    address: "202 Rajpur Road, Dehradun, 248001",
    phone: "+91 135 2345 6789",
    email: "dehradun@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070",
    description:
      "Our Dehradun office focuses on environmental law, forest rights, and land acquisition matters. Located in the serene capital of Uttarakhand, our team works on cases related to natural resources and environmental protection.",
    teamSize: "10+ Attorneys",
    established: "2010",
    practiceAreas: [
      "Environmental Law",
      "Forest Rights",
      "Land Acquisition",
      "Natural Resources",
      "Administrative Law",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Alok Rawat",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921",
      },
      {
        name: "Nandini Joshi",
        position: "Partner, Environmental Law",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976",
      },
    ],
  },
  gurgaon: {
    city: "Gurgaon",
    country: "India",
    address: "303 Cyber City, Gurgaon, 122001",
    phone: "+91 124 2345 6789",
    email: "gurgaon@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1586592707296-1fc0bc662df3?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1586592707296-1fc0bc662df3?q=80&w=2070",
    description:
      "Our Gurgaon office specializes in corporate law, employment law, and IT/ITES sector advisory. Located in the corporate hub near Delhi, our team works with multinational corporations and tech companies.",
    teamSize: "20+ Attorneys",
    established: "2008",
    practiceAreas: [
      "Corporate Law",
      "Employment Law",
      "IT/ITES Advisory",
      "Foreign Investment",
      "Commercial Contracts",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "Sanjay Gupta",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2080",
      },
      {
        name: "Ritu Malhotra",
        position: "Partner, Employment Law",
        image: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?q=80&w=1974",
      },
    ],
  },
  "new-york": {
    city: "New York",
    country: "USA",
    address: "404 Madison Avenue, New York, NY 10022",
    phone: "+1 212 345 6789",
    email: "newyork@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070",
    description:
      "Our New York office focuses on international business transactions, cross-border litigation, and US immigration law. Located in the heart of Manhattan, our team serves clients with global interests.",
    teamSize: "15+ Attorneys",
    established: "2012",
    practiceAreas: [
      "International Business",
      "Cross-Border Litigation",
      "US Immigration",
      "Mergers & Acquisitions",
      "Securities Law",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "David Cohen",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974",
      },
      {
        name: "Sarah Johnson",
        position: "Partner, International Law",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070",
      },
    ],
  },
  london: {
    city: "London",
    country: "UK",
    address: "505 Baker Street, London, W1U 8EW",
    phone: "+44 20 7946 0321",
    email: "london@khannaandassociates.com",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
    mapImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
    description:
      "Our London office specializes in international arbitration, EU law, and UK immigration. Located in central London, our team provides expert legal counsel to clients with interests in Europe and the UK.",
    teamSize: "12+ Attorneys",
    established: "2015",
    practiceAreas: [
      "International Arbitration",
      "EU Law",
      "UK Immigration",
      "Commercial Contracts",
      "Financial Services",
    ],
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 1:00 PM",
      sunday: "Closed",
    },
    teamMembers: [
      {
        name: "James Wilson",
        position: "Senior Partner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      },
      {
        name: "Elizabeth Taylor",
        position: "Partner, EU Law",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071",
      },
    ],
  },
}

export default function LocationPage({ params }: { params: { location: string } }) {
  const location = params.location

  // Check if location exists in our data
  if (!locationData[location]) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-[#1a3c61] mb-6">Location Not Found</h1>
          <p className="text-gray-600 mb-8">The office location you're looking for doesn't exist or has been moved.</p>
          <Link href="/locations">
            <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">View All Locations</Button>
          </Link>
        </div>
      </div>
    )
  }

  const data = locationData[location]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1a3c61] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${data.image}')`,
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.city} Office</h1>
            <p className="text-xl mb-8">Khanna and Associates | {data.country}</p>
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-[#1a3c61]">About Our {data.city} Office</h2>
              <p className="text-gray-700 mb-8">{data.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Building className="h-6 w-6 text-[#4BB4E6] mr-2" />
                    <h3 className="font-semibold text-[#1a3c61]">Established</h3>
                  </div>
                  <p className="text-gray-700">{data.established}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Users className="h-6 w-6 text-[#4BB4E6] mr-2" />
                    <h3 className="font-semibold text-[#1a3c61]">Team Size</h3>
                  </div>
                  <p className="text-gray-700">{data.teamSize}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Globe className="h-6 w-6 text-[#4BB4E6] mr-2" />
                    <h3 className="font-semibold text-[#1a3c61]">Languages</h3>
                  </div>
                  <p className="text-gray-700">
                    English, Hindi,{" "}
                    {data.country === "USA" ? "Spanish" : data.country === "UK" ? "French" : "Regional Languages"}
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Practice Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {data.practiceAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#4BB4E6] rounded-full mr-2"></div>
                    <p className="text-gray-700">{area}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Key Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {data.teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#1a3c61]">{member.name}</h4>
                      <p className="text-gray-600 text-sm">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-[#1a3c61]">Location</h3>
              <div className="rounded-lg overflow-hidden h-[400px] relative mb-8">
                <Image
                  src={data.mapImage || "/placeholder.svg"}
                  alt={`Map of ${data.city} Office`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link href={`https://maps.google.com/?q=${encodeURIComponent(data.address)}`} target="_blank">
                    <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white">View on Google Maps</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#4BB4E6] mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{data.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{data.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-[#4BB4E6] mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{data.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-[#1a3c61]">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Monday - Friday:</p>
                      <p className="text-gray-700 font-medium">{data.officeHours.weekdays}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Saturday:</p>
                      <p className="text-gray-700 font-medium">{data.officeHours.saturday}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Sunday:</p>
                      <p className="text-gray-700 font-medium">{data.officeHours.sunday}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Button className="bg-[#4BB4E6] hover:bg-[#3a9fd1] text-white w-full mb-3">
                    Schedule a Consultation
                  </Button>
                  <Button variant="outline" className="w-full border-[#1a3c61] text-[#1a3c61]">
                    Contact This Office
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1a3c61] text-center">Our Other Locations</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(locationData)
              .filter(([key]) => key !== location)
              .slice(0, 4)
              .map(([key, loc]) => (
                <Link href={`/locations/${key}`} key={key} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-40">
                      <Image
                        src={loc.image || "/placeholder.svg"}
                        alt={`${loc.city} Office`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c61]/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-semibold text-white">{loc.city}</h3>
                        <p className="text-white/80">{loc.country}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/locations">
              <Button className="bg-[#1a3c61] hover:bg-[#132e4a] text-white px-6">View All Locations</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
