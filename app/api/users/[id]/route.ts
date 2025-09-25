import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { ApiResponse, User } from "@/types"

interface Params { params: { id: string } }

export async function DELETE(request: Request, { params }: Params) {
  try {
    const ok = await db.users.delete(params.id)
    if (!ok) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    return NextResponse.json({ success: true, message: "User deleted" })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json()
    if (body.role && !["admin", "user"].includes(body.role)) {
      return NextResponse.json({ success: false, error: "Invalid role" }, { status: 400 })
    }

    let user: User | null = null
    if (body.role) {
      user = await db.users.updateRole(params.id, body.role)
    }
    // Could add name/email updates similarly if needed

    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    const res: ApiResponse<User> = { success: true, data: user, message: "User updated" }
    return NextResponse.json(res)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 })
  }
}


