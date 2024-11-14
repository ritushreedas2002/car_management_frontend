
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCar } from '@/app/lib/cars'

export default function CarCreation() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [featuresInput, setFeaturesInput] = useState('') // State for the raw features input
  const [formData, setFormData] = useState({
    model: '',
    price: '',
    year: new Date().getFullYear().toString(),
    mileage: '',
    fuelType: '',
    transmission: '',
    description: '',
    features: [] as string[],
    images: [] as string[]
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleAddImageUrl = () => {
    if (images.length >= 10) {
      alert('You can only add up to 10 images.');
      return;
    }
    if (imageUrlInput.trim() !== '') {
      setImages(prev => [...prev, imageUrlInput.trim()])
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrlInput.trim()] }))
      setImageUrlInput('')
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.model.trim()) newErrors.model = 'Model is required'
    if (!formData.price.toString().trim()) newErrors.price = 'Price is required'
    if (!formData.year.trim()) newErrors.year = 'Year is required'
    if (!formData.mileage.toString().trim()) newErrors.mileage = 'Mileage is required'
    if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required'
    if (!formData.transmission) newErrors.transmission = 'Transmission is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    // Check if features are parsed
    if (formData.features.length === 0) newErrors.features = 'At least one feature is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFeaturesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeaturesInput(e.target.value)
    setErrors(prev => ({ ...prev, features: '' }))
  }

  const parseFeatures = () => {
    const featuresArray = featuresInput
      .split(',')
      .map(feature => feature.trim())
      .filter(feature => feature !== '')
    setFormData(prev => ({ ...prev, features: featuresArray }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    parseFeatures()
    if (validateForm()) {
      try {
        setIsSubmitting(true)
        const carData = {
          ...formData,
          price: Number(formData.price),
          year: Number(formData.year),
          mileage: Number(formData.mileage),
        }

        const response = await createCar(carData)
        console.log('Car created successfully:', response)
        router.push('/Pages/carlisting')
      } catch (error) {
        console.error('Error creating car:', error)
        setErrors(prev => ({ ...prev, submit: 'Failed to create car. Please try again.' }))
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Car Listing</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Images Section */}
            <div className="space-y-2">
              <Label htmlFor="imageUrlInput">Images</Label>
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Car preview ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  id="imageUrlInput"
                  type="text"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="Enter image URL"
                />
                <Button type="button" onClick={handleAddImageUrl}>
                  <Plus className="mr-2 h-4 w-4" /> Add Image
                </Button>
              </div>
              {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
            </div>

            {/* Model and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g. Tesla Model 3"
                />
                {errors.model && <p className="text-sm text-red-500">{errors.model}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 41990"
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>
            </div>

            {/* Year and Mileage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="e.g. 2023"
                />
                {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="e.g. 5000"
                />
                {errors.mileage && <p className="text-sm text-red-500">{errors.mileage}</p>}
              </div>
            </div>

            {/* Fuel Type and Transmission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select
                  name="fuelType"
                  value={formData.fuelType}
                  onValueChange={(value) => handleSelectChange('fuelType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fuelType && <p className="text-sm text-red-500">{errors.fuelType}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  name="transmission"
                  value={formData.transmission}
                  onValueChange={(value) => handleSelectChange('transmission', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                  </SelectContent>
                </Select>
                {errors.transmission && <p className="text-sm text-red-500">{errors.transmission}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the car..."
                rows={4}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                id="features"
                name="features"
                value={featuresInput}
                onChange={handleFeaturesInputChange}
                placeholder='e.g. Autopilot, 360° Camera, 15" Touchscreen'
              />
              {errors.features && <p className="text-sm text-red-500">{errors.features}</p>}
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {errors.submit && <p className="text-sm text-red-500 mb-2">{errors.submit}</p>}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
