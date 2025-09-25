// Database implementation backed by PostgreSQL (Supabase pooler)

import type { Product, User } from "@/types"
import { query } from "@/lib/pg"

export const db = {
  products: {
    async findMany(options?: { skip?: number; take?: number; where?: { category?: string } }): Promise<Product[]> {
      const skip = options?.skip ?? 0
      const take = options?.take ?? 10
      const category = options?.where?.category

      let sql = "select id, name, description, price, image_url as \"imageUrl\", category, in_stock as \"inStock\", stock_quantity as \"stockQuantity\", instagram_post_id as \"instagramPostId\", created_at as \"createdAt\", updated_at as \"updatedAt\" from products"
      const params: any[] = []
      if (category) {
        params.push(category)
        sql += ` where category = $${params.length}`
      }
      params.push(take)
      sql += ` order by created_at desc limit $${params.length}`
      params.push(skip)
      sql += ` offset $${params.length}`

      const { rows } = await query<Product>(sql, params)
      return rows
    },

    async findById(id: string): Promise<Product | null> {
      const { rows } = await query<Product>(
        'select id, name, description, price, image_url as "imageUrl", category, in_stock as "inStock", stock_quantity as "stockQuantity", instagram_post_id as "instagramPostId", created_at as "createdAt", updated_at as "updatedAt" from products where id = $1',
        [id]
      )
      return rows[0] || null
    },

    async create(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
      const { rows } = await query<Product>(
        'insert into products (name, description, price, image_url, category, in_stock, stock_quantity, instagram_post_id) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id, name, description, price, image_url as "imageUrl", category, in_stock as "inStock", stock_quantity as "stockQuantity", instagram_post_id as "instagramPostId", created_at as "createdAt", updated_at as "updatedAt"',
        [
          data.name,
          data.description,
          data.price,
          data.imageUrl,
          data.category,
          data.inStock,
          data.stockQuantity,
          data.instagramPostId ?? null,
        ]
      )
      return rows[0]
    },

    async update(id: string, data: Partial<Product>): Promise<Product | null> {
      const { rows } = await query<Product>(
        'update products set name = coalesce($2, name), description = coalesce($3, description), price = coalesce($4, price), image_url = coalesce($5, image_url), category = coalesce($6, category), in_stock = coalesce($7, in_stock), stock_quantity = coalesce($8, stock_quantity), instagram_post_id = coalesce($9, instagram_post_id), updated_at = now() where id = $1 returning id, name, description, price, image_url as "imageUrl", category, in_stock as "inStock", stock_quantity as "stockQuantity", instagram_post_id as "instagramPostId", created_at as "createdAt", updated_at as "updatedAt"',
        [
          id,
          data.name ?? null,
          data.description ?? null,
          data.price ?? null,
          data.imageUrl ?? null,
          data.category ?? null,
          data.inStock ?? null,
          data.stockQuantity ?? null,
          data.instagramPostId ?? null,
        ]
      )
      return rows[0] || null
    },

    async delete(id: string): Promise<boolean> {
      const { rows } = await query<{ id: string }>('delete from products where id = $1 returning id', [id])
      return Boolean(rows[0])
    },
  },

  users: {
    async findByEmail(email: string): Promise<User | null> {
      const { rows } = await query<User>(
        'select id, email, name, role, created_at as "createdAt", updated_at as "updatedAt" from users where email = $1',
        [email]
      )
      return rows[0] || null
    },

    async findById(id: string): Promise<User | null> {
      const { rows } = await query<User>(
        'select id, email, name, role, created_at as "createdAt", updated_at as "updatedAt" from users where id = $1',
        [id]
      )
      return rows[0] || null
    },

    async create(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
      const { rows } = await query<User>(
        'insert into users (email, name, role) values ($1,$2,$3) returning id, email, name, role, created_at as "createdAt", updated_at as "updatedAt"',
        [data.email, data.name, data.role]
      )
      return rows[0]
    },

    async updateRole(id: string, role: User["role"]): Promise<User | null> {
      const { rows } = await query<User>(
        'update users set role = $2, updated_at = now() where id = $1 returning id, email, name, role, created_at as "createdAt", updated_at as "updatedAt"',
        [id, role]
      )
      return rows[0] || null
    },

    async delete(id: string): Promise<boolean> {
      const { rows } = await query<{ id: string }>('delete from users where id = $1 returning id', [id])
      return Boolean(rows[0])
    },
  },
}
