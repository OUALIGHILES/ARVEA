// Next.js middleware for route protection

import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"]

// Admin-only routes
const adminRoutes = ["/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route needs protection
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get auth token from cookies
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    // Redirect to login if no token
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Verify token
    const payload = await auth.verifyToken(token)
    if (!payload) {
      // Redirect to login if invalid token
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check admin role for admin routes
    if (isAdminRoute && payload.role !== "admin") {
      // Redirect to home if not admin
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware auth error:", error)
    // Redirect to login on error
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
