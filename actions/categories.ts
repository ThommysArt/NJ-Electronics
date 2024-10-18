"use server"

import { prisma } from "@/prisma/connection"
import { CategorySchema } from "@/constants/zod"
import * as z from 'zod'

export const getAllCategories = async () => {
    return await prisma.category.findMany()
}

export const createCategory = async (values: z.infer<typeof CategorySchema>) => {
    return await prisma.category.create({
        data: values
    })
}