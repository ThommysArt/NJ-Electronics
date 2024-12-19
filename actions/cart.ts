'use server'

import { prisma } from '@/prisma/connection'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export async function addToCart(productId: string) {
  const session = await auth()
  if (!session || !session.user) {
    const callbackUrl = encodeURIComponent(`/store/products/${productId}`)
    redirect(`/auth/sign-in?callbackUrl=${callbackUrl}`)
    return
  }
  const userId = session.user.id

  let cart = await prisma.cart.findFirst({
    where: { userId, isOrdered: false },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: userId!, isOrdered: false },
    })
  }

  const product = await prisma.product.findUnique({
    where: { productId },
    select: { price: true, reduction: true },
  })

  if (!product) {
    throw new Error('Product not found')
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.cartId, productId },
  })

  if (cartItem) {
    await prisma.cartItem.update({
      where: { cartItemId: cartItem.cartItemId },
      data: { units: cartItem.units + 1 },
    })
  } else {
    await prisma.cartItem.create({
        data: {
          cartId: cart.cartId,
          productId,
          units: 1,
          price: product.reduction ? product.price - (product.price * product.reduction / 100) : product.price,
        },
      })
  }
  revalidatePath('/store/cart')
  redirect('/store/cart')
}

export async function updateCartItemQuantity(cartItemId: string, units: number) {
  await prisma.cartItem.update({
    where: { cartItemId },
    data: { units },
  })

  revalidatePath('/store/cart')
}

export async function removeCartItem(cartItemId: string) {
  await prisma.cartItem.delete({
    where: { cartItemId },
  })

  revalidatePath('/store/cart')
}

export async function checkout(cartId: string, phoneNumber: string, name: string) {
  const cart = await prisma.cart.findUnique({
    where: { cartId },
    include: { cartItems: true, user: true },
  })

  if (!cart) {
    throw new Error('Cart not found')
  }

  const amount = cart.cartItems.reduce((total, item) => total + item.price * item.units, 0)

  await prisma.order.create({
    data: {
      cartId,
      userId: cart.userId,
      amount,
      paymentName: name,
      paymentPhone: phoneNumber,
    },
  })

  await prisma.cart.update({
    where: { cartId },
    data: { isOrdered: true },
  })

  revalidatePath('/store/cart')
  redirect('/store')
}