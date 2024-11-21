import { notFound } from 'next/navigation'
import { getCart } from '@/utils/data/cart'
import CartContents from './_components/cart-contents'
import { Card, CardFooter, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function CartPage() {
  const cart = await getCart()

  if (!cart) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Your Cart is Empty</CardTitle>
            <CardDescription>
              You have no items in your cart. Would you like to go for a shopping spree?
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/store">
              <Button>
                Go Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return <CartContents cart={cart} />
}