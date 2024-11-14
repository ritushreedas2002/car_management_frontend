import axios from 'axios';

export interface Car {
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
  export interface CarData {
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
  
  
  export const createCar = async (carData:CarData) => {
    console.log(carData);
    const response = await axios.post('/api/cars/create', carData);
    return response.data;
  };
  
  export const updateCar = async (id: string, carData: Car) => {
    const response = await axios.patch(`/api/cars/${id}`, carData);
    return response.data;
  };
  

export const fetchCars = async () => {
    try {
        const response = await axios.get('/api/cars/list');
        console.log(response.data.cars);
        return response.data.cars;
    } catch (error) {
        console.error('Error in fetchCars:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch cars');
    }
};

export const getCarById = async (id: string) => {
    try {
        const response = await axios.get(`/api/cars/${id}`);
        return response.data.car;
    } catch (error) {
        console.error('Error in getCarById:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch car details');
    }
}; 


export const deleteCar = async (id: string) => {
    try {
        const response = await axios.delete(`/api/cars/${id}`);
        console.log("fromm the delete",response.data)
        return response.data.message;
    } catch (error) {
        console.error('Error in deleteCar:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to delete car');
    }
};