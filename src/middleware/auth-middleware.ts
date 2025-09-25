// Authentication middleware utilities

import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import type { User } from "@/types"

export interface AuthenticatedRequest extends NextRequest {
  user?: User
}

// Get current user from request
export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return null
    }

    // Verify token
    const payload = await auth.verifyToken(token)
    if (!payload) {
      return null
    }

    // Get user from database
    const user = await db.users.findById(payload.userId)
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Check if user has required role
export function hasRole(user: User | null, requiredRole: string): boolean {
  if (!user) return false

  // Admin has access to everything
  if (user.role === "admin") return true

  // Check specific role
  return user.role === requiredRole
}

// Middleware for protecting API routes
export async function requireAuth(request: NextRequest): Promise<User | null> {
  const user = await getCurrentUser(request)
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

// Middleware for requiring specific role
export async function requireRole(request: NextRequest, role: string): Promise<User> {
  const user = await requireAuth(request)
  if (!user) {
    throw new Error("Authentication required")
  }

  if (!hasRole(user, role)) {
    throw new Error("Insufficient permissions")
  }

  return user
}
