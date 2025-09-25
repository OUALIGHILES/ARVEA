// Core type definitions for the ARVEA e-commerce application

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "customer"
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  inStock: boolean
  stockQuantity: number
  instagramPostId?: string
  createdAt: Date
  updatedAt: Date
}


export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
}


// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Environment configuration
export interface Config {
  DATABASE_URL: string
  JWT_SECRET: string
  INSTAGRAM_ACCESS_TOKEN?: string
  NEXT_PUBLIC_APP_URL: string
}
