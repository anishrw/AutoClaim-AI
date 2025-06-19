"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload,
  Camera,
  X,
  Loader2,
  Car,
  AlertTriangle,
  Sparkles,
  Shield,
  Award,
  TrendingUp,
  User,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Chatbot } from "@/components/chatbot"
import { AgentFinder } from "@/components/agent-finder"
import { MultiAngleGuide } from "@/components/multi-angle-guide"

interface DamageAnalysis {
  damageType: string
  severity: "Minor" | "Moderate" | "Severe"
  location: string
  confidence: number
  repairCost: number
  description: string
}

interface AnalysisResult {
  damages: DamageAnalysis[]
  totalRepairCost: number
  vehicleValue: number
  recommendedAction: string
  confidenceBoost: number
  multiAngleAnalysis: boolean
}

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  mileage: string
  vin?: string
  isDefault: boolean
}

export default function ScannerPage() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [deductible, setDeductible] = useState<number>(500)
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
  })
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("")
  const [showForm, setShowForm] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showAgentFinder, setShowAgentFinder] = useState(false)

  const { user, isLoggedIn, logout } = useAuth()

  useEffect(() => {
    if (isLoggedIn && user && user.vehicles.length > 0) {
      const defaultVehicle = user.vehicles.find((v) => v.isDefault) || user.vehicles[0]
      setSelectedVehicleId(defaultVehicle.id)
      setVehicleInfo({
        make: defaultVehicle.make,
        model: defaultVehicle.model,
        year: defaultVehicle.year,
        mileage: defaultVehicle.mileage,
      })
    }
  }, [isLoggedIn, user])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedImages((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  })

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleStartScan = () => {
    setShowForm(true)
  }

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
    if (vehicleId === "manual") {
      setVehicleInfo({ make: "", model: "", year: "", mileage: "" })
    } else {
      const vehicle = user?.vehicles.find((v) => v.id === vehicleId)
      if (vehicle) {
        setVehicleInfo({
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          mileage: vehicle.mileage,
        })
      }
    }
  }

  const analyzeImages = async () => {
    if (uploadedImages.length === 0) return

    setIsAnalyzing(true)
    setIsTransitioning(true)

    // Wait for transition animation
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Simulate AI analysis with realistic timing
    await new Promise((resolve) => setTimeout(resolve, 3200))

    // Calculate multi-angle benefits
    const isMultiAngle = uploadedImages.length >= 2
    const confidenceBoost = Math.min(uploadedImages.length * 8, 30) // Up to 30% boost
    const baseCost = 1670
    const adjustedCost = isMultiAngle ? Math.round(baseCost * (1 + confidenceBoost / 100)) : baseCost

    // Mock analysis result with multi-angle improvements
    const mockResult: AnalysisResult = {
      damages: [
        {
          damageType: "Impact Dent",
          severity: "Moderate",
          location: "Front Bumper",
          confidence: isMultiAngle ? 96 : 94,
          repairCost: 1250,
          description:
            "Medium-sized impact dent on front bumper with paint damage, requires panel repair and refinishing",
        },
        {
          damageType: "Surface Scratch",
          severity: "Minor",
          location: "Driver Side Door",
          confidence: isMultiAngle ? 92 : 89,
          repairCost: 420,
          description: "Surface-level scratches on driver door panel, can be buffed and touched up",
        },
      ],
      totalRepairCost: adjustedCost,
      vehicleValue: 22500,
      recommendedAction: "Recommended: File insurance claim - damage significantly exceeds deductible",
      confidenceBoost,
      multiAngleAnalysis: isMultiAngle,
    }

    // Add additional damage if multiple angles detected
    if (uploadedImages.length >= 3) {
      mockResult.damages.push({
        damageType: "Paint Scuff",
        severity: "Minor",
        location: "Rear Quarter Panel",
        confidence: 88,
        repairCost: 280,
        description: "Minor paint scuff detected through multi-angle analysis - not visible from single view",
      })
      mockResult.totalRepairCost += 280
    }

    setAnalysisResult(mockResult)
    setIsAnalyzing(false)
  }

  const expectedPayout = analysisResult ? Math.max(0, analysisResult.totalRepairCost - deductible) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Premium Header */}
      <header className="relative z-50 border-b border-red-800/20 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="h-8 w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg group-hover:bg-red-400/30 transition-all duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">AutoClaim</span>
                <div className="text-xs text-red-300 font-medium">Professional Assessment</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowAgentFinder(true)}
                className="border-red-500/30 text-red-300 hover:bg-red-500/10"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Find Agent
              </Button>
              <Button variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10" asChild>
                <Link href="/community">Community</Link>
              </Button>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10" asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Premium Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-red-300 text-sm font-medium">AI-Powered Multi-Angle Analysis</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Premium Damage Analysis
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Upload multiple vehicle photos for maximum accuracy and professional-grade damage assessment
            </p>
          </div>

          {/* Initial Upload Section - Centered */}
          {!showForm && (
            <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
              <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10 mb-8">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Upload className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="text-center">
                      <CardTitle className="text-white text-xl">Upload Vehicle Photos</CardTitle>
                      <CardDescription className="text-gray-400">
                        Upload 2-4 photos from different angles for maximum accuracy
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive
                        ? "border-red-500 bg-red-500/10 scale-105"
                        : "border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl opacity-50"></div>
                      <Upload className="relative h-16 w-16 text-red-400 mx-auto mb-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {isDragActive ? "Drop images here" : "Upload Damage Photos"}
                    </h3>
                    <p className="text-gray-400 mb-6 text-lg">Drag & drop images or click to select files</p>
                    <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all duration-200">
                      <Camera className="mr-2 h-5 w-5" />
                      Choose Files
                    </Button>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white text-lg">Uploaded Images ({uploadedImages.length})</h4>
                        <Badge
                          className={`${
                            uploadedImages.length >= 4
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : uploadedImages.length >= 2
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                : "bg-red-500/20 text-red-300 border-red-500/30"
                          }`}
                        >
                          {uploadedImages.length >= 4
                            ? "Excellent Coverage"
                            : uploadedImages.length >= 2
                              ? "Good Coverage"
                              : "Basic Coverage"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="relative overflow-hidden rounded-lg border border-red-500/20 bg-black/20">
                              <img
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all duration-200"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Multi-Angle Guide */}
              {uploadedImages.length > 0 && (
                <div className="mb-8">
                  <MultiAngleGuide uploadedImages={uploadedImages} />
                </div>
              )}

              <div className="text-center">
                <Button
                  onClick={handleStartScan}
                  disabled={uploadedImages.length === 0}
                  className="h-16 px-12 text-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl shadow-red-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                  size="lg"
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Start Professional Scan
                </Button>
              </div>
            </div>
          )}

          {/* Form and Results Layout - After clicking Start Professional Scan */}
          {showForm && (
            <div
              className={`grid lg:grid-cols-5 gap-8 transition-all duration-800 ${isTransitioning ? "animate-in slide-in-from-right-4" : ""}`}
            >
              {/* Enhanced Upload Section - Now on Left */}
              <div
                className={`lg:col-span-3 space-y-8 transition-all duration-800 ${isTransitioning ? "animate-in slide-in-from-left-4" : ""}`}
              >
                <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Upload className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">Upload Vehicle Photos</CardTitle>
                        <CardDescription className="text-gray-400">
                          Upload 2-4 photos from different angles for maximum accuracy
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      {...getRootProps()}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                        isDragActive
                          ? "border-red-500 bg-red-500/10 scale-105"
                          : "border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl opacity-50"></div>
                        <Upload className="relative h-12 w-12 text-red-400 mx-auto mb-4" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {isDragActive ? "Drop images here" : "Upload Damage Photos"}
                      </h3>
                      <p className="text-gray-400 mb-4">Drag & drop images or click to select files</p>
                      <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all duration-200">
                        <Camera className="mr-2 h-5 w-5" />
                        Choose Files
                      </Button>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-white text-lg">
                            Uploaded Images ({uploadedImages.length})
                          </h4>
                          <Badge
                            className={`${
                              uploadedImages.length >= 4
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : uploadedImages.length >= 2
                                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                  : "bg-red-500/20 text-red-300 border-red-500/30"
                            }`}
                          >
                            {uploadedImages.length >= 4
                              ? "Excellent Coverage"
                              : uploadedImages.length >= 2
                                ? "Good Coverage"
                                : "Basic Coverage"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {uploadedImages.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="relative overflow-hidden rounded-lg border border-red-500/20 bg-black/20">
                                <img
                                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg transform hover:scale-110 transition-all duration-200"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Multi-Angle Guide - Compact Version */}
                <MultiAngleGuide uploadedImages={uploadedImages} />

                {/* Enhanced Vehicle Info */}
                <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Car className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">Vehicle Information</CardTitle>
                        <CardDescription className="text-gray-400">
                          {isLoggedIn
                            ? "Select from your vehicles or enter manually"
                            : "Provide details for accurate valuation and assessment"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Vehicle Selection for Logged In Users */}
                    {isLoggedIn && user && user.vehicles.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-white font-medium">Select Vehicle</Label>
                        <Select value={selectedVehicleId} onValueChange={handleVehicleSelect}>
                          <SelectTrigger className="bg-black/20 border-red-500/30 text-white">
                            <SelectValue placeholder="Choose a vehicle" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-red-500/30">
                            {user.vehicles.map((vehicle) => (
                              <SelectItem
                                key={vehicle.id}
                                value={vehicle.id}
                                className="text-white hover:bg-red-500/20"
                              >
                                {vehicle.year} {vehicle.make} {vehicle.model}
                                {vehicle.isDefault && " (Default)"}
                              </SelectItem>
                            ))}
                            <SelectItem value="manual" className="text-white hover:bg-red-500/20">
                              Enter manually
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="make" className="text-white font-medium">
                          Make
                        </Label>
                        <Input
                          id="make"
                          placeholder="e.g., Mercedes-Benz"
                          value={vehicleInfo.make}
                          onChange={(e) => setVehicleInfo((prev) => ({ ...prev, make: e.target.value }))}
                          className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          disabled={isLoggedIn && selectedVehicleId !== "manual" && selectedVehicleId !== ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model" className="text-white font-medium">
                          Model
                        </Label>
                        <Input
                          id="model"
                          placeholder="e.g., E-Class"
                          value={vehicleInfo.model}
                          onChange={(e) => setVehicleInfo((prev) => ({ ...prev, model: e.target.value }))}
                          className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          disabled={isLoggedIn && selectedVehicleId !== "manual" && selectedVehicleId !== ""}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-white font-medium">
                          Year
                        </Label>
                        <Input
                          id="year"
                          placeholder="e.g., 2022"
                          value={vehicleInfo.year}
                          onChange={(e) => setVehicleInfo((prev) => ({ ...prev, year: e.target.value }))}
                          className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          disabled={isLoggedIn && selectedVehicleId !== "manual" && selectedVehicleId !== ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mileage" className="text-white font-medium">
                          Mileage
                        </Label>
                        <Input
                          id="mileage"
                          placeholder="e.g., 25,000"
                          value={vehicleInfo.mileage}
                          onChange={(e) => setVehicleInfo((prev) => ({ ...prev, mileage: e.target.value }))}
                          className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          disabled={isLoggedIn && selectedVehicleId !== "manual" && selectedVehicleId !== ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deductible" className="text-white font-medium">
                        Insurance Deductible ($)
                      </Label>
                      <Input
                        id="deductible"
                        type="number"
                        placeholder="500"
                        value={deductible}
                        onChange={(e) => setDeductible(Number(e.target.value))}
                        className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                      />
                    </div>

                    {isLoggedIn && selectedVehicleId !== "manual" && selectedVehicleId !== "" && (
                      <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                        <p className="text-green-300 text-sm flex items-center">
                          <Car className="h-4 w-4 mr-2" />
                          Vehicle information auto-populated from your profile
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button
                  onClick={analyzeImages}
                  disabled={uploadedImages.length === 0 || isAnalyzing}
                  className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl shadow-red-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-6 w-6" />
                      Start Professional Analysis
                    </>
                  )}
                </Button>
              </div>

              {/* Enhanced Results Section */}
              <div className="lg:col-span-2 space-y-8">
                {isAnalyzing && (
                  <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10 animate-in slide-in-from-right-4 duration-500">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
                          <Loader2 className="relative h-16 w-16 animate-spin text-red-500 mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">AI Analysis in Progress</h3>
                        <p className="text-gray-400 mb-6 text-lg">
                          Our advanced AI is processing your vehicle images...
                        </p>
                        <div className="space-y-3">
                          <Progress value={75} className="w-full h-3 bg-red-900/30" />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Damage Detection</span>
                            <span>Multi-Angle Analysis</span>
                            <span>Cost Calculation</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {analysisResult && (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
                    {/* Multi-Angle Benefits Banner */}
                    {analysisResult.multiAngleAnalysis && (
                      <Card className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-green-500/30 backdrop-blur-xl shadow-2xl shadow-green-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Camera className="h-6 w-6 text-green-400" />
                            <div>
                              <h4 className="text-white font-semibold">Multi-Angle Analysis Complete!</h4>
                              <p className="text-green-300 text-sm">
                                +{analysisResult.confidenceBoost}% accuracy boost from {uploadedImages.length} photos
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Premium Summary Card */}
                    <Card className="bg-gradient-to-br from-red-900/40 to-black/60 border-red-500/30 backdrop-blur-xl shadow-2xl shadow-red-500/20">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-red-500/20 rounded-xl">
                            <Award className="h-8 w-8 text-red-400" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-2xl">Professional Assessment</CardTitle>
                            <CardDescription className="text-red-200">
                              {analysisResult.multiAngleAnalysis
                                ? "Multi-angle analysis complete"
                                : "Comprehensive damage analysis complete"}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                            <span className="text-gray-300 text-lg">Total Repair Cost:</span>
                            <span className="text-3xl font-bold text-red-400">
                              ${analysisResult.totalRepairCost.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-black/20 rounded-xl">
                            <span className="text-gray-300 text-lg">Your Deductible:</span>
                            <span className="text-xl font-semibold text-white">-${deductible.toLocaleString()}</span>
                          </div>
                          <div className="border-t border-red-500/20 pt-6">
                            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-xl border border-green-500/20">
                              <span className="text-gray-300 text-lg">Expected Payout:</span>
                              <span className="text-4xl font-bold text-green-400">
                                ${expectedPayout.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-xl border border-yellow-500/20">
                            <div className="flex items-start space-x-3">
                              <AlertTriangle className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-white mb-2">Professional Recommendation</h4>
                                <p className="text-gray-300">{analysisResult.recommendedAction}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Damage Analysis */}
                    <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                      <CardHeader>
                        <CardTitle className="text-white text-xl flex items-center">
                          <TrendingUp className="mr-3 h-6 w-6 text-red-400" />
                          Detailed Damage Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analysisResult.damages.map((damage, index) => (
                            <div
                              key={index}
                              className="border border-red-500/20 rounded-xl p-6 bg-gradient-to-r from-black/20 to-red-900/10 hover:from-black/30 hover:to-red-900/20 transition-all duration-300"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-white text-lg">{damage.location}</h4>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={`${
                                      damage.severity === "Severe"
                                        ? "bg-red-600/20 text-red-300 border-red-500/30"
                                        : damage.severity === "Moderate"
                                          ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                                          : "bg-green-600/20 text-green-300 border-green-500/30"
                                    }`}
                                  >
                                    {damage.severity}
                                  </Badge>
                                  {analysisResult.multiAngleAnalysis && damage.confidence > 90 && (
                                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                                      Multi-Angle ✓
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-300 mb-4 leading-relaxed">{damage.description}</p>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="text-center p-3 bg-black/20 rounded-lg">
                                  <div className="text-gray-400">Damage Type</div>
                                  <div className="font-semibold text-white">{damage.damageType}</div>
                                </div>
                                <div className="text-center p-3 bg-black/20 rounded-lg">
                                  <div className="text-gray-400">Confidence</div>
                                  <div className="font-semibold text-red-400">{damage.confidence}%</div>
                                </div>
                                <div className="text-center p-3 bg-black/20 rounded-lg">
                                  <div className="text-gray-400">Repair Cost</div>
                                  <div className="font-semibold text-green-400">${damage.repairCost}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-4">
                      <Button
                        onClick={() => setShowAgentFinder(true)}
                        className="h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all duration-200"
                      >
                        <MapPin className="h-5 w-5 mr-2" />
                        Find State Farm Agent
                      </Button>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
                          asChild
                        >
                          <Link href="/community">Share Results</Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-12 border-red-500/30 text-red-300 hover:bg-red-500/10 transform hover:scale-105 transition-all duration-200"
                        >
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot analysisResult={analysisResult} vehicleInfo={vehicleInfo} />

      {/* Agent Finder Modal */}
      <AgentFinder isOpen={showAgentFinder} onClose={() => setShowAgentFinder(false)} analysisResult={analysisResult} />
    </div>
  )
}
