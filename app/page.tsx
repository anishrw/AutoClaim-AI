import { Upload, Camera, Shield, DollarSign, Users, TrendingUp, Sparkles, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-300/5 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Premium Header */}
      <header className="relative z-50 border-b border-red-800/20 bg-black/40 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg group-hover:bg-red-400/30 transition-all duration-300"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">AutoClaim</span>
              <div className="text-xs text-red-300 font-medium">Professional Assessment</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/scanner" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
              Scanner
            </Link>
            <Link href="/community" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
              Community
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
              About
            </Link>
            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-2 mb-8 animate-in fade-in duration-1000">
          <Sparkles className="h-4 w-4 text-red-400" />
          <span className="text-red-300 text-sm font-medium">AI-Powered Professional Assessment</span>
        </div>

        <h1 className="text-6xl font-bold mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
          <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
            Know Your Car Damage Cost
          </span>
          <br />
          <span className="text-red-500">Instantly</span>
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-1000 delay-400">
          Upload photos of your damaged car and get instant AI-powered damage assessment, repair cost estimates, and
          insurance payout calculations with professional-grade accuracy.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in slide-in-from-bottom-4 duration-1000 delay-600">
          <Link href="/scanner">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 text-lg shadow-2xl shadow-red-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <Camera className="mr-3 h-6 w-6" />
              Start Professional Scan
            </Button>
          </Link>
          <Link href="/community">
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-4 text-lg border-red-500/30 text-red-300 hover:bg-red-500/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            >
              <Users className="mr-3 h-6 w-6" />
              View Community Claims
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-400">Professional-grade damage assessment in three simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300 group">
            <CardHeader className="text-center pb-8">
              <div className="relative mx-auto mb-6">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/30 transition-all duration-300"></div>
                <Upload className="relative h-16 w-16 text-red-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-white text-xl mb-3">Upload Photos</CardTitle>
              <CardDescription className="text-gray-400 leading-relaxed">
                Take high-resolution photos or upload images of your damaged vehicle from multiple angles for
                comprehensive analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300 group">
            <CardHeader className="text-center pb-8">
              <div className="relative mx-auto mb-6">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-all duration-300"></div>
                <TrendingUp className="relative h-16 w-16 text-green-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-white text-xl mb-3">AI Analysis</CardTitle>
              <CardDescription className="text-gray-400 leading-relaxed">
                Our advanced AI detects damage type, severity, and affected areas with 95% accuracy using machine
                learning algorithms
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300 group">
            <CardHeader className="text-center pb-8">
              <div className="relative mx-auto mb-6">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-yellow-500/30 transition-all duration-300"></div>
                <DollarSign className="relative h-16 w-16 text-yellow-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-white text-xl mb-3">Get Professional Estimate</CardTitle>
              <CardDescription className="text-gray-400 leading-relaxed">
                Receive instant repair cost estimates and expected insurance payouts based on real market data and
                historical claims
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 bg-black/20 backdrop-blur-xl border-y border-red-500/20 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Trusted by Thousands</h3>
            <p className="text-gray-400">Industry-leading accuracy and reliability</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="bg-black/40 border border-red-500/20 rounded-xl p-8 backdrop-blur-xl hover:bg-red-500/5 transition-all duration-300">
                <div className="text-4xl font-bold text-red-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  50K+
                </div>
                <div className="text-gray-400 font-medium">Claims Analyzed</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-black/40 border border-red-500/20 rounded-xl p-8 backdrop-blur-xl hover:bg-green-500/5 transition-all duration-300">
                <div className="text-4xl font-bold text-green-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  95%
                </div>
                <div className="text-gray-400 font-medium">Accuracy Rate</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-black/40 border border-red-500/20 rounded-xl p-8 backdrop-blur-xl hover:bg-yellow-500/5 transition-all duration-300">
                <div className="text-4xl font-bold text-yellow-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  $2.3M
                </div>
                <div className="text-gray-400 font-medium">Saved in Claims</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-black/40 border border-red-500/20 rounded-xl p-8 backdrop-blur-xl hover:bg-purple-500/5 transition-all duration-300">
                <div className="text-4xl font-bold text-purple-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-gray-400 font-medium">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose AutoClaim</h2>
          <p className="text-xl text-gray-400">Professional features for accurate damage assessment</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Award,
              title: "Professional Grade",
              description: "Enterprise-level AI technology used by insurance professionals",
              color: "text-red-400",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your data is encrypted and protected with bank-level security",
              color: "text-blue-400",
            },
            {
              icon: Star,
              title: "Instant Results",
              description: "Get comprehensive damage reports in under 60 seconds",
              color: "text-yellow-400",
            },
            {
              icon: TrendingUp,
              title: "Market Data",
              description: "Real-time repair costs based on current market rates",
              color: "text-green-400",
            },
            {
              icon: Users,
              title: "Community Insights",
              description: "Learn from thousands of real insurance claim experiences",
              color: "text-purple-400",
            },
            {
              icon: DollarSign,
              title: "Cost Savings",
              description: "Avoid overpaying for repairs with accurate estimates",
              color: "text-orange-400",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-black/40 border-red-500/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <feature.icon
                      className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/60 backdrop-blur-xl border-t border-red-500/20 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Shield className="h-8 w-8 text-red-500" />
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold">AutoClaim</span>
                  <div className="text-xs text-red-300 font-medium">Professional Assessment</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional Vehicle Damage Assessment powered by advanced AI technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/scanner" className="hover:text-red-400 transition-colors">
                    Damage Scanner
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-red-400 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-red-400 transition-colors">
                    API Access
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-red-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-red-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-red-400 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-red-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-red-400 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-red-400 transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-500/20 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoClaim. All rights reserved. Professional Vehicle Damage Assessment.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
