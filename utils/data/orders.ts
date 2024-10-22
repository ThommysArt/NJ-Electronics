"server only"

import { prisma } from "@/prisma/connection"

export async function getAllOrders () {
    return await prisma.order.findMany()
}

export async function getOrderById (orderId: string) {
    try {
        return await prisma.order.findUnique({
            where: {orderId},
            include: {
                cart: {
                    include: {
                        cartItems: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })
    } catch {
        return null
    }
}