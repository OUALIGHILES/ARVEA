// Homepage with hero section and featured products

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import JoinArveaSection from "@/components/JoinArveaSection"
import { ProductList } from "@/modules/products/ui/product-list"
import { ROUTES } from "@/lib/config"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-muted/30 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Premium Skincare
                  <span className="block text-primary">From Instagram</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Discover handpicked skincare products featured on our Instagram. Natural ingredients, exceptional
                  quality, delivered to your door.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ROUTES.PRODUCTS}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Now
                  </Button>
                </Link>
                <a
                  href="https://www.instagram.com/arvea76572/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Follow on Instagram
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Natural</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Free</div>
                  <div className="text-sm text-muted-foreground">Shipping</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/premium-skincare-collection-with-natural-products.jpg"
                  alt="ARVEA Premium Skincare Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Verified Quality</div>
                    <div className="text-sm text-muted-foreground">Lab tested & certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Choose ARVEA?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We curate the finest skincare products and share them with our Instagram community first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Instagram First</h3>
              <p className="text-muted-foreground">
                Every product is featured on our Instagram before being available for purchase. Follow us for exclusive
                previews.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                Hand-selected products with natural ingredients. Each item is tested and verified for quality and
                effectiveness.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Fast & Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on all orders with fast delivery. Your skincare routine shouldn't wait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular skincare products, as featured on Instagram.
            </p>
          </div>

          <ProductList query={{ limit: 8 }} title="" />

          <div className="text-center mt-12">
            <Link href={ROUTES.PRODUCTS}>
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join ARVEA Recruitment Section */}
      <JoinArveaSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Skincare Routine?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust ARVEA for their skincare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.PRODUCTS}>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <a
              href="https://www.instagram.com/arvea76572/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Follow Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
