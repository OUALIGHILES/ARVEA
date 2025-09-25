// Product list component with loading and error states

"use client"

import { ProductCard } from "./product-card"
import { LoadingCard } from "@/components/ui/loading"
import { useProducts } from "../hooks/use-products"
import type { ProductsQuery } from "../services/products-api"

interface ProductListProps {
  query?: ProductsQuery
  title?: string
}

export function ProductList({ query = {}, title = "Products" }: ProductListProps) {
  const { products, isLoading, error } = useProducts(query)

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Products</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {!isLoading && <span className="text-muted-foreground">{products.length} products found</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <LoadingCard key={i} />)
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or check back later.</p>
          </div>
        </div>
      )}
    </div>
  )
}
