"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Shield, ArrowRight, Sparkles, Check, Car, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  mileage: string
  vin?: string
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle>({
    id: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    vin: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      // Handle final sign up logic here
      console.log("Sign up:", { formData, vehicles })
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleVehicleChange = (field: string, value: string) => {
    setCurrentVehicle((prev) => ({ ...prev, [field]: value }))
  }

  const addVehicle = () => {
    if (currentVehicle.make && currentVehicle.model && currentVehicle.year) {
      const newVehicle = { ...currentVehicle, id: Date.now().toString() }
      setVehicles((prev) => [...prev, newVehicle])
      setCurrentVehicle({ id: "", make: "", model: "", year: "", mileage: "", vin: "" })
    }
  }

  const removeVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id))
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden flex items-center justify-center py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 border-b border-red-800/20 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-3 group w-fit">
            <div className="relative">
              <Shield className="h-8 w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg group-hover:bg-red-400/30 transition-all duration-300"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">AutoClaim</span>
              <div className="text-xs text-red-300 font-medium">Professional Assessment</div>
            </div>
          </Link>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 mt-20">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= 1 ? "bg-red-600 border-red-600 text-white" : "border-red-500/30 text-gray-400"}`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${currentStep > 1 ? "bg-red-600" : "bg-red-500/30"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= 2 ? "bg-red-600 border-red-600 text-white" : "border-red-500/30 text-gray-400"}`}
            >
              2
            </div>
          </div>
        </div>

        <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/20 animate-in slide-in-from-bottom-4 duration-700">
          <CardHeader className="text-center pb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6 mx-auto">
              {currentStep === 1 ? (
                <Sparkles className="h-8 w-8 text-red-400" />
              ) : (
                <Car className="h-8 w-8 text-red-400" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              {currentStep === 1 ? "Join AutoClaim" : "Add Your Vehicles"}
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              {currentStep === 1
                ? "Create your account for professional vehicle damage assessment"
                : "Add your vehicles for faster damage assessments"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 h-12 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 h-12 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        className="border-red-500/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 mt-1"
                      />
                      <Label htmlFor="terms" className="text-gray-300 text-sm leading-relaxed">
                        I agree to the{" "}
                        <Link href="/terms" className="text-red-400 hover:text-red-300 underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-red-400 hover:text-red-300 underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="newsletter"
                        checked={formData.subscribeNewsletter}
                        onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                        className="border-red-500/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label htmlFor="newsletter" className="text-gray-300 text-sm">
                        Subscribe to updates and industry insights
                      </Label>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Add Vehicle Form */}
                  <Card className="bg-black/20 border-red-500/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center">
                        <Plus className="mr-2 h-5 w-5 text-red-400" />
                        Add Vehicle
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Make</Label>
                          <Input
                            placeholder="e.g., Toyota"
                            value={currentVehicle.make}
                            onChange={(e) => handleVehicleChange("make", e.target.value)}
                            className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Model</Label>
                          <Input
                            placeholder="e.g., Camry"
                            value={currentVehicle.model}
                            onChange={(e) => handleVehicleChange("model", e.target.value)}
                            className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Year</Label>
                          <Select
                            value={currentVehicle.year}
                            onValueChange={(value) => handleVehicleChange("year", value)}
                          >
                            <SelectTrigger className="bg-black/20 border-red-500/30 text-white">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-red-500/30">
                              {years.map((year) => (
                                <SelectItem
                                  key={year}
                                  value={year.toString()}
                                  className="text-white hover:bg-red-500/20"
                                >
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Mileage</Label>
                          <Input
                            placeholder="e.g., 50,000"
                            value={currentVehicle.mileage}
                            onChange={(e) => handleVehicleChange("mileage", e.target.value)}
                            className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white font-medium">VIN (Optional)</Label>
                        <Input
                          placeholder="17-character VIN"
                          value={currentVehicle.vin}
                          onChange={(e) => handleVehicleChange("vin", e.target.value)}
                          className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                          maxLength={17}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addVehicle}
                        disabled={!currentVehicle.make || !currentVehicle.model || !currentVehicle.year}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Vehicle
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Added Vehicles List */}
                  {vehicles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Your Vehicles ({vehicles.length})</h4>
                      {vehicles.map((vehicle) => (
                        <Card key={vehicle.id} className="bg-black/20 border-red-500/20">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="text-white font-medium">
                                  {vehicle.year} {vehicle.make} {vehicle.model}
                                </h5>
                                <p className="text-gray-400 text-sm">
                                  {vehicle.mileage ? `${vehicle.mileage} miles` : "Mileage not specified"}
                                  {vehicle.vin && ` • VIN: ${vehicle.vin}`}
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeVehicle(vehicle.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="bg-black/20 border border-red-500/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">
                      <strong>Note:</strong> You can skip this step and add vehicles later from your profile. Adding
                      vehicles now will make future damage assessments faster.
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={currentStep === 1 && !formData.agreeToTerms}
                className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {currentStep === 1 ? "Continue to Vehicles" : "Create Account"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            {currentStep === 1 && (
              <div className="mt-8 pt-6 border-t border-red-500/20">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Already have an account?</p>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10"
                    asChild
                  >
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => console.log("Skip and create account")}
                  className="text-gray-400 hover:text-white"
                >
                  Skip for now
                </Button>
              </div>
            )}

            {/* Social Login Options - Only on step 1 */}
            {currentStep === 1 && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-red-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-black/40 text-gray-400">Or sign up with</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-red-500/30 text-gray-300 hover:bg-red-500/10">
                    Google
                  </Button>
                  <Button variant="outline" className="border-red-500/30 text-gray-300 hover:bg-red-500/10">
                    Microsoft
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features List - Only on step 2 */}
        {currentStep === 2 && (
          <div className="mt-8 bg-black/20 border border-red-500/20 rounded-xl p-6 backdrop-blur-xl">
            <h3 className="text-white font-semibold mb-4">What you get with AutoClaim:</h3>
            <div className="space-y-3">
              {[
                "AI-powered damage detection and analysis",
                "Instant repair cost estimates",
                "Insurance payout calculations",
                "Professional assessment reports",
                "Community insights and experiences",
                "24/7 access to your damage history",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-red-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
