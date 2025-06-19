"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Shield, ArrowRight, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/profile")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Demo credentials helper
  const fillDemoCredentials = () => {
    setEmail("john.doe@example.com")
    setPassword("password123")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden flex items-center justify-center">
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

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/20 animate-in slide-in-from-bottom-4 duration-700">
          <CardHeader className="text-center pb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6 mx-auto">
              <Sparkles className="h-8 w-8 text-red-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Sign in to access your professional damage assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Credentials Banner */}
            <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Demo Account</p>
                  <p className="text-blue-200 text-xs">john.doe@example.com</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillDemoCredentials}
                  className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                >
                  Use Demo
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 h-12"
                  required
                  disabled={isLoading}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500 h-12 pr-12"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-red-500/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-gray-300 text-sm">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-red-500/20">
              <div className="text-center">
                <p className="text-gray-400 mb-4">Don't have an account?</p>
                <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10" asChild>
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-red-500/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black/40 text-gray-400">Or continue with</span>
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
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-red-400" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-red-400" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Additional Demo Users */}
        <div className="mt-6 p-4 bg-black/20 border border-red-500/20 rounded-lg">
          <h4 className="text-white font-medium mb-3">Demo Accounts:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">john.doe@example.com</span>
              <span className="text-gray-400">password123</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">jane.smith@example.com</span>
              <span className="text-gray-400">password123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
