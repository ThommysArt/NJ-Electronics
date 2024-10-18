"use server"

import { prisma } from "@/prisma/connection";
import { ProductSchema } from "@/constants/zod";
import * as z from "zod";


export async function updateProductAvailability(productId: string, isAvailable: boolean) {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        productId: productId,
      },
      data: {
        isAvailable: isAvailable,
      },
    });

    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error("Error updating product availability:", error);
    return { success: false, error: "Failed to update product availability" };
  }
}

export async function createProduct(values: z.infer<typeof ProductSchema>) {
  try {
    const newProduct = await prisma.product.create({
      data: values,
    });

    return { success: true, product: newProduct };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct (productId: string, values: z.infer<typeof ProductSchema>) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { productId },
      data: values
    })
    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}
