// Products API - GET all products and POST new product

import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { validateProduct } from "@/lib/validation"
import type { ApiResponse, Product } from "@/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")

    const skip = (page - 1) * limit
    const where = category ? { category } : undefined

    const products = await db.products.findMany({
      skip,
      take: limit,
      where,
    })

    const response: ApiResponse<Product[]> = {
      success: true,
      data: products,
      message: `Found ${products.length} products`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching products:", error)
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch products",
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const product = await db.products.create({
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price),
      imageUrl: body.imageUrl || "/diverse-products-still-life.png",
      category: body.category,
      inStock: body.inStock ?? true,
      stockQuantity: Number.parseInt(body.stockQuantity) || 0,
      instagramPostId: body.instagramPostId,
    })

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
      message: "Product created successfully",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    const response: ApiResponse = {
      success: false,
      error: "Failed to create product",
    }
    return NextResponse.json(response, { status: 500 })
  }
}
