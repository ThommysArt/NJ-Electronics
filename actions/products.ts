"use server"

import { prisma } from "@/prisma/connection";

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
