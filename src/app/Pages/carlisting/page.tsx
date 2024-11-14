
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Plus, Trash } from 'lucide-react'
import { fetchCars } from '@/app/lib/cars'
import { deleteCar } from '@/app/lib/cars'
import { Dialog,  DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface Car {
  _id: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  features: string[];
  images: string[];
}

export default function CarListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState<string>('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [carToDelete, setCarToDelete] = useState<Car | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const loadCars = async () => {
      try {
        const carsData = await fetchCars();
        setCars(carsData);
        setFilteredCars(carsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cars');
        console.error('Error loading cars:', err);
      }
    };

    loadCars();
  }, []);

  useEffect(() => {
    setFilteredCars(
      cars.filter(car =>
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, cars])

  const handleAddCar = () => {
    router.push('/Pages/carcreation')
  }

  const handleConfirmDelete = async () => {
    if (!carToDelete) return
    setIsDeleting(true)
    setDeleteError('')
    try {
      await deleteCar(carToDelete._id)
      setCars(prevCars => prevCars.filter(car => car._id !== carToDelete._id))
      setFilteredCars(prevCars => prevCars.filter(car => car._id !== carToDelete._id))
      setIsDeleteDialogOpen(false)
      setCarToDelete(null)
    } catch {
      setDeleteError('Failed to delete car. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">
          <p>Error loading cars: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {carToDelete?.model}?</p>
          {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
          <DialogFooter className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
      {filteredCars.length === 0 ? (
        <p className="text-center text-gray-500">No cars found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <Card key={car._id} className="overflow-hidden relative">
              {/* Delete Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  setCarToDelete(car)
                  setIsDeleteDialogOpen(true)
                }}
              >
                <Trash className="h-5 w-5 text-red-500" />
              </Button>
              <img 
                src={car.images[0] || "/placeholder.svg?height=200&width=300"} 
                alt={car.model} 
                className="w-full h-48 object-cover" 
              />
              <CardHeader>
                <CardTitle>{car.model}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">${car.price.toLocaleString('en-US')}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Year: {car.year}</p>
                  <p className="text-sm text-gray-600">Mileage: {car.mileage.toLocaleString()} miles</p>
                  <p className="text-sm text-gray-600">Fuel Type: {car.fuelType}</p>
                  <p className="text-sm text-gray-600">Transmission: {car.transmission}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition-colors"
                  variant="secondary"
                  onClick={() => router.push(`/Pages/car_details/${car._id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

