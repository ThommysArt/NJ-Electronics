"server-only"

import { prisma } from "@/prisma/connection"

export const getAllCategories = async () => {
    return await prisma.category.findMany()
}

export const getCategoryById = async (categoryId: string) => {
    try {
        return await prisma.category.findUnique({
            where: {categoryId}
        })
    } catch {
        return null
    }
}