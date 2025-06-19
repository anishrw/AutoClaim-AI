"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Vehicle {
  id: string
  make: string
  model: string
  year: string
  mileage: string
  vin?: string
  isDefault: boolean
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  avatar: string
  vehicles: Vehicle[]
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void
  updateVehicle: (vehicleId: string, vehicleData: Partial<Vehicle>) => void
  deleteVehicle: (vehicleId: string) => void
  setDefaultVehicle: (vehicleId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123", // In real app, this would be hashed
    phone: "(555) 123-4567",
    address: "123 Main Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    avatar: "/placeholder.svg?height=100&width=100",
    vehicles: [
      {
        id: "1",
        make: "Toyota",
        model: "Camry",
        year: "2020",
        mileage: "45000",
        vin: "1HGBH41JXMN109186",
        isDefault: true,
      },
      {
        id: "2",
        make: "Honda",
        model: "Civic",
        year: "2019",
        mileage: "32000",
        vin: "2HGFC2F59JH123456",
        isDefault: false,
      },
    ],
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "password123",
    phone: "(555) 987-6543",
    address: "456 Oak Avenue",
    city: "Dallas",
    state: "TX",
    zipCode: "75201",
    avatar: "/placeholder.svg?height=100&width=100",
    vehicles: [
      {
        id: "3",
        make: "BMW",
        model: "X5",
        year: "2021",
        mileage: "25000",
        vin: "WBXHT910X0L123456",
        isDefault: true,
      },
    ],
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("autoclaim_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword as User)
      setIsLoggedIn(true)
      localStorage.setItem("autoclaim_user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("autoclaim_user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("autoclaim_user", JSON.stringify(updatedUser))
    }
  }

  const addVehicle = (vehicleData: Omit<Vehicle, "id">) => {
    if (user) {
      const newVehicle: Vehicle = {
        ...vehicleData,
        id: Date.now().toString(),
        isDefault: user.vehicles.length === 0, // First vehicle becomes default
      }
      const updatedUser = {
        ...user,
        vehicles: [...user.vehicles, newVehicle],
      }
      setUser(updatedUser)
      localStorage.setItem("autoclaim_user", JSON.stringify(updatedUser))
    }
  }

  const updateVehicle = (vehicleId: string, vehicleData: Partial<Vehicle>) => {
    if (user) {
      const updatedUser = {
        ...user,
        vehicles: user.vehicles.map((v) => (v.id === vehicleId ? { ...v, ...vehicleData } : v)),
      }
      setUser(updatedUser)
      localStorage.setItem("autoclaim_user", JSON.stringify(updatedUser))
    }
  }

  const deleteVehicle = (vehicleId: string) => {
    if (user) {
      const vehicleToDelete = user.vehicles.find((v) => v.id === vehicleId)
      const updatedVehicles = user.vehicles.filter((v) => v.id !== vehicleId)

      // If we deleted the default vehicle, make the first remaining vehicle default
      if (vehicleToDelete?.isDefault && updatedVehicles.length > 0) {
        updatedVehicles[0].isDefault = true
      }

      const updatedUser = {
        ...user,
        vehicles: updatedVehicles,
      }
      setUser(updatedUser)
      localStorage.setItem("autoclaim_user", JSON.stringify(updatedUser))
    }
  }

  const setDefaultVehicle = (vehicleId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        vehicles: user.vehicles.map((v) => ({ ...v, isDefault: v.id === vehicleId })),
      }
      setUser(updatedUser)
      localStorage.setItem("autoclaim_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateUser,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        setDefaultVehicle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
