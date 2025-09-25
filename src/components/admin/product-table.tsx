// Product management table for admin dashboard

"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { LoadingSpinner } from "@/components/ui/loading"
import type { Product } from "@/types"
import { productsApi } from "@/modules/products/services/products-api"

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onRefresh: () => void
}

export function ProductTable({ products, onEdit, onRefresh }: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
    }).format(price)
  }

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return
    }

    setDeletingId(product.id)

    try {
      await productsApi.deleteProduct(product.id)
      onRefresh()
    } catch (error) {
      console.error("Failed to delete product:", error)
      alert("Failed to delete product. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
          <p>Create your first product to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-card border border-border rounded-lg">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left p-4 font-medium text-foreground">Product</th>
            <th className="text-left p-4 font-medium text-foreground">Category</th>
            <th className="text-left p-4 font-medium text-foreground">Price</th>
            <th className="text-left p-4 font-medium text-foreground">Stock</th>
            <th className="text-left p-4 font-medium text-foreground">Status</th>
            <th className="text-left p-4 font-medium text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border hover:bg-muted/25">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{product.description}</div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="capitalize text-muted-foreground bg-muted px-2 py-1 rounded text-sm">
                  {product.category}
                </span>
              </td>
              <td className="p-4 font-medium text-foreground">{formatPrice(product.price)}</td>
              <td className="p-4 text-muted-foreground">{product.stockQuantity}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    product.inStock
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    {deletingId === product.id ? <LoadingSpinner size="sm" /> : "Delete"}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
