"server only"

import { prisma } from "@/prisma/connection"
import { auth } from "@/auth"

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

export async function getCustomerOrders() {
    const session = await auth()
    if (!session || !session.user) {
      throw new Error('User not authenticated')
    }
  
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })
  
    return orders
  }