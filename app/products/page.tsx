// Products listing page

import { ProductList } from "@/modules/products/ui/product-list"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of premium skincare products, carefully curated and featured on our
            Instagram.
          </p>
        </div>

        {/* Products Grid */}
        <ProductList title="All Products" />
      </div>
    </div>
  )
}
