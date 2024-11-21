import { notFound } from 'next/navigation'
import { getCart } from '@/utils/data/cart'
import CartContents from './_components/cart-contents'

export default async function CartPage() {
  const cart = await getCart()

  if (!cart) {
    notFound()
  }

  return <CartContents cart={cart} />
}