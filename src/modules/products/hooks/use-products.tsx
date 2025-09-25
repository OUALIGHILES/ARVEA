// Hook for fetching and managing products

"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types"
import { fetchProducts, fetchProduct, type ProductsQuery } from "../services/products-api"

interface UseProductsReturn {
  products: Product[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

interface UseProductReturn {
  product: Product | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProducts(query: ProductsQuery = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchProducts(query)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query.category, query.search, query.limit, query.offset])

  return {
    products,
    isLoading,
    error,
    refetch: fetchData,
  }
}

export function useProduct(productId: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchProduct(productId)
      setProduct(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchData()
    }
  }, [productId])

  return {
    product,
    isLoading,
    error,
    refetch: fetchData,
  }
}
