// Logout API endpoint

import { NextResponse } from "next/server"
import type { ApiResponse } from "@/types"

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    })

    // Clear the auth cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    const response: ApiResponse = {
      success: false,
      error: "Internal server error",
    }
    return NextResponse.json(response, { status: 500 })
  }
}
