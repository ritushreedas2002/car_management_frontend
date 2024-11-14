import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Search, DollarSign, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Car className="h-8 w-8 text-primary mr-2" />
          <span className="text-2xl font-bold text-gray-800">CarMarket</span>
        </div>
        <div className="space-x-4">
          <Link href="/Pages/login" className="text-gray-600 hover:text-gray-800">Login</Link>
          <Link href="/Pages/signup" passHref>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Find Your Perfect Ride
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover, compare, and buy the best cars in the market.
        </p>
        <Link href="/Pages/signup" passHref>
          <Button size="lg" className="text-lg px-8 py-4">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose CarMarket?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Search className="h-12 w-12 text-primary" />}
            title="Easy Search"
            description="Find your dream car with our powerful and intuitive search tools."
          />
          <FeatureCard 
            icon={<DollarSign className="h-12 w-12 text-primary" />}
            title="Best Deals"
            description="Get access to exclusive deals and competitive prices on a wide range of vehicles."
          />
          <FeatureCard 
            icon={<Shield className="h-12 w-12 text-primary" />}
            title="Secure Transactions"
            description="Buy and sell with confidence using our secure platform."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your next car?</h2>
          <p className="text-xl mb-8">Join CarMarket today and start your journey.</p>
          <Link href="/signup" passHref>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8">
        <div className="text-center text-gray-500">
          © 2023 CarMarket. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          {icon}
          <span className="mt-4 text-xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}