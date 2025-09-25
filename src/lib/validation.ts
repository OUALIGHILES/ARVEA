// Input validation schemas and utilities

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Product validation
export const validateProduct = (product: any): ValidationResult => {
  const errors: string[] = []

  if (!product.name || product.name.trim().length < 2) {
    errors.push("Product name must be at least 2 characters long")
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.push("Product description must be at least 10 characters long")
  }

  if (!product.price || product.price <= 0) {
    errors.push("Product price must be greater than 0")
  }

  if (!product.category || product.category.trim().length < 2) {
    errors.push("Product category is required")
  }

  if (product.stockQuantity < 0) {
    errors.push("Stock quantity cannot be negative")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Generic form validation
export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (typeof value === "string" && value.trim().length === 0)) {
    return `${fieldName} is required`
  }
  return null
}
