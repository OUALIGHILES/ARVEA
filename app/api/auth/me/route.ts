// Get current user API endpoint

import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import type { ApiResponse, User } from "@/types"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      const response: ApiResponse = {
        success: false,
        error: "No authentication token",
      }
      return NextResponse.json(response, { status: 401 })
    }

    // Verify token
    const payload = await auth.verifyToken(token)
    if (!payload) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid or expired token",
      }
      return NextResponse.json(response, { status: 401 })
    }

    // Get user from database
    const user = await db.users.findById(payload.userId)
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: "User not found",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<User> = {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Get current user error:", error)
    const response: ApiResponse = {
      success: false,
      error: "Internal server error",
    }
    return NextResponse.json(response, { status: 500 })
  }
}
