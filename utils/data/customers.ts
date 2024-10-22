"server only"

import { prisma } from "@/prisma/connection"

export async function getCustomers () {
    return await prisma.user.findMany()
}