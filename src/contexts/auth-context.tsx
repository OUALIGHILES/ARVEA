// Authentication context provider

"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { AuthContextType, User, ApiResponse } from "@/types"
import { API_ROUTES } from "@/lib/config"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_ROUTES.AUTH}/me`, {
        credentials: "include",
      })
      const result: ApiResponse<User> = await response.json()

      if (result.success && result.data) {
        setUser(result.data)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${API_ROUTES.AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    const result: ApiResponse<{ user: User }> = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Login failed")
    }

    if (result.data?.user) {
      setUser(result.data.user)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<void> => {
    const response = await fetch(`${API_ROUTES.AUTH}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    })

    const result: ApiResponse<{ user: User }> = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Registration failed")
    }

    if (result.data?.user) {
      setUser(result.data.user)
    }
  }

  const logout = async (): Promise<void> => {
    const response = await fetch(`${API_ROUTES.AUTH}/logout`, {
      method: "POST",
      credentials: "include",
    })

    const result: ApiResponse = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Logout failed")
    }

    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
