"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Sparkles,
  Leaf,
  Package,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";

// Simulated product data
const featuredProducts = [
  { id: 1, name: "Sérum Vitamine C", price: "3500 DA", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop", rating: 4.8 },
  { id: 2, name: "Crème Hydratante Bio", price: "4200 DA", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=800&fit=crop", rating: 4.9 },
  { id: 3, name: "Huile d'Argan Pure", price: "2800 DA", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop", rating: 4.7 },
  { id: 4, name: "Masque Visage Naturel", price: "3200 DA", image: "https://images.unsplash.com/photo-1556229010-aa9e0eb6f4d3?w=800&h=800&fit=crop", rating: 4.6 },
];

const testimonials = [
  { name: "Amira K.", text: "Produits exceptionnels ! Ma peau n'a jamais été aussi éclatante.", rating: 5, location: "Alger" },
  { name: "Yasmine B.", text: "Qualité premium et livraison rapide. Je recommande ARVEA à 100%.", rating: 5, location: "Oran" },
  { name: "Lina M.", text: "Enfin des cosmétiques naturels efficaces. Mon rituel beauté préféré !", rating: 5, location: "Constantine" },
];

export default function ArveaHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [cartAnimation, setCartAnimation] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (productId: number) => {
    setCartAnimation(productId);
    setTimeout(() => setCartAnimation(null), 600);
    // TODO: integrate with real cart context/service
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#a6b985] to-[#8a9a6b] text-white py-2 px-4 text-center text-sm font-medium">
        🇩🇿 Livraison gratuite à partir de 5000 DA • Paiement à la livraison disponible
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-[#a6b985]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#a6b985] to-[#8a9a6b] bg-clip-text text-transparent">ARVEA</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-[#a6b985] transition-colors font-medium">Accueil</a>
              <a href="#products" className="text-gray-700 hover:text-[#a6b985] transition-colors font-medium">Produits</a>
              <a href="#about" className="text-gray-700 hover:text-[#a6b985] transition-colors font-medium">À propos</a>
              <a href="#contact" className="text-gray-700 hover:text-[#a6b985] transition-colors font-medium">Contact</a>
            </div>
            <button aria-label="Voir le panier" className="bg-[#a6b985] text-white px-6 py-2.5 rounded-full hover:bg-[#8a9a6b] transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105">
              <ShoppingBag className="w-4 h-4" />
              <span className="font-medium">Panier (0)</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f9f5] via-white to-[#f0f2eb] py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#a6b985] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="text-sm font-medium text-gray-700">100% Naturel & Certifié Bio</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">Beauté Naturelle</span>
                <span className="block bg-gradient-to-r from-[#a6b985] to-[#d4af37] bg-clip-text text-transparent">Authenticité Algérienne</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Découvrez notre collection de cosmétiques naturels, inspirés des trésors du terroir algérien. Chaque produit est une promesse de pureté et d'efficacité.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-[#a6b985] to-[#8a9a6b] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Découvrir la Collection</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a href="https://www.instagram.com/arvea76572/" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-[#a6b985] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <Instagram className="w-5 h-5" />
                  <span>Suivez-nous</span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#a6b985]">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Naturel</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#a6b985]">10K+</div>
                  <div className="text-sm text-gray-600 mt-1">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#a6b985]">4.9★</div>
                  <div className="text-sm text-gray-600 mt-1">Avis</div>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative z-10">
                <div className="w-full h-auto rounded-3xl shadow-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=1200&fit=crop"
                    alt="ARVEA Premium Skincare"
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-bounce-slow">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#a6b985] to-[#d4af37] rounded-xl flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Qualité Certifiée</div>
                      <div className="text-sm text-gray-600">Testée en laboratoire</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Pourquoi Choisir ARVEA ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Une expérience beauté unique, alliant tradition algérienne et innovation cosmétique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Instagram, title: "Instagram First", desc: "Découvrez nos nouveautés en exclusivité sur Instagram avant leur lancement officiel" },
              { icon: Leaf, title: "100% Naturel", desc: "Ingrédients purs et biologiques, sans parabènes ni sulfates. Respect de votre peau et de la nature" },
              { icon: Package, title: "Livraison Rapide", desc: "Livraison gratuite dès 5000 DA. Paiement à la livraison disponible partout en Algérie" }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-[#f8f9f5] to-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#a6b985] to-[#8a9a6b] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-gradient-to-br from-[#f8f9f5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nos Best-Sellers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Les produits préférés de notre communauté Instagram</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <article key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden aspect-square">
                  <Image src={product.image} alt={product.name} width={800} height={800} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-[#a6b985] mb-4">{product.price}</p>
                  <button onClick={() => addToCart(product.id)} className={`w-full bg-gradient-to-r from-[#a6b985] to-[#8a9a6b] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${cartAnimation === product.id ? "scale-95" : "hover:scale-105"}`}>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-[#a6b985] hover:bg-[#a6b985] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
              Voir Tous les Produits
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Ce Que Disent Nos Clientes</h2>
            <p className="text-xl text-gray-600">Des milliers de femmes nous font confiance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <aside key={idx} className="bg-gradient-to-br from-[#f8f9f5] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </aside>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#a6b985] to-[#8a9a6b] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Prête à Transformer Votre Routine Beauté ?</h2>
          <p className="text-xl mb-8 opacity-90">Rejoignez notre communauté de 10 000+ femmes qui ont fait confiance à ARVEA</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#a6b985] px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">Commencer Maintenant</button>
            <a href="https://www.instagram.com/arvea76572/" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#a6b985] transition-all duration-300 flex items-center justify-center space-x-2">
              <Instagram className="w-5 h-5" />
              <span>Suivez-nous sur Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-8 h-8 text-[#a6b985]" />
                <span className="text-2xl font-bold text-white">ARVEA</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Cosmétiques naturels algériens. Beauté authentique, qualité premium.</p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#a6b985] transition-colors">Accueil</a></li>
                <li><a href="#products" className="hover:text-[#a6b985] transition-colors">Produits</a></li>
                <li><a href="#about" className="hover:text-[#a6b985] transition-colors">À propos</a></li>
                <li><a href="#contact" className="hover:text-[#a6b985] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Informations</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#a6b985] transition-colors">Livraison</a></li>
                <li><a href="#" className="hover:text-[#a6b985] transition-colors">Retours</a></li>
                <li><a href="#" className="hover:text-[#a6b985] transition-colors">CGV</a></li>
                <li><a href="#" className="hover:text-[#a6b985] transition-colors">Mentions légales</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#a6b985]" />
                  <span>Alger, Algérie</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#a6b985]" />
                  <span>contact@arvea.dz</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#a6b985]" />
                  <span>+213 XXX XXX XXX</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© 2025 ARVEA. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://www.instagram.com/arvea76572/" target="_blank" rel="noopener noreferrer" className="hover:text-[#a6b985] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes bounce-slow { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
