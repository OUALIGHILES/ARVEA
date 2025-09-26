// Product description tabs component for multilingual display

"use client"

import { useState } from "react"
import type { Product } from "@/types"

interface ProductDescriptionTabsProps {
  product: Product
}

export function ProductDescriptionTabs({ product }: ProductDescriptionTabsProps) {
  const [activeTab, setActiveTab] = useState<'ar' | 'fr' | 'en'>('en')

  const getDescription = (language: 'ar' | 'fr' | 'en') => {
    switch (language) {
      case 'ar':
        return product.description_ar || product.description
      case 'fr':
        return product.description_fr || product.description
      case 'en':
        return product.description_en || product.description
      default:
        return product.description
    }
  }

  const getName = (language: 'ar' | 'fr' | 'en') => {
    switch (language) {
      case 'ar':
        return product.name_ar || product.name
      case 'fr':
        return product.name_fr || product.name
      case 'en':
        return product.name_en || product.name
      default:
        return product.name
    }
  }

  const tabs = [
    { id: 'ar' as const, label: 'العربية', flag: '🇸🇦' },
    { id: 'fr' as const, label: 'Français', flag: '🇫🇷' },
    { id: 'en' as const, label: 'English', flag: '🇺🇸' }
  ]

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {getName(activeTab)}
        </h2>
      </div>

      {/* Language Tabs */}
      <div className="flex space-x-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="mr-2">{tab.flag}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Description */}
        <div>
          <p className="text-muted-foreground leading-relaxed">
            {getDescription(activeTab)}
          </p>
        </div>

        {/* Language indicator */}
        <div className="text-xs text-muted-foreground">
          {activeTab === 'ar' && 'Affiché en arabe'}
          {activeTab === 'fr' && 'Affiché en français'}
          {activeTab === 'en' && 'Displayed in English'}
        </div>
      </div>
    </div>
  )
}
