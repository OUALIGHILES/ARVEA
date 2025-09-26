// Environment configuration and constants

export const config = {
  // Database (placeholder for future implementation)
  DATABASE_URL: process.env.DATABASE_URL || "placeholder://localhost:5432/arvea",

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
  JWT_EXPIRES_IN: "7d",

  // Instagram integration (future)
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,

  // App configuration
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  JOIN: "/join",
  PRODUCT_DETAIL: "/product",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
} as const

export const API_ROUTES = {
  PRODUCTS: "/api/products",
  AUTH: "/api/auth",
  USERS: "/api/users",
} as const
