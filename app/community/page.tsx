"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, TrendingUp, Car, DollarSign, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface CommunityPost {
  id: string
  user: {
    name: string
    avatar: string
    location: string
  }
  vehicle: {
    make: string
    model: string
    year: number
  }
  damage: {
    type: string
    location: string
    severity: "Minor" | "Moderate" | "Severe"
  }
  costs: {
    estimated: number
    actual: number
    payout: number
    deductible: number
  }
  images: string[]
  description: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
}

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX",
    },
    vehicle: {
      make: "Honda",
      model: "Civic",
      year: 2019,
    },
    damage: {
      type: "Rear-end collision",
      location: "Rear bumper",
      severity: "Moderate",
    },
    costs: {
      estimated: 1200,
      actual: 1350,
      payout: 850,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"],
    description:
      "Got rear-ended at a red light. AutoClaim estimated $1,200 but actual repair was $1,350. Still pretty accurate! Insurance covered most of it.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA",
    },
    vehicle: {
      make: "Tesla",
      model: "Model 3",
      year: 2021,
    },
    damage: {
      type: "Door ding",
      location: "Driver side door",
      severity: "Minor",
    },
    costs: {
      estimated: 450,
      actual: 425,
      payout: 0,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop"],
    description:
      "Small door ding from parking lot. AutoClaim was spot on with the estimate. Decided not to file since it was under my deductible.",
    timestamp: "5 hours ago",
    likes: 12,
    comments: 3,
    isLiked: true,
  },
  {
    id: "3",
    user: {
      name: "Jennifer Lopez",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Miami, FL",
    },
    vehicle: {
      make: "BMW",
      model: "X5",
      year: 2020,
    },
    damage: {
      type: "Hail damage",
      location: "Hood and roof",
      severity: "Severe",
    },
    costs: {
      estimated: 3200,
      actual: 3450,
      payout: 2950,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop"],
    description:
      "Caught in a hailstorm last week. Multiple dents on hood and roof. AutoClaim helped me understand the extent before talking to insurance.",
    timestamp: "1 day ago",
    likes: 45,
    comments: 15,
    isLiked: false,
  },
  {
    id: "4",
    user: {
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Phoenix, AZ",
    },
    vehicle: {
      make: "Ford",
      model: "F-150",
      year: 2022,
    },
    damage: {
      type: "Side impact",
      location: "Passenger door",
      severity: "Severe",
    },
    costs: {
      estimated: 2800,
      actual: 2950,
      payout: 2450,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop"],
    description:
      "T-bone accident at intersection. AutoClaim's AI detected structural damage that I missed. Saved me from potential safety issues.",
    timestamp: "2 days ago",
    likes: 32,
    comments: 12,
    isLiked: false,
  },
  {
    id: "5",
    user: {
      name: "Emily Watson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
    },
    vehicle: {
      make: "Toyota",
      model: "Prius",
      year: 2020,
    },
    damage: {
      type: "Front collision",
      location: "Front bumper",
      severity: "Moderate",
    },
    costs: {
      estimated: 1650,
      actual: 1580,
      payout: 1080,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop"],
    description:
      "Fender bender in parking garage. AutoClaim's estimate was incredibly close to actual repair cost. Made insurance claim process smooth.",
    timestamp: "3 days ago",
    likes: 18,
    comments: 6,
    isLiked: true,
  },
  {
    id: "6",
    user: {
      name: "Marcus Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Atlanta, GA",
    },
    vehicle: {
      make: "Chevrolet",
      model: "Camaro",
      year: 2021,
    },
    damage: {
      type: "Vandalism",
      location: "Multiple panels",
      severity: "Severe",
    },
    costs: {
      estimated: 4200,
      actual: 4350,
      payout: 3850,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop"],
    description:
      "Car was vandalized overnight. AutoClaim detected damage across multiple panels and paint work needed. Insurance covered most of it.",
    timestamp: "4 days ago",
    likes: 28,
    comments: 9,
    isLiked: false,
  },
  {
    id: "7",
    user: {
      name: "Lisa Park",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Denver, CO",
    },
    vehicle: {
      make: "Subaru",
      model: "Outback",
      year: 2019,
    },
    damage: {
      type: "Scratch",
      location: "Rear quarter panel",
      severity: "Minor",
    },
    costs: {
      estimated: 680,
      actual: 720,
      payout: 220,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop"],
    description:
      "Shopping cart scratch in grocery store parking lot. AutoClaim helped me decide whether to file a claim or pay out of pocket.",
    timestamp: "5 days ago",
    likes: 14,
    comments: 4,
    isLiked: false,
  },
  {
    id: "8",
    user: {
      name: "Robert Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Las Vegas, NV",
    },
    vehicle: {
      make: "Mercedes",
      model: "C-Class",
      year: 2022,
    },
    damage: {
      type: "Rear collision",
      location: "Trunk and bumper",
      severity: "Moderate",
    },
    costs: {
      estimated: 2100,
      actual: 2250,
      payout: 1750,
      deductible: 500,
    },
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop"],
    description:
      "Hit from behind while stopped at traffic light. AutoClaim's analysis showed hidden damage that wasn't visible at first glance.",
    timestamp: "1 week ago",
    likes: 21,
    comments: 7,
    isLiked: true,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "high-payout") return matchesSearch && post.costs.payout > 1000
    if (filter === "recent") return matchesSearch && post.timestamp.includes("hour")

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      {/* Header */}
      <header className="border-b bg-black/40 border-red-500/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold text-white">AutoClaim</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-white hover:bg-red-600 hover:text-white" asChild>
              <Link href="/scanner">Scan Damage</Link>
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Share Your Claim</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Community Claims</h1>
            <p className="text-gray-400">See real damage assessments and insurance payouts from other drivers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl text-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">$2.3M</div>
                    <div className="text-sm text-gray-300">Total Claims Shared</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl text-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-red-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">94%</div>
                    <div className="text-sm text-gray-300">Accuracy Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl text-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Car className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">15K+</div>
                    <div className="text-sm text-gray-300">Claims Analyzed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Search by vehicle, damage type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-black/40 text-white border-red-500/20"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-black/40 text-white border-red-500/20 hover:bg-red-600">
                <SelectValue placeholder="Filter posts" />
              </SelectTrigger>
              <SelectContent className="bg-black/40 text-white border-red-500/20">
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="high-payout">High Payout</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-black/40 border-red-500/20 backdrop-blur-xl text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {post.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{post.user.name}</div>
                        <div className="text-sm text-gray-400">
                          {post.user.location} • {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        post.damage.severity === "Severe"
                          ? "destructive"
                          : post.damage.severity === "Moderate"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {post.damage.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Vehicle Info */}
                  <div className="mb-4">
                    <h3 className="font-medium text-lg">
                      {post.vehicle.year} {post.vehicle.make} {post.vehicle.model}
                    </h3>
                    <p className="text-gray-400">
                      {post.damage.type} - {post.damage.location}
                    </p>
                  </div>

                  {/* Images */}
                  <div className="mb-4">
                    <img
                      src={post.images[0] || "/placeholder.svg"}
                      alt="Damage"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4">{post.description}</p>

                  {/* Cost Breakdown */}
                  <div className="bg-black/40 border-red-500/20 backdrop-blur-xl rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-3">Cost Breakdown</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Estimated</div>
                        <div className="font-medium">${post.costs.estimated}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Actual</div>
                        <div className="font-medium">${post.costs.actual}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Deductible</div>
                        <div className="font-medium">${post.costs.deductible}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Payout</div>
                        <div className="font-medium text-green-600">${post.costs.payout}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={post.isLiked ? "text-red-600 hover:bg-red-600/20" : "hover:bg-red-600/20"}
                    >
                      <Heart className={`mr-1 h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-red-600/20">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-red-600/20">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="text-white hover:bg-red-600 hover:text-white">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
