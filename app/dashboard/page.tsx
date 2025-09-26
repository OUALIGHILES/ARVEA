// Admin dashboard page

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { LoadingPage } from "@/components/ui/loading"
import { useAuth } from "@/contexts/auth-context"
import { useProducts } from "@/modules/products/hooks/use-products"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { ProductTable } from "@/components/admin/product-table"
import { MultilingualProductForm } from "@/components/admin/multilingual-product-form"
import type { Product } from "@/types"

type ViewMode = "list" | "create" | "edit"

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { products, isLoading: productsLoading, refetch } = useProducts()
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      window.location.href = "/"
    }
  }, [user, authLoading])

  if (authLoading) {
    return <LoadingPage />
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const handleCreateProduct = () => {
    setEditingProduct(null)
    setViewMode("create")
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setViewMode("edit")
  }

  const handleFormSuccess = () => {
    setViewMode("list")
    setEditingProduct(null)
    refetch()
  }

  const handleFormCancel = () => {
    setViewMode("list")
    setEditingProduct(null)
  }

  const handleLogout = async () => {
    try {
      const { logout } = await import("@/contexts/auth-context")
      // This is a workaround since we can't call logout directly here
      window.location.href = "/api/auth/logout"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            {viewMode === "list" && (
              <Button onClick={handleCreateProduct}>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === "list" && (
          <>
            {productsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-8 h-8 animate-spin rounded-full border-2 border-muted border-t-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              </div>
            ) : (
              <>
                <DashboardStats products={products} />
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Products</h2>
                    <Button variant="outline" onClick={refetch}>
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh
                    </Button>
                  </div>
                  <ProductTable products={products} onEdit={handleEditProduct} onRefresh={refetch} />
                </div>
              </>
            )}
          </>
        )}

        {(viewMode === "create" || viewMode === "edit") && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {viewMode === "create" ? "Create New Product" : "Edit Product"}
              </h2>
              <p className="text-muted-foreground mt-1">
                {viewMode === "create" ? "Add a new product to your inventory" : "Update the product information"}
              </p>
            </div>
            <MultilingualProductForm
              product={editingProduct || undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        )}
      </div>
    </div>
  )
}
