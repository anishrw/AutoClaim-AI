import { type NextRequest, NextResponse } from "next/server"

// Mock database of community posts
const mockPosts = [
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
    images: ["/placeholder.svg?height=200&width=300"],
    description:
      "Got rear-ended at a red light. ClaimScan estimated $1,200 but actual repair was $1,350. Still pretty accurate! Insurance covered most of it.",
    timestamp: "2024-01-15T10:30:00Z",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  // Add more mock posts...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get("filter") || "all"
  const search = searchParams.get("search") || ""
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Filter posts based on query parameters
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.vehicle.make.toLowerCase().includes(search.toLowerCase()) ||
      post.vehicle.model.toLowerCase().includes(search.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "high-payout") return matchesSearch && post.costs.payout > 1000
    if (filter === "recent")
      return matchesSearch && new Date(post.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)

    return matchesSearch
  })

  // Paginate results
  const startIndex = (page - 1) * limit
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit)

  return NextResponse.json({
    posts: paginatedPosts,
    totalCount: filteredPosts.length,
    page,
    limit,
    hasMore: startIndex + limit < filteredPosts.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const postData = JSON.parse(formData.get("postData") as string)
    const images = formData.getAll("images") as File[]

    // In a real implementation, you would:
    // 1. Upload images to cloud storage
    // 2. Save post data to database
    // 3. Return the created post

    const newPost = {
      id: `post_${Date.now()}`,
      ...postData,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
