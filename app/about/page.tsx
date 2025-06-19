import { Shield, Users, Target, Award, Sparkles, Code, Zap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
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
            <Link href="/about" className="text-red-400 font-medium">
              About
            </Link>
            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-red-300 text-sm font-medium">State Farm Hackday 2025</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              About AutoClaim
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing vehicle damage assessment through AI-powered technology, built for the State Farm Hackday
              2025 challenge.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10 mb-12">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <Target className="h-8 w-8 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
                  <CardDescription className="text-red-200">
                    Empowering drivers with instant damage insights
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed">
                AutoClaim was created to solve a critical problem in the insurance industry: the uncertainty drivers
                face when dealing with vehicle damage. Our AI-powered platform provides instant, accurate damage
                assessments, helping drivers make informed decisions about insurance claims and repairs.
              </p>
            </CardContent>
          </Card>

          {/* Hackday Section */}
          <Card className="bg-gradient-to-r from-red-900/40 to-black/60 border-red-500/30 backdrop-blur-xl shadow-2xl shadow-red-500/20 mb-12">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <Code className="h-8 w-8 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl">State Farm Hackday 2025</CardTitle>
                  <CardDescription className="text-red-200">Innovation in Insurance Technology</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  AutoClaim was developed as part of the State Farm Hackday 2025 challenge, focusing on creating
                  innovative solutions that improve the customer experience in insurance claims processing.
                </p>
                <div className="bg-black/30 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                    Challenge Focus Areas:
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• AI-powered damage detection and assessment</li>
                    <li>• Real-time cost estimation and insurance calculations</li>
                    <li>• Community-driven insights and experiences</li>
                    <li>• Streamlined claims process automation</li>
                    <li>• Mobile-first user experience design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Award className="h-8 w-8 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Professional Grade AI</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Advanced machine learning algorithms trained on thousands of vehicle damage cases for 95% accuracy
                      in damage detection and cost estimation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Community Driven</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Real experiences from thousands of drivers sharing their damage assessments, repair costs, and
                      insurance claim outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Secure & Private</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Bank-level encryption and privacy protection ensure your vehicle data and personal information
                      remain completely secure.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Instant Results</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Get comprehensive damage reports, repair cost estimates, and insurance payout calculations in
                      under 60 seconds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10 mb-12">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Code className="mr-3 h-6 w-6 text-red-400" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Frontend</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Next.js 14 with React</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• shadcn/ui Components</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">AI & Backend</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Computer Vision AI</li>
                    <li>• Machine Learning Models</li>
                    <li>• RESTful APIs</li>
                    <li>• Real-time Processing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Data & Security</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• PostgreSQL Database</li>
                    <li>• End-to-end Encryption</li>
                    <li>• GDPR Compliance</li>
                    <li>• Cloud Infrastructure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Section */}
          <Card className="bg-gradient-to-r from-green-900/40 to-black/60 border-green-500/30 backdrop-blur-xl shadow-2xl shadow-green-500/20 mb-12">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Heart className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl">Our Impact</CardTitle>
                  <CardDescription className="text-green-200">
                    Making a difference in the insurance industry
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">50K+</div>
                  <div className="text-gray-300">Claims Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">$2.3M</div>
                  <div className="text-gray-300">Saved in Claims</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                  <div className="text-gray-300">Accuracy Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience AutoClaim?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of drivers who trust AutoClaim for accurate, professional vehicle damage assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scanner">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 text-lg shadow-2xl shadow-red-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  Try AutoClaim Now
                </Button>
              </Link>
              <Link href="/community">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 py-4 text-lg border-red-500/30 text-red-300 hover:bg-red-500/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  View Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
