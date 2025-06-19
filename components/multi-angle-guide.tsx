"use client"

import { Camera, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MultiAngleGuideProps {
  uploadedImages: File[]
  onAngleComplete?: (angle: string) => void
}

const requiredAngles = [
  {
    id: "front",
    name: "Front View",
    description: "Capture the entire front of the vehicle",
    tips: "Stand 6-8 feet back, include bumper, headlights, and hood",
    icon: "🚗",
  },
  {
    id: "rear",
    name: "Rear View",
    description: "Capture the entire back of the vehicle",
    tips: "Include bumper, taillights, and trunk/hatch area",
    icon: "🔄",
  },
  {
    id: "driver",
    name: "Driver Side",
    description: "Full side view from driver's side",
    tips: "Show doors, windows, and any side damage clearly",
    icon: "👈",
  },
  {
    id: "passenger",
    name: "Passenger Side",
    description: "Full side view from passenger side",
    tips: "Capture opposite side for complete assessment",
    icon: "👉",
  },
]

export function MultiAngleGuide({ uploadedImages, onAngleComplete }: MultiAngleGuideProps) {
  const getAngleStatus = (angleId: string) => {
    // Simple logic - in real app, you'd use AI to detect angles
    const imageCount = uploadedImages.length
    const angleIndex = requiredAngles.findIndex((a) => a.id === angleId)
    return imageCount > angleIndex
  }

  const completedAngles = requiredAngles.filter((angle) => getAngleStatus(angle.id)).length
  const completionPercentage = (completedAngles / requiredAngles.length) * 100

  return (
    <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Camera className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-white text-xl">Multi-Angle Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Upload 2-4 photos from different angles for maximum accuracy
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-red-400">{completedAngles}/4</div>
            <div className="text-xs text-gray-400">Angles Captured</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Analysis Accuracy</span>
            <span className="text-red-400 font-semibold">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Basic (1 photo)</span>
            <span>Good (2-3 photos)</span>
            <span>Excellent (4 photos)</span>
          </div>
        </div>

        {/* Angle Grid */}
        <div className="grid grid-cols-2 gap-4">
          {requiredAngles.map((angle) => {
            const isCompleted = getAngleStatus(angle.id)
            return (
              <div
                key={angle.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-900/20 border-green-500/30"
                    : "bg-black/20 border-red-500/20 hover:border-red-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{angle.icon}</span>
                    <h4 className="text-white font-medium text-sm">{angle.name}</h4>
                  </div>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <p className="text-gray-400 text-xs mb-2">{angle.description}</p>
                <p className="text-gray-500 text-xs">{angle.tips}</p>
                {isCompleted && (
                  <Badge className="mt-2 bg-green-500/20 text-green-300 border-green-500/30 text-xs">Captured ✓</Badge>
                )}
              </div>
            )
          })}
        </div>

        {/* Accuracy Benefits */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg border border-blue-500/20">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Camera className="h-4 w-4 mr-2 text-blue-400" />
            Multi-Angle Benefits
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="text-center">
              <div className="text-blue-400 font-semibold">+15%</div>
              <div className="text-gray-400">Damage Detection</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-semibold">+25%</div>
              <div className="text-gray-400">Cost Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-semibold">+30%</div>
              <div className="text-gray-400">Claim Confidence</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20">
          <h4 className="text-yellow-300 font-semibold mb-2">📸 Pro Tips for Best Results</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Take photos in good lighting (avoid shadows)</li>
            <li>• Keep the entire vehicle in frame</li>
            <li>• Focus on damaged areas with close-up shots</li>
            <li>• Avoid reflections and glare on the vehicle</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
