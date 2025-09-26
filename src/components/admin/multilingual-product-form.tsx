// Multilingual product form component

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading"
import { validateProduct } from "@/lib/validation"
import type { Product } from "@/types"
import { productsApi, type CreateProductData } from "@/modules/products/services/products-api"

interface MultilingualProductFormProps {
  product?: Product
  onSuccess?: (product: Product) => void
  onCancel?: () => void
}

export function MultilingualProductForm({ product, onSuccess, onCancel }: MultilingualProductFormProps) {
  const [formData, setFormData] = useState<CreateProductData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    imageUrl: product?.imageUrl || "",
    category: product?.category || "",
    inStock: product?.inStock ?? true,
    stockQuantity: product?.stockQuantity || 0,
    instagramPostId: product?.instagramPostId || "",
    // Multilingual fields
    name_ar: product?.name_ar || "",
    name_fr: product?.name_fr || "",
    name_en: product?.name_en || "",
    description_ar: product?.description_ar || "",
    description_fr: product?.description_fr || "",
    description_en: product?.description_en || "",
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

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* Product Names - 3 Languages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Product Names</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="name_ar" className="block text-sm font-medium text-foreground mb-2">
              Name (Arabic) 🇸🇦
            </label>
            <Input
              id="name_ar"
              type="text"
              value={formData.name_ar || ""}
              onChange={(e) => handleChange("name_ar", e.target.value)}
              disabled={isLoading}
              placeholder="اسم المنتج بالعربية"
              className="text-right"
            />
          </div>

          <div>
            <label htmlFor="name_fr" className="block text-sm font-medium text-foreground mb-2">
              Name (French) 🇫🇷
            </label>
            <Input
              id="name_fr"
              type="text"
              value={formData.name_fr || ""}
              onChange={(e) => handleChange("name_fr", e.target.value)}
              disabled={isLoading}
              placeholder="Nom du produit en français"
            />
          </div>

          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-foreground mb-2">
              Name (English) 🇺🇸 *
            </label>
            <Input
              id="name_en"
              type="text"
              value={formData.name_en || ""}
              onChange={(e) => {
                handleChange("name_en", e.target.value)
                handleChange("name", e.target.value) // Also update main name field
              }}
              required
              disabled={isLoading}
              placeholder="Product name in English"
            />
          </div>
        </div>
      </div>

      {/* Product Descriptions - 3 Languages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Product Descriptions</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="description_ar" className="block text-sm font-medium text-foreground mb-2">
              Description (Arabic) 🇸🇦
            </label>
            <textarea
              id="description_ar"
              value={formData.description_ar || ""}
              onChange={(e) => handleChange("description_ar", e.target.value)}
              disabled={isLoading}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              placeholder="وصف المنتج بالعربية"
            />
          </div>

          <div>
            <label htmlFor="description_fr" className="block text-sm font-medium text-foreground mb-2">
              Description (French) 🇫🇷
            </label>
            <textarea
              id="description_fr"
              value={formData.description_fr || ""}
              onChange={(e) => handleChange("description_fr", e.target.value)}
              disabled={isLoading}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Description du produit en français"
            />
          </div>

          <div>
            <label htmlFor="description_en" className="block text-sm font-medium text-foreground mb-2">
              Description (English) 🇺🇸 *
            </label>
            <textarea
              id="description_en"
              value={formData.description_en || ""}
              onChange={(e) => {
                handleChange("description_en", e.target.value)
                handleChange("description", e.target.value) // Also update main description field
              }}
              required
              disabled={isLoading}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Product description in English"
            />
          </div>
        </div>
      </div>

      {/* Additional Fields */}
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
