// Individual product detail page

import { ProductDetail } from "@/modules/products/ui/product-detail"

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <ProductDetail productId={params.id} />
    </div>
  )
}
