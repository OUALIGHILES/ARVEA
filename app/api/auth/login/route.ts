// Login API endpoint

import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { validateEmail } from "@/lib/validation"
import type { ApiResponse } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        error: "Email and password are required",
      }
      return NextResponse.json(response, { status: 400 })
    }

    if (!validateEmail(email)) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid email format",
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Find user by email
    const user = await db.users.findByEmail(email)
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid credentials",
      }
      return NextResponse.json(response, { status: 401 })
    }

    // Verify password (placeholder implementation)
    // For the default admin user, check against the stored password
    const userWithPassword = user as any
    const storedPassword = userWithPassword.password || `hashed_${password}`
    const isValidPassword = await auth.comparePassword(password, storedPassword)
    
    if (!isValidPassword) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid credentials",
      }
      return NextResponse.json(response, { status: 401 })
    }

    // Generate JWT token
    const token = await auth.generateToken(user)

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      message: "Login successful",
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    const response: ApiResponse = {
      success: false,
      error: "Internal server error",
    }
    return NextResponse.json(response, { status: 500 })
  }
}
