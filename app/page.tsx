// src/app/page.tsx  (remplace l'ancien fichier par celui-ci)
// Homepage with hero section and featured products — UI only changes (colors & button reactions)

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import JoinArveaSection from "@/components/JoinArveaSection"
import { ProductList } from "@/modules/products/ui/product-list"
import { ROUTES } from "@/lib/config"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Produits ARVEA
                  <span className="block text-emerald-600">Beauté & Authenticité</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Découvrez des produits naturels sélectionnés pour leur qualité. Suivez-nous sur Instagram pour les
                  nouveautés et offres exclusives.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ROUTES.PRODUCTS}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105 active:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                  >
                    Voir la boutique
                  </Button>
                </Link>

                <a
                  href="https://www.instagram.com/areva.cosmetics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-white border-2 border-amber-400 text-amber-600 hover:bg-amber-50 transition-colors transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-100"
                  >
                    Suivre sur Instagram
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-gray-500">Naturel</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">10K+</div>
                  <div className="text-sm text-gray-500">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">Livraison</div>
                  <div className="text-sm text-gray-500">Gratuite dès 5000 DA</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-amber-50">
                <img
                  src="/page.png"
                  alt="ARVEA Premium Skincare Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-gray-100 rounded-lg p-4 shadow-lg transform transition-transform hover:-translate-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Qualité Vérifiée</div>
                    <div className="text-sm text-gray-500">Testée en laboratoire</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Pourquoi Choisir ARVEA ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous sélectionnons des ingrédients naturels et des formulations testées pour une efficacité visible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instagram First</h3>
              <p className="text-gray-600">Découvrez nos nouveautés en exclusivité sur Instagram avant le lancement.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Qualité Premium</h3>
              <p className="text-gray-600">Produits testés et formulés pour de vrais résultats.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Livraison Rapide</h3>
              <p className="text-gray-600">Livraison gratuite dès 5000 DA • Paiement à la livraison</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Produits en Vedette</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Nos best-sellers préférés par la communauté ARVEA</p>
          </div>

          <ProductList query={{ limit: 8 }} title="" />

          <div className="text-center mt-12">
            <Link href={ROUTES.PRODUCTS}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors transform hover:-translate-y-1"
              >
                Voir tous les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join ARVEA Recruitment Section */}
      <JoinArveaSection />

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Prête à Transformer Votre Routine Beauté ?</h2>
          <p className="text-xl mb-8 opacity-90">Rejoignez notre communauté et profitez d'offres exclusives.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.PRODUCTS}>
              <Button size="lg" className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:brightness-95 transform hover:scale-102 transition-all">
                Commencer maintenant
              </Button>
            </Link>
            <a
              href="https://www.instagram.com/areva.cosmetics/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Suivez-nous
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
