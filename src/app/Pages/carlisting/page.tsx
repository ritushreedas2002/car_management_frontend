'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Plus } from 'lucide-react'

// Sample car data
const cars = [
  { id: 1, model: "Tesla Model 3", price: 41990, image: "/placeholder.svg?height=200&width=300", features: ["Electric", "Autopilot", "360° Camera"] },
  { id: 2, model: "Ford Mustang", price: 27470, image: "/placeholder.svg?height=200&width=300", features: ["V8 Engine", "10-Speed Transmission", "Track Apps"] },
  { id: 3, model: "Toyota Camry", price: 25945, image: "/placeholder.svg?height=200&width=300", features: ["Hybrid Option", "Toyota Safety Sense", "Apple CarPlay"] },
  { id: 4, model: "Honda Civic", price: 22350, image: "/placeholder.svg?height=200&width=300", features: ["Fuel Efficient", "Honda Sensing", "Versatile Design"] },
  { id: 5, model: "Chevrolet Corvette", price: 60900, image: "/placeholder.svg?height=200&width=300", features: ["Mid-Engine", "0-60 in 3s", "Magnetic Ride Control"] },
  { id: 6, model: "Porsche 911", price: 101200, image: "/placeholder.svg?height=200&width=300", features: ["Iconic Design", "Rear-Engine", "PDK Transmission"] },
]

export default function CarListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCars, setFilteredCars] = useState(cars)
  const router = useRouter()

  useEffect(() => {
    setFilteredCars(
      cars.filter(car =>
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm])

  const handleAddCar = () => {
    router.push('/Pages/carcreation')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Car Listings</h1>
        <Button onClick={handleAddCar}>
          <Plus className="mr-2 h-4 w-4" /> Add Car
        </Button>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search cars..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map(car => (
          <Card key={car.id} className="overflow-hidden">
            <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{car.model}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">${car.price.toLocaleString('en-US')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">{feature}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition-colors" variant="secondary">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}