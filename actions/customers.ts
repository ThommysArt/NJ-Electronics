"use server"

import { prisma } from "@/prisma/connection"
import { UserRole } from "@prisma/client"

export async function makeAdmin (userId: string) {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: UserRole.ADMIN
        }
    })
}

export async function removeAdmin (userId: string) {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: UserRole.CUSTOMER
        }
    })
}