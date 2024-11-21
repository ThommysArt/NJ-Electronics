import { prisma } from '@/prisma/connection'
import { auth } from '@/auth'

export async function getCart() {
  const session = await auth()
  if (!session || !session.user) {
    return null
  }

  const cart = await prisma.cart.findFirst({
    where: { userId: session.user.id, isOrdered: false },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  })

  return cart
}