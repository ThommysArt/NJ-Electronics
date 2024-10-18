"server-only"

import { prisma } from "@/prisma/connection";

export async function getAllProducts() {
    return await prisma.product.findMany();
}


export async function getProductById (productId: string) {
    try {
        return await prisma.product.findUnique({
            where: {productId},
            include: {
                category: true
            }
        })
    } catch {
        return null
    }
}