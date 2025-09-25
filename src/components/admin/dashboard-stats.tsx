// Dashboard statistics component

"use client"

import type { Product } from "@/types"

interface DashboardStatsProps {
  products: Product[]
}

export function DashboardStats({ products }: DashboardStatsProps) {
  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.inStock).length
  const outOfStockProducts = totalProducts - inStockProducts
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stockQuantity, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
    }).format(amount)
  }

  const stats = [
    {
      title: "Total Products",
      value: totalProducts.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
          />
        </svg>
      ),
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "In Stock",
      value: inStockProducts.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Total Inventory Value",
      value: formatCurrency(totalValue),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      color: "text-purple-600 bg-purple-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
