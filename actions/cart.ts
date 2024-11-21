'use server'

import { prisma } from '@/prisma/connection'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export async function addToCart(formData: FormData) {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('You must be logged in to add items to your cart')
  }

  const productId = formData.get('productId') as string
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
    select: { price: true },
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
          price: product.price,
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

export async function checkout(cartId: string, phoneNumber: string) {
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
      paymentName: cart.user.name!, // You might want to get this from the form
      paymentPhone: phoneNumber, // You might want to get this from the form
    },
  })

  await prisma.cart.update({
    where: { cartId },
    data: { isOrdered: true },
  })

  revalidatePath('/store/cart')
  redirect('/store/order-confirmation')
}