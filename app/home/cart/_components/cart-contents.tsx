'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { updateCartItemQuantity, removeCartItem, checkout } from '@/actions/cart'
import { PurchaseDialog } from './purchase-dialog'

type CartContentsProps = {
  cart: {
    cartId: string
    cartItems: {
      cartItemId: string
      productId: string
      units: number
      price: number
      product: {
        name: string
        images: string[]
      }
    }[]
  }
}

export default function CartContents({ cart }: CartContentsProps) {
  const total = cart.cartItems.reduce(
    (sum, item) => sum + item.units * item.price,
    0
  )

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.cartItems.map((item, index) => (
            <motion.div
              key={item.cartItemId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="flex flex-col sm:flex-row items-center p-4 space-y-4 sm:space-y-0 sm:space-x-4">
                    <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="object-cover rounded-md aspect-square"
                    />
                    <div className="flex-grow text-center sm:text-left">
                        <h2 className="text-xl font-semibold">{item.product.name}</h2>
                        <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateCartItemQuantity(item.cartItemId, Math.max(1, item.units - 1))}
                            >
                            -
                        </Button>
                        <span className="w-8 text-center">{item.units}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateCartItemQuantity(item.cartItemId, item.units + 1)}
                            >
                            +
                        </Button>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCartItem(item.cartItemId)}
                    >
                        Remove
                    </Button>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
          ))}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-xl">${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button variant="outline" asChild>
                <Link href="/home">Continue Shopping</Link>
              </Button>
              <PurchaseDialog cartId={cart.cartId} />
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}