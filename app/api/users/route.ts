import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { ApiResponse, User } from "@/types"

export async function GET() {
  // Minimal list endpoint (could be paginated later)
  const { rows } = await (await import("@/lib/pg")).query<User>(
    'select id, email, name, role, created_at as "createdAt", updated_at as "updatedAt" from users order by created_at desc'
  )
  const res: ApiResponse<User[]> = { success: true, data: rows }
  return NextResponse.json(res)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.email || !body.name || !body.role) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 })
    }
    if (!["admin", "user", "customer"].includes(body.role)) {
      return NextResponse.json({ success: false, error: "Invalid role" }, { status: 400 })
    }
    const role = body.role === "user" ? "customer" : body.role
    const user = await db.users.create({ email: body.email, name: body.name, role })
    const res: ApiResponse<User> = { success: true, data: user }
    return NextResponse.json(res, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}


