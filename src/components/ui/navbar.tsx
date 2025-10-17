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
    <nav className="bg-background border-b border-border shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 🔆 Logo Section */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-3">
            <img
              src="/logo.svg"
              alt="ARVEA Logo"
              className="w-10 h-10 drop-shadow-[0_0_8px_#ffda79] hover:drop-shadow-[0_0_16px_#ffd43b] transition-all duration-300"
            />
            <span className="font-extrabold text-2xl bg-gradient-to-r from-yellow-500 to-lime-400 text-transparent bg-clip-text">
              ARVEA
            </span>
          </Link>

          {/* 💻 Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={ROUTES.HOME} className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href={ROUTES.PRODUCTS} className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href={ROUTES.JOIN} className="text-foreground hover:text-primary transition-colors">
              Join ARVEA
            </Link>
            {user?.role === "admin" && (
              <Link href={ROUTES.DASHBOARD} className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}

            {/* 👤 Auth buttons */}
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
                  <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-lime-400 text-black font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
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

        {/* 📱 Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
              <Link
                href={ROUTES.JOIN}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Join ARVEA
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
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-gradient-to-r from-yellow-400 to-lime-400 text-black font-semibold">
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
