"use server"

import { prisma } from "@/prisma/connection"
import { CategorySchema } from "@/constants/zod"
import * as z from 'zod'

export const createCategory = async (values: z.infer<typeof CategorySchema>) => {
    return await prisma.category.create({
        data: values
    })
}

export async function deleteCategory(categoryId: string) {
    try {
        await prisma.category.delete({
            where: { categoryId }
        })
        return { success: true }
    } catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}