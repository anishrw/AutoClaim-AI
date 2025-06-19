"use client"

import { useState } from "react"
import { User, Car, Edit3, Save, X, Plus, Shield, Mail, Phone, MapPin, Calendar, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  mileage: string
  vin?: string
  isDefault: boolean
}

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  avatar: string
}

export default function ProfilePage() {
  const { user, isLoggedIn, updateUser, addVehicle, updateVehicle, deleteVehicle, setDefaultVehicle, logout } =
    useAuth()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingVehicle, setIsEditingVehicle] = useState<string | null>(null)
  const [isAddingVehicle, setIsAddingVehicle] = useState(false)

  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, "id" | "isDefault">>({
    make: "",
    model: "",
    year: "",
    mileage: "",
    vin: "",
  })

  const [editingVehicle, setEditingVehicleData] = useState<Vehicle | null>(null)

  const handleProfileSave = () => {
    setIsEditingProfile(false)
    // Profile is automatically saved via updateUser in the context
  }

  const handleVehicleEdit = (vehicle: Vehicle) => {
    setEditingVehicleData(vehicle)
    setIsEditingVehicle(vehicle.id)
  }

  const handleVehicleSave = () => {
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, editingVehicle)
    }
    setIsEditingVehicle(null)
    setEditingVehicleData(null)
  }

  const handleAddVehicle = () => {
    if (newVehicle.make && newVehicle.model && newVehicle.year) {
      addVehicle(newVehicle)
      setNewVehicle({ make: "", model: "", year: "", mileage: "", vin: "" })
      setIsAddingVehicle(false)
    }
  }

  const handleDeleteVehicle = (id: string) => {
    deleteVehicle(id)
  }

  const handleSetDefault = (id: string) => {
    setDefaultVehicle(id)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl p-8 text-center">
          <h2 className="text-white text-2xl mb-4">Please Sign In</h2>
          <p className="text-gray-400 mb-6">You need to be logged in to view your profile.</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-red-800/20 bg-black/40 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/scanner" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
              Scanner
            </Link>
            <Link href="/community" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
              Community
            </Link>
            <Link href="/profile" className="text-red-400 font-medium">
              Profile
            </Link>
            <Button variant="outline" onClick={logout} className="border-red-500/30 text-red-300 hover:bg-red-500/10">
              Sign Out
            </Button>
          </nav>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-400">Manage your account information and vehicles</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information Card */}
              <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <User className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">Personal Information</CardTitle>
                        <CardDescription className="text-gray-400">
                          Your account details and contact information
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => (isEditingProfile ? handleProfileSave() : setIsEditingProfile(true))}
                      className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                    >
                      {isEditingProfile ? <Save className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                      {isEditingProfile ? "Save" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white font-medium">First Name</Label>
                      {isEditingProfile ? (
                        <Input
                          value={user?.firstName}
                          onChange={(e) => updateUser({ ...user, firstName: e.target.value })}
                          className="bg-black/20 border-red-500/30 text-white"
                        />
                      ) : (
                        <p className="text-gray-300 p-3 bg-black/20 rounded-md">{user?.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white font-medium">Last Name</Label>
                      {isEditingProfile ? (
                        <Input
                          value={user?.lastName}
                          onChange={(e) => updateUser({ ...user, lastName: e.target.value })}
                          className="bg-black/20 border-red-500/30 text-white"
                        />
                      ) : (
                        <p className="text-gray-300 p-3 bg-black/20 rounded-md">{user?.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Address
                    </Label>
                    {isEditingProfile ? (
                      <Input
                        type="email"
                        value={user?.email}
                        onChange={(e) => updateUser({ ...user, email: e.target.value })}
                        className="bg-black/20 border-red-500/30 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-3 bg-black/20 rounded-md">{user?.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone Number
                    </Label>
                    {isEditingProfile ? (
                      <Input
                        value={user?.phone}
                        onChange={(e) => updateUser({ ...user, phone: e.target.value })}
                        className="bg-black/20 border-red-500/30 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-3 bg-black/20 rounded-md">{user?.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Address
                    </Label>
                    {isEditingProfile ? (
                      <div className="space-y-4">
                        <Input
                          placeholder="Street Address"
                          value={user?.address}
                          onChange={(e) => updateUser({ ...user, address: e.target.value })}
                          className="bg-black/20 border-red-500/30 text-white"
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            placeholder="City"
                            value={user?.city}
                            onChange={(e) => updateUser({ ...user, city: e.target.value })}
                            className="bg-black/20 border-red-500/30 text-white"
                          />
                          <Input
                            placeholder="State"
                            value={user?.state}
                            onChange={(e) => updateUser({ ...user, state: e.target.value })}
                            className="bg-black/20 border-red-500/30 text-white"
                          />
                          <Input
                            placeholder="ZIP Code"
                            value={user?.zipCode}
                            onChange={(e) => updateUser({ ...user, zipCode: e.target.value })}
                            className="bg-black/20 border-red-500/30 text-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-300 p-3 bg-black/20 rounded-md">
                        {user?.address}, {user?.city}, {user?.state} {user?.zipCode}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Vehicles Card */}
              <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Car className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">Your Vehicles</CardTitle>
                        <CardDescription className="text-gray-400">
                          Manage your registered vehicles for faster assessments
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingVehicle(true)}
                      className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vehicle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Vehicle Form */}
                  {isAddingVehicle && (
                    <Card className="bg-black/20 border-red-500/20">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium">Make</Label>
                            <Input
                              placeholder="e.g., Toyota"
                              value={newVehicle.make}
                              onChange={(e) => setNewVehicle((prev) => ({ ...prev, make: e.target.value }))}
                              className="bg-black/20 border-red-500/30 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white font-medium">Model</Label>
                            <Input
                              placeholder="e.g., Camry"
                              value={newVehicle.model}
                              onChange={(e) => setNewVehicle((prev) => ({ ...prev, model: e.target.value }))}
                              className="bg-black/20 border-red-500/30 text-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium">Year</Label>
                            <Select
                              value={newVehicle.year}
                              onValueChange={(value) => setNewVehicle((prev) => ({ ...prev, year: value }))}
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
                              value={newVehicle.mileage}
                              onChange={(e) => setNewVehicle((prev) => ({ ...prev, mileage: e.target.value }))}
                              className="bg-black/20 border-red-500/30 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white font-medium">VIN (Optional)</Label>
                          <Input
                            placeholder="17-character VIN"
                            value={newVehicle.vin}
                            onChange={(e) => setNewVehicle((prev) => ({ ...prev, vin: e.target.value }))}
                            className="bg-black/20 border-red-500/30 text-white"
                            maxLength={17}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={handleAddVehicle}
                            disabled={!newVehicle.make || !newVehicle.model || !newVehicle.year}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Add Vehicle
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsAddingVehicle(false)}
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Vehicle List */}
                  {user?.vehicles?.map((vehicle) => (
                    <Card
                      key={vehicle.id}
                      className={`bg-black/20 border-red-500/20 ${vehicle.isDefault ? "ring-2 ring-red-500/50" : ""}`}
                    >
                      <CardContent className="p-4">
                        {isEditingVehicle === vehicle.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-white font-medium">Make</Label>
                                <Input
                                  value={editingVehicle?.make || ""}
                                  onChange={(e) =>
                                    setEditingVehicleData((prev) => (prev ? { ...prev, make: e.target.value } : null))
                                  }
                                  className="bg-black/20 border-red-500/30 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-white font-medium">Model</Label>
                                <Input
                                  value={editingVehicle?.model || ""}
                                  onChange={(e) =>
                                    setEditingVehicleData((prev) => (prev ? { ...prev, model: e.target.value } : null))
                                  }
                                  className="bg-black/20 border-red-500/30 text-white"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-white font-medium">Year</Label>
                                <Select
                                  value={editingVehicle?.year || ""}
                                  onValueChange={(value) =>
                                    setEditingVehicleData((prev) => (prev ? { ...prev, year: value } : null))
                                  }
                                >
                                  <SelectTrigger className="bg-black/20 border-red-500/30 text-white">
                                    <SelectValue />
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
                                  value={editingVehicle?.mileage || ""}
                                  onChange={(e) =>
                                    setEditingVehicleData((prev) =>
                                      prev ? { ...prev, mileage: e.target.value } : null,
                                    )
                                  }
                                  className="bg-black/20 border-red-500/30 text-white"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white font-medium">VIN</Label>
                              <Input
                                value={editingVehicle?.vin || ""}
                                onChange={(e) =>
                                  setEditingVehicleData((prev) => (prev ? { ...prev, vin: e.target.value } : null))
                                }
                                className="bg-black/20 border-red-500/30 text-white"
                                maxLength={17}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button onClick={handleVehicleSave} className="bg-red-600 hover:bg-red-700 text-white">
                                <Save className="h-4 w-4 mr-2" />
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsEditingVehicle(null)
                                  setEditingVehicleData(null)
                                }}
                                className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-white font-semibold text-lg">
                                  {vehicle.year} {vehicle.make} {vehicle.model}
                                </h4>
                                {vehicle.isDefault && (
                                  <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full border border-red-500/30">
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                                <div className="flex items-center">
                                  <Gauge className="h-4 w-4 mr-2" />
                                  {vehicle.mileage ? `${vehicle.mileage} miles` : "Mileage not specified"}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  VIN: {vehicle.vin || "Not provided"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!vehicle.isDefault && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSetDefault(vehicle.id)}
                                  className="text-gray-400 hover:text-red-300 hover:bg-red-500/20"
                                >
                                  Set Default
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVehicleEdit(vehicle)}
                                className="text-gray-400 hover:text-red-300 hover:bg-red-500/20"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                className="text-gray-400 hover:text-red-300 hover:bg-red-500/20"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {user?.vehicles?.length === 0 && !isAddingVehicle && (
                    <div className="text-center py-8">
                      <Car className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">No vehicles added yet</p>
                      <Button
                        onClick={() => setIsAddingVehicle(true)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Vehicle
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Profile Sidebar */}
            <div className="space-y-6">
              {/* Profile Avatar Card */}
              <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-red-500/30">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-red-500/20 text-red-300 text-2xl">
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-white font-semibold text-xl mb-1">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-400 mb-4">{user?.email}</p>
                  <Button variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10">
                    Change Photo
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white" asChild>
                    <Link href="/scanner">
                      <Car className="h-4 w-4 mr-2" />
                      Scan Vehicle Damage
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10"
                    asChild
                  >
                    <Link href="/community">View Community Claims</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10">
                    Download Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Account Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Scans Completed</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Saved</span>
                    <span className="text-green-400 font-semibold">$3,240</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white font-semibold">Jan 2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
