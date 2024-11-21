import { notFound } from 'next/navigation'
import { getOrderById } from '@/utils/data/orders'
import OrderDetails from './_components/order-details'

export default async function OrderPage({ params }: { params: { orderId: string } }) {
  const order = await getOrderById(params.orderId)

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>
      <OrderDetails order={order} />
    </div>
  )
}