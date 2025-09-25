// Individual product API - GET, PUT, DELETE by ID

import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { validateProduct } from "@/lib/validation"
import type { ApiResponse, Product } from "@/types"

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const product = await db.products.findById(params.id)

    if (!product) {
      const response: ApiResponse = {
        success: false,
        error: "Product not found",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching product:", error)
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch product",
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()

    // Validate product data
    const validation = validateProduct(body)
    if (!validation.isValid) {
      const response: ApiResponse = {
        success: false,
        error: "Validation failed",
        message: validation.errors.join(", "),
      }
      return NextResponse.json(response, { status: 400 })
    }

    // TODO: Add authentication check for admin role
    // const user = await getCurrentUser(request)
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    const product = await db.products.update(params.id, {
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price),
      imageUrl: body.imageUrl,
      category: body.category,
      inStock: body.inStock,
      stockQuantity: Number.parseInt(body.stockQuantity),
      instagramPostId: body.instagramPostId,
    })

    if (!product) {
      const response: ApiResponse = {
        success: false,
        error: "Product not found",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
      message: "Product updated successfully",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error updating product:", error)
    const response: ApiResponse = {
      success: false,
      error: "Failed to update product",
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // TODO: Add authentication check for admin role
    // const user = await getCurrentUser(request)
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    const success = await db.products.delete(params.id)

    if (!success) {
      const response: ApiResponse = {
        success: false,
        error: "Product not found",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse = {
      success: true,
      message: "Product deleted successfully",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error deleting product:", error)
    const response: ApiResponse = {
      success: false,
      error: "Failed to delete product",
    }
    return NextResponse.json(response, { status: 500 })
  }
}
