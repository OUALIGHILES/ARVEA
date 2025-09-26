"use client"

import { useState } from "react"

type Language = "ar" | "fr" | "en"

interface ProductDescriptionProps {
  description: string
  translations?: {
    ar?: string
    fr?: string
    en?: string
  }
}

const defaultTranslations = {
  ar: {
    "Complete skincare routine with natural ingredients": "روتين العناية بالبشرة الكامل مع المكونات الطبيعية",
    "Intensive hydration with hyaluronic acid": "ترطيب مكثف مع حمض الهيالورونيك",
    "Premium skincare products with natural ingredients": "منتجات العناية بالبشرة المتميزة مع المكونات الطبيعية",
    "High-quality natural skincare products": "منتجات العناية بالبشرة الطبيعية عالية الجودة",
  },
  fr: {
    "Complete skincare routine with natural ingredients": "Routine de soins complète avec des ingrédients naturels",
    "Intensive hydration with hyaluronic acid": "Hydratation intensive avec acide hyaluronique",
    "Premium skincare products with natural ingredients": "Produits de soins premium avec ingrédients naturels",
    "High-quality natural skincare products": "Produits de soins naturels de haute qualité",
  },
  en: {
    "Complete skincare routine with natural ingredients": "Complete skincare routine with natural ingredients",
    "Intensive hydration with hyaluronic acid": "Intensive hydration with hyaluronic acid",
    "Premium skincare products with natural ingredients": "Premium skincare products with natural ingredients",
    "High-quality natural skincare products": "High-quality natural skincare products",
  },
}

export default function ProductDescription({ description, translations }: ProductDescriptionProps) {
  const [currentLang, setCurrentLang] = useState<Language>("fr")

  const getTranslatedDescription = () => {
    if (translations?.[currentLang]) {
      return translations[currentLang]
    }

    // Fallback to default translations
    const defaultTranslation = defaultTranslations[currentLang][description as keyof typeof defaultTranslations.ar]
    return defaultTranslation || description
  }

  return (
    <div className="space-y-4">
      {/* Language Selector */}
      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
        <span className="text-sm text-muted-foreground">Langue:</span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentLang("ar")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentLang === "ar"
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            عربي
          </button>
          <button
            onClick={() => setCurrentLang("fr")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentLang === "fr"
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            Français
          </button>
          <button
            onClick={() => setCurrentLang("en")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentLang === "en"
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Description */}
      <div 
        className={`text-muted-foreground leading-relaxed ${
          currentLang === "ar" ? "text-right" : "text-left"
        }`}
        dir={currentLang === "ar" ? "rtl" : "ltr"}
      >
        {getTranslatedDescription()}
      </div>
    </div>
  )
}
