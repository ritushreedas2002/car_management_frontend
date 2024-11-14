
'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Edit, X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getCarById } from '@/app/lib/cars'
import { updateCar } from '@/app/lib/cars'

interface Car {
  _id: string
  model: string
  price: number
  year: number
  mileage: number
  fuelType: string
  transmission: string
  description: string
  features: string[]
  images: string[]
  // Include other fields if necessary
}

interface GetCarByIdResponse {
  message: string
  car: Car
}

export default function CarDetails({ params }: { params: { id: string } }) {
  const [carDetails, setCarDetails] = useState<Car | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [editedCarDetails, setEditedCarDetails] = useState<Car | null>(null)
  const [newImageUrl, setNewImageUrl] = useState<string>('')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data: GetCarByIdResponse = await getCarById(params.id)
        console.log(data)
        if (data && data.car) {
          setCarDetails(data.car)
          setEditedCarDetails(data.car)
        } else {
          setError('Car details not found')
        }
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load car details')
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [params.id])

  const nextImage = () => {
    if (carDetails) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carDetails.images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

  const prevImage = () => {
    if (carDetails) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? carDetails.images.length - 1 : prevIndex - 1
      )
    }
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedCarDetails((prev) => {
      if (!prev) return null
      return {
        ...prev,
        [name]: ['price', 'year', 'mileage'].includes(name) ? Number(value) : value
      }
    })
  }

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEditedCarDetails((prev) => {
      if (!prev) return null
      return {
        ...prev,
        features: value.split(',').map((feature) => feature.trim())
      }
    })
  }

  const handleAddImage = () => {
    if (editedCarDetails && editedCarDetails.images.length >= 10) {
      alert('You can only add up to 10 images.');
      return;
    }
   
    if (newImageUrl) {
      setEditedCarDetails((prev) => {
        if (!prev) return null
        return {
          ...prev,
          images: [...prev.images, newImageUrl]
        }
      })
      setNewImageUrl('')
    }
  }

  const handleDeleteImage = (index: number) => {
    setEditedCarDetails((prev) => {
      if (!prev) return null
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }
    })
  }

  const handleSave = async () => {
    if (!carDetails || !editedCarDetails) return
    setIsSaving(true)
    setSaveError(null)
    try {
      const updatedCar = await updateCar(carDetails._id, editedCarDetails)
      setCarDetails(updatedCar.car)
      setEditedCarDetails(updatedCar.car)
      setIsEditDialogOpen(false)
      // Optionally, show a success message
    } catch (error) {
      console.error('Failed to save changes:', error)
      setSaveError('Failed to save changes. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>
  }

  if (!carDetails) {
    return <div className="container mx-auto px-4 py-8">Car not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{carDetails.model}</h1>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </DialogTrigger>
          {editedCarDetails && (
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Car Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      value={editedCarDetails.model}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={editedCarDetails.price}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={editedCarDetails.year}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      value={editedCarDetails.mileage}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Input
                      id="fuelType"
                      name="fuelType"
                      value={editedCarDetails.fuelType}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <Input
                      id="transmission"
                      name="transmission"
                      value={editedCarDetails.transmission}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editedCarDetails.description}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    name="features"
                    value={editedCarDetails.features.join(', ')}
                    onChange={handleFeaturesChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Images</Label>
                  <div className="flex flex-wrap gap-2">
                    {editedCarDetails.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Car image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="New image URL"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <Button onClick={handleAddImage}>Add Image</Button>
                  </div>
                </div>
              </div>
              {saveError && <p className="text-sm text-red-500 mb-2">{saveError}</p>}
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsEditDialogOpen(false)}
                  variant="outline"
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative">
            <img
              src={carDetails.images[currentImageIndex]}
              alt={`${carDetails.model} - Image ${currentImageIndex + 1}`}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            {carDetails.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {carDetails.images.length > 1 && (
            <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
              {carDetails.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${carDetails.model} - Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    index === currentImageIndex ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  ${carDetails.price.toLocaleString()}
                </h2>
                <Badge variant="secondary">{carDetails.year}</Badge>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">
                    {carDetails.mileage.toLocaleString()} miles
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium">{carDetails.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{carDetails.transmission}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {carDetails.description}
              </p>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {carDetails.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Button className="w-full mt-4">Contact Seller</Button>
        </div>
      </div>
    </div>
  )
}
