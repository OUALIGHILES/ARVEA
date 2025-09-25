// Main navigation component

"use client"

import Link from "next/link"
import { useState } from "react"
import { ROUTES } from "@/lib/config"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/Button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl text-foreground">ARVEA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={ROUTES.HOME} className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href={ROUTES.PRODUCTS} className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            {user?.role === "admin" && (
              <Link href={ROUTES.DASHBOARD} className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Hello, {user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary focus:outline-none focus:text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Link
                href={ROUTES.HOME}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={ROUTES.PRODUCTS}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {user?.role === "admin" && (
                <Link
                  href={ROUTES.DASHBOARD}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <p className="text-sm text-muted-foreground">Hello, {user.name}</p>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full bg-transparent">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
