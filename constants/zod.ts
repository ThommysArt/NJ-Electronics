import * as z from "zod"

export const webAuthnSchema = z.object({
    email: z.string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
})

export const CategorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
})

export const ProductSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  reduction: z.number().min(0).max(100).optional(),
  units: z.number().int().min(1, {
    message: "Units must be at least 1.",
  }),
  images: z.array(z.string().url()).min(1, {
    message: "At least one image URL is required.",
  }),
  categoryId: z.string().uuid(),
})