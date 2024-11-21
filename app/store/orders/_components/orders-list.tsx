'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Order = {
  orderId: string
  amount: number
  isPaid: boolean
  isDelivered: boolean
  createdAt: Date
}

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      {orders.map((order, index) => (
        <motion.div
          key={order.orderId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{order.orderId.slice(-6)}</h2>
                <Badge variant={order.isPaid ? "success" : "destructive"}>
                  {order.isPaid ? "Paid" : "Unpaid"}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="font-semibold">Total: ${order.amount.toFixed(2)}</p>
              <Badge variant={order.isDelivered ? "success" : "secondary"} className="mt-2">
                {order.isDelivered ? "Delivered" : "Pending Delivery"}
              </Badge>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/store/orders/${order.orderId}`}>View Order Details</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}