// API service for products

import type { Product, ApiResponse } from "@/types"
import { API_ROUTES } from "@/lib/config"

export interface ProductsQuery {
  category?: string
  search?: string
  limit?: number
  offset?: number
  sortBy?: "name" | "price" | "createdAt"
  sortOrder?: "asc" | "desc"
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  imageUrl?: string
  category: string
  inStock: boolean
  stockQuantity: number
  instagramPostId?: string
  // Multilingual fields
  name_ar?: string
  name_fr?: string
  name_en?: string
  description_ar?: string
  description_fr?: string
  description_en?: string
}

export async function fetchProducts(query: ProductsQuery = {}): Promise<Product[]> {
  const searchParams = new URLSearchParams()

  if (query.category) searchParams.set("category", query.category)
  if (query.search) searchParams.set("search", query.search)
  if (query.limit) searchParams.set("limit", query.limit.toString())
  if (query.offset) searchParams.set("offset", query.offset.toString())
  if (query.sortBy) searchParams.set("sortBy", query.sortBy)
  if (query.sortOrder) searchParams.set("sortOrder", query.sortOrder)

  const url = `${API_ROUTES.PRODUCTS}?${searchParams.toString()}`

  const response = await fetch(url, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  const result: ApiResponse<Product[]> = await response.json()

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch products")
  }

  return result.data || []
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_ROUTES.PRODUCTS}/${id}`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }

  const result: ApiResponse<Product> = await response.json()

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch product")
  }

  if (!result.data) {
    throw new Error("Product not found")
  }

  return result.data
}

// Admin API functions
export const productsApi = {
  async createProduct(data: CreateProductData): Promise<Product> {
    const response = await fetch(API_ROUTES.PRODUCTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`)
    }

    const result: ApiResponse<Product> = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to create product")
    }

    if (!result.data) {
      throw new Error("Product creation failed")
    }

    return result.data
  },

  async updateProduct(id: string, data: CreateProductData): Promise<Product> {
    const response = await fetch(`${API_ROUTES.PRODUCTS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`)
    }

    const result: ApiResponse<Product> = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to update product")
    }

    if (!result.data) {
      throw new Error("Product update failed")
    }

    return result.data
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_ROUTES.PRODUCTS}/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`)
    }

    const result: ApiResponse = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to delete product")
    }
  },
}
