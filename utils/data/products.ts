"server only"

import { prisma } from "@/prisma/connection";

export async function getAllProducts() {
    return await prisma.product.findMany();
}


export async function getProductById(productId: string) {
    return prisma.product.findUnique({
      where: { productId },
      include: { category: true },
    })
  }
  
  export async function getProductsAndCategories(category?: string) {
    const products = await prisma.product.findMany({
      where: category ? { category: { name: category } } : {},
      include: { category: true },
    })
  
    const categories = await prisma.category.findMany()
  
    return {
      products: products,
      categories: categories,
    }
  }