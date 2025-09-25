// Registration API endpoint

import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { validateEmail, validatePassword } from "@/lib/validation"
import type { ApiResponse } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      const response: ApiResponse = {
        success: false,
        error: "Email, password, and name are required",
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

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      const response: ApiResponse = {
        success: false,
        error: "Password validation failed",
        message: passwordValidation.errors.join(", "),
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email)
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        error: "User already exists with this email",
      }
      return NextResponse.json(response, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = await auth.hashPassword(password)
    
    // Check if this is the first user (admin) or if email contains "admin"
    const isFirstUser = (await db.users.count()) === 0
    const isAdminEmail = email.toLowerCase().includes("admin")
    
    const user = await db.users.create({
      email,
      name,
      role: isFirstUser || isAdminEmail ? "admin" : "customer",
    })

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
      message: "Registration successful",
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
    console.error("Registration error:", error)
    const response: ApiResponse = {
      success: false,
      error: "Internal server error",
    }
    return NextResponse.json(response, { status: 500 })
  }
}
