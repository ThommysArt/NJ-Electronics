'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Order, Cart, CartItem, Product } from '@prisma/client'

interface MyOrderInterface extends Order {
    cart: Cart & {
        cartItems: (CartItem & {
            product: Product
        })[]
    }
}

export default function OrderDetails({ order }: { order: MyOrderInterface }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Order #{order.orderId.slice(-6)}</h2>
            <Badge variant={order.isPaid ? "success" : "destructive"}>
              {order.isPaid ? "Paid" : "Unpaid"}
            </Badge>
          </div>
          <p className="text-muted-foreground mb-2">
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="font-semibold mb-2">Total: XAF {order.amount.toFixed(2)}</p>
          <Badge variant={order.isDelivered ? "success" : "secondary"}>
            {order.isDelivered ? "Delivered" : "Pending Delivery"}
          </Badge>
          {order.deliveryLocation && (
            <p className="mt-2">Delivery Location: {order.deliveryLocation}</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
          <p>Method: {order.paymentMethod}</p>
          <p>Name: {order.paymentName}</p>
          <p>Phone: {order.paymentPhone}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.cart.cartItems.map((item, index) => (
              <motion.div
                key={item.cartItemId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.units}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.units).toFixed(2)}
                  </p>
                </div>
                {index < order.cart.cartItems.length - 1 && <Separator className="my-4" />}
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6">
          <div className="flex justify-between w-full">
            <span className="text-xl font-semibold">Total</span>
            <span className="text-xl font-semibold">${order.amount.toFixed(2)}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}