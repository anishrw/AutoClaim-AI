export interface Vehicle {
    id: string
    make: string
    model: string
    year: string
    mileage: string
    vin?: string
  }
  
  export interface User {
    email: string
    firstName: string
    lastName: string
    vehicles: Vehicle[]
    createdAt: string
  }
  