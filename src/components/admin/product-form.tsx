// Product form component for creating/editing products

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading"
import { validateProduct } from "@/lib/validation"
import type { Product } from "@/types"
import { productsApi, type CreateProductData } from "@/modules/products/services/products-api"

interface ProductFormProps {
  product?: Product
  onSuccess?: (product: Product) => void
  onCancel?: () => void
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    imageUrl: product?.imageUrl || "",
    category: product?.category || "",
    inStock: product?.inStock ?? true,
    stockQuantity: product?.stockQuantity || 0,
    instagramPostId: product?.instagramPostId || "",
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    // Validate form data
    const validation = validateProduct(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)

    try {
      let savedProduct: Product

      if (product) {
        // Update existing product
        savedProduct = await productsApi.updateProduct(product.id, formData)
      } else {
        // Create new product
        savedProduct = await productsApi.createProduct(formData)
      }

      onSuccess?.(savedProduct)
    } catch (error) {
      setErrors([error instanceof Error ? error.message : "Failed to save product"])
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof CreateProductData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Product Name *
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            disabled={isLoading}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>
          <Input
            id="category"
            type="text"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            required
            disabled={isLoading}
            placeholder="e.g., skincare, makeup"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
            Price ($) *
          </label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
            required
            disabled={isLoading}
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="stockQuantity" className="block text-sm font-medium text-foreground mb-2">
            Stock Quantity *
          </label>
          <Input
            id="stockQuantity"
            type="number"
            min="0"
            value={formData.stockQuantity}
            onChange={(e) => handleChange("stockQuantity", Number.parseInt(e.target.value))}
            required
            disabled={isLoading}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          disabled={isLoading}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter product description"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground mb-2">
          Image URL
        </label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          disabled={isLoading}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="instagramPostId" className="block text-sm font-medium text-foreground mb-2">
          Instagram Post ID
        </label>
        <Input
          id="instagramPostId"
          type="text"
          value={formData.instagramPostId}
          onChange={(e) => handleChange("instagramPostId", e.target.value)}
          disabled={isLoading}
          placeholder="Instagram post ID (optional)"
        />
      </div>

      <div className="flex items-center">
        <input
          id="inStock"
          type="checkbox"
          checked={formData.inStock}
          onChange={(e) => handleChange("inStock", e.target.checked)}
          disabled={isLoading}
          className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
        />
        <label htmlFor="inStock" className="ml-2 block text-sm text-foreground">
          In Stock
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span className="ml-2">{product ? "Updating..." : "Creating..."}</span>
            </>
          ) : (
            <span>{product ? "Update Product" : "Create Product"}</span>
          )}
        </Button>

        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
