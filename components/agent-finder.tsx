"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Star, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Agent {
  id: string
  name: string
  title: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  distance: number
  rating: number
  reviewCount: number
  specialties: string[]
  hours: string
  avatar: string
  languages: string[]
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "State Farm Agent",
    phone: "(512) 555-0123",
    email: "sarah.johnson@statefarm.com",
    address: "1234 Main Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    distance: 0.8,
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Auto Claims", "Home Insurance", "Life Insurance"],
    hours: "Mon-Fri 9AM-6PM, Sat 9AM-2PM",
    avatar: "/placeholder.svg?height=60&width=60",
    languages: ["English", "Spanish"],
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "State Farm Agent",
    phone: "(512) 555-0456",
    email: "michael.chen@statefarm.com",
    address: "5678 Oak Avenue",
    city: "Austin",
    state: "TX",
    zipCode: "78704",
    distance: 2.3,
    rating: 4.8,
    reviewCount: 89,
    specialties: ["Auto Claims", "Commercial Insurance", "Renters Insurance"],
    hours: "Mon-Fri 8AM-7PM, Sat 10AM-4PM",
    avatar: "/placeholder.svg?height=60&width=60",
    languages: ["English", "Mandarin"],
  },
  {
    id: "3",
    name: "Jennifer Rodriguez",
    title: "State Farm Agent",
    phone: "(512) 555-0789",
    email: "jennifer.rodriguez@statefarm.com",
    address: "9012 Cedar Lane",
    city: "Austin",
    state: "TX",
    zipCode: "78745",
    distance: 4.1,
    rating: 4.7,
    reviewCount: 156,
    specialties: ["Auto Claims", "Home Insurance", "Business Insurance"],
    hours: "Mon-Fri 9AM-5PM, Sat 9AM-1PM",
    avatar: "/placeholder.svg?height=60&width=60",
    languages: ["English", "Spanish"],
  },
  {
    id: "4",
    name: "David Thompson",
    title: "State Farm Agent",
    phone: "(512) 555-0321",
    email: "david.thompson@statefarm.com",
    address: "3456 Pine Street",
    city: "Round Rock",
    state: "TX",
    zipCode: "78664",
    distance: 6.7,
    rating: 4.6,
    reviewCount: 203,
    specialties: ["Auto Claims", "Motorcycle Insurance", "Boat Insurance"],
    hours: "Mon-Fri 8AM-6PM, Sat 9AM-3PM",
    avatar: "/placeholder.svg?height=60&width=60",
    languages: ["English"],
  },
]

interface AgentFinderProps {
  isOpen: boolean
  onClose: () => void
  analysisResult?: any
}

export function AgentFinder({ isOpen, onClose, analysisResult }: AgentFinderProps) {
  const [zipCode, setZipCode] = useState("78701")
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setAgents(mockAgents)
    setIsSearching(false)
  }

  const handleCallAgent = (agent: Agent) => {
    window.open(`tel:${agent.phone}`, "_self")
  }

  const handleEmailAgent = (agent: Agent) => {
    const subject = encodeURIComponent("Vehicle Damage Claim Assistance")
    const body = encodeURIComponent(
      `Hello ${agent.name},\n\nI need assistance with a vehicle damage claim. ${
        analysisResult
          ? `My damage analysis shows $${analysisResult.totalRepairCost.toLocaleString()} in estimated repairs.`
          : ""
      }\n\nPlease contact me at your earliest convenience.\n\nThank you!`,
    )
    window.open(`mailto:${agent.email}?subject=${subject}&body=${body}`, "_self")
  }

  const handleGetDirections = (agent: Agent) => {
    const address = encodeURIComponent(`${agent.address}, ${agent.city}, ${agent.state} ${agent.zipCode}`)
    window.open(`https://maps.google.com?q=${address}`, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] bg-black/95 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/20 overflow-hidden">
        <CardHeader className="border-b border-red-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <MapPin className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">Find Your State Farm Agent</CardTitle>
                <CardDescription className="text-gray-400">
                  Connect with local agents who can help with your claim
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-red-500/20">
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Search Section */}
          <div className="mb-6">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Label className="text-white font-medium">ZIP Code</Label>
                <Input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter your ZIP code"
                  className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className="bg-red-600 hover:bg-red-700 text-white">
                {isSearching ? "Searching..." : "Find Agents"}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className="bg-black/40 border-red-500/20 hover:bg-black/60 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-red-500/30">
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-red-500/20 text-red-300 text-lg">
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{agent.name}</h3>
                          <p className="text-red-300 text-sm">{agent.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(agent.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-400 text-sm">
                              {agent.rating} ({agent.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-gray-400 text-sm mb-1">
                            <Navigation className="h-4 w-4 mr-1" />
                            {agent.distance} miles away
                          </div>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Available</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center text-gray-300 text-sm mb-2">
                            <MapPin className="h-4 w-4 mr-2 text-red-400" />
                            {agent.address}, {agent.city}, {agent.state} {agent.zipCode}
                          </div>
                          <div className="flex items-center text-gray-300 text-sm mb-2">
                            <Phone className="h-4 w-4 mr-2 text-red-400" />
                            {agent.phone}
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <Clock className="h-4 w-4 mr-2 text-red-400" />
                            {agent.hours}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <p className="text-gray-400 text-sm mb-1">Specialties:</p>
                            <div className="flex flex-wrap gap-1">
                              {agent.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-red-500/30 text-red-300">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Languages:</p>
                            <p className="text-gray-300 text-sm">{agent.languages.join(", ")}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleCallAgent(agent)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleEmailAgent(agent)}
                          className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                        >
                          Email
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleGetDirections(agent)}
                          className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="mt-6 p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg border border-red-500/20">
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-red-400" />
              <div>
                <h4 className="text-white font-semibold">Need Immediate Help?</h4>
                <p className="text-gray-300 text-sm">
                  Call State Farm 24/7 Claims Hotline:{" "}
                  <span className="font-semibold text-red-300">1-800-STATE-FARM</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
